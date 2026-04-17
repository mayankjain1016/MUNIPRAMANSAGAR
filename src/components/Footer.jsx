const navLinks = ["Gunayatan","Best of Shanka Samadhan","Latest Pravachans","Pramanik Samooh"];
const socialLinks = [
  {icon:"🤖",label:"Android App"},{icon:"🍎",label:"Apple Store"},
  {icon:"📷",label:"Instagram"},{icon:"📘",label:"PramanSagar Ji"},
  {icon:"▶️",label:"Youtube"},{icon:"🐦",label:"Twitter"},
];
export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-title">MUNI PRAMAN SAGAR</h2>
      <p className="footer-desc">जिस प्रकार से सूर्य की किरणों से जगत का अन्धकार मिट जाता है, ऐसे ही मुनि श्री 108 प्रमाण सागर जी सिद्धांतों में छुपे वैज्ञानिक तथ्यों को अपनी सरल वाणी से शंका समाधान, प्रवचनों और साहित्य से समस्त दुनिया के जीवों का मार्ग दर्शन करते हैं।</p>
      <div className="footer-nav">
        <h3 className="footer-section-title">DIRECT NAVIGATION</h3>
        {navLinks.map(l => <div key={l}><a href="#" className="footer-nav-link">{l}</a><hr className="footer-nav-divider"/></div>)}
      </div>
      <div className="footer-contact">
        <h3 className="footer-section-title">CONTACT US</h3>
        <div className="footer-contact-item"><span>🏠</span><span>Gunayatan, Kundkund Marg, Madhuban, Jharkhand 825329</span></div>
        <hr className="footer-nav-divider"/>
        <div className="footer-contact-item"><span>📞</span><span>+91-7543076063</span></div>
      </div>
      <div className="footer-social">
        <h3 className="footer-section-title">STAY CONNECT</h3>
        <div className="footer-social-grid">
          {socialLinks.map(s => <a key={s.label} href="#" className="footer-social-item"><span>{s.icon}</span><span>{s.label}</span></a>)}
        </div>
        <hr className="footer-nav-divider"/>
        <a href="#" className="footer-all-social">All Social Media</a>
      </div>
      <div className="footer-copyright">© 2025 ALL RIGHTS RESERVED BY PRAMANIK SAMOOH</div>
    </footer>
  );
}