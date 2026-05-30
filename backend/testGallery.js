// Gallery System Test Script
// Run this to verify your gallery system is working

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gallery from './models/Gallery.js';

dotenv.config();

const testGallerySystem = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a sample gallery
    const sampleGallery = new Gallery({
      title: 'टेस्ट गैलरी - मंगल प्रवेश',
      description: 'यह एक टेस्ट गैलरी है',
      date: new Date(),
      coverImage: '/uploads/gallery/sample-cover.jpg',
      images: [
        { url: '/uploads/gallery/sample-1.jpg', caption: 'फोटो 1' },
        { url: '/uploads/gallery/sample-2.jpg', caption: 'फोटो 2' },
        { url: '/uploads/gallery/sample-3.jpg', caption: 'फोटो 3' }
      ],
      isPublished: true
    });

    await sampleGallery.save();
    console.log('✅ Sample gallery created:', sampleGallery.title);

    // Test 2: Fetch all galleries
    const galleries = await Gallery.find();
    console.log(`✅ Found ${galleries.length} galleries in database`);

    // Test 3: Fetch single gallery
    const gallery = await Gallery.findById(sampleGallery._id);
    console.log(`✅ Fetched gallery: ${gallery.title} with ${gallery.images.length} images`);

    // Test 4: Update gallery
    gallery.views += 1;
    await gallery.save();
    console.log('✅ Updated gallery views');

    // Test 5: Add image to gallery
    gallery.images.push({ url: '/uploads/gallery/sample-4.jpg', caption: 'फोटो 4' });
    await gallery.save();
    console.log(`✅ Added image, now has ${gallery.images.length} images`);

    // Test 6: Remove image from gallery
    gallery.images.pop();
    await gallery.save();
    console.log(`✅ Removed image, now has ${gallery.images.length} images`);

    // Cleanup - Remove test gallery
    await Gallery.findByIdAndDelete(sampleGallery._id);
    console.log('✅ Cleaned up test gallery');

    console.log('\n🎉 All tests passed! Gallery system is working correctly.\n');

    // Display system info
    console.log('📊 System Information:');
    console.log('- MongoDB Connected:', mongoose.connection.readyState === 1);
    console.log('- Database:', mongoose.connection.name);
    console.log('- Total Galleries:', await Gallery.countDocuments());
    console.log('\n✨ Your gallery system is ready to use!');
    console.log('👉 Start the server: npm run dev');
    console.log('👉 Login to admin: http://localhost:5173/admin/login');
    console.log('👉 View galleries: http://localhost:5173/gallery\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check MongoDB is running');
    console.error('2. Verify MONGODB_URI in .env file');
    console.error('3. Ensure Gallery model is correct');
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Disconnected from MongoDB');
  }
};

// Run tests
console.log('🧪 Testing Gallery System...\n');
testGallerySystem();
