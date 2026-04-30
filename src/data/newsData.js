import NewsImg1 from '../assets/News_imgs/News_img1.jpeg';
import NewsImg2 from '../assets/News_imgs/News_img2.jpeg';
import NewsImg3 from '../assets/News_imgs/News_img3.jpeg';
import NewsImg4 from '../assets/News_imgs/News_img4.jpeg';
import NewsImg5 from '../assets/News_imgs/News_img5.jpeg';
import NewsImg6 from '../assets/News_imgs/News_img6.jpeg';
import NewsImg7 from '../assets/News_imgs/News_img7.jpeg';
import NewsImg8 from '../assets/News_imgs/News_img8.jpeg';
import NewsImg9 from '../assets/News_imgs/News_img9.jpeg';

const newsData = [
  {
    id: 1,
    slug: 'mangal-pravesh-ranchi',
    title: 'आचार्य श्री निर्भय सागर जी महाराज का राँची में भव्य मंगल प्रवेश',
    date: '15 अप्रैल 2024',
    excerpt: 'हजारों श्रद्धालुओं ने गुरुवर का स्वागत किया। धार्मिक वातावरण में संपन्न हुआ यह पावन कार्यक्रम।',
    image: NewsImg1
  },
  {
    id: 2,
    slug: 'pravachan-sabha-delhi',
    title: 'दिल्ली में आयोजित विशाल प्रवचन सभा में हजारों श्रद्धालुओं ने लिया आशीर्वाद',
    date: '10 अप्रैल 2024',
    excerpt: 'आचार्य श्री ने अहिंसा और सत्य के महत्व पर प्रकाश डाला। युवाओं को जीवन में धर्म अपनाने का संदेश दिया।',
    image: NewsImg2
  },
  {
    id: 3,
    slug: 'ahimsa-sandesh-mumbai',
    title: 'मुंबई में अहिंसा पर विशेष प्रवचन - विश्व शांति का मार्ग',
    date: '5 अप्रैल 2024',
    excerpt: 'गुरुवर ने बताया कि अहिंसा ही विश्व शांति का एकमात्र मार्ग है। समाज में प्रेम और करुणा फैलाने का आह्वान किया।',
    image: NewsImg3
  },
  {
    id: 4,
    slug: 'dharm-sabha-jaipur',
    title: 'जयपुर में तीन दिवसीय धर्म सभा का भव्य आयोजन',
    date: '28 मार्च 2024',
    excerpt: 'जैन धर्म के मूल सिद्धांतों पर गहन चर्चा। श्रद्धालुओं ने आत्मिक शांति का अनुभव किया।',
    image: NewsImg4
  },
  {
    id: 5,
    slug: 'yuva-margdarshan-pune',
    title: 'पुणे में युवाओं के लिए विशेष मार्गदर्शन शिविर',
    date: '20 मार्च 2024',
    excerpt: 'आधुनिक जीवन की चुनौतियों और धर्म के बीच संतुलन बनाने पर प्रकाश डाला गया।',
    image: NewsImg5
  },
  {
    id: 6,
    slug: 'dhyan-shivir-ahmedabad',
    title: 'अहमदाबाद में सात दिवसीय ध्यान शिविर का समापन',
    date: '15 मार्च 2024',
    excerpt: 'सैकड़ों साधकों ने ध्यान और साधना का गहन अभ्यास किया। मानसिक शांति और आत्मिक विकास का अनुभव।',
    image: NewsImg6
  },
  {
    id: 7,
    slug: 'sanyam-sandesh-indore',
    title: 'इंदौर में संयम और आत्म-नियंत्रण पर विशेष प्रवचन',
    date: '8 मार्च 2024',
    excerpt: 'गुरुवर ने बताया कि संयम ही सच्ची स्वतंत्रता है। जीवन में संतुलन बनाए रखने के उपाय बताए।',
    image: NewsImg7
  },
  {
    id: 8,
    slug: 'jain-sanskriti-surat',
    title: 'सूरत में जैन संस्कृति और परंपरा पर विशेष कार्यक्रम',
    date: '1 मार्च 2024',
    excerpt: 'जैन धर्म की समृद्ध परंपरा और संस्कृति को युवा पीढ़ी तक पहुंचाने का प्रयास।',
    image: NewsImg8
  },
  {
    id: 9,
    slug: 'mahavir-jayanti-celebration',
    title: 'महावीर जयंती पर भव्य समारोह - लाखों श्रद्धालुओं ने लिया आशीर्वाद',
    date: '14 अप्रैल 2024',
    excerpt: 'भगवान महावीर के जीवन और शिक्षाओं पर विशेष प्रवचन। अहिंसा और सत्य का संदेश।',
    image: NewsImg9
  },
  {
    id: 10,
    slug: 'paryushan-parv-celebration',
    title: 'पर्युषण पर्व के दौरान विशेष धार्मिक आयोजन',
    date: '25 अगस्त 2024',
    excerpt: 'आत्म-शुद्धि और क्षमा का पावन पर्व। श्रद्धालुओं ने उपवास और साधना का पालन किया।',
    image: NewsImg1
  },
  {
    id: 11,
    slug: 'vishwa-shanti-sammelan',
    title: 'विश्व शांति सम्मेलन में आचार्य श्री की विशेष भागीदारी',
    date: '10 नवंबर 2024',
    excerpt: 'अंतर्राष्ट्रीय मंच पर जैन धर्म के अहिंसा सिद्धांत का प्रतिनिधित्व। विश्व नेताओं को शांति का संदेश।',
    image: NewsImg2
  },
  {
    id: 12,
    slug: 'atma-vikas-karyashala',
    title: 'आत्म विकास कार्यशाला - जीवन में सकारात्मक बदलाव',
    date: '5 दिसंबर 2024',
    excerpt: 'व्यक्तित्व विकास और आध्यात्मिक उन्नति पर केंद्रित विशेष कार्यशाला। सैकड़ों प्रतिभागियों ने भाग लिया।',
    image: NewsImg3
  }
];

export default newsData;

export const getNewsById = (id) => {
  return newsData.find(news => news.id === parseInt(id));
};

export const getNewsBySlug = (slug) => {
  return newsData.find(news => news.slug === slug);
};

export const getLatestNews = (count = 6) => {
  return newsData.slice(0, count);
};

export const getRelatedNews = (currentId, count = 3) => {
  return newsData.filter(news => news.id !== currentId).slice(0, count);
};
