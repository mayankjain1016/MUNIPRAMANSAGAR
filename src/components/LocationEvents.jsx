const locationIcon = <svg viewBox="0 0 24 24" width="32" height="32" fill="#8b6914"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/></svg>;

const bookmarkIcon = <svg viewBox="0 0 24 24" width="16" height="16" fill="#8b6914"><path d="M17 3H5c-1.11 0-2 .9-2 2v16l7-3 7 3V5c0-1.1.89-2 2-2z"/></svg>;

export default function LocationEvents() {
  return (
    <div className="location-events-section">
      <div className="location-block">
        <div className="location-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {locationIcon}
        </div>
        <button className="location-btn">Current Location</button>
        <p className="location-text">गुणायतन, सम्मेद शिखरजी, झारखण्ड</p>
      </div>
      <hr className="section-divider"/>
      <div className="events-block">
        <button className="events-btn">Upcoming Event(s)</button>
        <div className="events-list">
          {["भावना योग शिविर - आपके शहर में (Register)","Weekly Online भावना योग"].map(t => (
            <div key={t} className="event-item">
              <span className="event-bookmark" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {bookmarkIcon}
              </span>
              <p className="event-title">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}