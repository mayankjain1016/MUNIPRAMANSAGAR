import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaCalendarAlt, FaArrowRight, FaEye } from 'react-icons/fa';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import './NewsMedia.css';

const NewsMediaPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await apiService.get(API_ENDPOINTS.news.published);
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'सभी समाचार' },
    { id: 'general', name: 'सामान्य समाचार' },
    { id: 'event', name: 'कार्यक्रम समाचार' },
    { id: 'announcement', name: 'घोषणाएं' },
    { id: 'media', name: 'मीडिया' }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="news-media-page">
        <div className="news-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div className="loading-spinner"></div>
            <p>समाचार लोड हो रहे हैं...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {filteredNews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <FaNewspaper style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }} />
              <h3>कोई समाचार उपलब्ध नहीं है</h3>
              <p>इस श्रेणी में अभी कोई समाचार नहीं है।</p>
            </div>
          ) : (
            <div className="news-grid">
              {filteredNews.map((newsItem) => (
                <div 
                  key={newsItem._id} 
                  className="news-card"
                  onClick={() => handleNewsClick(newsItem._id)}
                >
                  {/* Image */}
                  <div className="news-image-placeholder">
                    {newsItem.image ? (
                      <img 
                        src={`${import.meta.env.VITE_API_BASE_URL}${newsItem.image}`}
                        alt={newsItem.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                      }}>
                        <FaNewspaper style={{ fontSize: '48px' }} />
                      </div>
                    )}
                  </div>

                  {/* News Content */}
                  <div className="news-card-content">
                    <div className="news-card-header">
                      <span className="news-date">
                        <FaCalendarAlt /> {formatDate(newsItem.date)}
                      </span>
                      <span className="news-views">
                        <FaEye /> {newsItem.views || 0}
                      </span>
                    </div>

                    <h3 className="news-card-title">{newsItem.title}</h3>
                    <p className="news-card-excerpt">
                      {newsItem.excerpt || newsItem.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>

                    <div className="news-card-footer">
                      <span className="read-more">
                        पूरा पढ़ें <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
