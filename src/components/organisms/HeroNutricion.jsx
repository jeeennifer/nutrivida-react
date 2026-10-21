import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'

// ORGANISMO: portada con textos, imagen y enlaces del sitio original.
export function HeroNutricion({ contenido }) {
  return (
    <section className="hero">
      <Container fluid className="contenedor">
        <Row className="align-items-center nv-hero">
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 6, order: 1 }}
            className="hero-contenido"
          >
            <h2>{contenido.titulo}</h2>
            <p>{contenido.descripcion}</p>

            <div className="hero-botones d-flex flex-wrap">
              <Link className="boton" to="/planes">
                Ver planes
              </Link>
              <Link className="boton boton-secundario" to="/nosotros">
                Conócenos
              </Link>
            </div>
          </Col>

          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 6, order: 2 }}
            className="hero-imagen"
          >
            <ImagenNutrivida src={contenido.imagen} alt={contenido.alt} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}