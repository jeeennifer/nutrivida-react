import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { AgendarCitaContainer } from '../../../containers/AgendarCitaContainer'

// PAGE ("/agendar-cita"): instancia la estructura y conecta su container.
export function AgendarCitaPage() {
  return (
    <PaginaTemplate>
      <AgendarCitaContainer/>
    </PaginaTemplate>
  )
}