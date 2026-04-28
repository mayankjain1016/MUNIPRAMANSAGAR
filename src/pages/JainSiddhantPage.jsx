import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';

const JainSiddhantPage = () => {
  const navigate = useNavigate();

  const jainPrinciples = [
    {
      title: 'अहिंसा (Ahimsa)',
      description: 'सर्व जीवों के प्रति अहिंसा का भाव रखना। किसी भी जीव को पीड़ा न पहुँचाना।',
      details: 'अहिंसा जैन धर्म की सबसे महत्वपूर्ण सिद्धांत है। यह न केवल शारीरिक हिंसा से दूर रहने का अर्थ रखती है, बल्कि मन की हिंसा, वाणी की हिंसा और कर्म की हिंसा से भी बचने की शिक्षा देती है।'
    },
    {
      title: 'सत्य (Satya)',
      description: 'सच्चाई बोलना और सच्चाई का पालन करना।',
      details: 'सत्य बोलने से आत्मा की शुद्धि होती है। झूठ बोलने से आत्मा में अशुद्धि आती है और कर्मबंधन बढ़ता है।'
    },
    {
      title: 'अस्तेय (Asteya)',
      description: 'चोरी न करना और दूसरों की संपत्ति पर अधिकार न जमाना।',
      details: 'अस्तेय का अर्थ है कि जो कुछ भी हमारा नहीं है, उस पर अधिकार न जमाएँ। यह आर्थिक नैतिकता की नींव है।'
    },
    {
      title: 'ब्रह्मचर्य (Brahmacharya)',
      description: 'संयम और पवित्रता का पालन करना।',
      details: 'ब्रह्मचर्य का अर्थ है इंद्रियों पर नियंत्रण रखना और जीवन को पवित्र बनाना। यह आत्मिक ऊर्जा को संरक्षित करने की विधि है।'
    },
    {
      title: 'अपरिग्रह (Aparigraha)',
      description: 'अत्यधिक संपत्ति और आसक्तियों से दूर रहना।',
      details: 'अपरिग्रह का अर्थ है आवश्यकता से अधिक वस्तुओं को न जमा करना। इससे मन की शांति और आत्मिक विकास होता है।'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>जैन सिद्धांत</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">जैन सिद्धांत</h1>
          <p className="pathshala-subtitle">धर्म, ज्ञान और नैतिकता की नींव</p>
          <p className="pathshala-description">
            जैन सिद्धांत जीवन को सही दिशा देने वाले मूलभूत नियम हैं। इन सिद्धांतों का पालन करके मनुष्य आत्मिक विकास कर सकता है और समाज में शांति ला सकता है।
          </p>
        </section>

        {/* Main Content */}
        <section className="pathshala-sections">
          <div className="principles-grid">
            {jainPrinciples.map((principle, index) => (
              <div key={index} className="principle-card">
                <div className="principle-number">{index + 1}</div>
                <h3 className="principle-title">{principle.title}</h3>
                <p className="principle-description">{principle.description}</p>
                <div className="principle-details">
                  <p>{principle.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">जैन सिद्धांतों का महत्व</h2>
              <p className="card-text">
                जैन सिद्धांत न केवल धार्मिक नियम हैं, बल्कि ये जीवन जीने की कला भी हैं। इनका पालन करके व्यक्ति न केवल अपना कल्याण करता है, बल्कि समाज और विश्व का भी कल्याण करता है। ये सिद्धांत समय की कसौटी पर खरे उतरे हैं और आज भी उतने ही प्रासंगिक हैं जितने प्राचीन काल में थे।
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default JainSiddhantPage;