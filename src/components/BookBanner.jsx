export default function BookBanner() {
  return (
    <div className="book-banner">
      <div className="book-banner-cover">
        <span style={{color:"#f5c842",fontSize:"20px"}}>📖</span>
      </div>
      <div className="book-banner-text">
        <p className="book-title">भावना योग -<br/>फील टू हील</p>
        <p className="book-subtitle">नई पुस्तक उपलब्ध है</p>
      </div>
      <button className="book-order-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>आर्डर करें</span>
      </button>
    </div>
  );
}