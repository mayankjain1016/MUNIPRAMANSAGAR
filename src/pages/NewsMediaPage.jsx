import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import newsData from '../data/newsData';
import './NewsMedia.css';

const NewsMediaPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी समाचार' },
    { id: 'latest', name: 'नवीनतम समाचार' },
    { id: 'popular', name: 'लोकप्रिय समाचार' },
    { id: 'special', name: 'विशेष समाचार' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(news => {
        if (selectedCategory === 'latest') {
          // Show latest 6 news items
          return newsData.indexOf(news) < 6;
        } else if (selectedCategory === 'popular') {
          // Show popular news (you can add a 'popular' field to newsData)
          return news.views > 1000; // Example logic
        } else if (selectedCategory === 'special') {
          // Show special news (you can add a 'special' field to newsData)
          return news.featured === true; // Example logic
        }
        return news.category === selectedCategory;
      });

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="news-media-page">
      <div className="news-container">
        
        {/* Hero Section */}
        <section className="news-hero">
          <div className="news-icon-wrapper">
            <FaNewspaper />
          </div>
          <h1 className="news-title">समाचार मीडिया</h1>
          <p className="news-subtitle">वैज्ञानिक संत 108 आचार्य श्री निर्भय सागर जी महाराज</p>
          <p className="news-description">
            गुरुवर की धार्मिक गतिविधियों, प्रवचनों और आध्यात्मिक कार्यक्रमों से संबंधित नवीनतम समाचार
          </p>
        </section>

        {/* Category Filter */}
        <section className="news-filter-section">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* News Grid */}
        <section className="news-grid-section">
          <div className="news-grid">
            {filteredNews.map((news) => (
              <div 
                key={news.id} 
                className="news-card"
                onClick={() => handleNewsClick(news.id)}
              >
                {/* Image */}
                <div className="news-image-placeholder">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* News Content */}
                <div className="news-card-content">
                  <div className="news-card-header">
                    <span className="news-date">
                      <FaCalendarAlt /> {news.date}
                    </span>
                  </div>

                  <h3 className="news-card-title">{news.title}</h3>
                  <p className="news-card-excerpt">{news.excerpt}</p>

                  <div className="news-card-footer">
                    <span className="read-more">
                      पूरा पढ़ें <FaArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="news-info-section">
          <div className="info-card">
            <h2>नियमित अपडेट</h2>
            <p>
              आचार्य श्री निर्भय सागर जी महाराज की गतिविधियों, प्रवचनों और धार्मिक कार्यक्रमों से संबंधित नवीनतम समाचार यहाँ उपलब्ध हैं। 
              नियमित अपडेट के लिए इस पेज को देखते रहें।
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default NewsMediaPage;
