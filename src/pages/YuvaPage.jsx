import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBrain, FaBan, FaHandshake, FaBullseye } from 'react-icons/fa';
import './Pathshala.css';

const YuvaPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'सभी विषय', icon: <FaUserGraduate /> },
    { id: 'stress', name: 'तनाव प्रबंधन', icon: <FaBrain /> },
    { id: 'addiction', name: 'लत और व्यसन', icon: <FaBan /> },
    { id: 'relationships', name: 'संबंध और मित्रता', icon: <FaHandshake /> },
    { id: 'career', name: 'करियर और लक्ष्य', icon: <FaBullseye /> }
  ];

  const youthGuidance = [
    {
      id: 1,
      category: 'stress',
      title: 'तनाव से मुक्ति का उपाय',
      problem: 'पढ़ाई, करियर और प्रतिस्पर्धा का तनाव',
      solution: 'नियमित ध्यान, प्रार्थना और स्वाध्याय से मन शांत होता है। समय प्रबंधन सीखें और धैर्य रखें।',
      practice: 'प्रतिदिन 15 मिनट ध्यान करें और नवकार मंत्र का जाप करें।',
      benefit: 'मन शांत होकर निर्णय लेने की क्षमता बढ़ती है।'
    },
    {
      id: 2,
      category: 'addiction',
      title: 'मोबाइल और सोशल मीडिया की लत',
      problem: 'अत्यधिक समय बर्बाद होना और मानसिक स्वास्थ्य पर असर',
      solution: 'दैनिक समय सीमा निर्धारित करें। मोबाइल को कमरे से बाहर रखें और परिवार के साथ समय बिताएँ।',
      practice: 'सुबह और शाम प्रार्थना का समय बनाएँ। पुस्तक पढ़ने की आदत विकसित करें।',
      benefit: 'समय की बचत होती है और रचनात्मकता बढ़ती है।'
    },
    {
      id: 3,
      category: 'relationships',
      title: 'मित्रता और प्रेम संबंध',
      problem: 'गलत संगति और भावनात्मक उलझनें',
      solution: 'सच्ची मित्रता के लिए अच्छे संस्कार वाले लोगों का चुनाव करें। आत्म सम्मान बनाए रखें।',
      practice: 'माता-पिता और गुरुओं की सलाह लें। नियमित मंदिर जाना और प्रवचन सुनना।',
      benefit: 'जीवन में सकारात्मकता और शांति आती है।'
    },
    {
      id: 4,
      category: 'career',
      title: 'करियर की चिंता और लक्ष्य',
      problem: 'भविष्य की अनिश्चितता और दबाव',
      solution: 'ईश्वर पर भरोसा रखें और मेहनत जारी रखें। नैतिक मूल्यों के साथ काम करें।',
      practice: 'प्रतिदिन लक्ष्य निर्धारित करें और उस पर काम करें। गुरु की शरण में रहें।',
      benefit: 'आत्मविश्वास बढ़ता है और सफलता मिलती है।'
    },
    {
      id: 5,
      category: 'stress',
      title: 'क्रोध नियंत्रण',
      problem: 'छोटी-छोटी बातों पर गुस्सा आना',
      solution: 'गहरी साँस लें और 10 तक गिनती करें। क्रोध के समय मौन रहें।',
      practice: 'क्षमा मंत्र का जाप करें और दूसरों की भलाई की कामना करें।',
      benefit: 'मन शुद्ध होता है और संबंध सुधरते हैं।'
    },
    {
      id: 6,
      category: 'addiction',
      title: 'खराब आदतों से मुक्ति',
      problem: 'धूम्रपान, शराब आदि की लत',
      solution: 'दृढ़ संकल्प लें और धीरे-धीरे छोड़ें। सकारात्मक लोगों के साथ रहें।',
      practice: 'योग और व्यायाम करें। स्वादिष्ट और पौष्टिक भोजन लें।',
      benefit: 'स्वास्थ्य सुधरता है और आत्मसम्मान बढ़ता है।'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredGuidance = selectedCategory === 'all' 
    ? youthGuidance 
    : youthGuidance.filter(item => item.category === selectedCategory);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>युवाओं के लिए</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">युवाओं के लिए</h1>
          <p className="pathshala-subtitle">जीवन की चुनौतियों का समाधान</p>
          <p className="pathshala-description">
            युवा जीवन की सबसे महत्वपूर्ण अवस्था है। इस समय सही मार्गदर्शन से जीवन सार्थक और सफल बनता है।
          </p>
        </section>

        {/* Category Filter */}
        <section className="youth-categories">
          <div className="youth-categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`youth-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="youth-category-icon">{category.icon}</span>
                <span className="youth-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Youth Guidance Grid */}
        <section className="pathshala-sections">
          <div className="youth-guidance-grid">
            {filteredGuidance.map((guidance) => (
              <div key={guidance.id} className="youth-guidance-card">
                <div className="youth-card-header">
                  <h3 className="youth-card-title">{guidance.title}</h3>
                  <div className="youth-card-category">
                    {categories.find(cat => cat.id === guidance.category)?.name}
                  </div>
                </div>
                
                <div className="youth-card-content">
                  <div className="youth-problem">
                    <strong>समस्या:</strong> {guidance.problem}
                  </div>
                  
                  <div className="youth-solution">
                    <strong>समाधान:</strong> {guidance.solution}
                  </div>
                  
                  <div className="youth-practice">
                    <strong>अभ्यास:</strong> {guidance.practice}
                  </div>
                  
                  <div className="youth-benefit">
                    <strong>लाभ:</strong> {guidance.benefit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Motivation Section */}
        <section className="pathshala-section alt-bg">
          <div className="pathshala-container">
            <div className="pathshala-card centered-card">
              <h2 className="section-heading centered">युवाओं को प्रेरणा</h2>
              <p className="card-text">
                युवाओ! तुम भारत और विश्व के भविष्य हो। अपने संस्कारों को बनाए रखो, नैतिक मूल्यों का पालन करो और समाज सेवा में जुटो। ईश्वर तुम्हारी हर कठिनाई में साथ देता है।
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default YuvaPage;
