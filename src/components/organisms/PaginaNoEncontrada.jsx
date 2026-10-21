import { Link } from 'react-router-dom'
import { TituloSeccion } from '../molecules/TituloSeccion'

// ORGANISMO: presenta la alternativa para una dirección desconocida.
export function PaginaNoEncontrada() {
  return (
    <div className="text-center">
      <TituloSeccion
        titulo="Página no encontrada"
        descripcion="La dirección solicitada no existe en NutriVida."
      />
      <Link className="boton" to="/">Volver al inicio</Link>
    </div>
  )
}