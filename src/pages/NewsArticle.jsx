import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaTag, FaEye } from 'react-icons/fa';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import './NewsArticle.css';

const NewsArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await apiService.get(`${API_ENDPOINTS.news.getAll}/${id}`);
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryLabel = (category) => {
    const labels = {
      general: 'सामान्य',
      event: 'कार्यक्रम',
      announcement: 'घोषणा',
      media: 'मीडिया'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="news-article-page">
        <div className="article-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <div className="loading-spinner"></div>
            <p>समाचार लोड हो रहा है...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="news-article-page">
        <div className="article-container">
          <div className="not-found">
            <h1>समाचार नहीं मिला</h1>
            <p>क्षमा करें, यह समाचार उपलब्ध नहीं है।</p>
            <button className="back-btn" onClick={() => navigate('/news-media')}>
              <FaArrowLeft /> वापस जाएँ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-article-page">
      <div className="article-container">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/news-media')}>
          <FaArrowLeft /> समाचार सूची में वापस जाएँ
        </button>

        {/* Article Header */}
        <article className="article-content">
          
          {/* Hero Image */}
          {news.image && (
            <div className="article-hero-image">
              <img 
                src={`${import.meta.env.VITE_API_URL}${news.image}`}
                alt={news.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          {/* Article Meta */}
          <div className="article-meta">
            <span className="article-category">
              <FaTag /> {getCategoryLabel(news.category)}
            </span>
            <span className="article-date">
              <FaCalendarAlt /> {formatDate(news.date)}
            </span>
            <span className="article-views">
              <FaEye /> {news.views || 0} बार देखा गया
            </span>
          </div>

          {/* Article Title */}
          <h1 className="article-title">{news.title}</h1>

          {/* Article Excerpt */}
          {news.excerpt && (
            <p className="article-intro">
              {news.excerpt}
            </p>
          )}

          {/* Article Body */}
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

        </article>

      </div>
    </div>
  );
};

export default NewsArticle;
