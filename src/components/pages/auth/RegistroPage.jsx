import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { RegistroContainer } from '../../../containers/RegistroContainer'

// PAGE ("/registro"): instancia la estructura y conecta su container.
export function RegistroPage() {
  return (
    <PaginaTemplate>
      <RegistroContainer/>
    </PaginaTemplate>
  )
}