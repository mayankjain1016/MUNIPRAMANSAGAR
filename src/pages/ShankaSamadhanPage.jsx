import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/api';
import './ShankaSamadhan.css';

const ShankaSamadhanPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await apiService.get(API_ENDPOINTS.shankaSamadhan.getAll);
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const visibleQuestions = questions.slice(0, visibleCount);
  const hasMore = visibleCount < questions.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 8, questions.length));
  };

  const handleQuestionClick = (slug) => {
    navigate(`/shanka-samadhan/${slug}`);
  };

  if (loading) {
    return (
      <div className="shanka-samadhan-page">
        <div className="shanka-container">
          <p style={{ textAlign: 'center', padding: '50px' }}>Loading...</p>
        </div>
      </div>
    );
  }

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
                key={item._id} 
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
                {visibleCount} में से {questions.length} प्रश्न दिखाए गए
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default ShankaSamadhanPage;
