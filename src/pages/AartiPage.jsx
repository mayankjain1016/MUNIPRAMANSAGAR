import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pathshala.css';

const AartiPage = () => {
  const navigate = useNavigate();
  const [selectedTirthankar, setSelectedTirthankar] = useState('all');

  const tirthankarOptions = [
    { id: 'all', name: 'सभी आरतियाँ', icon: '🪔' },
    { id: 'mahavir', name: 'महावीर स्वामी', icon: '🦁' },
    { id: 'parshvanath', name: 'पार्श्वनाथ', icon: '🐍' },
    { id: 'neminath', name: 'नेमिनाथ', icon: '🪔' },
    { id: 'rishabhdev', name: 'रिषभदेव', icon: '🐂' }
  ];

  const aartis = [
    {
      id: 1,
      tirthankar: 'mahavir',
      title: 'श्री महावीर आरती',
      lyrics: `जय महावीर स्वामी, जय महावीर स्वामी
जय जिनेंद्र देव, करुणा सागर मोक्ष प्रदाता
जय महावीर स्वामी...

त्रिभुवन के स्वामी, धर्म के प्रवर्तक
अहिंसा के पुजारी, सत्य के रक्षक
जय महावीर स्वामी...

केवल ज्ञान धारी, मोक्ष के दाता
सर्व सिद्धि वरदाता, भव भय हर्ता
जय महावीर स्वामी...`,
      meaning: 'महावीर स्वामी की महिमा का गान करते हुए उनकी आरती की जाती है।',
      occasion: 'दैनिक पूजा, विशेष अवसर'
    },
    {
      id: 2,
      tirthankar: 'parshvanath',
      title: 'श्री पार्श्वनाथ आरती',
      lyrics: `जय पार्श्वनाथ स्वामी, जय पार्श्वनाथ स्वामी
जय तीर्थंकर देव, धर्म के रक्षक
जय पार्श्वनाथ स्वामी...

सप्त फणधारी शेष, चरणों में विराजे
मुनि राज के स्वामी, भक्तों के प्यारे
जय पार्श्वनाथ स्वामी...`,
      meaning: 'पार्श्वनाथ की भक्ति और उनकी शक्ति का वर्णन।',
      occasion: 'पार्श्वनाथ जयंती, विशेष पूजा'
    },
    {
      id: 3,
      tirthankar: 'rishabhdev',
      title: 'श्री आदिनाथ आरती',
      lyrics: `जय आदिनाथ स्वामी, जय आदिनाथ स्वामी
प्रथम तीर्थंकर देव, धर्म के संस्थापक
जय आदिनाथ स्वामी...

वृषभ के अवतार, जगत के रक्षक
सर्व प्रथम मोक्ष प्राप्त, भव सागर से तारक
जय आदिनाथ स्वामी...`,
      meaning: 'पहले तीर्थंकर आदिनाथ की स्तुति।',
      occasion: 'आदिनाथ जयंती'
    },
    {
      id: 4,
      tirthankar: 'neminath',
      title: 'श्री नेमिनाथ आरती',
      lyrics: `जय नेमिनाथ स्वामी, जय नेमिनाथ स्वामी
अर्जुन के भाई देव, धर्म के धुरंधर
जय नेमिनाथ स्वामी...

रेवती के पति प्रभु, भक्तों के प्रिय
त्याग के मूर्तिमंत, मोक्ष के अधिकारी
जय नेमिनाथ स्वामी...`,
      meaning: 'नेमिनाथ की कृपा और शक्ति का वर्णन।',
      occasion: 'नेमिनाथ जयंती'
    }
  ];

  const handleBackClick = () => {
    navigate('/pathshala');
  };

  const filteredAartis = selectedTirthankar === 'all' 
    ? aartis 
    : aartis.filter(aarti => aarti.tirthankar === selectedTirthankar);

  return (
    <div className="pathshala-page">
      <div className="pathshala-container">
        
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} style={{cursor: 'pointer'}}>आचार्य श्री निर्भय सागर जी</span> &gt; 
          <span onClick={handleBackClick} style={{cursor: 'pointer'}}>पाठशाला</span> &gt; 
          <span>आरती संग्रह</span>
        </div>

        {/* Back Button */}
        <button className="back-button" onClick={handleBackClick}>
          ← पाठशाला वापस जाएँ
        </button>

        {/* Hero Section */}
        <section className="pathshala-hero">
          <h1 className="pathshala-title">आरती संग्रह</h1>
          <p className="pathshala-subtitle">तीर्थंकरों की दिव्य आरतियाँ</p>
          <p className="pathshala-description">
            आरती भक्ति की अभिव्यक्ति है। इन पवित्र आरतियों से मन शुद्ध होता है और आत्मा को दिव्य आनंद की प्राप्ति होती है।
          </p>
        </section>

        {/* Tirthankar Filter */}
        <section className="aarti-filter">
          <div className="tirthankar-filter">
            {tirthankarOptions.map((option) => (
              <button
                key={option.id}
                className={`tirthankar-filter-btn ${selectedTirthankar === option.id ? 'active' : ''}`}
                onClick={() => setSelectedTirthankar(option.id)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-name">{option.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Aartis Grid */}
        <section className="pathshala-sections">
          <div className="aartis-grid">
            {filteredAartis.map((aarti) => (
              <div key={aarti.id} className="aarti-card">
                <div className="aarti-header">
                  <h3 className="aarti-title">{aarti.title}</h3>
                  <div className="aarti-tirthankar">
                    {tirthankarOptions.find(t => t.id === aarti.tirthankar)?.name}
                  </div>
                </div>
                
                <div className="aarti-content">
                  <div className="aarti-lyrics">
                    <pre className="lyrics-text">{aarti.lyrics}</pre>
                  </div>
                  
                  <div className="aarti-info">
                    <div className="info-item">
                      <strong>अर्थ:</strong> {aarti.meaning}
                    </div>
                    <div className="info-item">
                      <strong>अवसर:</strong> {aarti.occasion}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AartiPage;