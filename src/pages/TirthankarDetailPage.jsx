import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tirthankarData from '../data/tirthankarData';
import './Pathshala.css';

const TirthankarDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const tirthankar = tirthankarData.find(t => t.slug === slug);

  if (!tirthankar) {
    return (
      <div className="pathshala-page">
        <div className="pathshala-container">
          <h1>तीर्थंकर नहीं मिला</h1>
          <button onClick={() => navigate('/pathshala/tirthankar')}>वापस जाएँ</button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/pathshala/tirthankar');
  };

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt;
          <span onClick={() => navigate('/pathshala')} style={{cursor: 'pointer'}}>पाठशाला</span> &gt;
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>24 तीर्थंकर</span> &gt;
          <span>{tirthankar.name}</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← 24 तीर्थंकर वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <div className="tirthankar-detail-header">
            <div className="tirthankar-detail-symbol">{tirthankar.lanchhan}</div>
            <div className="tirthankar-detail-info">
              <div className="tirthankar-detail-number">{tirthankar.number}</div>
              <h1 className="tirthankar-detail-name">{tirthankar.name}</h1>
              <p className="tirthankar-detail-subtitle">जैन धर्म के {tirthankar.number}वें तीर्थंकर</p>
            </div>
          </div>
        </section>

        {/* Tirthankar Details */}
        <section className="pathshala-sections">
          <div className="tirthankar-detail-content">
            <div className="detail-card">
              <h2 className="detail-title">परिचय</h2>
              <p className="detail-text">
                {tirthankar.name} जैन धर्म के {tirthankar.number}वें तीर्थंकर हैं। वे मोक्ष के मार्गदर्शक और ज्ञान के प्रकाश हैं।
              </p>
            </div>

            <div className="detail-card">
              <h2 className="detail-title">लांछन (प्रतीक)</h2>
              <div className="lanchhan-display">
                <span className="lanchhan-symbol">{tirthankar.lanchhan}</span>
                <p className="lanchhan-description">
                  {tirthankar.name} का लांछन {tirthankar.lanchhan} है, जो उनकी विशिष्ट पहचान का प्रतीक है।
                </p>
              </div>
            </div>

            <div className="detail-card">
              <h2 className="detail-title">महत्व</h2>
              <p className="detail-text">
                तीर्थंकर संसार से मोक्ष प्राप्त करने वाले सर्वोच्च आध्यात्मिक गुरु हैं। उन्होंने अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह जैसे मार्गों से मोक्ष प्राप्त किया और अन्य जीवों को भी यह मार्ग दिखाया।
              </p>
            </div>

            <div className="detail-card">
              <h2 className="detail-title">शिक्षाएँ</h2>
              <ul className="teachings-list">
                <li>अहिंसा का पालन करें</li>
                <li>सत्य बोलें</li>
                <li>अस्तेय का अभ्यास करें</li>
                <li>ब्रह्मचर्य का पालन करें</li>
                <li>अपरिग्रह का मार्ग अपनाएँ</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TirthankarDetailPage;