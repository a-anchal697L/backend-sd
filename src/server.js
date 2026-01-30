require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./config/db.js");
const dealModel = require("./models/deal.model.js");
const mongoose = require("mongoose");

connectDB();
const PORT = process.env.PORT || 5000;

const deals = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "AWS Cloud Credits",
    category: "Cloud",
    discount: "₹50,000 credits",
    description: "Free cloud credits to deploy, test, and scale your startup infrastructure on AWS.",
    isLocked: true,
    partnerName: "Amazon Web Services"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Google Cloud Platform",
    category: "Cloud",
    discount: "₹40,000 credits",
    description: "Build and scale applications with free Google Cloud credits for startups.",
    isLocked: true,
    partnerName: "Google"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Microsoft Azure",
    category: "Cloud",
    discount: "₹30,000 credits",
    description: "Get Azure credits to host applications, databases, and AI workloads.",
    isLocked: true,
    partnerName: "Microsoft"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Notion Pro",
    category: "Productivity",
    discount: "6 months free",
    description: "Organize tasks, docs, and team collaboration in one workspace.",
    isLocked: false,
    partnerName: "Notion Labs"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Slack Pro",
    category: "Productivity",
    discount: "50% off for 1 year",
    description: "Improve team communication with advanced Slack features.",
    isLocked: false,
    partnerName: "Slack Technologies"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "ClickUp Business",
    category: "Productivity",
    discount: "3 months free",
    description: "All-in-one project management for fast-moving startup teams.",
    isLocked: true,
    partnerName: "ClickUp"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Mixpanel Analytics",
    category: "Analytics",
    discount: "50% off",
    description: "Track user behavior and product performance with deep analytics.",
    isLocked: true,
    partnerName: "Mixpanel"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Amplitude",
    category: "Analytics",
    discount: "Free growth plan",
    description: "Understand user journeys and improve product decisions.",
    isLocked: false,
    partnerName: "Amplitude"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Hotjar",
    category: "Analytics",
    discount: "6 months free",
    description: "Visualize user behavior with heatmaps and session recordings.",
    isLocked: false,
    partnerName: "Hotjar"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "SendGrid Email",
    category: "Marketing",
    discount: "3 months free",
    description: "Reliable email delivery service for transactional and marketing emails.",
    isLocked: false,
    partnerName: "Twilio SendGrid"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Mailchimp Standard",
    category: "Marketing",
    discount: "50% off for 6 months",
    description: "Create, automate, and analyze email marketing campaigns.",
    isLocked: true,
    partnerName: "Mailchimp"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "HubSpot Starter",
    category: "Marketing",
    discount: "90% off for 1 year",
    description: "CRM, email marketing, and customer tracking for growing startups.",
    isLocked: true,
    partnerName: "HubSpot"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Canva Pro",
    category: "Design",
    discount: "12 months free",
    description: "Design marketing assets, presentations, and social media posts easily.",
    isLocked: false,
    partnerName: "Canva"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Figma Professional",
    category: "Design",
    discount: "50% off for 1 year",
    description: "Collaborative design tool for UI/UX and product teams.",
    isLocked: false,
    partnerName: "Figma"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Adobe Creative Cloud",
    category: "Design",
    discount: "40% off",
    description: "Access industry-standard tools for design, video, and branding.",
    isLocked: true,
    partnerName: "Adobe"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Stripe Payments",
    category: "Finance",
    discount: "No fees on first ₹1L",
    description: "Accept payments globally with reduced transaction fees.",
    isLocked: true,
    partnerName: "Stripe"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Razorpay Startup Program",
    category: "Finance",
    discount: "Zero MDR for 3 months",
    description: "Simplify online payments and payouts for Indian startups.",
    isLocked: true,
    partnerName: "Razorpay"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Freshdesk",
    category: "Support",
    discount: "1 year free",
    description: "Customer support software to manage tickets and user queries.",
    isLocked: false,
    partnerName: "Freshworks"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Intercom Starter",
    category: "Support",
    discount: "50% off for 6 months",
    description: "Live chat and customer messaging platform for SaaS products.",
    isLocked: true,
    partnerName: "Intercom"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Sentry Error Monitoring",
    category: "Developer Tools",
    discount: "Free team plan",
    description: "Monitor and fix application errors in real time.",
    isLocked: false,
    partnerName: "Sentry"
  },
];


const seedDeals = async () => {
  const count = await dealModel.countDocuments();
  if (count === 0) {
    await dealModel.insertMany(deals);
    console.log("Deals seeded on startup");
  }
};
seedDeals();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
