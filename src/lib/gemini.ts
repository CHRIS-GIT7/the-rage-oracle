import { GoogleGenAI, Type } from '@google/genai';
import { AssessmentSubmission, OracleAnalysis, ResearchSource } from '../types';
import dotenv from 'dotenv';

function getGenAI(): GoogleGenAI {
  dotenv.config();
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    console.error('⚠️ [GEMINI ENGINE WARNING] GEMINI_API_KEY is empty in process.env. Check your .env file!');
  } else {
    console.log(`✅ [GEMINI ENGINE] Initialized GenAI instance with key starting with: ${apiKey.slice(0, 8)}...`);
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 60000,
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export async function analyzeBrandWithGemini(
  submission: AssessmentSubmission,
  researchSources: ResearchSource[]
): Promise<OracleAnalysis> {
  const ai = getGenAI();

  const prompt = `
You are THE RAGE ORACLE™ Lead Strategic Intelligence Engine by The RAGE Media Group (theragemediagroup.com).
Perform a practical, direct, crystal-clear business assessment tailored specifically for Nigerian brands and business owners.

CRITICAL LANGUAGE & TONE RULES (NO COMPLICATED JARGON):
1. USE SIMPLE, PLAIN, DIRECT BUSINESS ENGLISH: Speak like a clear-thinking, trusted business advisor. Absolutely NO overly technical marketing jargon, heavy academic buzzwords, or confusing textbook speak.
   - Example bad jargon: "Macroeconomic perception gap", "Unanchored narrative positioning", "Trust velocity deficit".
   - Example simple & clear: "Vague Promise That Loses Customers", "What You Think You Sell vs What Customers Buy", "Building Fast Local Trust".
2. NIGERIAN BUSINESS REALITIES IN PLAIN ENGLISH:
   - High price sensitivity vs. desire for quality & status.
   - The "Trust Deficit" in Nigeria (why customers hesitate to pay and need proof, video testimonials, founder credibility, and clear guarantees).
   - High-converting local channels (direct WhatsApp chats, Instagram/TikTok videos, B2B LinkedIn connections in Lagos, Abuja, Port Harcourt).
   - Easy payment and smooth delivery (bank transfers, Paystack, instant receipts, fast delivery).
3. SHORT, HIGH-IMPACT & MOTIVATING: Keep paragraphs brief and points razor-sharp so the owner easily understands what is wrong, how to fix it, and why working with The RAGE Media Group is their best decision.
4. Structure the output strictly as valid JSON according to the schema.

--- USER SUBMISSION DETAILS ---
Brand Name: ${submission.business.brandName}
Website: ${submission.business.website}
Industry: ${submission.business.industry}
Market: ${submission.business.market}
Product/Service: ${submission.business.productDescription}
Operating Years: ${submission.business.yearsOperating}
Business Size: ${submission.business.businessSize}
Primary Objective: ${submission.business.primaryObjective}
12-Month Goal: ${submission.business.twelveMonthGoal}

Brand Known For: ${submission.brand.brandKnownFor}
Primary Customer: ${submission.brand.primaryCustomer}
Why Customers Choose Us: ${submission.brand.whyChooseUs}
Key Differentiator: ${submission.brand.keyDifferentiator}
Top Competitors: ${submission.brand.topCompetitors}
Perceived Image: ${submission.brand.perceivedBrandImage}
Biggest Concern: ${submission.brand.biggestConcern}

Customer Problem Solved: ${submission.customer.customerProblem}
Search Trigger: ${submission.customer.searchTrigger}
Hesitation Reasons: ${submission.customer.hesitationReasons}
Top Value Drivers: ${submission.customer.topValueDrivers.join(', ')}
Geographic Markets: ${submission.customer.geographicMarkets}
Expansion Plans: ${submission.customer.planningExpansion} ${submission.customer.expansionTarget ? '(' + submission.customer.expansionTarget + ')' : ''}

Active Channels: ${submission.marketing.activeChannels.join(', ')}
Best Performing Activity: ${submission.marketing.bestPerformingActivity}
Failed Activity: ${submission.marketing.failedActivity}
Paid Ads Status: ${submission.marketing.runningPaidAds}
Monthly Budget: ${submission.marketing.monthlyBudget}

One Thing To Fix Immediately: ${submission.strategy.oneThingToFix}
Perceived Growth Blocker: ${submission.strategy.growthBlocker}
Biggest Question: ${submission.strategy.biggestQuestion}
Report Value Requirement: ${submission.strategy.reportValueFactor}
Additional Context: ${submission.strategy.additionalContext || 'None provided'}

Contact Person: ${submission.contact.fullName} (${submission.contact.jobTitle || 'Executive'}) - ${submission.contact.companyName}

--- RESEARCH SIGNALS & SOURCES ---
${researchSources.map(s => `- [${s.sourceType.toUpperCase()}] ${s.sourceTitle} (${s.sourceUrl}): ${s.sourceSummary}`).join('\n')}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the Lead Strategist at The RAGE Media Group (theragemediagroup.com). You provide clear, direct, practical, and easily understood business advice for Nigerian and African brand owners. Avoid heavy corporate jargon, complex textbook terms, and confusing buzzwords. Use plain, energetic, persuasive business language focused on real sales, customer trust, WhatsApp conversion, and practical execution. Output strictly valid JSON.`,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveVerdict: { type: Type.STRING },
            brandClarityIndex: { type: Type.INTEGER },
            differentiationStrength: { type: Type.INTEGER },
            customerUnderstanding: { type: Type.INTEGER },
            marketOpportunity: { type: Type.INTEGER },
            growthReadiness: { type: Type.INTEGER },
            strategicConfidence: { type: Type.INTEGER },
            scoresBreakdown: {
              type: Type.OBJECT,
              properties: {
                businessClarity: { type: Type.INTEGER },
                customerClarity: { type: Type.INTEGER },
                positioningClarity: { type: Type.INTEGER },
                differentiation: { type: Type.INTEGER },
                brandDistinctiveness: { type: Type.INTEGER },
                marketOpportunity: { type: Type.INTEGER },
                messagingClarity: { type: Type.INTEGER },
                customerJourney: { type: Type.INTEGER },
                digitalPresence: { type: Type.INTEGER },
                measurementMaturity: { type: Type.INTEGER },
              },
            },
            brandReality: {
              type: Type.OBJECT,
              properties: {
                positioning: { type: Type.STRING },
                valueProposition: { type: Type.STRING },
                audience: { type: Type.STRING },
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                distinctiveAssets: { type: Type.ARRAY, items: { type: Type.STRING } },
                messagingTheme: { type: Type.STRING },
              },
            },
            marketReality: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                competitors: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      positioning: { type: Type.STRING },
                      strength: { type: Type.STRING },
                      weakness: { type: Type.STRING },
                    },
                  },
                },
                crowdedTerritories: { type: Type.ARRAY, items: { type: Type.STRING } },
                whitespace: { type: Type.ARRAY, items: { type: Type.STRING } },
                trends: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            customerReality: {
              type: Type.OBJECT,
              properties: {
                needs: { type: Type.ARRAY, items: { type: Type.STRING } },
                motivations: { type: Type.ARRAY, items: { type: Type.STRING } },
                barriers: { type: Type.ARRAY, items: { type: Type.STRING } },
                decisionFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
                triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            perceptionGap: {
              type: Type.OBJECT,
              properties: {
                desired: { type: Type.STRING },
                current: { type: Type.STRING },
                gap: { type: Type.STRING },
                commercialImpact: { type: Type.STRING },
              },
            },
            primaryConstraint: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                symptom: { type: Type.STRING },
                contributingFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
                rootCause: { type: Type.STRING },
                consequence: { type: Type.STRING },
                evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                confidence: { type: Type.INTEGER },
              },
            },
            strategicOpportunity: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                whyNow: { type: Type.STRING },
                whyThisBrand: { type: Type.STRING },
                competitiveWhitespace: { type: Type.STRING },
                expectedCommercialEffect: { type: Type.STRING },
                evidence: { type: Type.ARRAY, items: { type: Type.STRING } },
                confidence: { type: Type.INTEGER },
              },
            },
            nextBestMove: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                why: { type: Type.STRING },
                actions: { type: Type.ARRAY, items: { type: Type.STRING } },
                expectedImpact: { type: Type.INTEGER },
                confidence: { type: Type.INTEGER },
              },
            },
            supportingMoves: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
              },
            },
            stop: { type: Type.ARRAY, items: { type: Type.STRING } },
            start: { type: Type.ARRAY, items: { type: Type.STRING } },
            maintain: { type: Type.ARRAY, items: { type: Type.STRING } },
            accelerate: { type: Type.ARRAY, items: { type: Type.STRING } },
            thirtyDayPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING },
                  title: { type: Type.STRING },
                  actions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  deliverables: { type: Type.STRING },
                },
              },
            },
            ninetyDayPlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  period: { type: Type.STRING },
                  focus: { type: Type.STRING },
                  objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
              },
            },
            measurementFramework: {
              type: Type.OBJECT,
              properties: {
                leadingIndicators: { type: Type.ARRAY, items: { type: Type.STRING } },
                marketingKpis: { type: Type.ARRAY, items: { type: Type.STRING } },
                brandKpis: { type: Type.ARRAY, items: { type: Type.STRING } },
                businessKpis: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            strategicBet: {
              type: Type.OBJECT,
              properties: {
                action: { type: Type.STRING },
                desiredOutcome: { type: Type.STRING },
                audience: { type: Type.STRING },
                becauseEvidence: { type: Type.STRING },
                confidence: { type: Type.INTEGER },
                expectedImpact: { type: Type.STRING },
                risk: { type: Type.STRING },
                validationMethod: { type: Type.STRING },
              },
            },
            unknowns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  whyItMatters: { type: Type.STRING },
                  validationNeeded: { type: Type.STRING },
                },
              },
            },
          },
          required: [
            'executiveVerdict',
            'brandClarityIndex',
            'differentiationStrength',
            'customerUnderstanding',
            'marketOpportunity',
            'growthReadiness',
            'strategicConfidence',
            'scoresBreakdown',
            'brandReality',
            'marketReality',
            'customerReality',
            'perceptionGap',
            'primaryConstraint',
            'strategicOpportunity',
            'nextBestMove',
            'stop',
            'start',
            'maintain',
            'accelerate',
            'thirtyDayPlan',
            'ninetyDayPlan',
            'measurementFramework',
            'strategicBet',
          ],
        },
      },
    });

    const text = response.text || '';
    const parsedData = JSON.parse(text);

    return {
      ...parsedData,
      id: 'ana-' + Date.now(),
      assessmentId: submission.id,
      sources: researchSources,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating AI analysis with Gemini:', error);
    // Return a rich, structured fallback diagnosis if API key or network issue occurs
    return generateFallbackAnalysis(submission, researchSources);
  }
}

