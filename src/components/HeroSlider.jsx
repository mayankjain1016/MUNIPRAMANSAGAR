import { useState } from "react";
const slides = [
  { key:"s1", el: (
    <div className="slide-card slide-maroon">
      <p className="slide-mangal">मंगल आशीर्वाद</p>
      <p style={{fontSize:13,color:"#eee"}}>य.पू.संत शिरोमणि आचार्यश्री 108</p>
      <p className="slide-acharya">विद्यासागर जी महाराज</p>
      <p className="slide-bold-line">भारत के इतिहास में प्रथम बार</p>
      <p className="slide-sub-line">झारखण्ड राज्य की शाश्वत भूमि श्री सम्मेद शिखर जी स्थित गुणायतन परिसर में</p>
      <div className="slide-date-badge">18 अप्रैल 2026<span className="slide-date-sub">का आयोजित होगा</span></div>
      <p className="slide-event-title">भव्य</p>
      <p className="slide-event-name">जैनेश्वरी</p>
      <p className="slide-event-name2">दीक्षा महोत्सव</p>
    </div>
  )},
  { key:"s2", el: (
    <div className="slide-card slide-gold">
      <div className="slide-gold-emblem">
        <div style={{textAlign:"center"}}>
          <p className="slide-emblem-title">भव्य</p>
          <p className="slide-emblem-name">जैनेश्वरी</p>
          <p className="slide-emblem-sub">दीक्षा महोत्सव</p>
          <p className="slide-emblem-year">2026</p>
        </div>
      </div>
      <div className="slide-gold-date"><p>दिनांक 18 अप्रैल 2026</p><p>स्थान : गुणायतन, शिखरजी</p></div>
      <div className="slide-gold-desc"><p>इतिहास में प्रथम बार — मुनिश्री 108 प्रमाणसागर जी महाराज के कर कमलों द्वारा शाश्वत सिद्धक्षेत्र सम्मेद शिखरजी की धारा पर भव्य जैनेश्वरी दीक्षा</p></div>
    </div>
  )},
  { key:"s3", el: (
    <div className="slide-card slide-purple">
      <p className="slide-purple-top">इतिहास में प्रथम बार</p>
      <p className="slide-purple-sub">संत शिरोमणि आचार्य गुरुवर 108 श्री विद्यासागरजी महाराज के प्रिय शिष्य</p>
      <p className="slide-purple-highlight">गुणायतन प्रणेता प.पू.मुनिश्री 108 प्रमाणसागर जी महाराज के कर कमलों द्वारा</p>
      <p className="slide-purple-bhavya">भव्य</p>
      <p className="slide-purple-jain">जैनेश्वरी दीक्षा</p>
      <div className="slide-purple-footer"><p>भव्य आयोजन:- शनिवार, 18 अप्रैल 2026</p><p>पावन स्थल:- शाश्वत सिद्धक्षेत्र श्री सम्मेद शिखरजी</p></div>
      <div className="slide-paras-banner"><span>देखिए इस कार्यक्रम का विशेष प्रसारण प्रात: 10:00 बजे से</span><span className="slide-paras-name">पारस</span></div>
    </div>
  )},
];
export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  return (
    <div className="hero-slider">
      {slides[cur].el}
      <button className="slider-btn slider-btn-left" onClick={() => setCur((cur-1+slides.length)%slides.length)}>‹</button>
      <button className="slider-btn slider-btn-right" onClick={() => setCur((cur+1)%slides.length)}>›</button>
      <div className="slider-dots">
        {slides.map((_,i) => <span key={i} className={`slider-dot${i===cur?" active":""}`} onClick={() => setCur(i)}/>)}
      </div>
    </div>
  );
}