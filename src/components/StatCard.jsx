export default function StatCard({ label, value, symbol, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon stat-icon-${color}`} aria-hidden="true">{symbol}</div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
