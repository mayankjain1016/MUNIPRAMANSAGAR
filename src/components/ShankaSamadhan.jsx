const shankas = [
  "क्रोध से मुक्ति कैसे पाएँ?","निर्णय कैसे लें?",
  "युवा वर्ग ब्रांडेड सामान को पाने की दौड़ और चकाचौंध से कैसे बचें?",
  "मानसिक अशांति कैसे दूर करें?",
  "क्या निराशा और लाचारी में किया गया परिवर्तन स्थायी होता है?",
  "संयम कैसे रखें?",
];
export default function ShankaSamadhan() {
  return (
    <div className="shanka-samadhan-section">
      <button className="section-header-btn brown-btn">चुनिन्दा शंका समाधान</button>
      {shankas.map(q => (
        <div key={q} className="shanka-item">
          <p className="shanka-question">{q}</p>
          <button className="read-more-btn">READ MORE</button>
        </div>
      ))}
      <div style={{textAlign:"right",paddingTop:8}}>
        <button className="view-more-btn">शंका समाधान केटेगरी से देखें...</button>
      </div>
    </div>
  );
}