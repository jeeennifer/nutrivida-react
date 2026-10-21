import { ItemCarrito } from '../molecules/ItemCarrito'

// ORGANISMO: muestra las reservas y comunica cambios mediante callbacks.
// Cantidades y subtotales llegan por props; no modifica localStorage.
export function ListaCarrito({ items, onSumar, onRestar, onEliminar }) {
  return (
    <div className="carrito-items">
      {items.length === 0 && <p>No tienes citas agendadas.</p>}

      {items.map((item) => (
        <ItemCarrito
          key={item.id}
          item={item}
          onSumar={onSumar}
          onRestar={onRestar}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  )
}