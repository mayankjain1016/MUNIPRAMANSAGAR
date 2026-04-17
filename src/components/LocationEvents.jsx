export default function LocationEvents() {
  return (
    <div className="location-events-section">
      <div className="location-block">
        <div className="location-icon" style={{fontSize:36}}>📍</div>
        <button className="location-btn">Current Location</button>
        <p className="location-text">गुणायतन, सम्मेद शिखरजी, झारखण्ड</p>
      </div>
      <hr className="section-divider"/>
      <div className="events-block">
        <div className="events-icon" style={{fontSize:36}}>📅</div>
        <button className="events-btn">Upcoming Event(s)</button>
        <div className="events-list">
          {["भावना योग शिविर - आपके शहर में (Register)","Weekly Online भावना योग"].map(t => (
            <div key={t} className="event-item">
              <span className="event-bookmark">🔖</span>
              <p className="event-title">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}