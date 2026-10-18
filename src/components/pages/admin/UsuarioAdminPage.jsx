import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { UsuarioAdminContainer } from '../../../containers/UsuarioAdminContainer'

// PAGE: formulario compartido para crear y editar usuarios.
export function UsuarioAdminPage() {
  return (
    <PaginaTemplate>
      <UsuarioAdminContainer />
    </PaginaTemplate>
  )
}