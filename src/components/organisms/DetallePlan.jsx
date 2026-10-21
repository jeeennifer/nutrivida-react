import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { BotonNutrivida } from '../atoms/BotonNutrivida'

// ORGANISMO: presenta la ficha del plan y comunica la acción de agendar. el container resuelve el ID y los cupos.
export function DetallePlan({ plan, onAgendar }) {
  return (
    <>
      <Link to="/planes" className="enlace-volver">
        ← Volver a planes
      </Link>

      <Row className="nv-detalle align-items-start">
        <Col xs={12} md={6} className="detalle-imagen">
          <ImagenNutrivida src={plan.imagen} alt={plan.nombre} />
        </Col>

        <Col xs={12} md={6} className="detalle-info">
          <p className="subtitulo">{plan.etiqueta}</p>
          <h2>{plan.nombre}</h2>
          <p className="precio-detalle">{plan.precioTexto} c/u</p>
          <p>{plan.descripcionLarga}</p>

          <div className="detalle-incluye">
            <strong>Incluye</strong>
            <ul>
              {plan.incluye.map((item, index) => (
                <li key={`${index}-${item}`}>{item}</li>
              ))}
            </ul>
          </div>

          <BotonNutrivida onClick={() => onAgendar(plan.id)}>
            Agendar cita
          </BotonNutrivida>
        </Col>
      </Row>
    </>
  )
}