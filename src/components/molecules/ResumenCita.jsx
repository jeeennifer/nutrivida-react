// MOLÉCULA: muestra los planes y los importes recibidos por props.
export function ResumenCita({ items, total, mostrarPrecios = true }) {
  return (
    <div className="resumen-cita">
      {!mostrarPrecios && <strong>Planes agendados:</strong>}

      {items.map((item) => (
        <div
          key={item.id}
          className="fila-resumen d-flex justify-content-between gap-3"
        >
          <span>{item.nombre} (x{item.cantidad})</span>
          {mostrarPrecios && <span>{item.subtotalTexto}</span>}
        </div>
      ))}

      <div className="fila-resumen d-flex justify-content-between gap-3">
        <span>Total</span>
        <span>{total}</span>
      </div>
    </div>
  )
}