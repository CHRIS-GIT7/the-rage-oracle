import { AssessmentSubmission, OracleAnalysis } from '../types';

interface SampleScenario {
  id: string;
  brandName: string;
  industry: string;
  market: string;
  productDescription: string;
  customer: string;
  problem: string;
  positioning: string;
  differentiator: string;
  channels: string[];
  growthBlocker: string;
  priority: string;
  strategicBet: string;
  audience: string;
  outcome: string;
  proof: string;
}

function createSample(scenario: SampleScenario): AssessmentSubmission {
  const templateAnalysis: OracleAnalysis = {
    id: '',
    assessmentId: '',
    executiveVerdict: '',
    brandClarityIndex: 72,
    differentiationStrength: 75,
    customerUnderstanding: 84,
    marketOpportunity: 80,
    growthReadiness: 68,
    strategicConfidence: 76,
    scoresBreakdown: {
      businessClarity: 75,
      customerClarity: 78,
      positioningClarity: 72,
      differentiation: 75,
      brandDistinctiveness: 70,
      marketOpportunity: 80,
      messagingClarity: 72,
      customerJourney: 65,
      digitalPresence: 70,
      measurementMaturity: 60,
    },
    brandReality: {
      positioning: '',
      valueProposition: '',
      audience: '',
      strengths: [],
      weaknesses: [],
      distinctiveAssets: [],
      messagingTheme: '',
    },
    marketReality: {
      category: '',
      competitors: [],
      crowdedTerritories: [],
      whitespace: [],
      trends: [],
    },
    customerReality: {
      needs: [],
      motivations: [],
      barriers: [],
      decisionFactors: [],
      triggers: [],
    },
    perceptionGap: { desired: '', current: '', gap: '', commercialImpact: '' },
    primaryConstraint: {
      name: '',
      description: '',
      symptom: '',
      contributingFactors: [],
      rootCause: '',
      consequence: '',
      evidence: [],
      confidence: 76,
    },
    strategicOpportunity: {
      name: '',
      description: '',
      whyNow: '',
      whyThisBrand: '',
      competitiveWhitespace: '',
      expectedCommercialEffect: '',
      evidence: [],
      confidence: 76,
    },
    nextBestMove: { title: '', description: '', why: '', actions: [], expectedImpact: 0, confidence: 76 },
    supportingMoves: [],
    stop: [],
    start: [],
    maintain: [],
    accelerate: [],
    thirtyDayPlan: [],
    ninetyDayPlan: [],
    measurementFramework: { leadingIndicators: [], marketingKpis: [], brandKpis: [], businessKpis: [] },
    strategicBet: {
      action: '',
      desiredOutcome: '',
      audience: '',
      becauseEvidence: '',
      confidence: 76,
      expectedImpact: '',
      risk: '',
      validationMethod: '',
    },
    unknowns: [],
    sources: [],
    createdAt: '2026-09-01T09:00:00Z',
  };
  const sample: AssessmentSubmission = {
    id: scenario.id,
    createdAt: '2026-09-01T09:00:00Z',
    status: 'completed',
    emailStatus: 'failed',
    business: {
      brandName: scenario.brandName,
      website: 'https://example.com',
      industry: scenario.industry,
      market: scenario.market,
      productDescription: scenario.productDescription,
      primaryObjective: 'Increase sales',
      twelveMonthGoal: 'Grow repeat sales while improving the customer experience.',
      yearsOperating: '1–3 years',
      businessSize: '2–10',
    },
    brand: {
      brandKnownFor: scenario.positioning,
      primaryCustomer: scenario.customer,
      whyChooseUs: scenario.differentiator,
      keyDifferentiator: scenario.differentiator,
      topCompetitors: 'Local alternatives and larger established brands',
      perceivedBrandImage: 'A promising local business with room to build stronger recognition.',
      biggestConcern: scenario.growthBlocker,
    },
    customer: {
      customerProblem: scenario.problem,
      searchTrigger: scenario.problem,
      customerJourney: 'Customers discover the brand through social media or referrals, ask questions on WhatsApp, place an order and may return for another purchase.',
      hesitationReasons: 'Buyers want to see clear prices, reliable service and proof that the product will meet expectations.',
      topValueDrivers: ['Trust', 'Quality', 'Convenience'],
      geographicMarkets: scenario.market,
      planningExpansion: 'Unsure',
    },
    marketing: {
      activeChannels: scenario.channels,
      bestPerformingActivity: 'Recommendations from existing customers',
      failedActivity: 'Posting regularly without a clear next step for interested buyers',
      runningPaidAds: 'No',
      monthlyBudget: '500,000–1,000,000',
      monthlyBudgetCurrency: 'NGN',
    },
    strategy: {
      growthBlocker: scenario.growthBlocker,
      oneThingToFix: scenario.growthBlocker,
      biggestQuestion: 'Which parts of the customer journey should we improve first?',
      reportValueFactor: 'A simple plan to increase enquiries and repeat purchases.',
      additionalContext: '',
    },
    contact: {
      fullName: 'Sample business owner',
      jobTitle: 'Owner',
      email: 'sample@example.com',
      companyName: scenario.brandName,
      phone: '+234 800 000 0000',
      allowFollowUp: false,
    },
    sources: [],
    analysis: {
      ...templateAnalysis,
      id: `ana-${scenario.id}`,
      assessmentId: scenario.id,
      executiveVerdict: `${scenario.brandName} has a clear opportunity to grow by making it easier for ${scenario.audience} to understand the offer, place an order and come back. The main concern is ${scenario.growthBlocker}.`,
      brandReality: {
        ...templateAnalysis.brandReality,
        positioning: scenario.positioning,
        valueProposition: scenario.differentiator,
        audience: scenario.customer,
        strengths: ['A clear product for a defined local audience', 'Recommendations from existing customers can build trust'],
        weaknesses: ['The route from interest to purchase could be clearer', 'The business may be relying too heavily on informal follow-up'],
        distinctiveAssets: [scenario.differentiator],
        messagingTheme: `Make the everyday benefit of ${scenario.productDescription.toLowerCase()} easy to see.`,
      },
      marketReality: {
        ...templateAnalysis.marketReality,
        category: scenario.industry,
        competitors: [
          { name: 'Local alternatives', positioning: 'Convenient options nearby', strength: 'Familiarity and proximity', weakness: 'May offer less consistent service' },
          { name: 'Established brands', positioning: 'Broad choice and recognition', strength: 'More visible and widely available', weakness: 'Can feel less personal' },
        ],
        crowdedTerritories: ['General claims about quality', 'Promotions without a clear reason to choose this business'],
        whitespace: [`Show how ${scenario.brandName} makes ${scenario.productDescription.toLowerCase()} more convenient for local customers.`],
        trends: ['Customers often check social proof and prices before they enquire.', 'Fast, clear replies can help turn interest into an order.'],
      },
      customerReality: {
        ...templateAnalysis.customerReality,
        needs: [scenario.problem, 'Clear prices and a dependable way to place an order'],
        motivations: ['Save time', 'Find a reliable option they can recommend to others'],
        barriers: ['Unclear ordering steps', 'Uncertainty about quality or delivery'],
        decisionFactors: ['Trust', 'Quality', 'Convenience', 'Price clarity'],
        triggers: [scenario.problem],
      },
      perceptionGap: {
        ...templateAnalysis.perceptionGap,
        desired: scenario.positioning,
        current: 'A local option that may be hard for new customers to compare or order from.',
        gap: 'The value may not be obvious before a customer sends a message or visits.',
        commercialImpact: 'Interested buyers may choose another option if prices, proof or next steps are hard to find.',
      },
      primaryConstraint: {
        ...templateAnalysis.primaryConstraint,
        name: 'Too much effort between interest and purchase',
        description: `Customers may like what ${scenario.brandName} offers but still have to ask basic questions before they know how to order.`,
        symptom: 'Social posts and referrals create attention, but not every interested person completes an order.',
        contributingFactors: ['Ordering information may be spread across several channels', 'Follow-up may depend on someone replying manually'],
        rootCause: 'The path from seeing the offer to placing an order is not yet simple and consistent.',
        consequence: 'Some potential sales are likely to be lost before the business can follow up.',
        evidence: [scenario.growthBlocker, scenario.channels.join(', ')],
      },
      strategicOpportunity: {
        ...templateAnalysis.strategicOpportunity,
        name: 'Make ordering simple and easy to trust',
        description: `Bring the offer, prices, customer proof and clear next step together on the channels ${scenario.customer} already use.`,
        whyNow: 'Customers can compare options quickly and often choose the one that is easiest to understand and order from.',
        whyThisBrand: `${scenario.brandName} serves a clear audience with a useful product and an opportunity to make the buying experience more personal.`,
        competitiveWhitespace: 'Pair local knowledge and personal service with clear, dependable ordering.',
        expectedCommercialEffect: 'More completed enquiries and orders, with a better chance of repeat purchases.',
      },
      nextBestMove: {
        ...templateAnalysis.nextBestMove,
        title: 'Create one clear path from discovery to order',
        description: `Put the best-selling offer, price information, customer proof and ordering instructions in one easy-to-find place, then link every social post and WhatsApp conversation to it.`,
        why: `This directly addresses the friction described by the business and works with its current channels: ${scenario.channels.join(', ')}.`,
        actions: ['Choose the products or services to promote first', 'Make prices, delivery details and ordering steps easy to find', 'Use one tracked link in social posts and WhatsApp replies'],
      },
      stop: ['Posting offers without explaining how to buy', 'Treating likes and views as the only measure of progress'],
      start: ['Track enquiries through to completed orders', 'Ask recent customers what made them choose the business'],
      maintain: ['Personal customer service', 'Recommendations from satisfied customers'],
      accelerate: ['Clear product photos and customer reviews', 'Quick, consistent replies on WhatsApp'],
      thirtyDayPlan: [
        { week: 'Week 1', title: 'Pick the offer', actions: ['Choose a small set of priority products or services'], deliverables: 'A clear offer and current prices' },
        { week: 'Week 2', title: 'Simplify ordering', actions: ['Make the next step easy to find on social and WhatsApp'], deliverables: 'One clear ordering path' },
        { week: 'Week 3', title: 'Add customer proof', actions: ['Collect and share customer feedback with permission'], deliverables: 'A set of useful reviews and photos' },
        { week: 'Week 4', title: 'Check what worked', actions: ['Compare enquiries, orders and repeat purchases'], deliverables: 'A short results review and next test' },
      ],
      ninetyDayPlan: [
        { phase: 'Improve', period: 'Days 1–30', focus: 'Make the offer and ordering path clearer.', objectives: ['Track enquiries and completed orders'] },
        { phase: 'Learn', period: 'Days 31–60', focus: 'Test messages and offers with real customers.', objectives: ['Compare response and purchase rates'] },
        { phase: 'Grow', period: 'Days 61–90', focus: 'Put more effort into the best-performing offer and channel.', objectives: ['Build a repeat-purchase routine'] },
      ],
      measurementFramework: {
        leadingIndicators: ['Enquiries received', 'Time to first reply'],
        marketingKpis: ['Enquiries by channel', 'Enquiry-to-order rate'],
        brandKpis: ['Customer reviews collected', 'Referral enquiries'],
        businessKpis: ['Completed orders', 'Repeat purchase rate', 'Average order value'],
      },
      strategicBet: {
        ...templateAnalysis.strategicBet,
        action: scenario.strategicBet,
        desiredOutcome: scenario.outcome,
        audience: scenario.audience,
        becauseEvidence: scenario.proof,
        confidence: 76,
        expectedImpact: 'More completed orders and clearer evidence about what is driving sales.',
        risk: 'The team may not have time to keep prices, stock and replies up to date.',
        validationMethod: 'Track enquiries, completed orders and repeat purchases for four weeks before and after the change.',
      },
      unknowns: [],
    },
  };
  return sample;
}

