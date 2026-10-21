import { Col, Row } from 'react-bootstrap'
import { TituloSeccion } from '../molecules/TituloSeccion'

// TEMPLATE: distribuye el listado y el resumen de las reservas.
export function CarritoTemplate({ titulo, lista, resumen }) {
  return (
    <>
      <TituloSeccion titulo={titulo} />

      <Row className="nv-carrito align-items-start">
        <Col xs={12} lg={8}>
          {lista}
        </Col>

        <Col xs={12} lg={4}>
          {resumen}
        </Col>
      </Row>
    </>
  )
}