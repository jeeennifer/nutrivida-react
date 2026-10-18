import { formatearPrecio } from './formato'

// UTILS: preparan los datos que recibirán los componentes visuales.
// Adaptadores puros: entregan a la UI datos listos para mostrar.

export function presentarPlan(plan) {
  return {
    ...plan,
    precioTexto: formatearPrecio(plan.precio),
  }
}

export function presentarReservas(items) {
  return items.map((item) => ({
    ...item,
    subtotalTexto: formatearPrecio(item.precio * item.cantidad),
  }))
}