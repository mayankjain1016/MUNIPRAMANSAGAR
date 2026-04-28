import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaOm, FaSeedling, FaPray } from 'react-icons/fa';
import './Pathshala.css';

const PrashnottariPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const categories = [
    { id: 'all', name: 'सभी प्रश्न', icon: <FaQuestionCircle /> },
    { id: 'dharma', name: 'धर्म संबंधी', icon: <FaOm /> },
    { id: 'life', name: 'जीवन संबंधी', icon: <FaSeedling /> },
    { id: 'practice', name: 'साधना संबंधी', icon: <FaPray /> }
  ];

  const questionsAnswers = [
    {
      id: 1,
      category: 'dharma',
      question: 'जैन धर्म क्या है?',
      answer: 'जैन धर्म एक प्राचीन भारतीय धर्म है जो अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह जैसे पंच महाव्रतों पर आधारित है। यह आत्मा की शुद्धि और मोक्ष प्राप्ति का मार्ग दिखाता है।'
    },
    {
      id: 2,
      category: 'life',
      question: 'आधुनिक जीवन में अहिंसा का पालन कैसे करें?',
      answer: 'आधुनिक जीवन में अहिंसा का पालन करने के लिए: 1) शाकाहारी भोजन लें, 2) किसी को शारीरिक या मानसिक कष्ट न दें, 3) हिंसक विचारों से दूर रहें, 4) पर्यावरण की रक्षा करें, 5) दूसरों की मदद करें।'
    },
    {
      id: 3,
      category: 'practice',
      question: 'ध्यान कैसे करें?',
      answer: 'ध्यान करने के लिए: 1) शांत स्थान चुनें, 2) आरामदायक मुद्रा में बैठें, 3) आँखें बंद करें, 4) साँस पर ध्यान दें, 5) मन को शांत रखें, 6) धीरे-धीरे 15-20 मिनट तक करें। नियमित अभ्यास से मन शांत होता है।'
    },
    {
      id: 4,
      category: 'dharma',
      question: 'तीर्थंकर कौन होते हैं?',
      answer: 'तीर्थंकर वे महापुरुष हैं जो संसार से मोक्ष प्राप्त कर चुके हैं और अन्य जीवों को मोक्ष का मार्ग दिखाते हैं। जैन धर्म में 24 तीर्थंकर हैं, जिनमें अंतिम तीर्थंकर भगवान महावीर हैं।'
    },
    {
      id: 5,
      category: 'life',
      question: 'क्रोध कैसे नियंत्रित करें?',
      answer: 'क्रोध नियंत्रित करने के लिए: 1) गहरी साँस लें, 2) 10 तक गिनती करें, 3) स्थिति को तटस्थ रूप से देखें, 4) क्षमा का भाव रखें, 5) ध्यान और प्रार्थना करें। धीरे-धीरे यह आदत बन जाएगी।'
    },
    {
      id: 6,
      category: 'practice',
      question: 'व्रत कैसे रखें?',
      answer: 'व्रत रखने के लिए: 1) संकल्प लें, 2) शुद्ध भोजन लें, 3) अधिक पानी पिएं, 4) आराम करें, 5) प्रार्थना करें। व्रत आत्मसंयम की प्रतीक है और आत्मिक शक्ति बढ़ाता है।'
    },
    {
      id: 7,
      category: 'dharma',
      question: 'कर्म सिद्धांत क्या है?',
      answer: 'कर्म सिद्धांत के अनुसार हमारे सभी कर्म (किया, कहा और सोचा) की प्रतिक्रिया हमें मिलती है। अच्छे कर्म से पुण्य और बुरे कर्म से पाप लगता है। कर्म से मुक्ति के लिए साधना आवश्यक है।'
    },
    {
      id: 8,
      category: 'life',
      question: 'सच्ची मित्रता कैसे पहचानें?',
      answer: 'सच्ची मित्रता की पहचान: 1) आपकी खुशी में खुश होना, 2) कठिन समय में साथ देना, 3) सच्चाई बोलना, 4) आपके हित में सलाह देना, 5) बिना स्वार्थ के मदद करना।'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const filteredQuestions = selectedCategory === 'all' 
    ? questionsAnswers 
    : questionsAnswers.filter(item => item.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>प्रश्नोत्तरी</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">प्रश्नोत्तरी</h1>
          <p className="pathshala-subtitle">धर्म और जीवन से जुड़े प्रश्नों के उत्तर</p>
          <p className="pathshala-description">
            जीवन की जिज्ञासाओं का समाधान और धार्मिक संदेहों का निराकरण। यहाँ आप अपने सभी प्रश्नों के उत्तर पा सकते हैं।
          </p>
        </section>

        {/* Category Filter */}
        <section className="qa-categories">
          <div className="qa-categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`qa-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="qa-category-icon">{category.icon}</span>
                <span className="qa-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Questions & Answers */}
        <section className="pathshala-sections">
          <div className="qa-container">
            {filteredQuestions.map((qa) => (
              <div key={qa.id} className="qa-item">
                <div 
                  className="qa-question"
                  onClick={() => toggleQuestion(qa.id)}
                >
                  <div className="qa-question-header">
                    <span className="qa-category-tag">
                      {categories.find(cat => cat.id === qa.category)?.name}
                    </span>
                    <span className="qa-toggle-icon">
                      {expandedQuestion === qa.id ? '−' : '+'}
                    </span>
                  </div>
                  <h3 className="qa-question-text">{qa.question}</h3>
                </div>
                
                {expandedQuestion === qa.id && (
                  <div className="qa-answer">
                    <p className="qa-answer-text">{qa.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">और प्रश्न हैं?</h2>
              <p className="card-text">
                यदि आपके मन में और कोई प्रश्न हैं या आप विशेष मार्गदर्शन चाहते हैं, तो कृपया संपर्क करें। हम आपकी मदद करने के लिए सदैव तैयार हैं।
              </p>
              <button className="contact-btn">संपर्क करें</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PrashnottariPage;
