import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaOm, FaPray, FaBook, FaCalendarAlt, FaChild, FaUserGraduate, FaQuestionCircle, FaMicrophone, FaLightbulb, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import './Pathshala.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const PathshalaPage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/pathshala`);
      setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getThumbnail = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const openVideo = (url) => {
    window.open(url, '_blank');
  };

  const pathshalaSections = [
    {
      title: 'जैन धर्म परिचय',
      description: 'जैन धर्म के मूल सिद्धांतों और इतिहास का परिचय',
      route: '/pathshala/jain-siddhant',
      icon: <FaOm />
    },
    {
      title: '24 तीर्थंकर',
      description: '24 तीर्थंकरों के जीवन और शिक्षाओं का ज्ञान',
      route: '/pathshala/tirthankar',
      icon: <FaPray />
    },
    {
      title: 'मंत्र संग्रह',
      description: 'जैन धर्म के पवित्र मंत्र और उनकी महिमा',
      route: '/pathshala/mantra',
      icon: <FaBook />
    },
    {
      title: 'आरती संग्रह',
      description: 'तीर्थंकरों और देवी-देवताओं की आरतियाँ',
      route: '/pathshala/aarti',
      icon: <FaLightbulb />
    },
    {
      title: 'जैन सिद्धांत',
      description: 'अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य और अपरिग्रह',
      route: '/pathshala/jain-siddhant',
      icon: <FaHeart />
    },
    {
      title: 'व्रत और पर्व',
      description: 'जैन धर्म के पवित्र व्रत और त्योहार',
      route: '/pathshala/vrat-parv',
      icon: <FaCalendarAlt />
    },
    {
      title: 'बच्चों के लिए',
      description: 'बच्चों के लिए सरल कहानियाँ और शिक्षा',
      route: '/pathshala/baccho-ke-liye',
      icon: <FaChild />
    },
    {
      title: 'युवाओं के लिए',
      description: 'युवाओं के जीवन की समस्याओं का समाधान',
      route: '/pathshala/yuva',
      icon: <FaUserGraduate />
    },
    {
      title: 'प्रश्नोत्तरी',
      description: 'धर्म और जीवन से जुड़े प्रश्नों के उत्तर',
      route: '/pathshala/prashnottari',
      icon: <FaQuestionCircle />
    },
    {
      title: 'प्रवचन',
      description: 'आचार्य श्री के दिव्य प्रवचन और उपदेश',
      route: '/pathshala/pravachan',
      icon: <FaMicrophone />
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>आचार्य श्री निर्भय सागर जी</span> &gt; <span>पाठशाला</span>
        </div>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">पाठशाला</h1>
          <p className="pathshala-subtitle">ज्ञान, संस्कार और आध्यात्मिक विकास का केंद्र</p>
          <p className="pathshala-description">
            पाठशाला वह पवित्र स्थान है जहाँ बालक, युवा और समाज के लोग जैन धर्म, नैतिक जीवन, संस्कार, संयम और आत्मिक विकास की शिक्षा सरल भाषा में प्राप्त करते हैं।
          </p>
        </section>

        {/* Main Sections Grid */}
        <section className="pathshala-sections">
          <div className="sections-grid">
            {pathshalaSections.map((section, index) => (
              <div 
                key={index} 
                className="section-card"
                onClick={() => handleCardClick(section.route)}
              >
                <div className="card-icon">{section.icon}</div>
                <h3 className="card-title">{section.title}</h3>
                <p className="card-description">{section.description}</p>
                <div className="card-arrow">→</div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        {!loading && videos.length > 0 && (
          <section className="pathshala-videos" style={{ marginTop: '4rem' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#E65100', marginBottom: '2rem' }}>
              पाठशाला वीडियो
            </h2>
            <div className="videos-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {videos.map((video) => (
                <div 
                  key={video._id}
                  className="video-card"
                  onClick={() => openVideo(video.youtubeUrl)}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    backgroundColor: '#fff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(230, 81, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                  }}
                >
                  <div style={{ 
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    backgroundImage: `url(${getThumbnail(video.videoId)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                    >
                      <div style={{ fontSize: '64px', color: 'white' }}>▶</div>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      fontWeight: 600,
                      color: '#333333',
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem'
                    }}>
                      {video.title}
                    </h3>
                    <p style={{ 
                      color: '#757575',
                      fontSize: '0.9rem',
                      lineHeight: 1.5
                    }}>
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default PathshalaPage;
