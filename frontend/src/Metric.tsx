export function Metric({ label, value, change }: { label: string; value: string; change?: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong>{change && <em>{change}</em>}</div>;
}