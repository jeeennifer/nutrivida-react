import { Button, Col, Offcanvas, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { ControlCupos } from '../molecules/ControlCupos'

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
          <article className="item-carrito" key={item.id}>
            <Row className="g-3">
              <Col xs="auto">
                <ImagenNutrivida
                  className="img-carrito"
                  src={item.imagen}
                  alt={item.nombre}
                />
              </Col>

              <Col className="min-width-0">
                <strong>{item.nombre}</strong>
                <ControlCupos
                  item={item}
                  onSumar={onSumar}
                  onRestar={onRestar}
                />
              </Col>

              <Col xs={12} className="item-carrito-acciones">
                <p>Subtotal: {item.subtotalTexto}</p>
                <Button
                  type="button"
                  className="btn-eliminar"
                  variant="danger"
                  onClick={() => onEliminar(item.id)}
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </article>
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