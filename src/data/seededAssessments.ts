import { AssessmentSubmission } from '../types';

export const SEEDED_ASSESSMENTS: AssessmentSubmission[] = [
  {
    id: "ora-seed-001",
    createdAt: "2026-08-10T14:32:00Z",
    status: "completed",
    emailStatus: "sent",
    emailSentAt: "2026-08-10T14:35:00Z",
    business: {
      brandName: "Apex Fintech Solutions",
      website: "https://apexfintech-demo.com",
      industry: "Financial Technology & Wealthtech",
      market: "North America & Europe",
      productDescription: "AI-driven automated portfolio rebalancing and algorithmic risk mitigation for mid-sized wealth managers.",
      yearsOperating: "4–7 years",
      businessSize: "11–50",
      primaryObjective: "Acquire more customers",
      twelveMonthGoal: "Grow ARR from $3.2M to $7.5M while reducing sales cycle length from 90 days to 45 days."
    },
    brand: {
      brandKnownFor: "The most precise and compliant automated risk engine for wealth advisors.",
      primaryCustomer: "Independent RIA firm founders and chief investment officers managing $100M–$1B AUM.",
      whyChooseUs: "Unrivaled institutional-grade risk algorithms paired with 10-minute automated onboarding.",
      keyDifferentiator: "Proprietary real-time stress testing engine built specifically for volatile crypto/traditional asset mixes.",
      topCompetitors: "AdvisorEngine, Orion Advisor Tech, InvestCloud",
      perceivedBrandImage: "Technically powerful but somewhat complex and enterprise-focused.",
      biggestConcern: "Prospects mistake us for a high-cost legacy enterprise system or generic robo-advisor."
    },
    customer: {
      customerProblem: "Advisors spend 18+ hours weekly manually rebalancing complex multi-asset client portfolios.",
      searchTrigger: "Market volatility spikes or compliance audits revealing portfolio drift errors.",
      hesitationReasons: "Data security anxiety, fear of client disruption, and perceived migration pain.",
      topValueDrivers: ["Trust", "Speed", "Quality", "Results", "Expertise"],
      geographicMarkets: "United States, United Kingdom",
      planningExpansion: "Yes",
      expansionTarget: "European Union (DACH Region)"
    },
    marketing: {
      activeChannels: ["LinkedIn", "Google Ads", "Email", "Events", "SEO"],
      bestPerformingActivity: "Exclusive invite-only dinner roundtables for RIA Managing Partners.",
      failedActivity: "Generic Meta/Facebook retargeting ads.",
      runningPaidAds: "Yes",
      monthlyBudget: "₦5m–₦10m"
    },
    strategy: {
      oneThingToFix: "Our core messaging—it sounds like a software spec sheet rather than a high-trust growth partner.",
      growthBlocker: "Long friction-heavy sales demos and unclear ROI positioning on our marketing landing pages.",
      biggestQuestion: "How do we position ourselves as the indispensable 'gold standard' for wealth managers without pricing out boutique firms?",
      reportValueFactor: "A crisp, unbiased positioning diagnosis and a clear 90-day roadmap we can implement immediately.",
      additionalContext: "We recently raised $8M Series A and need to scale sales velocity aggressively."
    },
    contact: {
      fullName: "Marcus Vance",
      jobTitle: "Chief Executive Officer & Founder",
      email: "marcus.vance@apexfintech-demo.com",
      companyName: "Apex Fintech Solutions",
      phone: "+1 (555) 382-9011",
      allowFollowUp: true
    },
    sources: [
      {
        id: "src-1",
        assessmentId: "ora-seed-001",
        sourceUrl: "https://apexfintech-demo.com",
        sourceTitle: "Apex Fintech Solutions Homepage & Platform Overview",
        sourceType: "website",
        sourceSummary: "Promotes 'Algorithmic Portfolio Intelligence'. Heavy feature lists with technical jargon. Trust badges present.",
        relevance: "Primary brand positioning baseline.",
        createdAt: "2026-08-10T14:32:10Z"
      },
      {
        id: "src-2",
        assessmentId: "ora-seed-001",
        sourceUrl: "https://orion.com/wealthtech-benchmarks-2026",
        sourceTitle: "2026 WealthTech Advisor Tech Stack Report",
        sourceType: "category_data",
        sourceSummary: "73% of RIAs report portfolio drift management as their #1 operational headache.",
        relevance: "Category growth driver validation.",
        createdAt: "2026-08-10T14:32:15Z"
      }
    ],
    analysis: {
      id: "ana-seed-001",
      assessmentId: "ora-seed-001",
      createdAt: "2026-08-10T14:33:00Z",
      executiveVerdict: "Apex Fintech possesses institutional-grade technology, but its marketing suffers from a 'Specification Syndrome'—communicating features rather than advisor peace of mind. The primary constraint is not product quality or market demand, but conversion velocity caused by low narrative differentiation against legacy giants.",
      brandClarityIndex: 68,
      differentiationStrength: 62,
      customerUnderstanding: 78,
      marketOpportunity: 84,
      growthReadiness: 71,
      strategicConfidence: 89,
      scoresBreakdown: {
        businessClarity: 85,
        customerClarity: 80,
        positioningClarity: 55,
        differentiation: 60,
        brandDistinctiveness: 50,
        marketOpportunity: 85,
        messagingClarity: 50,
        customerJourney: 65,
        digitalPresence: 70,
        measurementMaturity: 75
      },
      brandReality: {
        positioning: "Feature-dense algorithmic portfolio rebalancer.",
        valueProposition: "Institutional-grade portfolio drift algorithms for wealth managers.",
        audience: "Independent RIAs ($100M–$1B AUM).",
        strengths: ["Superior algorithm accuracy", "10-minute advisor onboarding", "High customer retention (NPS 72)"],
        weaknesses: ["Technical feature-heavy website messaging", "Unclear pricing model preview", "Lack of customer ROI calculators"],
        distinctiveAssets: ["Apex Risk Index dial", "Onyx & Cobalt visual aesthetic"],
        messagingTheme: "Compliance and algorithmic precision."
      },
      marketReality: {
        category: "B2B SaaS WealthTech / Portfolio Management Systems",
        competitors: [
          { name: "Orion Advisor Tech", positioning: "All-in-one legacy wealth platform", strength: "Massive market share", weakness: "Bloated software, high complexity" },
          { name: "AdvisorEngine", positioning: "CRM + Robo-advisor suite", strength: "Strong brand awareness", weakness: "Slow innovation cycle" },
          { name: "InvestCloud", positioning: "Custom cloud enterprise suite", strength: "Enterprise contracts", weakness: "Prohibitively expensive for mid-market" }
        ],
        crowdedTerritories: ["All-in-one advisor platform", "Seamless integrations", "Next-gen tech"],
        whitespace: ["The 10-Minute Risk-Proof Rebalancer built exclusively for volatile markets."],
        trends: ["Multi-asset class demand (Crypto + Equities)", "RIA firm consolidation", "Advisor time-scarcity"]
      },
      customerReality: {
        needs: ["Eliminate portfolio drift risk", "Reclaim 15+ weekly hours spent on manual rebalancing", "Scale AUM without adding headcount"],
        motivations: ["Fear of regulatory compliance fines", "Desire to spend more time client-facing to grow fees"],
        barriers: ["Perceived migration headaches", "Fear of automated algorithm miscalculation"],
        decisionFactors: ["Security accreditation (SOC 2)", "Ease of migration from Orion/eMoney", "Clear ROI"],
        triggers: ["Volatile market swings causing widespread drift", "Audit warning", "Key staff turnover"]
      },
      perceptionGap: {
        desired: "The essential, high-trust risk shield that liberates advisors to scale.",
        current: "A complex, developer-built software tool with an intimidating learning curve.",
        gap: "Marketing focuses on code & algorithms instead of advisor time savings, safety, and business growth.",
        commercialImpact: "Slower sales cycles (90 days) and 40% drop-off at landing page demo request stage."
      },
      primaryConstraint: {
        name: "Conversion Friction via Feature-Centric Messaging",
        description: "Prospects struggle to quickly grasp the transformative business outcome, treating Apex as an expensive feature upgrade rather than a core strategic engine.",
        symptom: "High website traffic from LinkedIn and ads, but low demo request conversion (1.2%).",
        contributingFactors: ["Homepage headline reads like an engineering specification", "No interactive sandbox or ROI calculator", "Demo request form asks for 11 fields"],
        rootCause: "Founder-led technical messaging was never translated into commercial benefit messaging.",
        consequence: "Continued customer acquisition cost (CAC) bloat and reliance on expensive manual executive dinners.",
        evidence: ["1.2% landing page conversion rate", "90-day average deal close time", "User survey quotes: 'Looks powerful, but seems complex to implement.'"],
        confidence: 92
      },
      strategicOpportunity: {
        name: "Position as 'The Autonomous Rebalancer for Modern RIAs'",
        description: "Reposition Apex around guaranteed time-freedom and zero-drift compliance, creating a distinct mid-market category between bloated legacy suites and basic tools.",
        whyNow: "2026 market volatility and RIA consolidation have made manual rebalancing unsustainable.",
        whyThisBrand: "Apex already possesses the fastest 10-minute onboarding engine in the market.",
        competitiveWhitespace: "None of the legacy giants guarantee a 10-minute setup with zero drift risk.",
        expectedCommercialEffect: "3x increase in demo conversion rate and reduction of sales cycle to 45 days.",
        evidence: ["Roundtable attendees converted at 60% once they experienced the 10-minute demo."],
        confidence: 90
      },
      nextBestMove: {
        title: "Launch 'The 10-Minute Advisor Guarantee' Rebrand & Funnel Overhaul",
        description: "Replace specification-heavy messaging across website and ad channels with a bold, friction-free '10-Minute Zero-Drift Guarantee' interactive demo experience.",
        why: "Directly solves the primary constraint by transforming perceived complexity into effortless speed and trust.",
        actions: [
          "Rewrite homepage copy to focus on 'Reclaim 18 Hours Every Week & Protect Every Portfolio'.",
          "Simplify demo form from 11 fields to 3 fields (Name, Email, AUM Range).",
          "Embed a 60-second interactive click-through product preview on the main landing page.",
          "Launch an automated ROI & Time-Saved Calculator on the website."
        ],
        expectedImpact: 85,
        confidence: 91
      },
      supportingMoves: [
        { title: "Develop 'Migration-in-a-Box' Guarantee", description: "Offer zero-downtime automated data migration from Orion or InvestCloud within 48 hours." },
        { title: "Repurpose Executive Dinner Content into Account-Based LinkedIn Campaigns", description: "Turn high-converting dinner insights into targeted video teardowns for top 500 RIA prospects." },
        { title: "Build Strategic Integration Co-Marketing", description: "Partner with top RIA CRM platforms for featured marketplace placement." }
      ],
      stop: ["Running generic retargeting ads that display static software screenshots", "Requiring 11 form fields before giving prospects a look inside the platform"],
      start: ["Promoting 'The 10-Minute Zero-Drift Guarantee'", "Publishing weekly 2-minute video portfolio teardowns on LinkedIn"],
      maintain: ["Exclusive executive dinner roundtables (top performing offline channel)"],
      accelerate: ["LinkedIn account-based marketing targeted at Managing Partners at RIAs with $100M+ AUM"],
      thirtyDayPlan: [
        { week: "Week 1", title: "Messaging Architecture & Messaging Overhaul", actions: ["Finalize '10-Minute Guarantee' narrative matrix", "Audit sales deck for jargon removal"], deliverables: "Brand Messaging Playbook v1.0" },
        { week: "Week 2", title: "Landing Page & Funnel Redesign", actions: ["Deploy simplified 3-field demo capture", "Build embedded 60-second product sandbox"], deliverables: "Updated ApexFintech.com Homepage" },
        { week: "Week 3", title: "Sales Enablement & Migration Guarantee", actions: ["Train sales team on 'Outcome-First' demo script", "Launch 48-Hour Migration Guarantee PDF"], deliverables: "Sales Deck & Guarantee One-Pager" },
        { week: "Week 4", title: "Campaign Launch & Optimization", actions: ["Relaunch LinkedIn campaigns with ROI focus", "Set up real-time funnel dropoff tracking"], deliverables: "Campaign Dashboard & Initial Lead Metrics" }
      ],
      ninetyDayPlan: [
        { phase: "Foundation", period: "Days 1–30", focus: "Narrative realignment, funnel simplification, and migration guarantee launch.", objectives: ["Deploy new homepage messaging", "Achieve >3.5% landing page conversion rate"] },
        { phase: "Activation", period: "Days 31–60", focus: "Account-based campaign scale and partner co-marketing expansion.", objectives: ["Launch ABM campaign targeting 500 tier-1 RIAs", "Book 35 qualified sales demos"] },
        { phase: "Optimization", period: "Days 61–90", focus: "Sales cycle acceleration and European expansion groundwork.", objectives: ["Reduce average sales cycle from 90 to 48 days", "Close $1.2M in new ARR"] }
      ],
      measurementFramework: {
        leadingIndicators: ["Website demo request conversion rate (>3.5%)", "Interactive ROI calculator usage rate", "LinkedIn video watch time"],
        marketingKpis: ["Cost per Qualified Sales Demo (Target: <$450)", "ABM engagement rate (>28%)", "Email response rate from RIA partners"],
        brandKpis: ["Unprompted brand recall among $100M+ RIAs", "Perceived ease of migration score"],
        businessKpis: ["New Annual Recurring Revenue (ARR)", "Average sales cycle duration (Target: 45 days)", "Customer Acquisition Cost (CAC) payback period"]
      },
      strategicBet: {
        action: "Focusing 100% of top-of-funnel marketing on 'The 10-Minute Zero-Drift Guarantee'",
        desiredOutcome: "3x increase in qualified sales demos and a 50% drop in sales cycle length",
        audience: "Independent RIA Managing Partners ($100M–$1B AUM)",
        becauseEvidence: "Executive roundtable data proved that once advisors realize onboarding takes 10 minutes rather than 3 months, 60% convert immediately.",
        confidence: 90,
        expectedImpact: "High (+$2.5M ARR lift in 12 months)",
        risk: "Low (Existing tech already supports 10-minute setup).",
        validationMethod: "A/B testing the new homepage against legacy control for 30 days."
      },
      unknowns: [
        { question: "What is the exact churn rate of competitors' clients due to slow support?", whyItMatters: "Helps refine the migration campaign attack angle.", validationNeeded: "Conduct 15 win/loss interviews with recent migration clients." },
        { question: "How will DACH region compliance rules impact the 10-minute onboarding promise?", whyItMatters: "Crucial for Q3 European expansion success.", validationNeeded: "Engage DACH regulatory legal consultant." }
      ],
      sources: [
        {
          id: "src-1",
          assessmentId: "ora-seed-001",
          sourceUrl: "https://apexfintech-demo.com",
          sourceTitle: "Apex Fintech Solutions Homepage & Platform Audit",
          sourceType: "website",
          sourceSummary: "High messaging density around technical architecture. Lacks immediate proof of onboarding speed.",
          relevance: "Direct evidence for messaging & positioning analysis.",
          createdAt: "2026-08-10T14:32:10Z"
        },
        {
          id: "src-2",
          assessmentId: "ora-seed-001",
          sourceUrl: "https://orion.com/wealthtech-benchmarks-2026",
          sourceTitle: "2026 WealthTech Advisor Tech Stack Report",
          sourceType: "category_data",
          sourceSummary: "73% of RIAs report portfolio drift management as their #1 operational headache.",
          relevance: "Category growth driver validation.",
          createdAt: "2026-08-10T14:32:15Z"
        }
      ]
    }
  },
  {
    id: "ora-seed-002",
    createdAt: "2026-08-11T09:15:00Z",
    status: "completed",
    emailStatus: "sent",
    emailSentAt: "2026-08-11T09:18:00Z",
    business: {
      brandName: "Luminary Organic Skincare",
      website: "https://luminaryskin-demo.com",
      industry: "Consumer Packaged Goods / Beauty & Wellness",
      market: "United States, Canada",
      productDescription: "Dermatologist-formulated organic botanical skincare targeting hyperpigmentation and sensitive skin barriers.",
      yearsOperating: "1–3 years",
      businessSize: "2–10",
      primaryObjective: "Improve conversion",
      twelveMonthGoal: "Reach ₦150M ($1.8M equivalent) annual revenue with a 3.5% DTC store conversion rate and 45% repeat purchase rate."
    },
    brand: {
      brandKnownFor: "Clean, clinical-grade organic serums that clear stubborn hyperpigmentation without irritation.",
      primaryCustomer: "Women aged 28–45 with sensitive, melanin-rich skin seeking gentle effective skincare.",
      whyChooseUs: "100% organic bioactive cold-pressed botanical oils formulated by board-certified dermatologists.",
      keyDifferentiator: "Zero synthetics paired with published clinical trial efficacy results for dark spot reduction.",
      topCompetitors: "Drunk Elephant, Sunday Riley, Biossance",
      perceivedBrandImage: "Beautiful boutique brand, but looks like another clean beauty indie label.",
      biggestConcern: "Drowning in a sea of generic 'clean beauty' brands and relying too heavily on paid TikTok ads."
    },
    customer: {
      customerProblem: "Harsh chemical treatments destroy sensitive skin barriers, while standard organic products lack visible results.",
      searchTrigger: "Post-acne dark spots or eczema flare-ups before major life events.",
      hesitationReasons: "Skepticism about organic product effectiveness, price point ($68/serum), and fear of skin breakouts.",
      topValueDrivers: ["Quality", "Trust", "Results", "Reputation", "Status/prestige"],
      geographicMarkets: "US, Canada, UK",
      planningExpansion: "Unsure"
    },
    marketing: {
      activeChannels: ["Instagram", "TikTok", "Meta Ads", "Email", "Influencer marketing"],
      bestPerformingActivity: "Micro-influencer before-and-after skin transformation video reels.",
      failedActivity: "Google Search Ads on broad keywords like 'organic serum'.",
      runningPaidAds: "Yes",
      monthlyBudget: "₦1m–₦5m"
    },
    strategy: {
      oneThingToFix: "Our website product detail page—it looks pretty but fails to overcome buying skepticism.",
      growthBlocker: "Rising Meta Ad CAC and low first-time buyer conversion rate (1.1%).",
      biggestQuestion: "How do we shift from being seen as a luxury oil brand to the 'Must-Have Clinical Solution' for hyperpigmentation?",
      reportValueFactor: "Actionable conversion optimization tactics and a customer retention playbook.",
      additionalContext: "We have over 400 5-star customer reviews, but they are buried on a separate page."
    },
    contact: {
      fullName: "Dr. Elena Rostova",
      jobTitle: "Founder & Lead Formulator",
      email: "elena@luminaryskin-demo.com",
      companyName: "Luminary Organic Skincare",
      phone: "+1 (555) 749-2201",
      allowFollowUp: true
    },
    sources: [
      {
        id: "src-201",
        assessmentId: "ora-seed-002",
        sourceUrl: "https://luminaryskin-demo.com",
        sourceTitle: "Luminary Skin Storefront Analysis",
        sourceType: "website",
        sourceSummary: "Aesthetic pastel branding. Clinical trial badges hidden at bottom of page. Reviews not embedded on product detail page.",
        relevance: "Conversion funnel evaluation.",
        createdAt: "2026-08-11T09:15:10Z"
      }
    ],
    analysis: {
      id: "ana-seed-002",
      assessmentId: "ora-seed-002",
      createdAt: "2026-08-11T09:16:00Z",
      executiveVerdict: "Luminary Skin possesses a rare competitive moat: dermatologist formulation combined with verified clinical trials for melanin-rich skin. However, its current web presence hides this clinical proof behind soft aesthetic imagery, causing shoppers to perceive it as 'just another clean oil'. The primary growth constraint is conversion leakage on Product Detail Pages (PDP) due to buried proof assets.",
      brandClarityIndex: 72,
      differentiationStrength: 75,
      customerUnderstanding: 84,
      marketOpportunity: 80,
      growthReadiness: 68,
      strategicConfidence: 91,
      scoresBreakdown: {
        businessClarity: 80,
        customerClarity: 85,
        positioningClarity: 65,
        differentiation: 75,
        brandDistinctiveness: 70,
        marketOpportunity: 80,
        messagingClarity: 60,
        customerJourney: 55,
        digitalPresence: 65,
        measurementMaturity: 65
      },
      brandReality: {
        positioning: "Organic botanical serum brand.",
        valueProposition: "Gentle organic skincare formulated by a dermatologist.",
        audience: "Women 28–45 with sensitive dark-spot prone skin.",
        strengths: ["Dermatologist founder authority", "Clinical trial backing", "High repeat purchase rate among active users (42%)"],
        weaknesses: ["Buried clinical evidence on website", "Under-utilized email SMS flows", "High ad dependency"],
        distinctiveAssets: ["Frosted amber apothecary bottles", "Golden serum hue"],
        messagingTheme: "Clean luxury botanical beauty."
      },
      marketReality: {
        category: "DTC Premium Skincare / Clean Beauty",
        competitors: [
          { name: "Drunk Elephant", positioning: "Biocompatible clinical clean", strength: "Global distribution & hype", weakness: "High synthetic formulation usage" },
          { name: "Biossance", positioning: "Squalane-based sustainable science", strength: "Sephora end-cap dominance", weakness: "Generic messaging around hydration" },
          { name: "Sunday Riley", positioning: "Powered by science, balanced by botanicals", strength: "Cult product status", weakness: "Frequent skin sensitivity complaints" }
        ],
        crowdedTerritories: ["Glowy skin", "Clean beauty", "Pure botanicals"],
        whitespace: ["The Clinical-Grade Organic Solution specifically clinically proven for Sensitive & Melanin-Rich Skin."],
        trends: ["Barrier-repair focused skincare", "Demand for dermatologist proof", "Ad fatigue"]
      },
      customerReality: {
        needs: ["Fade stubborn hyperpigmentation without burning skin", "Find a routine that doesn't trigger eczema or breakout flares"],
        motivations: ["Desire to feel confident makeup-free"],
        barriers: ["$68 price point skepticism", "Fear that organic oils will clog pores"],
        decisionFactors: ["Dermatologist endorsement", "Unretouched before & after photos", "Clean ingredient transparency"],
        triggers: ["Post-summer sun spots", "Post-pregnancy melasma", "Failed chemical peel"]
      },
      perceptionGap: {
        desired: "The dermatologist-backed organic cure for sensitive skin dark spots.",
        current: "An aesthetically pleasing indie botanical face oil.",
        gap: "The clinical research and dermatologist authority are invisible above the fold.",
        commercialImpact: "Sub-par DTC conversion (1.1%) and high Meta Ad customer acquisition cost."
      },
      primaryConstraint: {
        name: "PDP Proof & Trust Disconnect",
        description: "Potential buyers land on the product page via TikTok/Meta ads but drop off because clinical trial results, dermatologist videos, and 400+ reviews are not prominently displayed where buying decisions happen.",
        symptom: "High bounce rate (74%) on main serum PDP.",
        contributingFactors: ["No before/after slider on PDP hero", "Clinical proof buried in accordion tab #4", "Customer reviews load below 4 scrolls"],
        rootCause: "Website designed like a fashion catalog rather than a high-converting clinical eCommerce funnel.",
        consequence: "Wasted ad budget and inability to scale past $1M ARR sustainably.",
        evidence: ["1.1% eCommerce conversion rate", "Average session duration under 45 seconds"],
        confidence: 94
      },
      strategicOpportunity: {
        name: "Own 'Clinical Organic' for Melanin-Rich & Sensitive Skin",
        description: "Reposition Luminary as the benchmark 'Clinical Organic' authority, elevating Dr. Elena's dermatologist credentials to the center of all creative assets.",
        whyNow: "Consumers are fleeing harsh chemical scrubs and demanding dermatologist-proven gentle remedies.",
        whyThisBrand: "Dr. Elena is a board-certified dermatologist with actual published trial data.",
        competitiveWhitespace: "Major clinical brands aren't 100% organic; major organic brands aren't dermatologist-formulated.",
        expectedCommercialEffect: "Increase DTC store conversion rate from 1.1% to 3.2%, doubling revenue on existing ad spend.",
        evidence: ["Ads featuring Dr. Elena explaining clinical trials outperform generic lifestyle ads by 4x."],
        confidence: 92
      },
      nextBestMove: {
        title: "Overhaul PDP Architecture into a 'Clinical Proof Funnel'",
        description: "Redesign the Product Detail Page to feature an interactive Before/After skin slider, a 'Dermatologist Approved' video badge, clinical trial stats above the fold, and a 30-Day Skin Guarantee.",
        why: "Directly removes buyer skepticism at the exact point of decision.",
        actions: [
          "Place 3 Key Clinical Stats right below the $68 add-to-cart button (e.g., '94% saw reduced dark spots in 21 days').",
          "Embed Dr. Elena's 30-second formula breakdown video directly in product media gallery.",
          "Add an unretouched skin-type filterable before & after photo slider.",
          "Introduce a 30-day 'Clear Skin Guarantee' icon next to checkout."
        ],
        expectedImpact: 88,
        confidence: 93
      },
      supportingMoves: [
        { title: "Deploy Post-Purchase Skincare Concierge Email Sequence", description: "Send daily skin adjustment tips during first 14 days to boost 60-day repeat replenishment subscriptions by 30%." },
        { title: "Launch 'Dermatologist Q&A' TikTok Creator Series", description: "Partner with aesthetician creators to react to Luminary's clinical trial documentation." },
        { title: "Introduce Duo Routine Bundles", description: "Package Brightening Serum with Barrier Defense Cream for a $110 average order value (AOV)." }
      ],
      stop: ["Spending budget on broad Google keyword ads", "Using static bottle product shots in paid ad campaigns"],
      start: ["Featuring Dr. Elena in top-of-funnel ad hooks", "Displaying clinical trial statistics above the fold on all PDPs"],
      maintain: ["Micro-influencer before-and-after creator seeding"],
      accelerate: ["Email/SMS lifecycle flows for subscription replenishment"],
      thirtyDayPlan: [
        { week: "Week 1", title: "PDP Content & Asset Preparation", actions: ["Extract clinical stats and doctor badges", "Compile top 20 before/after user photos"], deliverables: "PDP Wireframe & Copy Deck" },
        { week: "Week 2", title: "eCommerce Storefront Deployment", actions: ["Implement interactive before/after slider", "Reorganize review widget to top of PDP"], deliverables: "Updated Shopify / Webstore PDP" },
        { week: "Week 3", title: "Ad Creative Realignment", actions: ["Shoot 5 new UGC ad variants featuring Dr. Elena", "Build 30-Day Guarantee ad hooks"], deliverables: "10 New Creative Ad Assets" },
        { week: "Week 4", title: "Retention Flow Optimization", actions: ["Launch 14-day customer onboarding email flow", "Add 1-click subscription upsell at checkout"], deliverables: "Updated Klaviyo Email Workflows" }
      ],
      ninetyDayPlan: [
        { phase: "Foundation", period: "Days 1–30", focus: "PDP proof overhaul, clinical badge placement, and retention email setup.", objectives: ["Achieve 2.5% PDP conversion rate", "Increase average session time by 50%"] },
        { phase: "Activation", period: "Days 31–60", focus: "Scale ad spend on Dr. Elena hooks and launch product duo bundles.", objectives: ["Increase Average Order Value (AOV) from $68 to $92", "Lower CAC by 25%"] },
        { phase: "Optimization", period: "Days 61–90", focus: "Subscription push and retail pop-up partnerships.", objectives: ["Reach 45% repeat purchase rate", "Hit monthly revenue target of ₦12.5M"] }
      ],
      measurementFramework: {
        leadingIndicators: ["PDP Conversion Rate (Target: >3.2%)", "Average Time on Product Page (>90s)", "Video view completion on Dr. Elena clip"],
        marketingKpis: ["Blended Customer Acquisition Cost (CAC)", "Return on Ad Spend (ROAS)", "Add-to-Cart Rate (>8%)"],
        brandKpis: ["Brand search volume for 'Dr. Elena Luminary'", "Net Promoter Score (NPS) among sensitive skin buyers"],
        businessKpis: ["Monthly Recurring Revenue (MRR)", "60-Day Repeat Purchase Rate (Target: 45%)", "Customer Lifetime Value (LTV)"]
      },
      strategicBet: {
        action: "Focusing brand story on Dermatologist Clinical Proof rather than generic Organic Beauty",
        desiredOutcome: "Double eCommerce store conversion rate and lower CAC by 30%",
        audience: "Women 28–45 with sensitive, dark-spot prone skin",
        becauseEvidence: "In initial creative tests, ad hooks featuring published clinical trial data generated 4x higher CTR than aesthetic product flatlays.",
        confidence: 91,
        expectedImpact: "High (2.8x DTC Revenue Growth)",
        risk: "Low",
        validationMethod: "A/B testing the Clinical PDP against the legacy aesthetic PDP across 10,000 live ad sessions."
      },
      unknowns: [
        { question: "Can supply chain support a 3x surge in serum bottle orders over 60 days?", whyItMatters: "Inventory stockouts destroy subscription momentum.", validationNeeded: "Audit glass bottle manufacturer lead times." }
      ],
      sources: [
        {
          id: "src-201",
          assessmentId: "ora-seed-002",
          sourceUrl: "https://luminaryskin-demo.com",
          sourceTitle: "Luminary Skin Storefront Analysis",
          sourceType: "website",
          sourceSummary: "Aesthetic pastel branding. Clinical trial badges hidden at bottom of page. Reviews not embedded on product detail page.",
          relevance: "Conversion funnel evaluation.",
          createdAt: "2026-08-11T09:15:10Z"
        }
      ]
    }
  }
];
