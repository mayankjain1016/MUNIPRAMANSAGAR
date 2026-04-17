const news = [
  {date:"12Apr2026",text:"मुनिश्री ससंघ का गोमिया, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"11Apr2026",text:"मुनिश्री ससंघ का साड़म, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"09Apr2026",text:"मुनिश्री ससंघ का पेटरवार, जिला-बोकारो, झारखण्ड में मंगल प्रवेश हुआ"},
  {date:"06Apr2026",text:"श्री राधाकृष्ण किशोर जी (झारखंड वित्त मंत्री) राँची में गुरु चरणों में"},
  {date:"05Apr2026",text:"राँची पंचकल्याणक दिवस-5 झलकियाँ"},
];
export default function LatestNews() {
  return (
    <div className="latest-news-section">
      <button className="section-header-btn">Latest News</button>
      {news.map(item => (
        <div key={item.date} className="news-item">
          <span className="news-date">{item.date}:</span>
          <span className="news-text"> {item.text}</span>
        </div>
      ))}
      <div className="view-more-wrap"><button className="view-more-btn">View More...</button></div>
    </div>
  );
}