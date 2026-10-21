import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TituloSeccion } from '../molecules/TituloSeccion'

// ORGANISMO: presenta los accesos a la administración recibidos por props.
export function InicioAdministrador({ opciones }) {
  return (
    <>
      <TituloSeccion subtitulo="PANEL ADMINISTRADOR" titulo="Bienvenido/a" />

      <Row className="nv-grilla grilla-admin">
        {opciones.map((opcion) => (
          <Col xs={12} md={6} key={opcion.to}>
            <article className="producto h-100 d-flex flex-column">
              <div className="producto-contenido d-flex flex-column flex-grow-1 text-center">
                <h3>{opcion.titulo}</h3>
                <p className="descripcion-plan">{opcion.descripcion}</p>
                <Link className="boton" to={opcion.to}>
                  {opcion.texto}
                </Link>
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </>
  )
}