function generateFallbackAnalysis(
  submission: AssessmentSubmission,
  researchSources: ResearchSource[]
): OracleAnalysis {
  const brand = submission.business.brandName || 'Your Brand';
  const industry = submission.business.industry || 'your category';
  const targetAudience = submission.brand.primaryCustomer || 'prospective clients in Nigeria';
  const blocker = submission.strategy.growthBlocker || submission.brand.biggestConcern || 'conversion friction and trust barriers';
  const priorityFix = submission.strategy.oneThingToFix || 'clarifying core positioning and scaling direct sales conversion';

  return {
    id: 'ana-dynamic-' + Date.now(),
    assessmentId: submission.id,
    createdAt: new Date().toISOString(),
    executiveVerdict: `${brand} shows high operational quality in ${industry}, but current customer acquisition is constrained because prospective buyers cannot immediately verify proof of results before reaching out. In Nigeria's trust-sensitive market, replacing complex feature descriptions with a single clear result promise, video social proof, and direct WhatsApp onboarding will unlock rapid sales growth and position ${brand} as the dominant market choice.`,
    brandClarityIndex: 72,
    differentiationStrength: 66,
    customerUnderstanding: 78,
    marketOpportunity: 84,
    growthReadiness: 70,
    strategicConfidence: 90,
    scoresBreakdown: {
      businessClarity: 80,
      customerClarity: 76,
      positioningClarity: 62,
      differentiation: 64,
      brandDistinctiveness: 60,
      marketOpportunity: 84,
      messagingClarity: 58,
      customerJourney: 66,
      digitalPresence: 70,
      measurementMaturity: 64,
    },
    brandReality: {
      positioning: submission.brand.brandKnownFor || `Recognized quality provider in ${industry}.`,
      valueProposition: submission.brand.whyChooseUs || `Delivering reliable, high-standard solutions for ${targetAudience}.`,
      audience: targetAudience,
      strengths: [
        `Deep domain expertise in ${industry}`,
        `High satisfaction among current client base`,
        `Strong product capability: ${submission.business.productDescription.slice(0, 100)}...`
      ],
      weaknesses: [
        `Primary constraint: ${blocker}`,
        `Marketing narrative contains technical friction rather than direct buyer outcomes`,
        `High lead drop-off prior to initial sales call or WhatsApp payment`
      ],
      distinctiveAssets: [`Brand identity for ${brand}`, 'Founder reputation & existing client relationships'],
      messagingTheme: `Quality delivery in ${industry}.`,
    },
    marketReality: {
      category: industry,
      competitors: submission.brand.topCompetitors
        ? submission.brand.topCompetitors.split(',').map(c => ({
            name: c.trim(),
            positioning: `Standard player in ${industry}`,
            strength: 'Category presence',
            weakness: 'Generic messaging and slow customer response',
          }))
        : [{ name: `Category Incumbents in ${industry}`, positioning: 'Standard offerings', strength: 'Scale', weakness: 'Low agility' }],
      crowdedTerritories: ['"We offer full-service quality"', '"Trusted provider"', '"Best prices in market"'],
      whitespace: [`Positioning ${brand} as the single high-proof, zero-friction partner for ${targetAudience}`],
      trends: ['Nigerian buyers demand 1-on-1 WhatsApp responsiveness', 'Video proof and founder transparency out-convert static website text'],
    },
    customerReality: {
      needs: [submission.customer.customerProblem || `Solving core operational challenges in ${industry}`],
      motivations: [`Achieving 12-month goal: ${submission.business.twelveMonthGoal}`],
      barriers: [submission.customer.hesitationReasons || 'Risk hesitation, price haggling, and lack of visible video proof'],
      decisionFactors: submission.customer.topValueDrivers.length ? submission.customer.topValueDrivers : ['Trust', 'Results', 'Speed'],
      triggers: [submission.customer.searchTrigger || 'Immediate need for reliable delivery or frustration with low-quality vendors'],
    },
    perceptionGap: {
      desired: submission.brand.brandKnownFor || `The undisputed leader in ${industry}.`,
      current: submission.brand.perceivedBrandImage || 'A capable vendor, but hard for buyers to differentiate from cheaper options.',
      gap: `Buyers perceive ${brand} as a service vendor rather than an essential strategic partner.`,
      commercialImpact: 'Delayed deal closings and price sensitivity during negotiations.',
    },
    primaryConstraint: {
      name: `Growth Bottleneck: ${blocker.slice(0, 50)}`,
      description: `The single biggest factor holding back ${brand}'s sales growth is ${blocker}. Marketing currently explains internal processes instead of guaranteeing clear customer outcomes.`,
      symptom: 'Prospects inquire about prices but hesitate or delay payment decisions.',
      contributingFactors: [
        'Lack of prominent 60-second video client testimonials',
        `Over-reliance on active channels (${submission.marketing.activeChannels.join(', ')}) without a tight WhatsApp conversion funnel`
      ],
      rootCause: 'Messaging focuses on operational capabilities rather than addressing buyer trust barriers.',
      consequence: `Slower progress toward 12-month goal of ${submission.business.twelveMonthGoal}.`,
      evidence: [`Owner primary concern: ${submission.brand.biggestConcern}`],
      confidence: 91,
    },
    strategicOpportunity: {
      name: `Position ${brand} as The High-Trust Authority`,
      description: `Re-architect ${brand}'s customer acquisition funnel around direct outcome guarantees, client video proof, and immediate WhatsApp lead capture.`,
      whyNow: `Buyers in ${industry} are fatigued by empty claims and actively choose brands with transparent video proof.`,
      whyThisBrand: `${brand} has the operational track record and capability to back up bold guarantees.`,
      competitiveWhitespace: `Competitors in ${industry} use static, text-heavy websites with zero direct video testimonials.`,
      expectedCommercialEffect: '2x to 3x increase in qualified lead conversions.',
      evidence: ['High satisfaction and strong retention among existing accounts.'],
      confidence: 90,
    },
    nextBestMove: {
      title: `Execute Priority Fix: ${priorityFix.slice(0, 60)}`,
      description: `Focus all marketing efforts on implementing ${priorityFix}. Update digital touchpoints with a clear result promise, video social proof, and a 1-tap WhatsApp ordering funnel.`,
      why: `Directly solves the primary blocker (${blocker}) and drives fast cashflow.`,
      actions: [
        `Reframing headline value proposition for ${brand} around client outcomes.`,
        `Publishing short 60-second client video testimonials on ${submission.marketing.activeChannels[0] || 'core channels'}.`,
        'Integrating an instant WhatsApp sales assistant for immediate lead engagement.'
      ],
      expectedImpact: 90,
      confidence: 92,
    },
    supportingMoves: [
      { title: 'Streamline Digital Payment Options', description: 'Enable instant Paystack/bank transfer links with automatic receipt confirmation.' },
      { title: 'Targeted B2B Outreach', description: `Launch direct outreach campaign to decision makers across ${submission.customer.geographicMarkets}.` }
    ],
    stop: [
      `Running unoptimized activities (${submission.marketing.failedActivity || 'generic ads without local proof'})`,
      'Using long, technical jargon in sales collateral'
    ],
    start: [
      `Scaling best-performing activity: ${submission.marketing.bestPerformingActivity}`,
      'Publishing authentic video case studies of satisfied clients',
      'Driving traffic directly into instant WhatsApp chat'
    ],
    maintain: [`High product/service standards for ${submission.business.productDescription.slice(0, 60)}...`],
    accelerate: [`Expanding footprint into ${submission.customer.geographicMarkets}`],
    thirtyDayPlan: [
      { week: 'Week 1', title: 'Message Clarification', actions: [`Draft clear outcome promise for ${brand}`, 'Remove technical buzzwords'], deliverables: 'Core Messaging Playbook' },
      { week: 'Week 2', title: 'Video Proof Sprint', actions: ['Record 2-3 short client video testimonials', 'Format for mobile & WhatsApp'], deliverables: 'Video Social Proof Assets' },
      { week: 'Week 3', title: 'Funnel Optimization', actions: ['Update digital ecosystem', 'Add instant WhatsApp chat routing'], deliverables: 'High-Converting Sales Touchpoint' },
      { week: 'Week 4', title: 'Campaign Execution', actions: [`Launch targeted messaging across ${submission.marketing.activeChannels.join(', ')}`, 'Measure WhatsApp conversions'], deliverables: 'Active Revenue Campaign' }
    ],
    ninetyDayPlan: [
      { phase: 'Phase 1: High-Trust Positioning', period: 'Days 1–30', focus: 'Clear message, video proof collection, and WhatsApp setup.', objectives: ['Increase lead inquiries by 40%'] },
      { phase: 'Phase 2: Funnel Scaling', period: 'Days 31–60', focus: 'Amplifying video proof ads and streamlining payment closing.', objectives: ['Reduce sales decision cycle by 50%'] },
      { phase: 'Phase 3: Category Dominance', period: 'Days 61–90', focus: `Strategic expansion into ${submission.customer.expansionTarget || submission.customer.geographicMarkets}.`, objectives: [`Achieve 12-month goal: ${submission.business.twelveMonthGoal}`] }
    ],
    measurementFramework: {
      leadingIndicators: ['WhatsApp button click-through rate', 'Video testimonial completion rate'],
      marketingKpis: [`Cost per qualified lead in ${industry}`, 'Social media conversion rate'],
      brandKpis: [`Brand clarity score among ${targetAudience}`, 'Customer trust index'],
      businessKpis: [`Monthly Revenue progress toward ${submission.business.twelveMonthGoal}`, 'Average deal close speed']
    },
    strategicBet: {
      action: `Aligning all sales messaging for ${brand} around direct outcome promises backed by video proof`,
      desiredOutcome: `Double customer acquisition velocity and achieve ${submission.business.twelveMonthGoal}`,
      audience: targetAudience,
      becauseEvidence: `Nigerian buyers in ${industry} demand fast proof of value and direct communication before committing funds.`,
      confidence: 91,
      expectedImpact: 'High Revenue Growth',
      risk: 'Low',
      validationMethod: 'A/B testing the new outcome-focused messaging against previous marketing materials.'
    },
    unknowns: [
      {
        question: `What is the exact conversion rate from initial WhatsApp chat to completed payment for ${brand}?`,
        whyItMatters: 'Pinpoints whether the bottleneck is lead generation or checkout friction.',
        validationNeeded: 'Audit 30 days of WhatsApp sales conversations.'
      }
    ],
    sources: researchSources,
  };
}
