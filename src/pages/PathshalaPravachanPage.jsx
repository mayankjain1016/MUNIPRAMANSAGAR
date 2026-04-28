import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophone, FaOm, FaBalanceScale, FaUserGraduate, FaChild, FaHeadphones } from 'react-icons/fa';
import './Pathshala.css';

const PathshalaPravachanPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी प्रवचन', icon: <FaMicrophone /> },
    { id: 'spiritual', name: 'आध्यात्मिक', icon: <FaOm /> },
    { id: 'moral', name: 'नैतिक', icon: <FaBalanceScale /> },
    { id: 'youth', name: 'युवाओं के लिए', icon: <FaUserGraduate /> },
    { id: 'children', name: 'बच्चों के लिए', icon: <FaChild /> }
  ];

  const pravachans = [
    {
      id: 1,
      category: 'spiritual',
      title: 'आत्मा की शुद्धि का मार्ग',
      description: 'आत्मा की शुद्धि के लिए आवश्यक साधनाओं और अभ्यासों का वर्णन।',
      keyPoints: [
        'नियमित स्वाध्याय का महत्व',
        'मन की शुद्धि के उपाय',
        'आत्मचिंतन की विधि',
        'साधना का सही तरीका'
      ],
      duration: '45 मिनट',
      date: '15 जनवरी 2024'
    },
    {
      id: 2,
      category: 'moral',
      title: 'सच्चाई और नैतिकता',
      description: 'जीवन में सच्चाई के महत्व और नैतिक मूल्यों का पालन करने के लाभ।',
      keyPoints: [
        'सच्चाई की शक्ति',
        'नैतिकता का महत्व',
        'कर्म और फल',
        'जीवन में संतुलन'
      ],
      duration: '35 मिनट',
      date: '22 जनवरी 2024'
    },
    {
      id: 3,
      category: 'youth',
      title: 'युवाओं की जिम्मेदारियाँ',
      description: 'आधुनिक युग में युवाओं के सामने आने वाली चुनौतियों और उनका समाधान।',
      keyPoints: [
        'करियर और धर्म',
        'संगति का चुनाव',
        'समय प्रबंधन',
        'आत्मविश्वास का विकास'
      ],
      duration: '40 मिनट',
      date: '29 जनवरी 2024'
    },
    {
      id: 4,
      category: 'children',
      title: 'बच्चों के लिए अच्छे संस्कार',
      description: 'बच्चों में अच्छे संस्कार विकसित करने के सरल और प्रभावी तरीके।',
      keyPoints: [
        'माता-पिता का सम्मान',
        'सच्चाई बोलना',
        'दया का भाव',
        'अध्ययन की आदत'
      ],
      duration: '30 मिनट',
      date: '5 फरवरी 2024'
    },
    {
      id: 5,
      category: 'spiritual',
      title: 'ध्यान और समाधि',
      description: 'ध्यान की विभिन्न विधियाँ और समाधि प्राप्ति के उपाय।',
      keyPoints: [
        'ध्यान की तैयारी',
        'विभिन्न ध्यान विधियाँ',
        'बाधाओं का निवारण',
        'समाधि की प्राप्ति'
      ],
      duration: '50 मिनट',
      date: '12 फरवरी 2024'
    },
    {
      id: 6,
      category: 'moral',
      title: 'क्षमा और सहिष्णुता',
      description: 'क्षमा करने की कला और जीवन में सहिष्णुता का महत्व।',
      keyPoints: [
        'क्षमा का महत्व',
        'सहिष्णुता की शक्ति',
        'मन की शांति',
        'संबंधों में सुधार'
      ],
      duration: '38 मिनट',
      date: '19 फरवरी 2024'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredPravachans = selectedCategory === 'all' 
    ? pravachans 
    : pravachans.filter(item => item.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>प्रवचन</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">प्रवचन</h1>
          <p className="pathshala-subtitle">आचार्य श्री के दिव्य प्रवचन और उपदेश</p>
          <p className="pathshala-description">
            आचार्य श्री निर्भय सागर जी के प्रवचन जीवन को सही दिशा देने वाले अमृत बिंदु हैं। इन प्रवचनों से मन को शांति और आत्मा को प्रकाश मिलता है।
          </p>
        </section>

        {/* Category Filter */}
        <section className="pravachan-categories">
          <div className="pravachan-categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`pravachan-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="pravachan-category-icon">{category.icon}</span>
                <span className="pravachan-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Pravachans Grid */}
        <section className="pathshala-sections">
          <div className="pravachans-grid">
            {filteredPravachans.map((pravachan) => (
              <div key={pravachan.id} className="pravachan-card">
                <div className="pravachan-header">
                  <h3 className="pravachan-title">{pravachan.title}</h3>
                  <div className="pravachan-category">
                    {categories.find(cat => cat.id === pravachan.category)?.name}
                  </div>
                  <div className="pravachan-meta">
                    <span className="pravachan-duration"><FaHeadphones /> {pravachan.duration}</span>
                    <span className="pravachan-date">{pravachan.date}</span>
                  </div>
                </div>
                
                <div className="pravachan-content">
                  <p className="pravachan-description">{pravachan.description}</p>
                  
                  <div className="pravachan-keypoints">
                    <h4 className="keypoints-title">मुख्य बिंदु:</h4>
                    <ul className="keypoints-list">
                      {pravachan.keyPoints.map((point, index) => (
                        <li key={index} className="keypoint-item">{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="listen-btn"><FaHeadphones /> सुनें</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More Content */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">और प्रवचन</h2>
              <p className="card-text">
                यहाँ दिए गए प्रवचन पाठशाला के कुछ उदाहरण हैं। अधिक प्रवचन और वीडियो के लिए नियमित रूप से हमारी वेबसाइट विजिट करें।
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PathshalaPravachanPage;
