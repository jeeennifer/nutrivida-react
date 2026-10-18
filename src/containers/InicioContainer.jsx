import { useNutrivida } from '../hooks/useNutrivida'
import { PortadaTemplate } from '../components/templates/PortadaTemplate'
import { CONTENIDO } from '../data/contenido'
import { presentarPlan } from '../utils/presentacion'

// CONTAINER: selecciona los primeros tres planes, como la portada original.
export function InicioContainer() {
  const { planes } = useNutrivida()
  const destacados = planes.slice(0, 3).map(presentarPlan)

  return (
    <PortadaTemplate
      hero={CONTENIDO.hero}
      planes={destacados}
    />
  )
}