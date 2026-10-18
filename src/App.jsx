import { BrowserRouter } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { TarjetaPlan } from './components/molecules/TarjetaPlan'
import { TarjetaArticulo } from './components/molecules/TarjetaArticulo'
import { TarjetaIntegrante } from './components/molecules/TarjetaIntegrante'
import { presentarPlan } from './utils/presentacion'
import './App.css'

// BASE: galería provisional para comprobar los tres tipos de tarjetas.
// BrowserRouter se moverá a main.jsx al conectar las páginas definitivas.
function App() {
  const planEjemplo = presentarPlan({
    id: 1,
    etiqueta: 'Nutrición Deportiva',
    nombre: 'Consulta Deportiva con Ana Soto',
    descripcion: 'Evaluación completa enfocada en rendimiento físico y masa muscular.',
    precio: 25000,
    imagen: '/assets/img/plan-consulta.jpg',
  })

  const articuloEjemplo = {
    id: 2,
    titulo: '5 mitos sobre las dietas restrictivas',
    fecha: '2 de agosto, 2026',
    categoria: 'Bienestar',
    descripcion: 'Desmentimos las creencias más comunes sobre bajar de peso rápido.',
    imagen: '/assets/img/dieta.jpg',
    alt: 'Mitos de las dietas restrictivas',
  }

  const integranteEjemplo = {
    nombre: 'Ana Soto',
    cargo: 'Especialista en Nutrición Deportiva',
    imagen: '/assets/img/AnaSoto.jpg',
  }

  return (
    <BrowserRouter>
      <Container as="main" className="py-4 px-3">
        <h1>NutriVida</h1>
        <p className="mb-4">Clínica de Asesoría Nutricional</p>

        <Row className="nv-grilla">
          <Col xs={12} md={6} lg={4}>
            <TarjetaPlan
              plan={planEjemplo}
              mostrarAgendar
              onAgendar={(id) => console.info('Agendar plan:', id)}
            />
          </Col>

          <Col xs={12} md={6} lg={4}>
            <TarjetaArticulo articulo={articuloEjemplo} />
          </Col>

          <Col xs={12} md={6} lg={4}>
            <TarjetaIntegrante integrante={integranteEjemplo} />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App