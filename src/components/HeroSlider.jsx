import { useState } from "react";
import sliderimg1 from "../assets/sliderimg1.jpeg";
import sliderimg2 from "../assets/sliderimg2.jpeg";
import sliderimg3 from "../assets/sliderimg3.jpeg";

const slides = [
  { key:"s1", image: sliderimg1 },
  { key:"s2", image: sliderimg2 },
  { key:"s3", image: sliderimg3 },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  return (
    <div className="hero-slider">
      <img 
        src={slides[cur].image} 
        alt={`slider ${cur + 1}`}
        style={{
          width: "100%",
          display: "block"
        }}
      />
      <button className="slider-btn slider-btn-left" onClick={() => setCur((cur-1+slides.length)%slides.length)}>‹</button>
      <button className="slider-btn slider-btn-right" onClick={() => setCur((cur+1)%slides.length)}>›</button>
      <div className="slider-dots">
        {slides.map((_,i) => <span key={i} className={`slider-dot${i===cur?" active":""}`} onClick={() => setCur(i)}/>)}
      </div>
    </div>
  );
}