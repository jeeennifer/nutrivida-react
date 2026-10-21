import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { UsuariosAdminContainer } from '../../../containers/UsuariosAdminContainer'

// PAGE ("/admin/usuarios"): instancia la estructura y conecta su container.
export function UsuariosAdminPage() {
  return (
    <PaginaTemplate>
      <UsuariosAdminContainer />
    </PaginaTemplate>
  )
}