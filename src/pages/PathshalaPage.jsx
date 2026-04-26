import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const PathshalaPage = () => {
  const navigate = useNavigate();

  const objectives = [
    { title: 'धर्म ज्ञान', description: 'जैन धर्म के मूल सिद्धांतों को सरल भाषा में समझाना।' },
    { title: 'संस्कार निर्माण', description: 'बच्चों और युवाओं में अच्छे विचार और अच्छा आचरण विकसित करना।' },
    { title: 'चरित्र विकास', description: 'सत्य, अहिंसा, विनय, क्षमा और संयम जैसे गुणों को जीवन में उतारना।' },
    { title: 'आत्मिक विकास', description: 'ध्यान, स्वाध्याय और आत्मचिंतन से मन को शांत बनाना।' },
    { title: 'समाज सेवा', description: 'समाज में प्रेम, सहयोग और सेवा की भावना बढ़ाना।' },
  ];

  const categories = [
    { title: 'बाल पाठशाला', description: 'बच्चों को जैन धर्म की बेसिक बातें, अच्छी आदतें, संस्कार और नैतिक कहानियाँ सिखाई जाएँ।' },
    { title: 'युवा पाठशाला', description: 'युवाओं को distraction, सोशल मीडिया, करियर दबाव, क्रोध और तनाव पर मार्गदर्शन मिले।' },
    { title: 'धार्मिक शिक्षा', description: 'अहिंसा, सत्य, अपरिग्रह, कर्म सिद्धांत और पंच महाव्रत जैसे विषय समझाए जाएँ।' },
    { title: 'जीवन प्रबंधन', description: 'क्रोध नियंत्रण, मानसिक शांति, समय प्रबंधन और सकारात्मक सोच।' },
    { title: 'ध्यान और साधना', description: 'ध्यान, मौन, स्वाध्याय और आत्मचिंतन की practical guidance।' },
  ];

  const topics = [
    'नवकार मंत्र का महत्व',
    'अहिंसा का वास्तविक अर्थ',
    'कर्म सिद्धांत',
    'क्षमा का महत्व',
    'संयम कैसे रखें',
    'माता-पिता का सम्मान',
    'मोबाइल और सोशल मीडिया से संतुलन',
    'सत्य बोलने की शक्ति',
    'अच्छी संगति का प्रभाव',
    'ध्यान कैसे करें',
  ];

  const childrenItems = [
    'कहानियाँ',
    'संस्कार गीत',
    'प्रश्नोत्तरी',
    'अच्छी आदतें',
  ];

  const youthItems = [
    'तनाव से मुक्ति',
    'लक्ष्य पर ध्यान',
    'संगति का चुनाव',
    'डिजिटल संयम',
  ];

  return (
    <div className="pathshala-page">
      
      {/* SECTION 1: HERO */}
      <section className="pathshala-hero">
        <div className="pathshala-container">
          <h1 className="pathshala-title">पाठशाला</h1>
          <p className="pathshala-subtitle">संस्कार, ज्ञान और आध्यात्मिक विकास का केंद्र</p>
          <p className="pathshala-description">
            पाठशाला वह स्थान है जहाँ बालक, युवा और समाज के लोग जैन धर्म, नैतिक जीवन, संस्कार, संयम और आत्मिक विकास की शिक्षा सरल भाषा में प्राप्त करते हैं।
          </p>
        </div>
      </section>

      {/* SECTION 2: पाठशाला क्या है */}
      <section className="pathshala-section">
        <div className="pathshala-container">
          <div className="pathshala-card centered-card">
            <h2 className="section-heading">पाठशाला क्या है</h2>
            <p className="card-text">
              पाठशाला केवल पढ़ने का स्थान नहीं है, बल्कि जीवन को सही दिशा देने वाला संस्कार केंद्र है। यहाँ धर्म, ज्ञान, अनुशासन, विनय, सेवा, अहिंसा और सदाचार की शिक्षा दी जाती है।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: पाठशाला का उद्देश्य */}
      <section className="pathshala-section alt-bg">
        <div className="pathshala-container">
          <h2 className="section-heading centered">पाठशाला का उद्देश्य</h2>
          <div className="objectives-grid">
            {objectives.map((obj, idx) => (
              <div key={idx} className="objective-card">
                <h3 className="objective-title">{obj.title}</h3>
                <p className="objective-description">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Learning Categories */}
      <section className="pathshala-section">
        <div className="pathshala-container">
          <h2 className="section-heading centered">पाठशाला के विभाग</h2>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-card">
                <h3 className="category-title">{cat.title}</h3>
                <p className="category-description">{cat.description}</p>
                <button className="category-btn">और जानें</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Topics */}
      <section className="pathshala-section alt-bg">
        <div className="pathshala-container">
          <h2 className="section-heading centered">विषय और पाठ</h2>
          <div className="topics-grid">
            {topics.map((topic, idx) => (
              <div key={idx} className="topic-card">
                <p className="topic-text">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: आज का विचार */}
      <section className="pathshala-section">
        <div className="pathshala-container">
          <div className="today-thought-card">
            <p className="thought-text">
              "संस्कार वही दीपक है, जो जीवन के अंधकार को ज्ञान के प्रकाश में बदल देता है।"
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: आज का प्रवचन */}
      <section className="pathshala-section alt-bg">
        <div className="pathshala-container">
          <h2 className="section-heading centered">आज का प्रवचन</h2>
          <div className="video-section">
            <div className="video-placeholder">
              <PlayCircleIcon sx={{ fontSize: '80px', color: '#D4AF37', opacity: 0.8 }} />
            </div>
            <div className="video-content">
              <h3 className="video-title">आज का प्रवचन</h3>
              <p className="video-description">
                आचार्य श्री के प्रवचनों से जीवन को सही दिशा और आत्मिक शांति प्राप्त होती है।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: बच्चों के लिए विशेष */}
      <section className="pathshala-section">
        <div className="pathshala-container">
          <h2 className="section-heading centered">बच्चों के लिए विशेष</h2>
          <p className="section-intro">
            बच्चों के लिए पाठशाला में कहानियाँ, संस्कार गीत, नैतिक शिक्षा और सरल धार्मिक ज्ञान रखा जाता है।
          </p>
          <div className="special-items-grid">
            {childrenItems.map((item, idx) => (
              <div key={idx} className="special-item-card">
                <p className="special-item-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: युवाओं के लिए विशेष */}
      <section className="pathshala-section alt-bg">
        <div className="pathshala-container">
          <h2 className="section-heading centered">युवाओं के लिए विशेष</h2>
          <p className="section-intro">
            युवाओं के लिए पाठशाला में जीवन की वास्तविक समस्याओं का समाधान दिया जाता है।
          </p>
          <div className="special-items-grid">
            {youthItems.map((item, idx) => (
              <div key={idx} className="special-item-card">
                <p className="special-item-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CTA */}
      <section className="pathshala-section">
        <div className="pathshala-container">
          <div className="cta-card">
            <h2 className="cta-heading">ज्ञान और संस्कार की इस यात्रा से जुड़ें</h2>
            <p className="cta-text">
              पाठशाला हमें धर्म को केवल सुनने नहीं, बल्कि जीवन में अपनाने की प्रेरणा देती है।
            </p>
            <button className="cta-button">पाठशाला से जुड़ें</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PathshalaPage;
