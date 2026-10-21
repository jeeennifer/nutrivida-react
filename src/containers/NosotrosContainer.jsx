import { EquipoNutrivida } from '../components/organisms/EquipoNutrivida'
import { CONTENIDO } from '../data/contenido'

// CONTAINER: aporta misión y equipos del sitio original.
export function NosotrosContainer() {
  return <EquipoNutrivida contenido={CONTENIDO} />
}