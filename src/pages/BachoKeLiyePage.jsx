import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';

const BachoKeLiyePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी सामग्री', icon: '👶' },
    { id: 'stories', name: 'कहानियाँ', icon: '📚' },
    { id: 'teachings', name: 'शिक्षाएँ', icon: '🎓' },
    { id: 'activities', name: 'गतिविधियाँ', icon: '🎮' }
  ];

  const childrenContent = [
    {
      id: 1,
      category: 'stories',
      title: 'रानी केला की कहानी',
      content: 'एक समय की बात है, एक जंगल में एक रानी केला नाम की बिल्ली रहती थी। वह बहुत अच्छी और दयालु थी। एक दिन...',
      moral: 'दया और अच्छाई का फल हमेशा अच्छा मिलता है।',
      ageGroup: '5-8 साल'
    },
    {
      id: 2,
      category: 'teachings',
      title: 'सच्चाई की शक्ति',
      content: 'सच्चाई बोलने से मन में शांति मिलती है। झूठ बोलने से मन अशांत हो जाता है और आत्मा दुखी होती है।',
      moral: 'हमेशा सच्चाई बोलो, इससे आत्मा की शुद्धि होती है।',
      ageGroup: '6-10 साल'
    },
    {
      id: 3,
      category: 'activities',
      title: 'अहिंसा का अभ्यास',
      content: 'आज का अभ्यास: पूरे दिन कोई भी कीड़ा-मकोड़ा न मारना। छोटे जीवों की रक्षा करना।',
      moral: 'सभी जीवों के प्रति दया रखना अहिंसा है।',
      ageGroup: '4-12 साल'
    },
    {
      id: 4,
      category: 'stories',
      title: 'तीर्थंकरों की बाल कहानियाँ',
      content: 'भगवान महावीर बचपन में बहुत ही दयालु थे। वे कभी किसी को दुख नहीं पहुँचाते थे...',
      moral: 'बचपन से ही अच्छे संस्कार विकसित करना चाहिए।',
      ageGroup: '7-12 साल'
    },
    {
      id: 5,
      category: 'teachings',
      title: 'माता-पिता का सम्मान',
      content: 'माता-पिता हमारे सबसे बड़े गुरु हैं। उनका सम्मान करना और उनकी सेवा करना हमारा धर्म है।',
      moral: 'माता-पिता की सेवा से पुण्य की प्राप्ति होती है।',
      ageGroup: '5-15 साल'
    },
    {
      id: 6,
      category: 'activities',
      title: 'दान का आनंद',
      content: 'आज कुछ भी दान करो - भोजन, कपड़े, या अपनी खुशी। दान देने से मन प्रसन्न होता है।',
      moral: 'दान से आत्मा की शुद्धि होती है।',
      ageGroup: '6-14 साल'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredContent = selectedCategory === 'all' 
    ? childrenContent 
    : childrenContent.filter(item => item.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>बच्चों के लिए</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">बच्चों के लिए</h1>
          <p className="pathshala-subtitle">सरल कहानियाँ और मूल्यवान शिक्षाएँ</p>
          <p className="pathshala-description">
            बच्चों के लिए पाठशाला में कहानियों, शिक्षाओं और गतिविधियों के माध्यम से अच्छे संस्कार विकसित किए जाते हैं।
          </p>
        </section>

        {/* Category Filter */}
        <section className="children-categories">
          <div className="children-categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`children-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="children-category-icon">{category.icon}</span>
                <span className="children-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Children Content Grid */}
        <section className="pathshala-sections">
          <div className="children-content-grid">
            {filteredContent.map((item) => (
              <div key={item.id} className="children-content-card">
                <div className="children-card-header">
                  <h3 className="children-card-title">{item.title}</h3>
                  <div className="children-card-category">
                    {categories.find(cat => cat.id === item.category)?.name}
                  </div>
                  <div className="children-age-group">
                    उम्र: {item.ageGroup}
                  </div>
                </div>
                
                <div className="children-card-content">
                  <div className="children-content-text">
                    {item.content}
                  </div>
                  
                  <div className="children-moral">
                    <strong>संदेश:</strong> {item.moral}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Message */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">बच्चों को संदेश</h2>
              <p className="card-text">
                बच्चो! तुम सब बहुत खास हो। अपने जीवन में सच्चाई, अहिंसा, दया और सेवा जैसे गुण विकसित करो। ये गुण तुम्हें जीवन में सफल और प्रसन्न बनाएँगे।
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default BachoKeLiyePage;