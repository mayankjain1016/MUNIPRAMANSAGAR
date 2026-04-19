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
    <section className="hero-section">
      <div className="hero-slider">
        <img src={slides[cur].image} alt={`Slide ${cur + 1}`} className="hero-img"/>
        <button className="hero-btn hero-btn-left" onClick={() => setCur((cur-1+slides.length)%slides.length)} aria-label="Previous">‹</button>
        <button className="hero-btn hero-btn-right" onClick={() => setCur((cur+1)%slides.length)} aria-label="Next">›</button>
        <div className="hero-dots">
          {slides.map((_,i) => <span key={i} className={`hero-dot${i===cur?" active":""}`} onClick={() => setCur(i)}/>)}
        </div>
      </div>
    </section>
  );
}
