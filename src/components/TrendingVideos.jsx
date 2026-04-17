const vids = [
  {title:"सोमशर्म से मुनि बनने की कहानी | Jain Pathshala by Pramanik Samooh",bg:"#2a1a08"},
  {title:"महिला सशक्तिकरण का अर्थ क्या है? | Best of Shanka Samadhan",bg:"#1a0828"},
];
export default function TrendingVideos() {
  return (
    <div className="trending-section">
      <div className="trending-header-card">
        <span className="trending-star">✳</span>
        <p className="trending-label">Trending Videos</p>
      </div>
      <div className="videos-list">
        {vids.map((v,i) => (
          <div key={i} className="video-card">
            <div className="video-thumb-wrap">
              <div className="video-thumb" style={{background:v.bg}}>
                <div className="video-play-overlay">
                  <svg viewBox="0 0 24 24" width="56" height="56">
                    <rect width="24" height="24" rx="4" fill="red"/>
                    <polygon fill="white" points="9,7 9,17 17,12"/>
                  </svg>
                  <span className="video-watch-label">Watch on YouTube</span>
                </div>
              </div>
            </div>
            <p className="video-title">{v.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}