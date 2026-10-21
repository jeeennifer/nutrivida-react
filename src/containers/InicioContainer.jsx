import { useNutrivida } from '../hooks/useNutrivida'
import { GrillaPlanes } from '../components/organisms/GrillaPlanes'
import { presentarPlan } from '../utils/presentacion'

// CONTAINER: selecciona los primeros tres planes, como la portada original.
export function InicioContainer() {
  const { planes } = useNutrivida()
  const destacados = planes.slice(0, 3).map(presentarPlan)

  return (
    <GrillaPlanes
      planes={destacados}
      titulo="Algunos de nuestros planes"
      subtitulo="PLANES DESTACADOS"
    />
  )
}