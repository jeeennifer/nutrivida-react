import { Col, Row } from 'react-bootstrap'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { TarjetaPlan } from '../molecules/TarjetaPlan'

// ORGANISMO: reúne el título y las tarjetas de planes en una grilla responsive (mobile-first).
export function GrillaPlanes({planes, titulo, subtitulo, mostrarAgendar, onAgendar}) {
  return (
    <>
      <TituloSeccion titulo={titulo} subtitulo={subtitulo} />

      <Row className="nv-grilla">
        {planes.map((plan) => (
          <Col key={plan.id} xs={12} md={6} lg={4}>
            <TarjetaPlan
              plan={plan}
              mostrarAgendar={mostrarAgendar}
              onAgendar={onAgendar}
            />
          </Col>
        ))}
      </Row>

      {planes.length === 0 && (
        <p>No hay planes disponibles por el momento.</p>
      )}
    </>
  )
}