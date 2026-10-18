import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { PlanesAdminContainer } from '../../../containers/PlanesAdminContainer'

// PAGE ("/admin/planes"): instancia la estructura y conecta su container.
export function PlanesAdminPage() {
  return (
    <PaginaTemplate>
      <PlanesAdminContainer />
    </PaginaTemplate>
  )
}