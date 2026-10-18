import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { DetallePlanContainer } from '../../../containers/DetallePlanContainer'

// PAGE ("/planes/:id"): instancia la estructura y conecta su container.
export function DetallePlanPage() {
  return (
    <PaginaTemplate>
      <DetallePlanContainer />
    </PaginaTemplate>
  )
}