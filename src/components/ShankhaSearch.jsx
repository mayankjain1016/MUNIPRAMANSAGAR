import { useState } from "react";
export default function ShankhaSearch() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="shanka-header">शंका खोजें</div>
      <div className="shanka-body">
        <div className="shanka-input-wrap">
          <input className="shanka-input" placeholder="शंका के मुख्य शब्द यहाँ लिखें..." value={query} onChange={e => setQuery(e.target.value)}/>
          <button className="shanka-search-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
        <div className="shanka-suggestions">
          <span>कुछ सुझाव (क्लिक करें):</span>
          {["भावना योग","सुख","शांति"].map(s => (
            <button key={s} className="shanka-tag" onClick={() => setQuery(s)}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}