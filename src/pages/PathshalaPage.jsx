import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './Pathshala.css';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const PathshalaPage = () => {
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

        {/* Videos Section */}
        {!loading && videos.length > 0 ? (
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
        ) : !loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#757575' }}>
            <p>कोई वीडियो उपलब्ध नहीं है</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PathshalaPage;
