import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@munipramansagar.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists! Skipping seeding to prevent duplicate keys.');
    } else {
      // Seed Admin User
      await Admin.create({
        username: 'admin',
        email: 'admin@munipramansagar.com',
        password: 'admin123',
        role: 'superadmin'
      });
      console.log('✅ Admin user created: admin@munipramansagar.com / admin123');
    }

    console.log('✅ Admin seed process completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
