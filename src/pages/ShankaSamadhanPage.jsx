import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import './ShankaSamadhan.css';

const ShankaSamadhanPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(8);

  const allQuestions = [
    {
      id: 1,
      slug: 'krodh-se-mukti',
      question: 'क्रोध से मुक्ति कैसे पाएँ?',
      category: 'मानसिक शांति'
    },
    {
      id: 2,
      slug: 'nirnay-kaise-len',
      question: 'निर्णय कैसे लें?',
      category: 'जीवन कौशल'
    },
    {
      id: 3,
      slug: 'branded-saman-se-bache',
      question: 'युवा वर्ग ब्रांडेड सामान को पाने की दौड़ और चकाचौंध से कैसे बचें?',
      category: 'युवा मार्गदर्शन'
    },
    {
      id: 4,
      slug: 'mansik-ashanti-door-kare',
      question: 'मानसिक अशांति कैसे दूर करें?',
      category: 'मानसिक शांति'
    },
    {
      id: 5,
      slug: 'nirasha-me-parivartan',
      question: 'क्या निराशा और लाचारी में किया गया परिवर्तन स्थायी होता है?',
      category: 'आत्म विकास'
    },
    {
      id: 6,
      slug: 'sanyam-kaise-rakhe',
      question: 'संयम कैसे रखें?',
      category: 'आध्यात्मिक साधना'
    },
    {
      id: 7,
      slug: 'nirbhay-kaise-ho',
      question: 'निर्भय कैसे हों?',
      category: 'आत्मविश्वास'
    },
    {
      id: 8,
      slug: 'ahankaar-kam-kare',
      question: 'अहंकार को कैसे कम करें?',
      category: 'आध्यात्मिक साधना'
    },
    {
      id: 9,
      slug: 'buri-sangati-se-bache',
      question: 'बुरी संगति से कैसे बचें?',
      category: 'जीवन कौशल'
    },
    {
      id: 10,
      slug: 'mobile-sanyam',
      question: 'मोबाइल और सोशल मीडिया का संयम कैसे रखें?',
      category: 'युवा मार्गदर्शन'
    },
    {
      id: 11,
      slug: 'mata-pita-samman',
      question: 'माता-पिता का सम्मान क्यों जरूरी है?',
      category: 'पारिवारिक मूल्य'
    },
    {
      id: 12,
      slug: 'dhairya-kaise-rakhe',
      question: 'जीवन में धैर्य कैसे रखें?',
      category: 'मानसिक शांति'
    },
    {
      id: 13,
      slug: 'irshya-se-bache',
      question: 'ईर्ष्या से कैसे बचें?',
      category: 'आत्म विकास'
    },
    {
      id: 14,
      slug: 'asafalta-se-seekh',
      question: 'असफलता से सीख कैसे लें?',
      category: 'जीवन कौशल'
    },
    {
      id: 15,
      slug: 'man-shant-kaise-rakhe',
      question: 'मन को शांत कैसे रखें?',
      category: 'मानसिक शांति'
    },
    {
      id: 16,
      slug: 'kshama-kyu-jaruri',
      question: 'क्षमा करना क्यों जरूरी है?',
      category: 'आध्यात्मिक साधना'
    },
    {
      id: 17,
      slug: 'achhi-aadate-kaise-vikasit-kare',
      question: 'अच्छी आदतें कैसे विकसित करें?',
      category: 'आत्म विकास'
    },
    {
      id: 18,
      slug: 'dharm-jivan-me-kaise-apnaye',
      question: 'धर्म को जीवन में कैसे अपनाएँ?',
      category: 'आध्यात्मिक साधना'
    },
    {
      id: 19,
      slug: 'aatmvishwas-kaise-badhaye',
      question: 'आत्मविश्वास कैसे बढ़ाएँ?',
      category: 'आत्मविश्वास'
    },
    {
      id: 20,
      slug: 'samay-prabandhan',
      question: 'समय का सही उपयोग कैसे करें?',
      category: 'जीवन कौशल'
    },
    {
      id: 21,
      slug: 'bhay-se-mukti',
      question: 'भय से मुक्ति कैसे पाएँ?',
      category: 'मानसिक शांति'
    },
    {
      id: 22,
      slug: 'satya-ka-palan',
      question: 'सत्य का पालन कैसे करें?',
      category: 'नैतिक मूल्य'
    },
    {
      id: 23,
      slug: 'ahimsa-ka-palan',
      question: 'अहिंसा का पालन कैसे करें?',
      category: 'जैन सिद्धांत'
    },
    {
      id: 24,
      slug: 'jeevan-ka-lakshya',
      question: 'जीवन का लक्ष्य कैसे निर्धारित करें?',
      category: 'जीवन कौशल'
    }
  ];

  const visibleQuestions = allQuestions.slice(0, visibleCount);
  const hasMore = visibleCount < allQuestions.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, allQuestions.length));
  };

  const handleQuestionClick = (slug) => {
    navigate(`/shanka-samadhan/${slug}`);
  };

  return (
    <div className="shanka-samadhan-page">
      <div className="shanka-container">
        
        {/* Breadcrumb */}
        <div className="shanka-breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span>शंका समाधान</span>
        </div>

        {/* Hero Section */}
        <section className="shanka-hero">
          <div className="shanka-icon-wrapper">
            <FaQuestionCircle />
          </div>
          <h1 className="shanka-title">शंका समाधान</h1>
          <p className="shanka-subtitle">जीवन की उलझनों का आध्यात्मिक समाधान</p>
          <p className="shanka-description">
            यहाँ आपको जीवन की विभिन्न समस्याओं, आध्यात्मिक जिज्ञासाओं और धार्मिक प्रश्नों के गहन उत्तर मिलेंगे। प्रत्येक उत्तर जैन दर्शन और व्यावहारिक जीवन के संदर्भ में दिया गया है।
          </p>
        </section>

        {/* Questions Grid */}
        <section className="shanka-questions-section">
          <div className="questions-grid">
            {visibleQuestions.map((item) => (
              <div 
                key={item.id} 
                className="question-card"
                onClick={() => handleQuestionClick(item.slug)}
              >
                <div className="question-category">{item.category}</div>
                <h3 className="question-text">{item.question}</h3>
                <div className="question-arrow">
                  <span>उत्तर पढ़ें</span>
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                और देखें
              </button>
              <p className="questions-count">
                {visibleCount} में से {allQuestions.length} प्रश्न दिखाए गए
              </p>
            </div>
          )}

          {/* All Loaded Message */}
          {!hasMore && (
            <div className="all-loaded-message">
              <p>सभी {allQuestions.length} प्रश्न दिखाए गए हैं</p>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="shanka-contact-section">
          <div className="contact-card">
            <h2>और प्रश्न हैं?</h2>
            <p>यदि आपके मन में कोई और प्रश्न है जो यहाँ सूचीबद्ध नहीं है, तो कृपया हमसे संपर्क करें। हम आपकी शंकाओं का समाधान करने के लिए सदैव तत्पर हैं।</p>
            <button className="contact-btn" onClick={() => navigate('/contact')}>
              संपर्क करें
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ShankaSamadhanPage;
