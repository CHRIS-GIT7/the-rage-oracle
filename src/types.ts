export interface BusinessInfo {
  brandName: string;
  website: string;
  industry: string;
  market: string;
  productDescription: string;
  yearsOperating: string;
  businessSize: string;
  primaryObjective: string;
  twelveMonthGoal: string;
}

export interface BrandInfo {
  brandKnownFor: string;
  primaryCustomer: string;
  whyChooseUs: string;
  keyDifferentiator: string;
  topCompetitors: string;
  perceivedBrandImage: string;
  biggestConcern: string;
}

export interface CustomerMarketInfo {
  customerProblem: string;
  searchTrigger: string;
  hesitationReasons: string;
  topValueDrivers: string[];
  geographicMarkets: string;
  planningExpansion: string;
  expansionTarget?: string;
}

export interface MarketingInfo {
  activeChannels: string[];
  bestPerformingActivity: string;
  failedActivity: string;
  runningPaidAds: string;
  monthlyBudget: string;
}

export interface StrategicQuestions {
  oneThingToFix: string;
  growthBlocker: string;
  biggestQuestion: string;
  reportValueFactor: string;
  additionalContext?: string;
}

export interface ContactInfo {
  fullName: string;
  jobTitle?: string;
  email: string;
  companyName: string;
  phone?: string;
  allowFollowUp: boolean;
}

export interface AssessmentSubmission {
  id: string;
  business: BusinessInfo;
  brand: BrandInfo;
  customer: CustomerMarketInfo;
  marketing: MarketingInfo;
  strategy: StrategicQuestions;
  contact: ContactInfo;
  createdAt: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  reportUrl?: string;
  emailStatus: 'pending' | 'sent' | 'failed';
  emailSentAt?: string;
  analysis?: OracleAnalysis;
  sources?: ResearchSource[];
}

export interface ResearchSource {
  id: string;
  assessmentId: string;
  sourceUrl: string;
  sourceTitle: string;
  sourceType: 'website' | 'competitor' | 'market_signal' | 'category_data';
  sourceSummary: string;
  relevance: string;
  createdAt: string;
}

export interface OracleAnalysis {
  id: string;
  assessmentId: string;
  executiveVerdict: string;
  brandClarityIndex: number;
  differentiationStrength: number;
  customerUnderstanding: number;
  marketOpportunity: number;
  growthReadiness: number;
  strategicConfidence: number;

  scoresBreakdown: {
    businessClarity: number; // 10%
    customerClarity: number; // 15%
    positioningClarity: number; // 15%
    differentiation: number; // 15%
    brandDistinctiveness: number; // 10%
    marketOpportunity: number; // 10%
    messagingClarity: number; // 10%
    customerJourney: number; // 5%
    digitalPresence: number; // 5%
    measurementMaturity: number; // 5%
  };

  brandReality: {
    positioning: string;
    valueProposition: string;
    audience: string;
    strengths: string[];
    weaknesses: string[];
    distinctiveAssets: string[];
    messagingTheme: string;
  };

  marketReality: {
    category: string;
    competitors: Array<{
      name: string;
      positioning: string;
      strength: string;
      weakness: string;
    }>;
    crowdedTerritories: string[];
    whitespace: string[];
    trends: string[];
  };

  customerReality: {
    needs: string[];
    motivations: string[];
    barriers: string[];
    decisionFactors: string[];
    triggers: string[];
  };

  perceptionGap: {
    desired: string;
    current: string;
    gap: string;
    commercialImpact: string;
  };

  primaryConstraint: {
    name: string;
    description: string;
    symptom: string;
    contributingFactors: string[];
    rootCause: string;
    consequence: string;
    evidence: string[];
    confidence: number;
  };

  strategicOpportunity: {
    name: string;
    description: string;
    whyNow: string;
    whyThisBrand: string;
    competitiveWhitespace: string;
    expectedCommercialEffect: string;
    evidence: string[];
    confidence: number;
  };

  nextBestMove: {
    title: string;
    description: string;
    why: string;
    actions: string[];
    expectedImpact: number;
    confidence: number;
  };

  supportingMoves: Array<{
    title: string;
    description: string;
  }>;

  stop: string[];
  start: string[];
  maintain: string[];
  accelerate: string[];

  thirtyDayPlan: Array<{
    week: string;
    title: string;
    actions: string[];
    deliverables: string;
  }>;

  ninetyDayPlan: Array<{
    phase: string;
    period: string;
    focus: string;
    objectives: string[];
  }>;

  measurementFramework: {
    leadingIndicators: string[];
    marketingKpis: string[];
    brandKpis: string[];
    businessKpis: string[];
  };

  strategicBet: {
    action: string;
    desiredOutcome: string;
    audience: string;
    becauseEvidence: string;
    confidence: number;
    expectedImpact: string;
    risk: string;
    validationMethod: string;
  };

  unknowns: Array<{
    question: string;
    whyItMatters: string;
    validationNeeded: string;
  }>;

  sources: ResearchSource[];
  createdAt: string;
}

export interface AdminStats {
  totalAssessments: number;
  completedReports: number;
  averageClarityIndex: number;
  emailDeliveryRate: number;
  topPrimaryConstraints: Array<{ name: string; count: number }>;
  topIndustries: Array<{ name: string; count: number }>;
  monthlyVolume: Array<{ month: string; count: number }>;
}
