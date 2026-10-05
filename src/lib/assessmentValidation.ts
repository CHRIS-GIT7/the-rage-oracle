import type {
  AssessmentSubmission,
  BrandInfo,
  BusinessInfo,
  ContactInfo,
  CustomerMarketInfo,
  MarketingInfo,
  StrategicQuestions,
} from '../types';

export type AssessmentFormPayload = Pick<
  AssessmentSubmission,
  'business' | 'brand' | 'customer' | 'marketing' | 'strategy' | 'contact'
>;

type ValidationResult =
  | { success: true; value: AssessmentFormPayload }
  | { success: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function text(
  record: Record<string, unknown>,
  key: string,
  label: string,
  maxLength: number,
  required = false
): string | null {
  const value = record[key];
  if (value === undefined || value === null) {
    return required ? `${label} is required.` : '';
  }
  if (typeof value !== 'string') return `${label} must be text.`;
  const normalized = value.trim();
  if (required && !normalized) return `${label} is required.`;
  if (normalized.length > maxLength) return `${label} must be ${maxLength} characters or fewer.`;
  return normalized;
}

function readTextFields<T>(
  input: unknown,
  fields: Array<[keyof T & string, string, number, boolean?]>
): { success: true; value: Partial<T> } | { success: false; error: string } {
  if (!isRecord(input)) return { success: false, error: 'An assessment section is missing or invalid.' };
  const value: Record<string, string> = {};
  for (const [key, label, maxLength, required] of fields) {
    const result = text(input, key, label, maxLength, required);
    if (result === null) return { success: false, error: `${label} must be text.` };
    if (required && !result) return { success: false, error: `${label} is required.` };
    value[key] = result;
  }
  return { success: true, value: value as Partial<T> };
}

function readStringList(
  record: Record<string, unknown>,
  key: string,
  label: string,
  maxItems: number,
  maxLength: number
): { success: true; value: string[] } | { success: false; error: string } {
  const input = record[key];
  if (!Array.isArray(input) || input.length > maxItems) {
    return { success: false, error: `${label} has too many or invalid entries.` };
  }
  if (!input.every(item => typeof item === 'string' && item.trim().length > 0 && item.trim().length <= maxLength)) {
    return { success: false, error: `${label} contains an invalid entry.` };
  }
  return { success: true, value: input.map(item => (item as string).trim()) };
}

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validateAssessmentPayload(input: unknown): ValidationResult {
  if (!isRecord(input)) return { success: false, error: 'Invalid assessment request.' };

  const businessResult = readTextFields<BusinessInfo>(input.business, [
    ['brandName', 'Business name', 120, true],
    ['website', 'Website address', 500, true],
    ['industry', 'Industry', 120, true],
    ['market', 'Main markets served', 250, true],
    ['productDescription', 'What the business sells', 1_000, true],
    ['yearsOperating', 'Operating history', 80],
    ['businessSize', 'Business size', 80],
    ['primaryObjective', 'Business objective', 160],
    ['twelveMonthGoal', '12-month goal', 1_000],
  ]);
  if (businessResult.success === false) return { success: false, error: businessResult.error };

  const businessRecord = input.business as Record<string, unknown>;
  const socialLinksResult = readStringList(businessRecord, 'socialLinks', 'Social links', 5, 500);
  if (socialLinksResult.success === false) return { success: false, error: socialLinksResult.error };
  const business = {
    ...businessResult.value,
    brandName: businessResult.value.brandName!,
    website: businessResult.value.website!,
    industry: businessResult.value.industry!,
    market: businessResult.value.market!,
    productDescription: businessResult.value.productDescription!,
    yearsOperating: businessResult.value.yearsOperating || '',
    businessSize: businessResult.value.businessSize || '',
    primaryObjective: businessResult.value.primaryObjective || '',
    twelveMonthGoal: businessResult.value.twelveMonthGoal || '',
    socialLinks: socialLinksResult.value,
  } satisfies BusinessInfo;
  if (!isWebUrl(business.website)) {
    return { success: false, error: 'Enter a valid public website address.' };
  }
  if (business.socialLinks.some(link => !isWebUrl(link))) {
    return { success: false, error: 'Enter valid public URLs for social links.' };
  }

  const brandResult = readTextFields<BrandInfo>(input.brand, [
    ['brandKnownFor', 'Brand positioning', 1_000, true],
    ['primaryCustomer', 'Primary customer', 1_000, true],
    ['whyChooseUs', 'Why customers choose you', 1_000, true],
    ['keyDifferentiator', 'Key difference', 1_000],
    ['topCompetitors', 'Competitors', 1_000],
    ['perceivedBrandImage', 'Current brand perception', 1_000],
    ['biggestConcern', 'Brand concern', 1_000],
  ]);
  if (brandResult.success === false) return { success: false, error: brandResult.error };
  const brand: BrandInfo = {
    brandKnownFor: brandResult.value.brandKnownFor || '',
    primaryCustomer: brandResult.value.primaryCustomer || '',
    whyChooseUs: brandResult.value.whyChooseUs || '',
    keyDifferentiator: brandResult.value.keyDifferentiator || '',
    topCompetitors: brandResult.value.topCompetitors || '',
    perceivedBrandImage: brandResult.value.perceivedBrandImage || '',
    biggestConcern: brandResult.value.biggestConcern || '',
  };

  const customerResult = readTextFields<CustomerMarketInfo>(input.customer, [
    ['customerProblem', 'Customer problem', 1_000, true],
    ['searchTrigger', 'Customer trigger', 1_000],
    ['customerJourney', 'Customer journey', 1_500],
    ['hesitationReasons', 'Customer concerns', 1_000],
    ['geographicMarkets', 'Markets served', 250],
    ['planningExpansion', 'Expansion plans', 80],
    ['expansionTarget', 'Expansion target', 250],
  ]);
  if (customerResult.success === false) return { success: false, error: customerResult.error };
  const customerRecord = input.customer as Record<string, unknown>;
  const valueDriversResult = readStringList(customerRecord, 'topValueDrivers', 'Customer value choices', 5, 60);
  if (valueDriversResult.success === false) return { success: false, error: valueDriversResult.error };
  if (valueDriversResult.value.length === 0) {
    return { success: false, error: 'Select at least one thing customers value.' };
  }
  const customer: CustomerMarketInfo = {
    customerProblem: customerResult.value.customerProblem || '',
    searchTrigger: customerResult.value.searchTrigger || '',
    customerJourney: customerResult.value.customerJourney || '',
    hesitationReasons: customerResult.value.hesitationReasons || '',
    geographicMarkets: customerResult.value.geographicMarkets || '',
    planningExpansion: customerResult.value.planningExpansion || '',
    expansionTarget: customerResult.value.expansionTarget || '',
    topValueDrivers: valueDriversResult.value,
  };

  const marketingResult = readTextFields<MarketingInfo>(input.marketing, [
    ['bestPerformingActivity', 'Best-performing activity', 1_000],
    ['failedActivity', 'Underperforming activity', 1_000],
    ['runningPaidAds', 'Paid advertising status', 80],
    ['monthlyBudget', 'Monthly marketing budget', 100],
    ['monthlyBudgetCurrency', 'Budget currency', 20],
    ['monthlyBudgetCurrencyOther', 'Other budget currency', 20],
  ]);
  if (marketingResult.success === false) return { success: false, error: marketingResult.error };
  const marketingRecord = input.marketing as Record<string, unknown>;
  const channelsResult = readStringList(marketingRecord, 'activeChannels', 'Marketing channels', 20, 60);
  if (channelsResult.success === false) return { success: false, error: channelsResult.error };
  const currency = marketingResult.value.monthlyBudgetCurrency || 'NGN';
  if (!['NGN', 'USD', 'GBP', 'EUR', 'Other'].includes(currency)) {
    return { success: false, error: 'Select a supported budget currency.' };
  }
  if (currency === 'Other' && !marketingResult.value.monthlyBudgetCurrencyOther) {
    return { success: false, error: 'Enter the other budget currency.' };
  }
  const marketing: MarketingInfo = {
    bestPerformingActivity: marketingResult.value.bestPerformingActivity || '',
    failedActivity: marketingResult.value.failedActivity || '',
    runningPaidAds: marketingResult.value.runningPaidAds || '',
    monthlyBudget: marketingResult.value.monthlyBudget || '',
    monthlyBudgetCurrency: currency,
    ...(marketingResult.value.monthlyBudgetCurrencyOther
      ? { monthlyBudgetCurrencyOther: marketingResult.value.monthlyBudgetCurrencyOther }
      : {}),
    activeChannels: channelsResult.value,
  };

  const strategyResult = readTextFields<StrategicQuestions>(input.strategy, [
    ['oneThingToFix', 'Main growth concern', 1_000],
    ['growthBlocker', 'Main growth concern', 1_000, true],
    ['biggestQuestion', 'Report question', 1_000],
    ['reportValueFactor', 'Report goal', 1_000],
    ['additionalContext', 'Additional context', 1_500],
  ]);
  if (strategyResult.success === false) return { success: false, error: strategyResult.error };
  const strategy: StrategicQuestions = {
    oneThingToFix: strategyResult.value.oneThingToFix || '',
    growthBlocker: strategyResult.value.growthBlocker || '',
    biggestQuestion: strategyResult.value.biggestQuestion || '',
    reportValueFactor: strategyResult.value.reportValueFactor || '',
    additionalContext: strategyResult.value.additionalContext || '',
  };

  const contactResult = readTextFields<ContactInfo>(input.contact, [
    ['fullName', 'Full name', 120, true],
    ['jobTitle', 'Job title', 120],
    ['email', 'Email address', 254, true],
    ['phone', 'Phone number', 40, true],
  ]);
  if (contactResult.success === false) return { success: false, error: contactResult.error };
  const contactRecord = input.contact as Record<string, unknown>;
  const email = contactResult.value.email!;
  const phone = contactResult.value.phone!;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Enter a valid email address.' };
  }
  if (phone.replace(/\D/g, '').length < 7) {
    return { success: false, error: 'Enter a valid phone number.' };
  }
  if (contactRecord.privacyConsent !== true) {
    return { success: false, error: 'Privacy consent is required to prepare the assessment.' };
  }
  if (typeof contactRecord.allowFollowUp !== 'boolean' ||
      (contactRecord.requestWhatsAppReport !== undefined && typeof contactRecord.requestWhatsAppReport !== 'boolean')) {
    return { success: false, error: 'The contact preferences are invalid.' };
  }
  const contact = {
    fullName: contactResult.value.fullName!,
    jobTitle: contactResult.value.jobTitle || '',
    email,
    companyName: business.brandName,
    phone,
    allowFollowUp: contactRecord.allowFollowUp,
    privacyConsent: true,
    requestWhatsAppReport: contactRecord.requestWhatsAppReport === true,
  } satisfies ContactInfo;

  return {
    success: true,
    value: { business, brand, customer, marketing, strategy, contact },
  };
}
