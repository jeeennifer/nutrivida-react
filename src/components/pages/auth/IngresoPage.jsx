import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { IngresoContainer } from '../../../containers/IngresoContainer'

// PAGE ("/login"): instancia la estructura y conecta su container.
export function IngresoPage() {
  return (
    <PaginaTemplate>
      <IngresoContainer/>
    </PaginaTemplate>
  )
}