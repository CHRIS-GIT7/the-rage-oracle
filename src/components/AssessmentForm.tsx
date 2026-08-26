import React, { useState, useEffect } from 'react';
import { AGENCY_CONFIG } from '../data/agencyConfig';
import { 
  BusinessInfo, 
  BrandInfo, 
  CustomerMarketInfo, 
  MarketingInfo, 
  StrategicQuestions, 
  ContactInfo,
  AssessmentSubmission
} from '../types';
import { 
  Building2, 
  Target, 
  Users, 
  TrendingUp, 
  HelpCircle, 
  Mail, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  AlertCircle,
  Save,
  Sparkles
} from 'lucide-react';

interface AssessmentFormProps {
  onSubmit: (submission: Omit<AssessmentSubmission, 'id' | 'createdAt' | 'status' | 'emailStatus'>) => void;
  onCancel: () => void;
}

const FORM_STORAGE_KEY = 'brand_oracle_draft_v1';

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form State
  const [business, setBusiness] = useState<BusinessInfo>({
    brandName: '',
    website: '',
    industry: '',
    market: '',
    productDescription: '',
    yearsOperating: '1–3 years',
    businessSize: '2–10',
    primaryObjective: 'Acquire more customers',
    twelveMonthGoal: '',
  });

  const [brand, setBrand] = useState<BrandInfo>({
    brandKnownFor: '',
    primaryCustomer: '',
    whyChooseUs: '',
    keyDifferentiator: '',
    topCompetitors: '',
    perceivedBrandImage: '',
    biggestConcern: '',
  });

  const [customer, setCustomer] = useState<CustomerMarketInfo>({
    customerProblem: '',
    searchTrigger: '',
    hesitationReasons: '',
    topValueDrivers: ['Trust', 'Quality', 'Results'],
    geographicMarkets: '',
    planningExpansion: 'Unsure',
    expansionTarget: '',
  });

  const [marketing, setMarketing] = useState<MarketingInfo>({
    activeChannels: ['LinkedIn', 'Google Search'],
    bestPerformingActivity: '',
    failedActivity: '',
    runningPaidAds: 'No',
    monthlyBudget: '₦500,000–₦1m',
  });

  const [strategy, setStrategy] = useState<StrategicQuestions>({
    oneThingToFix: '',
    growthBlocker: '',
    biggestQuestion: '',
    reportValueFactor: '',
    additionalContext: '',
  });

  const [contact, setContact] = useState<ContactInfo>({
    fullName: '',
    jobTitle: '',
    email: '',
    companyName: '',
    phone: '',
    allowFollowUp: true,
  });

  // Load local draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.business) setBusiness(draft.business);
        if (draft.brand) setBrand(draft.brand);
        if (draft.customer) setCustomer(draft.customer);
        if (draft.marketing) setMarketing(draft.marketing);
        if (draft.strategy) setStrategy(draft.strategy);
        if (draft.contact) setContact(draft.contact);
      }
    } catch (e) {
      console.warn('Could not load draft', e);
    }
  }, []);

  // Autosave to localStorage on changes
  useEffect(() => {
    try {
      const draft = { business, brand, customer, marketing, strategy, contact };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      console.warn('Could not save draft', e);
    }
  }, [business, brand, customer, marketing, strategy, contact]);

  // Sync company name with brand name if empty
  useEffect(() => {
    if (!contact.companyName && business.brandName) {
      setContact(prev => ({ ...prev, companyName: business.brandName }));
    }
  }, [business.brandName, contact.companyName]);

  const steps = [
    { num: 1, label: 'Business', icon: Building2 },
    { num: 2, label: 'Brand', icon: Target },
    { num: 3, label: 'Customer', icon: Users },
    { num: 4, label: 'Marketing', icon: TrendingUp },
    { num: 5, label: 'Strategy', icon: HelpCircle },
    { num: 6, label: 'Contact', icon: Mail },
  ];

  const validateStep = (step: number): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!business.brandName.trim()) { setValidationError('Brand/Business name is required.'); return false; }
      if (!business.website.trim()) { setValidationError('Website URL is required.'); return false; }
      if (!business.industry.trim()) { setValidationError('Industry/Category is required.'); return false; }
      if (!business.market.trim()) { setValidationError('Primary market is required.'); return false; }
      if (!business.productDescription.trim()) { setValidationError('Please describe what your business sells.'); return false; }
    } else if (step === 2) {
      if (!brand.brandKnownFor.trim()) { setValidationError('Please state what you want your brand to be known for.'); return false; }
      if (!brand.primaryCustomer.trim()) { setValidationError('Primary customer profile is required.'); return false; }
      if (!brand.whyChooseUs.trim()) { setValidationError('Please explain why customers choose you.'); return false; }
    } else if (step === 3) {
      if (!customer.customerProblem.trim()) { setValidationError('Please describe the main problem your customers face.'); return false; }
      if (customer.topValueDrivers.length === 0) { setValidationError('Please select at least one value driver.'); return false; }
    } else if (step === 5) {
      if (!strategy.oneThingToFix.trim()) { setValidationError('Please state the one thing you would fix immediately.'); return false; }
      if (!strategy.growthBlocker.trim()) { setValidationError('Please describe what is stopping growth.'); return false; }
    } else if (step === 6) {
      if (!contact.fullName.trim()) { setValidationError('Full name is required.'); return false; }
      if (!contact.email.trim() || !contact.email.includes('@')) { setValidationError('Valid email address is required.'); return false; }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (!validateStep(6)) return;

    // Clear draft on submission
    localStorage.removeItem(FORM_STORAGE_KEY);

    onSubmit({
      business,
      brand,
      customer,
      marketing,
      strategy,
      contact,
    });
  };

  const handleLoadWardrobeRefreshSample = () => {
    setBusiness({
      brandName: 'The Wardrobe Refresh',
      website: 'https://www.instagram.com/thewardrobe_refresh/',
      industry: 'Fashion, Personal Styling & Curated Thrift',
      market: 'Lagos & Urban Nigeria (Abuja, Port Harcourt)',
      productDescription: 'Curated wardrobe refresh packages, personal styling, premium thrift & vintage clothing drops, wardrobe decluttering, and capsule closet curation for stylish Nigerian women and executives.',
      yearsOperating: '1–3 years',
      businessSize: '2–10',
      primaryObjective: 'Acquire more customers',
      twelveMonthGoal: 'Scale monthly revenue to ₦15M+ by building a predictable WhatsApp DM funnel and launching curated capsule subscription drops.',
    });

    setBrand({
      brandKnownFor: 'Effortless, chic wardrobe revamps, premium thrift finds, and body-flattering personal styling for Nigerian women.',
      primaryCustomer: 'Working female professionals, corporate executives, and fashion-conscious Nigerian women (ages 23–42) in Lagos and Abuja.',
      whyChooseUs: 'Curated high-quality pieces, personalized styling advice, affordable luxury feel, and hassle-free door delivery.',
      keyDifferentiator: 'Handpicked premium condition guarantee paired with 1-on-1 virtual styling and closet decluttering consultations.',
      topCompetitors: 'Thrift Lagos Boutiques, Shop Thrifty NG, Local IG Vintage Vendors, Fast Fashion Retailers (Zara, Shein)',
      perceivedBrandImage: 'Stylish Instagram fashion page, but occasionally perceived as an informal IG vendor rather than a high-ticket personal styling brand.',
      biggestConcern: 'DM-dependent sales where leads ask for prices but disappear, price haggling on Instagram DMs, and high drop-off from post views to completed WhatsApp payments.',
    });

    setCustomer({
      customerProblem: 'Nigerian women want to look stylish and well-dressed without spending hundreds of thousands on overpriced fast fashion or wearing low-quality clothes.',
      searchTrigger: 'Starting a new job, wardrobe fatigue, attending major events (weddings, dinners), or seasonal wardrobe decluttering.',
      hesitationReasons: 'Skepticism over clothing size fit, fear of receiving worn-out items, delivery delays, and preference for instant WhatsApp customer care.',
      topValueDrivers: ['Quality', 'Results', 'Trust', 'Convenience', 'Speed'],
      geographicMarkets: 'Lagos (Mainland & Island), Abuja, Port Harcourt, Ibadan',
      planningExpansion: 'Yes',
      expansionTarget: 'Pan-Nigerian shipping network and nationwide Virtual Wardrobe Consultation subscriptions.',
    });

    setMarketing({
      activeChannels: ['Instagram', 'TikTok', 'WhatsApp', 'Word of Mouth'],
      bestPerformingActivity: 'Instagram Reels showcasing Before-and-After wardrobe transformations and new thrift item drop videos.',
      failedActivity: 'Generic Instagram boost ads without video try-on proof or direct WhatsApp conversion links.',
      runningPaidAds: 'Yes',
      monthlyBudget: '₦250,000–₦500,000',
    });

    setStrategy({
      oneThingToFix: 'Convert casual Instagram DM inquiries into instant paid WhatsApp orders with zero price haggling.',
      growthBlocker: 'Lack of an automated WhatsApp product catalog and structured video social proof showing real Nigerian clients in transformed outfits.',
      biggestQuestion: 'How can we position Wardrobe Refresh as a high-ticket personal styling brand rather than just another IG thrift vendor?',
      reportValueFactor: 'Step-by-step funnel strategy to double WhatsApp order conversions and build an exclusive VIP styling membership.',
      additionalContext: 'Instagram handle @thewardrobe_refresh. Active on IG stories and reels, relies heavily on bank transfers and Paystack links for payment.',
    });

    setContact({
      fullName: 'Founder / Lead Stylist',
      jobTitle: 'Founder & Creative Director',
      email: 'contact@thewardrobe_refresh.com',
      companyName: 'The Wardrobe Refresh',
      phone: '+234 800 000 0000',
      allowFollowUp: true,
    });

    setValidationError(null);
  };

  const toggleValueDriver = (driver: string) => {
    setCustomer(prev => {
      const exists = prev.topValueDrivers.includes(driver);
      let updated = [];
      if (exists) {
        updated = prev.topValueDrivers.filter(d => d !== driver);
      } else {
        if (prev.topValueDrivers.length >= 5) return prev; // max 5
        updated = [...prev.topValueDrivers, driver];
      }
      return { ...prev, topValueDrivers: updated };
    });
  };

  const toggleChannel = (channel: string) => {
    setMarketing(prev => {
      const exists = prev.activeChannels.includes(channel);
      const updated = exists
        ? prev.activeChannels.filter(c => c !== channel)
        : [...prev.activeChannels, channel];
      return { ...prev, activeChannels: updated };
    });
  };

  const valueDriverOptions = [
    'Price', 'Quality', 'Trust', 'Convenience', 'Speed', 'Expertise',
    'Reputation', 'Innovation', 'Customer service', 'Location', 'Experience',
    'Results', 'Status/prestige', 'Other'
  ];

  const channelOptions = [
    'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'X', 'YouTube',
    'Google Search', 'Google Ads', 'Meta Ads', 'Email', 'Influencer marketing',
    'TV', 'Radio', 'Outdoor', 'Events', 'PR', 'SEO', 'Other'
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-[#E4E4E7] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Step Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                DIAGNOSTIC PROTOCOL // PARAMETER ENTRY
              </span>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                STEP 0{currentStep}: {steps[currentStep - 1].label.toUpperCase()}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 bg-[#121215] px-3 py-1 rounded border border-[#27272A]">
              <Save className="w-3.5 h-3.5 text-white" />
              <span>AUTOSAVED</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#18181B] h-1.5 rounded-full overflow-hidden border border-[#27272A]">
            <div 
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>

          {/* Step Badges */}
          <div className="grid grid-cols-6 gap-2 mt-3 text-center">
            {steps.map(s => {
              const Icon = s.icon;
              const isActive = s.num === currentStep;
              const isDone = s.num < currentStep;

              return (
                <div 
                  key={s.num}
                  onClick={() => { if (s.num < currentStep) setCurrentStep(s.num); }}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-opacity ${
                    isActive ? 'opacity-100' : isDone ? 'opacity-80' : 'opacity-40'
                  }`}
                >
                  <div className={`w-7 h-7 rounded flex items-center justify-center text-xs font-bold transition-all ${
                    isActive ? 'bg-white text-black ring-2 ring-white/30' : isDone ? 'bg-[#18181B] text-white border border-[#27272A]' : 'bg-[#09090B] text-neutral-600 border border-[#27272A]'
                  }`}>
                    {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="hidden sm:inline text-[9px] font-semibold text-neutral-400 uppercase truncate">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Test Run Sample Banner */}
        <div className="mb-4 p-4 bg-[#121215] border border-[#27272A] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="text-xs font-extrabold text-white uppercase flex items-center gap-1.5 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>TEST RUN SAMPLE PRESET</span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 font-medium">
              Want to run a real-time test? Load analyzed data for <strong className="text-white font-bold">The Wardrobe Refresh (@thewardrobe_refresh)</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadWardrobeRefreshSample}
            className="px-4 py-2 bg-white text-black text-xs font-extrabold uppercase rounded-lg hover:bg-neutral-200 transition-all shrink-0 shadow-md border border-white"
          >
            Load @thewardrobe_refresh
          </button>
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div className="mb-4 p-3 rounded bg-neutral-900 border border-neutral-700 text-white text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-white shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Container Card */}
        <div className="bg-[#121215] border border-[#27272A] rounded-xl p-5 sm:p-8 shadow-2xl">
          {/* STEP 1: BUSINESS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Brand / Business Name <span className="text-white font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={business.brandName}
                  onChange={e => setBusiness({ ...business, brandName: e.target.value })}
                  placeholder="e.g. Apex Fintech Solutions"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Website URL <span className="text-white font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={business.website}
                  onChange={e => setBusiness({ ...business, website: e.target.value })}
                  placeholder="https://yourbrand.com"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Industry / Category <span className="text-white font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={business.industry}
                    onChange={e => setBusiness({ ...business, industry: e.target.value })}
                    placeholder="e.g. Fintech, Beauty, B2B SaaS"
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Country / Primary Market <span className="text-white font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={business.market}
                    onChange={e => setBusiness({ ...business, market: e.target.value })}
                    placeholder="e.g. United States, Nigeria, Global"
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What does your business sell? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={3}
                  value={business.productDescription}
                  onChange={e => setBusiness({ ...business, productDescription: e.target.value })}
                  placeholder="Describe your core product or service offering..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Operating History
                  </label>
                  <select
                    value={business.yearsOperating}
                    onChange={e => setBusiness({ ...business, yearsOperating: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1–3 years">1–3 years</option>
                    <option value="4–7 years">4–7 years</option>
                    <option value="8–15 years">8–15 years</option>
                    <option value="15+ years">15+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Team / Business Size
                  </label>
                  <select
                    value={business.businessSize}
                    onChange={e => setBusiness({ ...business, businessSize: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="Solo/founder">Solo / Founder</option>
                    <option value="2–10">2–10 employees</option>
                    <option value="11–50">11–50 employees</option>
                    <option value="51–200">51–200 employees</option>
                    <option value="201–500">201–500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Primary Business Objective
                </label>
                <select
                  value={business.primaryObjective}
                  onChange={e => setBusiness({ ...business, primaryObjective: e.target.value })}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                >
                  <option value="Increase sales">Increase sales</option>
                  <option value="Acquire more customers">Acquire more customers</option>
                  <option value="Increase market share">Increase market share</option>
                  <option value="Enter a new market">Enter a new market</option>
                  <option value="Launch a new product/service">Launch a new product/service</option>
                  <option value="Improve profitability">Improve profitability</option>
                  <option value="Build stronger brand awareness">Build stronger brand awareness</option>
                  <option value="Improve customer retention">Improve customer retention</option>
                  <option value="Improve conversion">Improve conversion</option>
                  <option value="Reposition the brand">Reposition the brand</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  12-Month Desired Commercial Result
                </label>
                <textarea
                  rows={2}
                  value={business.twelveMonthGoal}
                  onChange={e => setBusiness({ ...business, twelveMonthGoal: e.target.value })}
                  placeholder="e.g. Double revenue, hit $10M ARR, launch in Europe..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>
            </div>
          )}

          {/* STEP 2: BRAND */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  In one sentence, what do you want your brand to be known for? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={2}
                  value={brand.brandKnownFor}
                  onChange={e => setBrand({ ...brand, brandKnownFor: e.target.value })}
                  placeholder="e.g. The premier automated risk engine for wealth managers..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Who is your primary target customer? <span className="text-white font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={brand.primaryCustomer}
                  onChange={e => setBrand({ ...brand, primaryCustomer: e.target.value })}
                  placeholder="e.g. Independent RIA managing partners with $100M+ AUM"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Why do existing customers choose you? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={2}
                  value={brand.whyChooseUs}
                  onChange={e => setBrand({ ...brand, whyChooseUs: e.target.value })}
                  placeholder="e.g. Unrivaled algorithms paired with 10-minute setup..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What makes your brand different from competitors?
                </label>
                <textarea
                  rows={2}
                  value={brand.keyDifferentiator}
                  onChange={e => setBrand({ ...brand, keyDifferentiator: e.target.value })}
                  placeholder="Describe your primary competitive moat or distinct feature..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Top Competitors (Names or Websites)
                </label>
                <input
                  type="text"
                  value={brand.topCompetitors}
                  onChange={e => setBrand({ ...brand, topCompetitors: e.target.value })}
                  placeholder="e.g. CompetitorA, CompetitorB.com, CompetitorC"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What do you believe customers currently think about your brand?
                </label>
                <input
                  type="text"
                  value={brand.perceivedBrandImage}
                  onChange={e => setBrand({ ...brand, perceivedBrandImage: e.target.value })}
                  placeholder="e.g. Powerful tech but looks complex..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What is your biggest concern about your brand right now?
                </label>
                <textarea
                  rows={2}
                  value={brand.biggestConcern}
                  onChange={e => setBrand({ ...brand, biggestConcern: e.target.value })}
                  placeholder="e.g. We look like every other generic tool in our space..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMER & MARKET */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What is the biggest problem your customers are trying to solve? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={2}
                  value={customer.customerProblem}
                  onChange={e => setCustomer({ ...customer, customerProblem: e.target.value })}
                  placeholder="e.g. Rebalancing complex portfolios manually takes 18+ hours a week..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What usually causes customers to search for your product/service?
                </label>
                <input
                  type="text"
                  value={customer.searchTrigger}
                  onChange={e => setCustomer({ ...customer, searchTrigger: e.target.value })}
                  placeholder="e.g. Market volatility spikes or regulatory audits..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What are the biggest reasons people hesitate before buying from you?
                </label>
                <input
                  type="text"
                  value={customer.hesitationReasons}
                  onChange={e => setCustomer({ ...customer, hesitationReasons: e.target.value })}
                  placeholder="e.g. Data security concerns, migration hassle, price..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What do customers value most when choosing in your category? (Select up to 5) <span className="text-white font-bold">*</span>
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {valueDriverOptions.map(driver => {
                    const isSelected = customer.topValueDrivers.includes(driver);
                    return (
                      <button
                        key={driver}
                        type="button"
                        onClick={() => toggleValueDriver(driver)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-[#18181B] text-neutral-300 border-[#27272A] hover:border-neutral-500'
                        }`}
                      >
                        {driver}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Geographic Markets Served
                  </label>
                  <input
                    type="text"
                    value={customer.geographicMarkets}
                    onChange={e => setCustomer({ ...customer, geographicMarkets: e.target.value })}
                    placeholder="e.g. US, UK, West Africa"
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Planning Geographic Expansion?
                  </label>
                  <select
                    value={customer.planningExpansion}
                    onChange={e => setCustomer({ ...customer, planningExpansion: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                </div>
              </div>

              {customer.planningExpansion === 'Yes' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Where are you planning to expand?
                  </label>
                  <input
                    type="text"
                    value={customer.expansionTarget || ''}
                    onChange={e => setCustomer({ ...customer, expansionTarget: e.target.value })}
                    placeholder="e.g. European Union (Germany), Canada"
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: MARKETING */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Which marketing channels do you currently use?
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {channelOptions.map(channel => {
                    const isSelected = marketing.activeChannels.includes(channel);
                    return (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => toggleChannel(channel)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-[#18181B] text-neutral-300 border-[#27272A] hover:border-neutral-500'
                        }`}
                      >
                        {channel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Which activity produces the BEST results today?
                </label>
                <input
                  type="text"
                  value={marketing.bestPerformingActivity}
                  onChange={e => setMarketing({ ...marketing, bestPerformingActivity: e.target.value })}
                  placeholder="e.g. Executive dinner roundtables, Founder LinkedIn posts..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What activity did NOT produce expected results?
                </label>
                <input
                  type="text"
                  value={marketing.failedActivity}
                  onChange={e => setMarketing({ ...marketing, failedActivity: e.target.value })}
                  placeholder="e.g. Broad Meta retargeting ads, Google Search ads..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Running Paid Advertising?
                  </label>
                  <select
                    value={marketing.runningPaidAds}
                    onChange={e => setMarketing({ ...marketing, runningPaidAds: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Approximate Monthly Marketing Budget
                  </label>
                  <select
                    value={marketing.monthlyBudget}
                    onChange={e => setMarketing({ ...marketing, monthlyBudget: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white font-sans"
                  >
                    <option value="Under ₦100,000">Under ₦100,000</option>
                    <option value="₦100,000–₦500,000">₦100,000–₦500,000</option>
                    <option value="₦500,000–₦1m">₦500,000–₦1m</option>
                    <option value="₦1m–₦5m">₦1m–₦5m</option>
                    <option value="₦5m–₦10m">₦5m–₦10m</option>
                    <option value="₦10m+">₦10m+</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: STRATEGY */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  If you could fix ONE thing about your brand immediately, what would it be? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={2}
                  value={strategy.oneThingToFix}
                  onChange={e => setStrategy({ ...strategy, oneThingToFix: e.target.value })}
                  placeholder="e.g. Our core messaging—it sounds like a spec sheet instead of a partner..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What do you believe is currently stopping your business from growing? <span className="text-white font-bold">*</span>
                </label>
                <textarea
                  rows={2}
                  value={strategy.growthBlocker}
                  onChange={e => setStrategy({ ...strategy, growthBlocker: e.target.value })}
                  placeholder="e.g. High customer acquisition cost and long sales friction..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What is the biggest marketing question you wish someone could answer for you?
                </label>
                <textarea
                  rows={2}
                  value={strategy.biggestQuestion}
                  onChange={e => setStrategy({ ...strategy, biggestQuestion: e.target.value })}
                  placeholder="e.g. How do we position as market leaders without pricing out mid-market clients?"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  What would make this report genuinely valuable to you?
                </label>
                <input
                  type="text"
                  value={strategy.reportValueFactor}
                  onChange={e => setStrategy({ ...strategy, reportValueFactor: e.target.value })}
                  placeholder="e.g. A clear 90-day actionable roadmap our team can execute."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Is there anything else the Oracle should know before analyzing your brand?
                </label>
                <textarea
                  rows={2}
                  value={strategy.additionalContext || ''}
                  onChange={e => setStrategy({ ...strategy, additionalContext: e.target.value })}
                  placeholder="Any additional background, funding news, or market nuances..."
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>
            </div>
          )}

          {/* STEP 6: CONTACT */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] text-xs text-neutral-300 leading-relaxed">
                <p className="font-extrabold text-white mb-1 uppercase tracking-wider">Your Report Delivery Details</p>
                Your customized The RAGE Oracle™ PDF report will be generated and dispatched directly to the email provided below.
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Full Name <span className="text-white font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={contact.fullName}
                  onChange={e => setContact({ ...contact, fullName: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Job Title / Role
                </label>
                <input
                  type="text"
                  value={contact.jobTitle || ''}
                  onChange={e => setContact({ ...contact, jobTitle: e.target.value })}
                  placeholder="e.g. Founder, CEO, Chief Marketing Officer"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Email Address (Where report will be sent) <span className="text-white font-bold">*</span>
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={e => setContact({ ...contact, email: e.target.value })}
                  placeholder="marcus@yourbrand.com"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={contact.companyName}
                  onChange={e => setContact({ ...contact, companyName: e.target.value })}
                  placeholder="e.g. Apex Fintech Solutions"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={contact.phone || ''}
                  onChange={e => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white font-sans"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contact.allowFollowUp}
                    onChange={e => setContact({ ...contact, allowFollowUp: e.target.checked })}
                    className="mt-1 rounded bg-[#18181B] border-[#27272A] text-white focus:ring-white"
                  />
                  <span className="text-xs text-neutral-400 leading-relaxed font-medium">
                    Would you like a senior strategist from {AGENCY_CONFIG.name} to review your report with you via a brief strategy call?
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-6 border-t border-[#27272A] flex items-center justify-between font-sans">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded text-xs font-bold text-white hover:text-white bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREVIOUS STEP</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold text-neutral-400 hover:text-white px-2 py-1 transition-colors uppercase tracking-wider"
              >
                CANCEL
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-2.5 rounded font-bold text-xs text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-2 uppercase tracking-wider border border-white shadow-md"
            >
              <span>{currentStep === 6 ? 'SUBMIT FOR ANALYSIS' : 'NEXT STEP'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
