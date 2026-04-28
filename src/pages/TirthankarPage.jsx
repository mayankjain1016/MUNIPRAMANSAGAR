import React from 'react';
import { useNavigate } from 'react-router-dom';
import tirthankarData from '../data/tirthankarData';
import './Pathshala.css';

const TirthankarPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const handleReadMore = (slug) => {
    navigate(`/pathshala/tirthankar/${slug}`);
  };

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt;
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt;
          <span>24 तीर्थंकर</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">24 तीर्थंकर</h1>
          <p className="pathshala-subtitle">मोक्ष के मार्गदर्शक और ज्ञान के प्रकाश</p>
          <p className="pathshala-description">
            24 तीर्थंकर जैन धर्म के सर्वोच्च आध्यात्मिक गुरु हैं। उन्होंने संसार से मोक्ष प्राप्त किया और अन्य जीवों को भी मोक्ष का मार्ग दिखाया।
          </p>
        </section>

        {/* Tirthankars Grid */}
        <section className="pathshala-sections">
          <div className="tirthankar-listing-grid">
            {tirthankarData.map((tirthankar) => (
              <div key={tirthankar.number} className="tirthankar-listing-card">
                <div className="tirthankar-listing-header">
                  <div className="tirthankar-number-badge">{tirthankar.number}</div>
                  <div className="tirthankar-lanchhan">{tirthankar.lanchhan}</div>
                </div>
                <h3 className="tirthankar-listing-name">{tirthankar.name}</h3>
                <button
                  className="read-more-btn"
                  onClick={() => handleReadMore(tirthankar.slug)}
                >
                  विस्तार से पढ़ें
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default TirthankarPage;