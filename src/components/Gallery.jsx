const cameraIcon = <svg viewBox="0 0 24 24" width="48" height="48" fill="#5a4a8a"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>;

const prayerIcon = <svg viewBox="0 0 24 24" width="36" height="36" fill="#8b6914"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>;

const flowerIcon = <svg viewBox="0 0 24 24" width="36" height="36" fill="#8b6914"><circle cx="12" cy="4" r="2"/><circle cx="19" cy="9" r="2"/><circle cx="19" cy="15" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="5" cy="15" r="2"/><circle cx="5" cy="9" r="2"/><circle cx="12" cy="12" r="3"/></svg>;

const celebrationIcon = <svg viewBox="0 0 24 24" width="36" height="36" fill="#8b6914"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;

const handshakeIcon = <svg viewBox="0 0 24 24" width="36" height="36" fill="#8b6914"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/></svg>;

const items = [
  { icon: prayerIcon, label: "गोमिया, बोकारो मंगल प्रवेश 12Apr", bg: "#e8d0b8" },
  { icon: flowerIcon, label: "साड़म, बोकारो मंगल प्रवेश 11Apr", bg: "#d8e8d0" },
  { icon: celebrationIcon, label: "पेटरवार, बोकारो मंगल प्रवेश 09Apr", bg: "#d0d8e8" },
  { icon: handshakeIcon, label: "राधाकृष्ण किशोर जी झा. वित्त मंत्री", bg: "#e8d8d0" },
];

export default function Gallery() {
  return (
    <div className="gallery-section">
      <div className="quicklinks-divider">
        <div className="quicklinks-star">✦</div>
      </div>
      <div className="gallery-header-card">
        {cameraIcon}
        <p className="gallery-label">Gallery</p>
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.label}>
            <div className="gallery-img" style={{ background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
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