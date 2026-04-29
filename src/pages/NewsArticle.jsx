import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { getNewsById } from '../data/newsData';
import './NewsArticle.css';

const NewsArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const news = getNewsById(id);

  if (!news) {
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
          <div className="article-hero-image">
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

          {/* Article Meta */}
          <div className="article-meta">
            <span className="article-category">
              <FaTag /> {news.category}
            </span>
            <span className="article-date">
              <FaCalendarAlt /> {news.date}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="article-title">{news.title}</h1>

          {/* Article Body */}
          <div className="article-body">
            <p className="article-intro">
              {news.excerpt}
            </p>

            <p>
              आचार्य श्री निर्भय सागर जी महाराज के दिव्य आशीर्वाद से यह पावन कार्यक्रम अत्यंत भव्य रूप से संपन्न हुआ। हजारों श्रद्धालुओं ने गुरुवर के दर्शन और आशीर्वाद प्राप्त किया। इस अवसर पर गुरुवर ने जैन धर्म के मूल सिद्धांतों पर प्रकाश डाला और श्रद्धालुओं को जीवन में धर्म को अपनाने का संदेश दिया।
            </p>

            <div className="article-quote">
              <p>"अहिंसा परम धर्म है। जीवन में अहिंसा, सत्य और संयम को अपनाकर ही हम सच्ची शांति प्राप्त कर सकते हैं।"</p>
              <span className="quote-author">- आचार्य श्री निर्भय सागर जी महाराज</span>
            </div>

            <h2>कार्यक्रम की मुख्य बातें</h2>
            <p>
              इस धार्मिक आयोजन में गुरुवर ने विशेष रूप से युवा पीढ़ी को संबोधित करते हुए कहा कि आधुनिक जीवन की चुनौतियों के बीच भी धर्म और संस्कारों को बनाए रखना अत्यंत आवश्यक है। उन्होंने बताया कि जैन धर्म के सिद्धांत न केवल आध्यात्मिक विकास में सहायक हैं, बल्कि व्यावहारिक जीवन में भी मार्गदर्शन प्रदान करते हैं।
            </p>

            <p>
              कार्यक्रम के दौरान श्रद्धालुओं ने गुरुवर से अपनी जिज्ञासाओं का समाधान प्राप्त किया। गुरुवर ने सभी प्रश्नों का अत्यंत सरल और स्पष्ट उत्तर देते हुए श्रद्धालुओं को जीवन में सकारात्मक बदलाव लाने के लिए प्रेरित किया।
            </p>

            <div className="article-highlight">
              <h3>आध्यात्मिक संदेश</h3>
              <p>
                गुरुवर ने कहा कि मन की शांति और आत्मिक विकास के लिए नियमित ध्यान, स्वाध्याय और सत्संग अत्यंत आवश्यक है। उन्होंने श्रद्धालुओं से आग्रह किया कि वे अपने दैनिक जीवन में कम से कम 15 मिनट ध्यान के लिए अवश्य निकालें।
              </p>
            </div>

            <h2>समाज सेवा का संदेश</h2>
            <p>
              गुरुवर ने समाज सेवा के महत्व पर भी प्रकाश डाला। उन्होंने कहा कि सच्ची भक्ति वही है जो समाज के कल्याण में परिवर्तित हो। जरूरतमंदों की सहायता करना, शिक्षा का प्रसार करना और पर्यावरण की रक्षा करना भी धर्म का ही अंग है।
            </p>

            <p>
              कार्यक्रम के समापन पर गुरुवर ने सभी श्रद्धालुओं को आशीर्वाद देते हुए कहा कि जीवन में सदैव सत्य, अहिंसा और करुणा का पालन करें। यही मार्ग मोक्ष की ओर ले जाता है।
            </p>

            <div className="article-conclusion">
              <p>
                यह कार्यक्रम श्रद्धालुओं के लिए अत्यंत प्रेरणादायक और आध्यात्मिक रूप से समृद्ध रहा। गुरुवर के दिव्य प्रवचन से सभी को जीवन में नई दिशा और ऊर्जा प्राप्त हुई।
              </p>
            </div>
          </div>

        </article>

        {/* Back to News Button */}
        <div className="article-footer">
          <button className="footer-back-btn" onClick={() => navigate('/news-media')}>
            सभी समाचार देखें
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewsArticle;
