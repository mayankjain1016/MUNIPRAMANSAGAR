import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../assets/components/VideoCard';
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
                <VideoCard
                  key={video._id}
                  title={video.title}
                  description={video.description}
                  videoId={video.videoId}
                  youtubeUrl={video.youtubeUrl}
                />
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
