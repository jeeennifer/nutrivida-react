import { Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ItemCarrito } from '../molecules/ItemCarrito'

// ORGANISMO: panel lateral controlado mediante props. Apertura y acciones pertenecen al container.
export function CarritoLateral({abierto, items, total, onCerrar, onSumar, onRestar, onEliminar}) {
  return (
    <Offcanvas
      show={abierto}
      onHide={onCerrar}
      placement="end"
      className="carrito-lateral"
      aria-labelledby="titulo-carrito-lateral"
    >
      <Offcanvas.Header closeButton closeLabel="Cerrar carrito">
        <Offcanvas.Title as="h3" id="titulo-carrito-lateral">
          Mi Carrito
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {items.length === 0 && <p>No tienes citas agendadas.</p>}

        {items.map((item) => (
          <ItemCarrito
            key={item.id}
            item={item}
            compacto
            onSumar={onSumar}
            onRestar={onRestar}
            onEliminar={onEliminar}
          />
        ))}
      </Offcanvas.Body>

      <div className="carrito-lateral-footer">
        <p className="precio-total">Total: {total}</p>
        <Link className="boton" to="/carrito" onClick={onCerrar}>
          Ir a revisar y agendar
        </Link>
      </div>
    </Offcanvas>
  )
}