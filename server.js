const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Influencer Dataset ───────────────────────────────────────────────────────
const influencers = [
  { name: "Sara Khan", niche: "Food", followers: 120000, engagement: "5.2%", location: "Dubai", avatar: "SK", rate: 4500, platform: "Instagram" },
  { name: "Omar Ali", niche: "Fitness", followers: 95000, engagement: "6.1%", location: "Dubai", avatar: "OA", rate: 3800, platform: "Instagram" },
  { name: "Lina Noor", niche: "Lifestyle", followers: 210000, engagement: "4.8%", location: "Abu Dhabi", avatar: "LN", rate: 7200, platform: "Instagram" },
  { name: "Ahmed R", niche: "Tech", followers: 180000, engagement: "5.5%", location: "Dubai", avatar: "AR", rate: 6000, platform: "TikTok" },
  { name: "Fatima Zahra", niche: "Beauty", followers: 305000, engagement: "4.3%", location: "Dubai", avatar: "FZ", rate: 9500, platform: "Instagram" },
  { name: "Khalid Mansour", niche: "Travel", followers: 167000, engagement: "5.8%", location: "Abu Dhabi", avatar: "KM", rate: 5500, platform: "TikTok" },
  { name: "Nadia El-Amin", niche: "Fashion", followers: 245000, engagement: "4.6%", location: "Sharjah", avatar: "NE", rate: 8000, platform: "Instagram" },
  { name: "Yusuf Kareem", niche: "Food", followers: 88000, engagement: "7.1%", location: "Dubai", avatar: "YK", rate: 3200, platform: "TikTok" },
  { name: "Hana Basil", niche: "Fitness", followers: 142000, engagement: "5.9%", location: "Dubai", avatar: "HB", rate: 5000, platform: "Instagram" },
  { name: "Tariq Nasser", niche: "Tech", followers: 220000, engagement: "5.0%", location: "Abu Dhabi", avatar: "TN", rate: 7500, platform: "TikTok" },
  { name: "Mira Aslam", niche: "Lifestyle", followers: 178000, engagement: "5.3%", location: "Dubai", avatar: "MA", rate: 6200, platform: "Instagram" },
  { name: "Rania Jaber", niche: "Beauty", followers: 290000, engagement: "4.1%", location: "Dubai", avatar: "RJ", rate: 8800, platform: "Instagram" }
];

// ─── Niche-to-Goal Mapping ────────────────────────────────────────────────────
const goalNicheMap = {
  awareness: ["Lifestyle", "Travel", "Fashion", "Beauty"],
  sales: ["Tech", "Beauty", "Fashion", "Food"],
  engagement: ["Food", "Fitness", "Lifestyle", "Tech"]
};

// ─── Strategy Templates ───────────────────────────────────────────────────────
const strategyTemplates = {
  awareness: {
    title: "Brand Awareness Amplification Strategy",
    description: "Multi-touchpoint visibility campaign leveraging high-reach creators to maximize brand recall across target demographics in the UAE market.",
    tactics: [
      "Influencer story takeovers for authentic brand immersion",
      "Collaborative Reels/TikToks with trending audio hooks",
      "Geo-targeted hashtag challenges to drive organic discovery",
      "Cross-platform content syndication for maximum impressions"
    ],
    platforms: ["Instagram Reels", "TikTok", "Instagram Stories"],
    kpis: ["Impressions", "Reach", "Brand Recall Lift", "Hashtag Volume"]
  },
  sales: {
    title: "Performance-Driven Conversion Strategy",
    description: "Direct-response campaign architecture with trackable CTAs, promo code attribution, and creator-led product demonstrations optimized for purchase intent.",
    tactics: [
      "Dedicated product review content with swipe-up links",
      "Exclusive promo codes per creator for attribution tracking",
      "Limited-time offer countdowns in Stories to drive urgency",
      "Retargeting-ready UGC assets for paid amplification"
    ],
    platforms: ["Instagram Feed", "TikTok Shop", "Instagram Stories"],
    kpis: ["Conversions", "ROAS", "Promo Code Redemptions", "CPA"]
  },
  engagement: {
    title: "Community Engagement & Loyalty Strategy",
    description: "Interactive, community-first campaign built to generate meaningful audience participation, UGC, and long-term brand affinity among core segments.",
    tactics: [
      "Creator-hosted Q&A sessions and live streams",
      "UGC challenges with branded templates and incentives",
      "Poll and quiz-based story sequences for micro-interactions",
      "Comment-driven giveaway mechanics to boost algorithmic reach"
    ],
    platforms: ["Instagram Stories", "TikTok", "Instagram Live"],
    kpis: ["Engagement Rate", "Comments", "Shares", "UGC Volume"]
  }
};

