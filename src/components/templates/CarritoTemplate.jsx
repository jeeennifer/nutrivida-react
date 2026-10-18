import { Col, Row } from 'react-bootstrap'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { ListaCarrito } from '../organisms/ListaCarrito'
import { ResumenCarrito } from '../organisms/ResumenCarrito'

// TEMPLATE: distribuye el listado y el resumen de las reservas.
export function CarritoTemplate({ listado, resumen }) {
  return (
    <>
      <TituloSeccion titulo="Tu carrito" />

      <Row className="nv-carrito align-items-start">
        <Col xs={12} lg={8}>
          <ListaCarrito {...listado} />
        </Col>

        <Col xs={12} lg={4}>
          <ResumenCarrito {...resumen} />
        </Col>
      </Row>
    </>
  )
}