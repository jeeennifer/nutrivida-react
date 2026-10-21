import { Col, Row } from 'react-bootstrap'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { TarjetaIntegrante } from '../molecules/TarjetaIntegrante'

// ORGANISMO: presenta la misión, el equipo clínico y los desarrolladores.
export function EquipoNutrivida({ contenido }) {
  return (
    <>
      <TituloSeccion
        titulo="Sobre Nosotros"
        subtitulo="Conoce a quienes dan vida a NutriVida"
        subtituloDespues
      />

      <div className="seccion-texto">
        <p><strong>Nuestra Misión:</strong> {contenido.mision}</p>
      </div>

      <h3 className="titulo-centrado">Nuestro Equipo Clínico</h3>

      <Row className="nv-grilla grilla-equipo">
        {contenido.equipoClinico.map((integrante) => (
          <Col key={integrante.nombre} xs={12} md={6} lg={3}>
            <TarjetaIntegrante integrante={integrante} />
          </Col>
        ))}
      </Row>

      <h3 className="titulo-centrado">
        Equipo de Desarrollo Web (DSY1104)
      </h3>

      <Row className="nv-grilla grilla-equipo grilla-desarrolladores">
        {contenido.equipoDesarrollo.map((integrante) => (
          <Col key={integrante.nombre} xs={12} md={6} lg={4}>
            <TarjetaIntegrante integrante={integrante} />
          </Col>
        ))}
      </Row>
    </>
  )
}