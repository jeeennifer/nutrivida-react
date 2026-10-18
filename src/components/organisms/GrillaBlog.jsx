import { Col, Row } from 'react-bootstrap'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { TarjetaArticulo } from '../molecules/TarjetaArticulo'

// ORGANISMO: reúne el título del blog y las tarjetas recibidas por props.
export function GrillaBlog({ articulos }) {
  return (
    <>
      <TituloSeccion
        subtitulo="BLOG"
        titulo="Consejos y novedades de nutrición"
      />

      <Row className="nv-grilla">
        {articulos.map((articulo) => (
          <Col key={articulo.id} xs={12} md={6} lg={4}>
            <TarjetaArticulo articulo={articulo} />
          </Col>
        ))}
      </Row>
    </>
  )
}