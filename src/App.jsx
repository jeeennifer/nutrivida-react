import { BrowserRouter } from 'react-router-dom'
import { MainTemplate } from './components/templates/MainTemplate'
import { PortadaTemplate } from './components/templates/PortadaTemplate'
import { Header } from './components/organisms/Header'
import { Footer } from './components/organisms/Footer'
import { PLANES_INICIALES } from './data/planesData'
import { CONTENIDO } from './data/contenido'
import { presentarPlan } from './utils/presentacion'
import './App.css'

const ENLACES = [
  { to: '/', texto: 'Inicio' },
  { to: '/planes', texto: 'Planes' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blog', texto: 'Blog' },
  { to: '/contacto', texto: 'Contacto' },
]

const PIE = [
  'NutriVida · Clínica de Asesoría Nutricional · Temuco, Región de La Araucanía',
  'Desarrollado por: Vicente, Michael y Jennifer · DSY1104',
]

// BASE: montaje provisional de la portada con los datos originales.
// Los containers gestionarán después la sesión, el menú y las reservas.
function App() {
  const destacados = PLANES_INICIALES.slice(0, 3).map(presentarPlan)

  return (
    <BrowserRouter>
      <MainTemplate
        header={
          <Header
            enlaces={ENLACES}
            logo="/assets/img/logo.png"
            administrador={false}
            sesion={null}
            cantidad={0}
          />
        }
        footer={<Footer lineas={PIE} />}
      >
        <PortadaTemplate hero={CONTENIDO.hero} planes={destacados} />
      </MainTemplate>
    </BrowserRouter>
  )
}

export default App