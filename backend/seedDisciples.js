import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Disciple from './models/Disciple.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDisciples = async () => {
  try {
    await connectDB();

    await Disciple.deleteMany({});

    const disciples = [
      {
        name: 'मुनि श्री अभय सागर जी',
        title: 'वरिष्ठ शिष्य',
        image: '/src/assets/Bioimg2.jpeg',
        description: 'आचार्य श्री के प्रमुख शिष्य',
        category: 'शिष्य',
        order: 1
      },
      {
        name: 'आर्यिका श्री ज्ञान माता जी',
        title: 'वरिष्ठ शिष्य',
        image: '/src/assets/Bioimg3.jpeg',
        description: 'धर्म प्रचार में सक्रिय',
        category: 'शिष्य',
        order: 2
      },
      {
        name: 'मुनि श्री धर्म सागर जी',
        title: 'शिष्य',
        image: '/src/assets/Bioimg2.jpeg',
        description: 'धर्म प्रचारक',
        category: 'शिष्य',
        order: 3
      }
    ];

    await Disciple.insertMany(disciples);

    console.log('✅ Disciples seeded successfully!');
    console.log(`Total शिष्य: ${disciples.length}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding disciples:', error);
    process.exit(1);
  }
};

seedDisciples();
