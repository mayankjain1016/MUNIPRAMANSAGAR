import { useState } from "react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <div style={{width:40,height:40,borderRadius:"50%",background:"#5a3008",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{color:"white",fontSize:"14px"}}>🕉</span>
          </div>
          <span className="navbar-title">मुनि श्री प्रमाण सागर जी</span>
        </div>
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