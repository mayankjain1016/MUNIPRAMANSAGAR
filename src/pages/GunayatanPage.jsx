import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiPeaceDove, GiScales, GiOpenPalm, GiLotusFlower, GiYinYang } from 'react-icons/gi';
import './Gunayatan.css';
import gunayatanImg from '../assets/Gunayatan_img.jpeg';

const GunayatanPage = () => {
  const navigate = useNavigate();

  const principles = [
    {
      title: 'अहिंसा',
      description: 'अहिंसा का अर्थ है किसी भी जीव को विचार, वाणी या कर्म से हानि न पहुँचाना।',
      icon: <GiPeaceDove />,
    },
    {
      title: 'सत्य',
      description: 'सत्य का अर्थ है सच्चाई और ईमानदारी के साथ जीवन जीना।',
      icon: <GiScales />,
    },
    {
      title: 'अपरिग्रह',
      description: 'अपरिग्रह का अर्थ है आवश्यकता से अधिक संग्रह न करना।',
      icon: <GiOpenPalm />,
    },
    {
      title: 'क्षमा',
      description: 'क्षमा मन को शांत और निर्मल बनाती है।',
      icon: <GiLotusFlower />,
    },
    {
      title: 'संयम',
      description: 'संयम जीवन को अनुशासित और श्रेष्ठ बनाता है।',
      icon: <GiYinYang />,
    },
  ];

  const importance = [
    { title: 'आत्मिक शांति', desc: 'गुणायतन व्यक्ति को शांति और स्थिरता प्रदान करता है।' },
    { title: 'धर्म और संस्कार', desc: 'यह स्थान धार्मिक मूल्यों को जीवन में अपनाने की प्रेरणा देता है।' },
    { title: 'साधना का मार्ग', desc: 'यह ध्यान और आत्मचिंतन के लिए श्रेष्ठ वातावरण प्रदान करता है।' },
    { title: 'सकारात्मक जीवन', desc: 'यह नकारात्मकता को दूर करके सकारात्मक सोच विकसित करता है।' },
    { title: 'गुरु मार्गदर्शन', desc: 'यह संतों और आचार्यों के माध्यम से जीवन को दिशा देता है।' },
  ];

  const experiences = [
    'ध्यान और आत्मचिंतन',
    'धार्मिक प्रवचन',
    'जैन साहित्य अध्ययन',
    'संस्कार शिक्षा',
    'सेवा और समर्पण',
    'आत्मिक शुद्धि',
  ];

  return (
    <div className="gunayatan-page">
      {/* Hero Section */}
      <section className="gunayatan-hero" style={{ backgroundImage: `url(${gunayatanImg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">गुणायतन</h1>
          <p className="hero-subtitle">आत्मिक गुणों, साधना और शांति का पवित्र केंद्र</p>
          <p className="hero-description">
            गुणायतन एक ऐसा पवित्र स्थान है जहाँ मनुष्य अपने जीवन में सद्गुणों, संयम, साधना और आत्मिक शांति को अनुभव करता है।
          </p>
        </div>
      </section>

      {/* About Section 1 */}
      <section className="gunayatan-section">
        <div className="section-container">
          <div className="content-card">
            <h2 className="section-heading">गुणायतन क्या है?</h2>
            <p className="section-text">
              गुणायतन शब्द दो भावों से मिलकर बना है — "गुण" और "आयतन"। गुण का अर्थ है अच्छे संस्कार, सदाचार, करुणा, अहिंसा, संयम और आत्मिक पवित्रता। आयतन का अर्थ है स्थान या आधार। इस प्रकार गुणायतन का अर्थ है ऐसा पवित्र स्थान जहाँ आत्मा के गुणों का विकास हो।
            </p>
            <p className="section-text">
              जैन धर्म में गुणों का बहुत बड़ा महत्व है। मनुष्य का जीवन तभी सफल माना जाता है जब वह अपने अंदर अहिंसा, सत्य, अपरिग्रह, क्षमा, विनय और संयम जैसे गुणों को विकसित करता है। गुणायतन इन्हीं दिव्य गुणों की साधना और अनुभव का केंद्र है।
            </p>
          </div>
        </div>
      </section>

      {/* About Section 2 */}
      <section className="gunayatan-section alt-bg">
        <div className="section-container">
          <h2 className="section-heading">गुणायतन का वास्तविक अर्थ</h2>
          <p className="section-text">
            गुणायतन का अर्थ है — गुणों का निवास स्थान। यह वह स्थान है जहाँ व्यक्ति अपने अंदर छिपे हुए अच्छे गुणों को पहचानता है और उन्हें अपने आचरण में उतारने का प्रयास करता है। यहाँ धर्म केवल पढ़ने या सुनने की वस्तु नहीं रहता, बल्कि जीवन जीने का तरीका बन जाता है।
          </p>
          <p className="section-text">
            यह स्थान हमें यह सिखाता है कि वास्तविक सुंदरता बाहरी चीजों में नहीं, बल्कि हमारे विचारों, व्यवहार और आत्मा की पवित्रता में होती है।
          </p>
        </div>
      </section>

      {/* Acharya Section */}
      <section className="gunayatan-section">
        <div className="section-container">
          <div className="content-card">
            <h2 className="section-heading">आचार्य श्री निर्भय सागर जी महाराज का मार्गदर्शन</h2>
            <p className="section-text">
              आचार्य श्री निर्भय सागर जी महाराज का जीवन संयम, साधना और आत्मकल्याण का प्रेरणादायक उदाहरण है। उनके उपदेश मनुष्य को सरल जीवन, पवित्र विचार और धर्ममय आचरण की ओर प्रेरित करते हैं।
            </p>
            <p className="section-text">
              गुणायतन जैसे पवित्र विचारों का उद्देश्य भी यही है कि व्यक्ति अपने अंदर के दोषों को कम करे और गुणों को बढ़ाए। आचार्य श्री का मार्गदर्शन हमें यह समझाता है कि जीवन का वास्तविक उद्देश्य केवल भौतिक सफलता नहीं, बल्कि आत्मा की शुद्धि और मोक्ष मार्ग की ओर बढ़ना है।
            </p>
          </div>
        </div>
      </section>

      {/* Jain Principles Section */}
      <section className="gunayatan-section alt-bg">
        <div className="section-container">
          <h2 className="section-heading centered">जैन धर्म के मूल सिद्धांत</h2>
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <div className="principle-card" key={index}>
                <div className="principle-icon">{principle.icon}</div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-desc">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="gunayatan-section">
        <div className="section-container">
          <h2 className="section-heading centered">गुणायतन का महत्व</h2>
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
      <section className="gunayatan-section alt-bg">
        <div className="section-container">
          <h2 className="section-heading centered">गुणायतन में क्या अनुभव किया जा सकता है?</h2>
          <div className="experience-grid">
            {experiences.map((exp, index) => (
              <div className="experience-card" key={index}>
                <p className="experience-text">{exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="section-container">
          <div className="quote-content">
            <div className="quote-mark">"</div>
            <p className="quote-text">
              सच्ची शांति बाहर की वस्तुओं में नहीं, अपने भीतर के निर्मल भावों में मिलती है।
            </p>
            <p className="quote-text">
              धर्म केवल पूजा का विषय नहीं, बल्कि जीवन जीने की पवित्र कला है।
            </p>
            <div className="quote-mark">"</div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gunayatan-section">
        <div className="section-container">
          <h2 className="section-heading centered">गुणायतन की झलकियाँ</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="gallery-item" key={item}>
                <div className="gallery-placeholder">छवि {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2 className="cta-heading">आइए, गुणों के मार्ग पर एक कदम आगे बढ़ाएँ</h2>
            <p className="cta-text">
              गुणायतन हमें यह प्रेरणा देता है कि हम अपने जीवन में अच्छे विचार, पवित्र आचरण और धर्ममय जीवन को अपनाएँ।
            </p>
            <button className="cta-button" onClick={() => navigate('/')}>
              और जानें
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GunayatanPage;
