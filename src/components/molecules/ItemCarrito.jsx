import { Col, Row } from 'react-bootstrap'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { BotonNutrivida } from '../atoms/BotonNutrivida'
import { ControlCupos } from './ControlCupos'

// MOLÉCULA: una línea del carrito (imagen, nombre, cupos, subtotal y eliminar).
// Con `compacto` (panel lateral) las acciones van siempre debajo;
// sin él (página del carrito) se reparten en dos zonas desde xl.
export function ItemCarrito({ item, compacto = false, onSumar, onRestar, onEliminar }) {
  const info = (
    <>
      <Col xs="auto">
        <ImagenNutrivida className="img-carrito" src={item.imagen} alt={item.nombre} />
      </Col>

      <Col className="min-width-0">
        <strong>{item.nombre}</strong>
        <ControlCupos item={item} onSumar={onSumar} onRestar={onRestar} />
      </Col>
    </>
  )

  const acciones = (
    <>
      <p>Subtotal: {item.subtotalTexto}</p>
      <BotonNutrivida
        variant="danger"
        className="btn-eliminar"
        aria-label={`Eliminar ${item.nombre}`}
        onClick={() => onEliminar(item.id)}
      >
        Eliminar
      </BotonNutrivida>
    </>
  )

  return (
    <article className="item-carrito">
      {compacto ? (
        <Row className="g-3">
          {info}
          <Col xs={12} className="item-carrito-acciones">
            {acciones}
          </Col>
        </Row>
      ) : (
        <Row className="align-items-center g-3">
          <Col xs={12} xl={8}>
            <Row className="align-items-center g-3 flex-nowrap">{info}</Row>
          </Col>
          <Col xs={12} xl={4} className="item-carrito-acciones">
            {acciones}
          </Col>
        </Row>
      )}
    </article>
  )
}