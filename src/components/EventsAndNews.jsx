const locationIcon = <svg viewBox="0 0 24 24" width="32" height="32" fill="#d4600a"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;

const bookmarkIcon = <svg viewBox="0 0 24 24" width="18" height="18" fill="#5a3008"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>;

const news = [
  {date:"12Apr2026",text:"मुनिश्री ससंघ का गोमिया, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"11Apr2026",text:"मुनिश्री ससंघ का साड़म, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"09Apr2026",text:"मुनिश्री ससंघ का पेटरवार, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"06Apr2026",text:"श्री राधाकृष्ण किशोर जी (झारखंड वित्त मंत्री) राँची में गुरु चरणों में"},
  {date:"05Apr2026",text:"राँची पंचकल्याणक दिवस-5 झलकियाँ"},
];

export default function EventsAndNews() {
  return (
    <section className="events-news-section">
      <div className="container">
        <div className="events-news-grid">
          <div className="location-card">
            <div className="location-icon-wrap">{locationIcon}</div>
            <button className="location-btn">Current Location</button>
            <p className="location-text">गुणायतन, सम्मेद शिखरजी, झारखण्ड</p>
          </div>
          
          <div className="events-card">
            <h3 className="events-title">Upcoming Event(s)</h3>
            <div className="events-list">
              {["भावना योग शिविर - आपके शहर में (Register)","Weekly Online भावना योग"].map(t => (
                <div key={t} className="event-item">
                  <span className="event-icon">{bookmarkIcon}</span>
                  <p className="event-text">{t}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="news-card">
            <h3 className="news-title">Latest News</h3>
            <div className="news-list">
              {news.map(item => (
                <div key={item.date} className="news-item">
                  <span className="news-date">{item.date}:</span>
                  <span className="news-text"> {item.text}</span>
                </div>
              ))}
            </div>
            <button className="view-more-btn">View More...</button>
          </div>
        </div>
      </div>
    </section>
  );
}
