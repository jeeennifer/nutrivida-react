import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { InicioAdminContainer } from '../../../containers/InicioAdminContainer'

// PAGE ("/admin"): instancia la estructura y conecta su container.
export function InicioAdminPage() {
  return (
    <PaginaTemplate>
      <InicioAdminContainer />
    </PaginaTemplate>
  )
}