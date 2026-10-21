import { GrillaBlog } from '../components/organisms/GrillaBlog'
import { ARTICULOS } from '../data/articulosData'

// CONTAINER: aporta al listado los artículos originales de Nutrivida.
export function BlogContainer() {
  return <GrillaBlog articulos={ARTICULOS} />
}