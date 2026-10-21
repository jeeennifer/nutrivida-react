import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { PlanAdminContainer } from '../../../containers/PlanAdminContainer'

// PAGE: formulario compartido para crear y editar planes.
export function PlanAdminPage() {
  return (
    <PaginaTemplate>
      <PlanAdminContainer />
    </PaginaTemplate>
  )
}