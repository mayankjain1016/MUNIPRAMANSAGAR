import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';

const MantraPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mantraCategories = [
    { id: 'all', name: 'सभी मंत्र', icon: '📿' },
    { id: 'navkar', name: 'नवकार मंत्र', icon: '🙏' },
    { id: 'aarti', name: 'आरती', icon: '🪔' },
    { id: 'stotra', name: 'स्तोत्र', icon: '📖' },
    { id: 'prayer', name: 'प्रार्थना', icon: '🤲' }
  ];

  const mantras = [
    {
      id: 1,
      category: 'navkar',
      title: 'नवकार मंत्र',
      sanskrit: 'णमो अरिहंताणं णमो सिद्धाणं णमो आयरियाणं णमो उवज्झायाणं णमो लोए सव्व साहूणं एसो पंच णमोक्कारो सव्व पावप्पणासणो मंगलं च सव्वेसिं पडमम हवई मंगलं॥',
      hindi: 'नमो अरिहंतों को, नमो सिद्धों को, नमो आचार्यों को, नमो उपाध्यायों को, नमो समस्त साधुओं को। यह पंच नमस्कार सर्व पापों का नाशक है और सभी के लिए मंगलकारी है।',
      meaning: 'यह मंत्र जैन धर्म का मूल मंत्र है जो अरिहंत, सिद्ध, आचार्य, उपाध्याय और साधु-साध्वियों को नमन करता है।',
      benefit: 'इस मंत्र का जाप करने से पाप नष्ट होते हैं और पुण्य की प्राप्ति होती है।'
    },
    {
      id: 2,
      category: 'aarti',
      title: 'श्री महावीर आरती',
      sanskrit: 'जय महावीर स्वामी, जय महावीर स्वामी...',
      hindi: 'जय महावीर स्वामी, जिनेंद्र देव, करुणा सागर, मोक्ष प्रदाता...',
      meaning: 'महावीर स्वामी की महिमा का गान।',
      benefit: 'शांति और आध्यात्मिक ऊर्जा प्राप्त होती है।'
    },
    {
      id: 3,
      category: 'stotra',
      title: 'श्री आदिनाथ स्तोत्र',
      sanskrit: 'वंदे आदिनाथं जिनं...',
      hindi: 'आदिनाथ जिनेंद्र को वंदना करता हूँ...',
      meaning: 'पहले तीर्थंकर आदिनाथ की स्तुति।',
      benefit: 'ज्ञान और भक्ति की प्राप्ति होती है।'
    },
    {
      id: 4,
      category: 'prayer',
      title: 'प्रार्थना मंत्र',
      sanskrit: 'मिच्छामि दukkadam...',
      hindi: 'मैं दुक्कड़म माँगता हूँ...',
      meaning: 'पापों के लिए क्षमा माँगने की प्रार्थना।',
      benefit: 'मन की शुद्धि और शांति मिलती है।'
    },
    {
      id: 5,
      category: 'navkar',
      title: 'भक्तामर स्तोत्र',
      sanskrit: 'भक्तामर स्तोत्र...',
      hindi: 'भक्तों का अमर स्तोत्र...',
      meaning: 'भक्तों की भक्ति का वर्णन।',
      benefit: 'भक्ति की भावना बढ़ती है।'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredMantras = selectedCategory === 'all' 
    ? mantras 
    : mantras.filter(mantra => mantra.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>मंत्र संग्रह</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">मंत्र संग्रह</h1>
          <p className="pathshala-subtitle">पवित्र मंत्र और उनकी दिव्य शक्ति</p>
          <p className="pathshala-description">
            जैन धर्म के पवित्र मंत्र मन को शुद्ध करते हैं, आत्मा को ऊर्जा देते हैं और जीवन को आध्यात्मिक दिशा प्रदान करते हैं।
          </p>
        </section>

        {/* Category Filter */}
        <section className="mantra-categories">
          <div className="categories-filter">
            {mantraCategories.map((category) => (
              <button
                key={category.id}
                className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Mantras Grid */}
        <section className="pathshala-sections">
          <div className="mantras-grid">
            {filteredMantras.map((mantra) => (
              <div key={mantra.id} className="mantra-card">
                <div className="mantra-header">
                  <h3 className="mantra-title">{mantra.title}</h3>
                  <div className="mantra-category">{mantraCategories.find(cat => cat.id === mantra.category)?.name}</div>
                </div>
                
                <div className="mantra-content">
                  <div className="mantra-section">
                    <h4 className="section-label">संस्कृत:</h4>
                    <p className="mantra-text sanskrit">{mantra.sanskrit}</p>
                  </div>
                  
                  <div className="mantra-section">
                    <h4 className="section-label">हिंदी:</h4>
                    <p className="mantra-text hindi">{mantra.hindi}</p>
                  </div>
                  
                  <div className="mantra-section">
                    <h4 className="section-label">अर्थ:</h4>
                    <p className="mantra-meaning">{mantra.meaning}</p>
                  </div>
                  
                  <div className="mantra-section">
                    <h4 className="section-label">लाभ:</h4>
                    <p className="mantra-benefit">{mantra.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MantraPage;