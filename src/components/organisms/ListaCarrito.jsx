import { Button, Col, Row } from 'react-bootstrap'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { ControlCupos } from '../molecules/ControlCupos'

// ORGANISMO: muestra las reservas y comunica cambios mediante callbacks. cantidades y subtotales llegan por props; no modifica localStorage
export function ListaCarrito({ items, onSumar, onRestar, onEliminar }) {
  return (
    <div className="carrito-items">
      {items.length === 0 && <p>No tienes citas agendadas.</p>}

      {items.map((item) => (
        <article className="item-carrito" key={item.id}>
          <Row className="align-items-center g-3">
            <Col xs={12} xl={8}>
              <Row className="align-items-center g-3 flex-nowrap">
                <Col xs="auto">
                  <ImagenNutrivida
                    src={item.imagen}
                    alt={item.nombre}
                    className="img-carrito"
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
              </Row>
            </Col>

            <Col xs={12} xl={4} className="item-carrito-acciones">
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
    </div>
  )
}