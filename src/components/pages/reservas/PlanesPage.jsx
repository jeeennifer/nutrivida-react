import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { PlanesContainer } from '../../../containers/PlanesContainer'

// PAGE ("/planes"): instancia la estructura y conecta su container.
export function PlanesPage() {
  return (
    <PaginaTemplate>
      <PlanesContainer/>
    </PaginaTemplate>
  )
}