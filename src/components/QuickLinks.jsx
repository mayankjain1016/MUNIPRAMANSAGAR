const items = [
  {icon:"🎙",label:"प्रवचन"},{icon:"💡",label:"शंका समाधान"},
  {icon:"🌿",label:"भावना योग"},{icon:"🏛",label:"गुणायतन"},
  {icon:"🎓",label:"पाठशाला"},{icon:"📚",label:"कहानियाँ"},
];
export default function QuickLinks() {
  return (
    <div>
      <div className="quicklinks-divider"><div className="quicklinks-star">✦</div></div>
      <div className="quicklinks-grid">
        {items.map(item => (
          <button key={item.label} className="quicklink-card">
            <div className="quicklink-icon" style={{fontSize:36}}>{item.icon}</div>
            <span className="quicklink-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}