// ─── AI Engine Endpoint ───────────────────────────────────────────────────────
app.post('/api/run-campaign', (req, res) => {
  const { brand, goal, budget, audience } = req.body;

  if (!brand || !goal || !budget || !audience) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const budgetNum = parseFloat(budget);
  const goalKey = goal.toLowerCase();
  const strategy = strategyTemplates[goalKey];

  // ── Creator Matching ──────────────────────────────────────────────────────
  const relevantNiches = goalNicheMap[goalKey] || ["Lifestyle"];
  const matched = influencers
    .filter(i => relevantNiches.includes(i.niche))
    .sort((a, b) => parseFloat(b.engagement) - parseFloat(a.engagement))
    .slice(0, 3);

  // ── Budget Breakdown ──────────────────────────────────────────────────────
  const totalCreatorCost = matched.reduce((sum, c) => sum + c.rate, 0);
  const creatorBudget = Math.round(budgetNum * 0.55);
  const adSpend = Math.round(budgetNum * 0.25);
  const production = Math.round(budgetNum * 0.12);
  const management = Math.round(budgetNum * 0.08);

  const budgetBreakdown = {
    creatorFees: { amount: creatorBudget, pct: "55%" },
    adSpend: { amount: adSpend, pct: "25%" },
    production: { amount: production, pct: "12%" },
    management: { amount: management, pct: "8%" }
  };

  // ── Outreach Messages ─────────────────────────────────────────────────────
  const outreachMessages = matched.map(creator => ({
    creator: creator.name,
    dm: `Hi ${creator.name.split(' ')[0]}! 👋 We're working with ${brand} on an exciting ${goalKey} campaign targeting ${audience} in the UAE. Your content in the ${creator.niche.toLowerCase()} space is exactly the authentic voice we're looking for. Would love to explore a collaboration — are you open to a quick chat this week?`,
    email: {
      subject: `Collaboration Opportunity: ${brand} x ${creator.name}`,
      body: `Dear ${creator.name},\n\nI'm reaching out on behalf of ${brand}, who is launching a high-impact ${goalKey} campaign across the UAE market targeting ${audience}.\n\nAfter analyzing creator performance data, your profile stood out for exceptional engagement (${creator.engagement}) and strong audience alignment in the ${creator.niche.toLowerCase()} vertical.\n\nCampaign scope:\n• Goal: ${strategy.title}\n• Platforms: ${strategy.platforms.join(', ')}\n• Timeline: 7-day activation window\n• Compensation: AED ${creator.rate.toLocaleString()} (negotiable based on deliverables)\n\nWe'd love to discuss deliverables and creative direction. Are you available for a 15-minute call this week?\n\nBest regards,\nFlowAI Campaign Team`
    }
  }));

  // ── Campaign Plan ─────────────────────────────────────────────────────────
  const campaignPlan = [
    { day: "Day 1", phase: "Onboarding", tasks: ["Creator contracts signed", "Brand kit & guidelines shared", "Content brief distributed"], status: "setup" },
    { day: "Day 2", phase: "Content Creation", tasks: ["Creators produce draft content", "Internal review & feedback loop", "Hashtag & caption finalization"], status: "production" },
    { day: "Day 3", phase: "Approval & Scheduling", tasks: ["Final content approval", "Posts scheduled across platforms", "Tracking links configured"], status: "production" },
    { day: "Day 4–5", phase: "Live Activation", tasks: ["Content goes live across all channels", "Real-time engagement monitoring", "Community management & response"], status: "active" },
    { day: "Day 6", phase: "Amplification", tasks: ["Top-performing content boosted with ad spend", "A/B test creative variations", "Audience retargeting activated"], status: "active" },
    { day: "Day 7", phase: "Reporting & Optimization", tasks: ["Full analytics compilation", "ROI & KPI assessment", "Optimization recommendations delivered"], status: "complete" }
  ];

  // ── Performance Report ────────────────────────────────────────────────────
  const totalFollowers = matched.reduce((s, c) => s + c.followers, 0);
  const avgEngagement = matched.reduce((s, c) => s + parseFloat(c.engagement), 0) / matched.length;
  const estimatedReach = Math.round(totalFollowers * 0.35);
  const estimatedImpressions = Math.round(totalFollowers * 1.8);
  const estimatedEngagements = Math.round(estimatedReach * (avgEngagement / 100));
  const estimatedConversions = goalKey === 'sales' ? Math.round(estimatedEngagements * 0.08) : Math.round(estimatedEngagements * 0.03);
  const projectedROI = ((estimatedConversions * 150) / budgetNum * 100).toFixed(0);

  const report = {
    estimatedReach: estimatedReach.toLocaleString(),
    estimatedImpressions: estimatedImpressions.toLocaleString(),
    estimatedEngagements: estimatedEngagements.toLocaleString(),
    estimatedConversions: estimatedConversions.toLocaleString(),
    avgEngagementRate: avgEngagement.toFixed(1) + '%',
    projectedROI: projectedROI + '%',
    costPerEngagement: (budgetNum / estimatedEngagements).toFixed(2),
    costPerConversion: (budgetNum / estimatedConversions).toFixed(2)
  };

  // ── Response ──────────────────────────────────────────────────────────────
  res.json({
    proposal: {
      brand,
      goal: strategy.title,
      description: strategy.description,
      tactics: strategy.tactics,
      platforms: strategy.platforms,
      kpis: strategy.kpis,
      budgetBreakdown
    },
    creators: matched,
    outreach: outreachMessages,
    campaignPlan,
    report
  });
});

// ─── Contact Form Endpoint ────────────────────────────────────────────────────
app.post('/api/contact', (req, res) => {
  const { name, email, company } = req.body;
  if (!name || !email || !company) {
    return res.status(400).json({ error: 'All fields required.' });
  }
  res.json({ success: true, message: `Thank you, ${name}. Our team will contact you within 24 hours.` });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n  ┌─────────────────────────────────────────┐`);
    console.log(`  │                                         │`);
    console.log(`  │   FlowAI Agency OS - Running            │`);
    console.log(`  │   http://localhost:${PORT}                  │`);
    console.log(`  │                                         │`);
    console.log(`  └─────────────────────────────────────────┘\n`);
  });
}

module.exports = app;
