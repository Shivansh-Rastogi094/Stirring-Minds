import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deal from './models/Deal';

dotenv.config();

const deals = [
  {
    title: "AWS Cloud Credits",
    description: "Get $5,000 in AWS activate credits for 2 years. Scale your infrastructure with the world's most comprehensive and broadly adopted cloud platform.",
    partnerName: "Amazon Web Services",
    category: "Cloud",
    discountValue: "$5,000 Credits",
    isLocked: true,
    eligibilityConditions: ["Early-stage startup", "Less than $1M in funding", "New AWS customer"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
  },
  {
    title: "Stripe Payment Processing",
    description: "Fee-free processing on your first $20,000 in sales. The best software platform for running an internet business.",
    partnerName: "Stripe",
    category: "Other",
    discountValue: "$20k Fee-free",
    isLocked: false,
    eligibilityConditions: ["New Stripe user"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
  },
  {
    title: "HubSpot for Startups",
    description: "Up to 90% off HubSpot's growth suite. CRM, marketing, sales, and customer service software.",
    partnerName: "HubSpot",
    category: "Marketing",
    discountValue: "90% Off",
    isLocked: true,
    eligibilityConditions: ["Member of an approved accelerator", "Seed or Series A"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg"
  },
  {
    title: "Notion Plus Plan",
    description: "6 months free of Notion Plus, including unlimited AI. Your connected workspace for wiki, docs & projects.",
    partnerName: "Notion",
    category: "Productivity",
    discountValue: "6 Months Free",
    isLocked: false,
    eligibilityConditions: ["New Plus plan customer"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
  },
  {
    title: "Mixpanel Analytics",
    description: "Get $50,000 in credits to track your product metrics. Understand every user's journey.",
    partnerName: "Mixpanel",
    category: "Analytics",
    discountValue: "$50,000 Credits",
    isLocked: true,
    eligibilityConditions: ["Less than $5M in funding", "Startup founder"],
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Mixpanel_Logo.svg"
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/startup-benefits';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');
    
    await Deal.deleteMany({});
    await Deal.insertMany(deals);
    
    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
