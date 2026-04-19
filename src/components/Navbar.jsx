import { useState } from "react";
import logo from "../assets/Page.jpeg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src={logo} alt="Muni Praman Sagar" className="navbar-logo-img"/>
          </div>
          <button className="navbar-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
        {menuOpen && (
          <div className="navbar-dropdown">
            {["प्रवचन","शंका समाधान","भावना योग","गुणायतन","पाठशाला","कहानियाँ"].map(l => (
              <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
