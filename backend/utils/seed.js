const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Service = require('../models/Service');

const defaultServices = [
  {
    name: 'Bridal Makeup',
    category: 'Makeup',
    price: 15000,
    duration: '180 min',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Complete bridal transformation including hair and draping.'
  },
  {
    name: 'Hydra Facial',
    category: 'Facial',
    price: 3500,
    duration: '60 min',
    imageUrl:
      'https://images.unsplash.com/photo-1570172619996-23b241c2f18b?auto=format&fit=crop&w=800&q=80',
    description: 'Deep cleansing and hydration for glowing skin.'
  },
  {
    name: 'Keratin Treatment',
    category: 'Hair',
    price: 5000,
    duration: '120 min',
    imageUrl:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    description: 'Smooth, frizz-free hair with premium keratin products.'
  },
  {
    name: 'Swedish Massage',
    category: 'Spa',
    price: 2500,
    duration: '90 min',
    imageUrl:
      'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxing full body massage to relieve stress.'
  },
  {
    name: 'Gel Nail Extensions',
    category: 'Nails',
    price: 1800,
    duration: '60 min',
    imageUrl:
      'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80',
    description: 'Long lasting and beautiful nail art and extensions.'
  }
];

async function seedAdminAndServices() {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@beauty.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      phone: '',
      passwordHash,
      role: 'ADMIN',
      avatar: `https://ui-avatars.com/api/?name=Admin&background=ff4d8d&color=fff`
    });
    // eslint-disable-next-line no-console
    console.log('✅ Seeded Admin:', adminEmail, 'Password:', adminPassword);
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(defaultServices);
    // eslint-disable-next-line no-console
    console.log('✅ Seeded default services');
  }
}

module.exports = { seedAdminAndServices };