const lagosFoodSample = createSample({
  id: 'ora-sample-lagos-food',
  brandName: 'Lagos Table',
  industry: 'Food, hospitality & delivery',
  market: 'Lagos, Nigeria',
  productDescription: 'Freshly prepared Nigerian meals for office lunches and family orders.',
  customer: 'Office workers and families in Lagos who need tasty, dependable meals without a long wait.',
  problem: 'Finding a convenient meal that arrives on time, tastes good and is worth the price.',
  positioning: 'Fresh Nigerian meals, made easy to order for busy Lagos days.',
  differentiator: 'A focused menu, dependable delivery and familiar local flavours.',
  channels: ['Instagram', 'WhatsApp', 'Referrals'],
  growthBlocker: 'People ask about the menu and delivery but do not always complete an order.',
  priority: 'Make the menu, delivery area and ordering steps clear in one place.',
  strategicBet: 'Share a weekly menu with prices, delivery areas and a direct WhatsApp order link.',
  audience: 'busy office workers and families in Lagos',
  outcome: 'more completed meal orders and repeat customers',
  proof: 'customers already discover the business through social media and recommendations, but some stop to ask how ordering works',
});

const kanoFashionSample = createSample({
  id: 'ora-sample-kano-fashion',
  brandName: 'Arewa Stitch',
  industry: 'Fashion & retail',
  market: 'Kano, Nigeria',
  productDescription: 'Made-to-measure everyday and occasion wear using locally sourced fabrics.',
  customer: 'People in Kano looking for well-fitted clothing for work, family events and celebrations.',
  problem: 'Finding well-made clothing that fits properly and is ready when it is needed.',
  positioning: 'Well-fitted local fashion for workdays and special occasions.',
  differentiator: 'Made-to-measure service with fabric and fitting guidance from a local team.',
  channels: ['Instagram', 'WhatsApp', 'Referrals', 'Events'],
  growthBlocker: 'New customers cannot easily tell what styles are available, how fittings work or when an order will be ready.',
  priority: 'Show real designs, prices, fitting steps and delivery timelines before a customer enquires.',
  strategicBet: 'Build a simple WhatsApp catalogue with current designs, starting prices and fitting instructions.',
  audience: 'working adults and families in Kano',
  outcome: 'more qualified enquiries and completed clothing orders',
  proof: 'the business already relies on visual channels and referrals, while customers need confidence in fit, price and timing',
});

export const SAMPLE_ASSESSMENTS = [
  lagosFoodSample,
  kanoFashionSample,
];
