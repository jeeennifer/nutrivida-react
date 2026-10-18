import { Container } from 'react-bootstrap'
import './App.css'

// BASE: pantalla provisional para comprobar el arranque de NutriVida.
// Las vistas definitivas se construirán en los cinco niveles Atomic Design.
function App() {
  return (
    <Container as="main" className="py-4">
      <h1>NutriVida</h1>
      <p>Clínica de Asesoría Nutricional</p>
    </Container>
  )
}

export default App