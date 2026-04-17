import { useState } from "react";
import logo from "../assets/Page.jpeg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <img 
          src={logo} 
          alt="logo" 
          style={{
            width:280,
            height:280,
            objectFit:"contain",
            flexShrink:0,
            margin:"0 8px 0 0"
          }}
        />
        <button className="navbar-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
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
    </nav>
  );
}