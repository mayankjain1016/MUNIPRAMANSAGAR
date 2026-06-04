import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPeaceDove, GiScales, GiOpenPalm, GiLotusFlower, GiYinYang } from 'react-icons/gi';
import './Gunayatan.css'; 

// आपके द्वारा दिए गए पाथ के अनुसार सिंगल इमेज इम्पोर्ट
import tapovanImg from '../assets/components/Tapovan/image.jpg';

const TapovanPage = () => {
  const navigate = useNavigate();

  const miracles = [
    {
      title: 'वजन का अतिशय',
      description: 'क्रेन से प्रतिमा उठाते समय मीटर में प्रतिमा जी के वजन (लगभग 500 टन) की कोई रिकॉर्डिंग नहीं आई।',
      icon: <GiScales />,
    },
    {
      title: 'जल प्रस्फुटन',
      description: 'जहाँ पर्वत के नीचे 200 फीट पर पानी नहीं है, वहीं पहाड़ी पर मात्र 120 फीट पर तेज धार से पानी प्रस्फुटित हुआ।',
      icon: <GiOpenPalm />,
    },
    {
      title: 'छाया रहित',
      description: 'भगवान पद्मप्रभु की इस विशाल और चमत्कारी प्रतिमा की कोई छाया नहीं पड़ती है।',
      icon: <GiLotusFlower />,
    },
    {
      title: 'पक्षियों का न बैठना',
      description: 'इस पवित्र और अतिशयकारी प्रतिमा पर कभी भी पक्षी नहीं बैठते हैं।',
      icon: <GiPeaceDove />,
    },
    {
      title: 'वर्षा का चमत्कार',
      description: 'प्रतिमा स्थापना के समय शहर में घनघोर बारिश हुई, लेकिन क्षेत्र पर प्रतिमा स्थापित होने के बाद ही जलवृष्टि हुई।',
      icon: <GiYinYang />,
    },
  ];

  const importance = [
    { title: 'धर्म का हृदय स्थल', desc: 'बुंदेलखंड में जिन धर्म अनुयायियों के लिए यह नगर और तीर्थ हृदय स्थल के समान है।' },
    { title: 'सुगम आवागमन', desc: 'सागर रेलवे स्टेशन से 14 किमी और बस स्टैंड से 11 किमी की दूरी पर स्थित, जहाँ से कई प्रमुख शहरों के रास्ते मिलते हैं।' },
    { title: 'प्राकृतिक सौंदर्य', desc: 'जमीन से 20 मीटर ऊंचाई पर स्थित यह पहाड़ी कोयल, मयूर और ठंडी बयार से सुसज्जित है।' },
    { title: 'आत्मिक एकाग्रता', desc: 'सूर्योदय और सूर्यास्त का दृश्य चित्त को एकाग्र कर आत्मा को आनंद विभोर कर देता है।' },
    { title: 'विशालता का प्रतीक', desc: 'यह विश्व की सबसे बड़ी पद्मासन पद्मप्रभु भगवान की त्रिभुवन मोहिनी प्रतिमा का स्थान है।' },
  ];

  const experiences = [
    'प्राकृतिक ठंडी बयार',
    'सूर्योदय और सूर्यास्त का मनोरम दृश्य',
    'पक्षियों का मधुर कलरव',
    'आत्मिक शांति और एकाग्रता',
    'भगवान पद्मप्रभु के दर्शन',
    'अतिशयों का साक्षात अनुभव',
  ];

  return (
    <div className="gunayatan-page">
      {/* Hero Section - Using the single image as background */}
      <section className="gunayatan-hero" style={{ backgroundImage: `url(${tapovanImg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">तपोवन तीर्थ क्षेत्र</h1>
          <p className="hero-subtitle">विश्व की सबसे बड़ी पद्मासन पद्मप्रभु भगवान की प्रतिमा का पावन स्थल</p>
          <p className="hero-description">
            बहेरिया तिगड्डा, सिद्ध गुवा, सागर (मध्य प्रदेश) में स्थित तपोवन एक ऐसा अतिशयकारी क्षेत्र है, 
            जहाँ प्रकृति और धर्म का अद्भुत संगम आत्मा को आनंद विभोर कर देता है।
          </p>
        </div>
      </section>

      {/* About Section 1 */}
      <section className="gunayatan-section">
        <div className="section-container">
          <div className="content-card">
            <h2 className="section-heading">तपोवन तीर्थ की परिकल्पना और संकल्प</h2>
            <p className="section-text">
              इस तीर्थ के निर्माण का प्रसंग अत्यंत रोचक है। मकरोनिया में आचार्य श्री विद्यासागर जी महाराज के सानिध्य में 
              हो रहे पंच कल्याणक में पवन जी की तीव्र इच्छा सौधर्म इंद्र बनने की थी। बोली न मिल पाने के कारण मायूस पवन जी 
              ने घर आकर स्वयं एक विशाल मंदिर निर्माण और पंच कल्याणक करवाने का शुभ विचार किया।
            </p>
            <p className="section-text">
              अपने पिता हुकुमचंद जी, भाई शरद, भरत, अजय, पत्नी मणि जैन, पुत्र समीर एवं अन्य परिजनों की सहर्ष स्वीकृति के बाद, 
              उन्होंने यह संकल्प लिया। लगभग 500 टन के एक विशाल पाषाण खंड को 112 पहियों के ट्राले में लाकर 
              भगवान पद्मप्रभु की इस त्रिभुवन मोहिनी प्रतिमा का निर्माण तन्मयता से किया गया।
            </p>
          </div>
        </div>
      </section>

      {/* Acharya Section */}
      <section className="gunayatan-section alt-bg">
        <div className="section-container">
          <h2 className="section-heading">आचार्य श्री निर्भय सागर जी महाराज का आशीर्वाद</h2>
          <p className="section-text">
            संकल्प लेने के उपरांत परिवार ने आचार्य श्री निर्भय सागर जी महाराज के पाद मूल में जाकर अपना प्रयोजन बताया 
            और आचार्य श्री ने उन्हें हृदय से आशीर्वाद दिया। 
          </p>
          <p className="section-text">
            श्रमण संतों की दृष्टि दूरदर्शिता लिए होती है। वैज्ञानिक संत आचार्य श्री निर्भय सागर जी महाराज ही वे संत हैं, 
            जिन्होंने अपनी क्षुल्लक और ऐलक अवस्था में ही इस पहाड़ी को भविष्य के एक महान तीर्थ के रूप में देख लिया था। 
            उन्होंने स्वयं तपोवन क्षेत्र में अनेक चमत्कार और अतिशय देखे हैं।
          </p>
        </div>
      </section>

      {/* Miracles Section */}
      <section className="gunayatan-section">
        <div className="section-container">
          <h2 className="section-heading centered">तपोवन तीर्थ के अद्भुत अतिशय</h2>
          <div className="principles-grid">
            {miracles.map((miracle, index) => (
              <div className="principle-card" key={index}>
                <div className="principle-icon">{miracle.icon}</div>
                <h3 className="principle-title">{miracle.title}</h3>
                <p className="principle-desc">{miracle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="gunayatan-section alt-bg">
        <div className="section-container">
          <h2 className="section-heading centered">तपोवन तीर्थ का महत्व एवं भौगोलिक स्थिति</h2>
          <div className="importance-grid">
            {importance.map((item, index) => (
              <div className="importance-card" key={index}>
                <h3 className="importance-title">{item.title}</h3>
                <p className="importance-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="gunayatan-section">
        <div className="section-container">
          <h2 className="section-heading centered">तपोवन में क्या अनुभव किया जा सकता है?</h2>
          <div className="experience-grid">
            {experiences.map((exp, index) => (
              <div className="experience-card" key={index}>
                <p className="experience-text">{exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Quote Section */}
      <section className="final-quote-section alt-bg">
        <div className="section-container">
          <div className="final-quote-content">
            <div className="final-quote-box">
              <p className="final-quote-text">
                "कहते हैं जहाँ अतिशय और चमत्कार हो, वहाँ जनमानस स्वतः आकर्षित होते हैं।
                तपोवन की भूमि का 50% चमत्कार तो स्वयं इस भूमि की पवित्रता में है।
                
                जिन धर्म महान है, जिन धर्म की महिमा महान है... 
                और तपोवन तीर्थ का अतिशय भी महान है।"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TapovanPage;