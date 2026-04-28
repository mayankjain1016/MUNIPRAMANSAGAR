import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';

const VratParvPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी व्रत और पर्व', icon: '🪔' },
    { id: 'vrat', name: 'व्रत और उपवास', icon: '🌙' },
    { id: 'parv', name: 'पर्व और त्योहार', icon: '🎉' },
    { id: 'muhurat', name: 'मुहूर्त और रीति', icon: '📅' }
  ];

  const vratParvItems = [
    {
      id: 1,
      category: 'parv',
      title: 'महावीर जयंती',
      date: 'चैत्र मास की शुक्ल पक्ष की त्रयोदशी',
      description: 'भगवान महावीर की जन्म जयंती का पर्व।',
      significance: 'महावीर स्वामी के जीवन और शिक्षाओं का स्मरण।',
      rituals: 'मंदिर में पूजा, प्रवचन, दान और भोजन बाँटना।',
      fasting: 'कई लोग उपवास रखते हैं।'
    },
    {
      id: 2,
      category: 'parv',
      title: 'पार्श्वनाथ जयंती',
      date: 'भाद्रपद मास की शुक्ल पक्ष की पंचमी',
      description: 'पार्श्वनाथ की जन्म जयंती।',
      significance: 'पार्श्वनाथ के त्याग और ज्ञान का स्मरण।',
      rituals: 'पूजा, आरती और प्रसाद वितरण।',
      fasting: 'वैकल्पिक उपवास।'
    },
    {
      id: 3,
      category: 'vrat',
      title: 'अयम्बिल ओलि',
      date: 'कार्तिक मास की अमावस्या से पूर्णिमा तक',
      description: 'आठ दिनों का विशेष व्रत।',
      significance: 'आत्म शुद्धि और संयम का अभ्यास।',
      rituals: 'दैनिक पूजा, स्वाध्याय और ध्यान।',
      fasting: 'पूरे आठ दिनों का उपवास।'
    },
    {
      id: 4,
      category: 'vrat',
      title: 'पंचदशन व्रत',
      date: 'हर महीने की शुक्ल और कृष्ण पक्ष की पंद्रहवीं',
      description: 'पंद्रह दिनों का व्रत।',
      significance: 'मन की शुद्धि और आत्मिक विकास।',
      rituals: 'पूजा, जाप और दान।',
      fasting: 'पंद्रह दिनों तक विशेष आहार।'
    },
    {
      id: 5,
      category: 'parv',
      title: 'दिवाली',
      date: 'कार्तिक मास की अमावस्या',
      description: 'प्रकाश पर्व।',
      significance: 'अंधकार पर प्रकाश की विजय।',
      rituals: 'दीप प्रज्ज्वलन, मिष्ठान और उपहार।',
      fasting: 'वैकल्पिक उपवास।'
    },
    {
      id: 6,
      category: 'muhurat',
      title: 'पर्व काल',
      date: 'विविध समय',
      description: 'पवित्र अवसरों का समय।',
      significance: 'आध्यात्मिक क्रियाओं के लिए शुभ समय।',
      rituals: 'पूजा, दान और साधना।',
      fasting: 'व्रत रखने का उत्तम समय।'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredItems = selectedCategory === 'all' 
    ? vratParvItems 
    : vratParvItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>व्रत और पर्व</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">व्रत और पर्व</h1>
          <p className="pathshala-subtitle">पवित्र व्रत और दिव्य पर्व</p>
          <p className="pathshala-description">
            जैन धर्म के व्रत और पर्व आत्मिक विकास के अवसर हैं। ये हमें संयम, त्याग और भक्ति की शिक्षा देते हैं।
          </p>
        </section>

        {/* Category Filter */}
        <section className="vrat-parv-categories">
          <div className="vp-categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`vp-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="vp-category-icon">{category.icon}</span>
                <span className="vp-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Vrat Parv Grid */}
        <section className="pathshala-sections">
          <div className="vrat-parv-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="vrat-parv-card">
                <div className="vp-card-header">
                  <h3 className="vp-card-title">{item.title}</h3>
                  <div className="vp-card-category">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </div>
                </div>
                
                <div className="vp-card-content">
                  <div className="vp-detail">
                    <strong>दिनांक:</strong> {item.date}
                  </div>
                  
                  <div className="vp-detail">
                    <strong>विवरण:</strong> {item.description}
                  </div>
                  
                  <div className="vp-detail">
                    <strong>महत्व:</strong> {item.significance}
                  </div>
                  
                  <div className="vp-detail">
                    <strong>रीति-रिवाज:</strong> {item.rituals}
                  </div>
                  
                  <div className="vp-detail">
                    <strong>उपवास:</strong> {item.fasting}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">व्रत का महत्व</h2>
              <p className="card-text">
                व्रत आत्मसंयम की प्रतीक है। यह हमें सिखाता है कि इंद्रियों पर नियंत्रण कैसे रखा जाए और मन को कैसे शुद्ध बनाया जाए। पर्व हमें सामूहिक भक्ति और उत्सव का अवसर देते हैं।
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default VratParvPage;