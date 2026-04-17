const items = [
  { emoji: "🙏", label: "गोमिया, बोकारो मंगल प्रवेश 12Apr", bg: "#e8d0b8" },
  { emoji: "🌸", label: "साड़म, बोकारो मंगल प्रवेश 11Apr", bg: "#d8e8d0" },
  { emoji: "🎊", label: "पेटरवार, बोकारो मंगल प्रवेश 09Apr", bg: "#d0d8e8" },
  { emoji: "🤝", label: "राधाकृष्ण किशोर जी झा. वित्त मंत्री", bg: "#e8d8d0" },
];

export default function Gallery() {
  return (
    <div className="gallery-section">
      <div className="quicklinks-divider">
        <div className="quicklinks-star">✦</div>
      </div>
      <div className="gallery-header-card">
        <span style={{ fontSize: 48, color: "#5a4a8a" }}>📷</span>
        <p className="gallery-label">Gallery</p>
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.label}>
            <div className="gallery-img" style={{ background: item.bg }}>
              {item.emoji}
            </div>
            <p className="gallery-caption">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="view-more-wrap">
        <button className="view-more-btn">View More...</button>
      </div>
    </div>
  );
}