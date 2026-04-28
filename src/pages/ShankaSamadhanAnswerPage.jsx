import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getAnswerBySlug } from '../data/shankaAnswersData';
import './ShankaSamadhanAnswer.css';

const ShankaSamadhanAnswerPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const answer = getAnswerBySlug(slug);

  if (!answer) {
    return (
      <div className="shanka-answer-page">
        <div className="shanka-answer-container">
          <div className="not-found">
            <h1>उत्तर नहीं मिला</h1>
            <p>क्षमा करें, यह प्रश्न उपलब्ध नहीं है।</p>
            <button className="back-btn" onClick={() => navigate('/shanka-samadhan')}>
              <FaArrowLeft /> वापस जाएँ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shanka-answer-page">
      <div className="shanka-answer-container">
        
        {/* Breadcrumb */}
        <div className="answer-breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={() => navigate('/shanka-samadhan')} style={{cursor: 'pointer'}}>शंका समाधान</span> &gt; 
          <span>उत्तर</span>
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate('/shanka-samadhan')}>
          <FaArrowLeft /> वापस जाएँ
        </button>

        {/* Answer Card */}
        <div className="answer-card">
          
          {/* Question Header */}
          <div className="answer-header">
            <h1 className="answer-question">{answer.question}</h1>
            <p className="answer-subtitle">{answer.subtitle}</p>
          </div>

          {/* Divider */}
          <div className="answer-divider"></div>

          {/* Answer Content */}
          <div className="answer-content">
            {answer.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="answer-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

        </div>

        {/* Navigation Footer */}
        <div className="answer-footer">
          <button className="footer-btn" onClick={() => navigate('/shanka-samadhan')}>
            सभी प्रश्न देखें
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShankaSamadhanAnswerPage;
