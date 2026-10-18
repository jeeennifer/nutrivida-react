import { Col, Container, Form, Row } from 'react-bootstrap'
import { BotonNutrivida } from './components/atoms/BotonNutrivida'
import { ImagenNutrivida } from './components/atoms/ImagenNutrivida'
import { EtiquetaCampo } from './components/atoms/EtiquetaCampo'
import { EntradaCampo } from './components/atoms/EntradaCampo'
import { MensajeFormulario } from './components/atoms/MensajeFormulario'
import { PrecioPlan } from './components/atoms/PrecioPlan'
import { formatearPrecio } from './utils/formato'
import './App.css'

// BASE: vista provisional para comprobar los seis átomos con datos de ejemplo.
// Las páginas definitivas se conectarán al preparar el enrutamiento.
function App() {
  const mensajeEjemplo = {
    tipo: 'exito',
    texto: '¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.',
  }

  return (
    <Container as="main" className="py-4">
      <h1>NutriVida</h1>
      <p>Clínica de Asesoría Nutricional</p>

      <Row className="g-4 mt-3 align-items-center">
        <Col xs={12} md={6}>
          <ImagenNutrivida
            src="/assets/img/Nutri.png"
            alt="Icono de NutriVida"
          />
        </Col>

        <Col xs={12} md={6}>
          <p className="mb-3">
            Consulta Deportiva con Ana Soto:{' '}
            <PrecioPlan className="fw-bold">
              {formatearPrecio(25000)}
            </PrecioPlan>
          </p>

          <Form.Group className="mb-3">
            <EtiquetaCampo id="correo-ejemplo">
              Correo electrónico
            </EtiquetaCampo>
            <EntradaCampo
              id="correo-ejemplo"
              name="correo"
              tipo="email"
              value="paciente@duoc.cl"
              readOnly
            />
          </Form.Group>

          <BotonNutrivida>Agendar</BotonNutrivida>

          <div className="mt-3">
            <MensajeFormulario mensaje={mensajeEjemplo} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App