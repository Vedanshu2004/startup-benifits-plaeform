require('dotenv').config();
const mongoose = require('mongoose');
const Deal = require('./models/Deal');

const sampleDeals = [
  {
    title: 'AWS Credits',
    description: 'Get  5000 in AWS credits for your startup. Valid for 1 year.',
    partner: 'Amazon Web Services',
    category: 'Cloud Services',
    discount: ' 5000 credits',
    isLocked: false,
    eligibility: 'All users',
    imageUrl: 'https://via.placeholder.com/400x200/FF9900/ffffff?text=AWS'
  },
  {
    title: 'Google Cloud Platform',
    description: 'Receive  3000 in GCP credits. Perfect for hosting and analytics.',
    partner: 'Google Cloud',
    category: 'Cloud Services',
    discount: ' 3000 credits',
    isLocked: false,
    eligibility: 'All users',
    imageUrl: 'https://via.placeholder.com/400x200/4285F4/ffffff?text=GCP'
  },
  {
    title: 'HubSpot Startup Program',
    description: 'Get 90% off HubSpot for the first year. Premium CRM and marketing tools.',
    partner: 'HubSpot',
    category: 'Marketing',
    discount: '90% off',
    isLocked: true,
    eligibility: 'Verified startups only',
    imageUrl: 'https://via.placeholder.com/400x200/FF7A59/ffffff?text=HubSpot'
  },
  {
    title: 'Notion Startup Program',
    description: 'Free Notion Plus for teams up to 10 members. Unlimited pages and blocks.',
    partner: 'Notion',
    category: 'Productivity',
    discount: 'Free Plus plan',
    isLocked: false,
    eligibility: 'All users',
    imageUrl: 'https://via.placeholder.com/400x200/000000/ffffff?text=Notion'
  },
  {
    title: 'Mixpanel for Startups',
    description: 'Get  50,000 in Mixpanel credits. Track user analytics and behavior.',
    partner: 'Mixpanel',
    category: 'Analytics',
    discount: ' 50,000 credits',
    isLocked: true,
    eligibility: 'Verified startups only',
    imageUrl: 'https://via.placeholder.com/400x200/7856FF/ffffff?text=Mixpanel'
  },
  {
    title: 'GitHub Enterprise',
    description: 'Free GitHub Enterprise for 1 year. Advanced collaboration tools.',
    partner: 'GitHub',
    category: 'Development',
    discount: 'Free for 1 year',
    isLocked: false,
    eligibility: 'All users',
    imageUrl: 'https://via.placeholder.com/400x200/181717/ffffff?text=GitHub'
  },
  {
    title: 'Stripe Atlas',
    description: 'Incorporate your company and get $5000 in payment processing credits.',
    partner: 'Stripe',
    category: 'Development',
    discount: ' 5000 credits',
    isLocked: true,
    eligibility: 'Verified startups only',
    imageUrl: 'https://via.placeholder.com/400x200/635BFF/ffffff?text=Stripe'
  },
  {
    title: 'Mailchimp',
    description: 'Get 50% off Mailchimp for 6 months. Email marketing made easy.',
    partner: 'Mailchimp',
    category: 'Marketing',
    discount: '50% off',
    isLocked: false,
    eligibility: 'All users',
    imageUrl: 'https://via.placeholder.com/400x200/FFE01B/000000?text=Mailchimp'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

   
    await Deal.deleteMany({});
    console.log('Cleared existing deals');

   
    await Deal.insertMany(sampleDeals);
    console.log('Sample deals inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
