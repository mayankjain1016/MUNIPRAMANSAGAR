const items = [
  {icon:"speaker",label:"प्रवचन"},{icon:"chat",label:"शंका समाधान"},
  {icon:"heart",label:"भावना योग"},{icon:"temple",label:"गुणायतन"},
  {icon:"book",label:"पाठशाला"},{icon:"scroll",label:"कहानियाँ"},
];

const iconSVG = {
  speaker: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.3-2.5-4.04v8.08c1.48-.74 2.5-2.27 2.5-4.04zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>,
  chat: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>,
  heart: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  temple: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M19 13h-6V3h-2v10H5v2h14v-2z"/><path d="M19 19H5v-3H3v5h18v-5h-2v3z"/></svg>,
  book: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 16H7V4h10v14z"/></svg>,
  scroll: <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="19" x2="12" y2="5"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
};

const IconComponent = ({ iconKey }) => <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b6914'}}>{iconSVG[iconKey]}</div>;

export default function QuickLinks() {
  return (
    <div>
      <div className="quicklinks-divider"><div className="quicklinks-star">✦</div></div>
      <div className="quicklinks-grid">
        {items.map(item => (
          <button key={item.label} className="quicklink-card">
            <div className="quicklink-icon">
              <IconComponent iconKey={item.icon} />
            </div>
            <span className="quicklink-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}