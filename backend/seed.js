import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Location from './models/Location.js';
import Event from './models/Event.js';
import News from './models/News.js';
import Gallery from './models/Gallery.js';
import ShankaSamadhan from './models/ShankaSamadhan.js';

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

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Admin.deleteMany({});
    await Location.deleteMany({});
    await Event.deleteMany({});
    await News.deleteMany({});
    await Gallery.deleteMany({});
    await ShankaSamadhan.deleteMany({});

    // Seed Admin User
    await Admin.create({
      username: 'admin',
      email: 'admin@munipramansagar.com',
      password: 'admin123',
      role: 'superadmin'
    });
    console.log('✅ Admin user created: admin@munipramansagar.com / admin123');

    // Seed Location
    await Location.create({
      address: 'आगरा, उत्तर प्रदेश',
      addressEnglish: '(Agra, Uttar Pradesh, India)'
    });

    // Seed Events
    await Event.create([
      {
        title: 'भावना योग शिविर - आपके शहर में (Register)',
        description: 'आध्यात्मिक विकास के लिए भावना योग शिविर',
        isActive: true,
        order: 1
      },
      {
        title: 'Weekly Online भावना योग',
        description: 'साप्ताहिक ऑनलाइन भावना योग सत्र',
        isActive: true,
        order: 2
      }
    ]);

    // Seed News
    const newsData = [
      {
        title: 'आचार्य श्री निर्भय सागर जी महाराज का विशेष प्रवचन',
        content: '<h2>प्रवचन की मुख्य बातें</h2><p>आचार्य श्री निर्भय सागर जी महाराज ने आज विशेष प्रवचन में जैन धर्म के महत्वपूर्ण सिद्धांतों पर प्रकाश डाला। हजारों श्रद्धालुओं ने गुरुवर के दर्शन और आशीर्वाद प्राप्त किया।</p><h2>मुख्य विषय</h2><ul><li>अहिंसा का महत्व और जीवन में इसका पालन</li><li>सत्य का पालन और ईमानदारी</li><li>अपरिग्रह की शिक्षा और सादगी</li><li>आत्म-चिंतन और ध्यान का महत्व</li></ul><p>गुरुवर ने कहा कि धर्म केवल पूजा-पाठ नहीं, बल्कि जीवन जीने का तरीका है। उन्होंने युवा पीढ़ी को संबोधित करते हुए कहा कि आधुनिक जीवन की चुनौतियों के बीच भी धर्म और संस्कारों को बनाए रखना अत्यंत आवश्यक है।</p>',
        excerpt: 'गुरुवर ने जैन धर्म के मूल सिद्धांतों पर प्रकाश डाला और श्रद्धालुओं को जीवन में धर्म को अपनाने का संदेश दिया।',
        date: new Date('2024-01-15'),
        category: 'general',
        isPublished: true,
        views: 245
      },
      {
        title: 'भव्य धार्मिक समारोह का आयोजन - 25 फरवरी 2024',
        content: '<h2>समारोह की घोषणा</h2><p>आगामी 25 फरवरी 2024 को एक भव्य धार्मिक समारोह का आयोजन किया जा रहा है। इस समारोह में आचार्य श्री निर्भय सागर जी महाराज विशेष प्रवचन देंगे।</p><h2>कार्यक्रम विवरण</h2><ul><li>तिथि: 25 फरवरी 2024</li><li>समय: प्रातः 9:00 बजे से</li><li>स्थान: मुख्य जैन मंदिर, आगरा</li><li>विशेष आकर्षण: गुरुवर का प्रवचन और आशीर्वाद</li></ul><p>सभी श्रद्धालुओं से अनुरोध है कि इस पावन अवसर पर उपस्थित होकर गुरुवर के दर्शन और आशीर्वाद प्राप्त करें।</p>',
        excerpt: 'आगामी 25 फरवरी को भव्य धार्मिक समारोह का आयोजन। गुरुवर का विशेष प्रवचन और आशीर्वाद।',
        date: new Date('2024-01-20'),
        category: 'event',
        isPublished: true,
        views: 189
      },
      {
        title: 'नई पुस्तक "आध्यात्मिक जीवन" का विमोचन',
        content: '<h2>पुस्तक विमोचन समारोह</h2><p>आचार्य श्री निर्भय सागर जी महाराज की नई पुस्तक "आध्यात्मिक जीवन" का विमोचन हुआ। यह पुस्तक आधुनिक जीवन में आध्यात्मिकता को अपनाने के व्यावहारिक तरीके बताती है।</p><h2>पुस्तक की विशेषताएं</h2><ul><li>सरल भाषा में लिखी गई</li><li>व्यावहारिक उदाहरणों से भरपूर</li><li>युवा पीढ़ी के लिए विशेष मार्गदर्शन</li><li>दैनिक जीवन में धर्म का पालन</li></ul><p>पुस्तक अब सभी प्रमुख पुस्तक विक्रेताओं और ऑनलाइन उपलब्ध है।</p>',
        excerpt: 'गुरुवर की नई पुस्तक "आध्यात्मिक जीवन" का विमोचन। आधुनिक जीवन में आध्यात्मिकता के व्यावहारिक तरीके।',
        date: new Date('2024-01-25'),
        category: 'announcement',
        isPublished: true,
        views: 156
      },
      {
        title: 'युवा शिविर का सफल आयोजन - 500+ युवाओं ने लिया भाग',
        content: '<h2>युवा शिविर की सफलता</h2><p>पिछले सप्ताह आयोजित युवा शिविर में 500 से अधिक युवाओं ने भाग लिया। तीन दिवसीय इस शिविर में गुरुवर ने युवाओं को जीवन के विभिन्न पहलुओं पर मार्गदर्शन दिया।</p><h2>शिविर की मुख्य गतिविधियां</h2><ul><li>प्रातःकालीन ध्यान और योग</li><li>गुरुवर के प्रवचन</li><li>प्रश्नोत्तरी सत्र</li><li>सामूहिक चर्चा और विचार-विमर्श</li></ul><p>युवाओं ने शिविर से बहुत कुछ सीखा और अपने जीवन में सकारात्मक बदलाव लाने का संकल्प लिया।</p>',
        excerpt: '500+ युवाओं ने युवा शिविर में भाग लिया। गुरुवर ने जीवन के विभिन्न पहलुओं पर मार्गदर्शन दिया।',
        date: new Date('2024-01-28'),
        category: 'event',
        isPublished: true,
        views: 312
      },
      {
        title: 'मीडिया में गुरुवर की विशेष उपस्थिति',
        content: '<h2>टीवी साक्षात्कार</h2><p>आचार्य श्री निर्भय सागर जी महाराज ने एक प्रमुख टीवी चैनल को विशेष साक्षात्कार दिया। इस साक्षात्कार में उन्होंने समाज की विभिन्न समस्याओं और उनके समाधान पर चर्चा की।</p><h2>मुख्य बिंदु</h2><ul><li>युवाओं में बढ़ती भौतिकवादी सोच</li><li>परिवार में बढ़ती दूरियां</li><li>मानसिक स्वास्थ्य का महत्व</li><li>धर्म और आधुनिकता का संतुलन</li></ul><p>साक्षात्कार को दर्शकों ने बहुत सराहा और सोशल मीडिया पर व्यापक चर्चा हुई।</p>',
        excerpt: 'गुरुवर ने टीवी साक्षात्कार में समाज की समस्याओं और समाधान पर चर्चा की।',
        date: new Date('2024-01-30'),
        category: 'media',
        isPublished: true,
        views: 421
      },
      {
        title: 'आगामी चातुर्मास की तैयारियां शुरू',
        content: '<h2>चातुर्मास की घोषणा</h2><p>आचार्य श्री निर्भय सागर जी महाराज आगामी चातुर्मास आगरा में विराजमान रहेंगे। इस दौरान नियमित प्रवचन और धार्मिक कार्यक्रमों का आयोजन किया जाएगा।</p><p>यह एक ड्राफ्ट समाचार है जो अभी प्रकाशित नहीं किया गया है।</p>',
        excerpt: 'गुरुवर आगामी चातुर्मास आगरा में विराजमान रहेंगे। नियमित प्रवचन और कार्यक्रमों की योजना।',
        date: new Date('2024-02-01'),
        category: 'announcement',
        isPublished: false,
        views: 0
      }
    ];
    await News.insertMany(newsData);

    // Seed Gallery
    const galleryData = [
      {
        title: 'गोमिया, बोकारो मंगल प्रवेश 12Apr',
        description: 'गोमिया में मंगल प्रवेश का आयोजन',
        date: new Date('2024-04-12'),
        coverImage: '/uploads/gallery1.jpg',
        images: [
          { url: '/uploads/gallery1-1.jpg', caption: 'मंगल प्रवेश 1' },
          { url: '/uploads/gallery1-2.jpg', caption: 'मंगल प्रवेश 2' },
          { url: '/uploads/gallery1-3.jpg', caption: 'मंगल प्रवेश 3' }
        ]
      },
      {
        title: 'साड़म, बोकारो मंगल प्रवेश 11Apr',
        description: 'साड़म में मंगल प्रवेश का आयोजन',
        date: new Date('2024-04-11'),
        coverImage: '/uploads/gallery2.jpg',
        images: [
          { url: '/uploads/gallery2-1.jpg', caption: 'मंगल प्रवेश 1' },
          { url: '/uploads/gallery2-2.jpg', caption: 'मंगल प्रवेश 2' }
        ]
      },
      {
        title: 'पेटरवार, बोकारो मंगल प्रवेश 09Apr',
        description: 'पेटरवार में मंगल प्रवेश का आयोजन',
        date: new Date('2024-04-09'),
        coverImage: '/uploads/gallery3.jpg',
        images: [
          { url: '/uploads/gallery3-1.jpg', caption: 'मंगल प्रवेश 1' }
        ]
      },
      {
        title: 'राधाकृष्ण किशोर जी झा. वित्त मंत्री',
        description: 'वित्त मंत्री के साथ मुलाकात',
        date: new Date('2024-04-08'),
        coverImage: '/uploads/gallery4.jpg',
        images: [
          { url: '/uploads/gallery4-1.jpg', caption: 'कार्यक्रम 1' }
        ]
      }
    ];
    await Gallery.insertMany(galleryData);

    // Seed Shanka Samadhan
    const shankaData = [
      {
        question: 'क्रोध से मुक्ति कैसे पाएँ?',
        answer: 'क्रोध से मुक्ति पाने के लिए आत्म-चिंतन और ध्यान का अभ्यास करें। जब क्रोध आए तो गहरी सांस लें और स्थिति को शांत मन से देखें।',
        category: 'spiritual',
        slug: 'krodh-se-mukti-kaise-payen',
        isPopular: true
      },
      {
        question: 'निर्णय कैसे लें?',
        answer: 'निर्णय लेने से पहले सभी पहलुओं पर विचार करें। अपने विवेक का उपयोग करें और धर्म के सिद्धांतों को ध्यान में रखें।',
        category: 'life',
        slug: 'nirnay-kaise-len',
        isPopular: true
      },
      {
        question: 'युवा वर्ग ब्रांडेड सामान को पाने की दौड़ और चकाचौंध से कैसे बचें?',
        answer: 'सादगी और संतोष का जीवन जीएं। याद रखें कि वास्तविक सुख भौतिक वस्तुओं में नहीं, आत्मिक शांति में है।',
        category: 'youth',
        slug: 'yuva-varg-branded-saman',
        isPopular: false
      },
      {
        question: 'मानसिक अशांति कैसे दूर करें?',
        answer: 'नियमित ध्यान, प्राणायाम और सकारात्मक विचारों से मानसिक अशांति दूर होती है। धार्मिक ग्रंथों का अध्ययन भी सहायक है।',
        category: 'spiritual',
        slug: 'mansik-ashanti-kaise-door-karen',
        isPopular: true
      },
      {
        question: 'क्या निराशा और लाचारी में किया गया परिवर्तन स्थायी होता है?',
        answer: 'परिवर्तन की नींव मजबूत होनी चाहिए। निराशा में लिए गए निर्णय अस्थायी हो सकते हैं, इसलिए शांत मन से सोचें।',
        category: 'life',
        slug: 'nirasha-me-kiya-parivartan',
        isPopular: false
      },
      {
        question: 'संयम कैसे रखें?',
        answer: 'संयम के लिए आत्म-नियंत्रण और अनुशासन आवश्यक है। छोटे-छोटे लक्ष्य बनाएं और उन्हें प्राप्त करने का प्रयास करें।',
        category: 'moral',
        slug: 'sanyam-kaise-rakhen',
        isPopular: true
      }
    ];
    await ShankaSamadhan.insertMany(shankaData);

    console.log('✅ Data seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log('   Email: admin@munipramansagar.com');
    console.log('   Password: admin123');
    console.log('\n🌐 Access admin panel at: http://localhost:5173/admin/login');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
