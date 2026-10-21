import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { ConfirmacionContainer } from '../../../containers/ConfirmacionContainer'

// PAGE ("/cita-confirmada"): instancia la estructura y conecta su container.
export function ConfirmacionPage() {
  return (
    <PaginaTemplate>
      <ConfirmacionContainer />
    </PaginaTemplate>
  )
}