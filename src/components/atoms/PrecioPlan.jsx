// ÁTOMO: recibe el precio ya formateado en pesos chilenos.
export function PrecioPlan({ children, className = '' }) {
  return <span className={className}>{children}</span>
}