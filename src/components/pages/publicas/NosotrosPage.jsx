import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { NosotrosContainer } from '../../../containers/NosotrosContainer'

// PAGE ("/nosotros"): instancia la estructura y conecta su container.
export function NosotrosPage() {
  return (
    <PaginaTemplate>
      <NosotrosContainer />
    </PaginaTemplate>
  )
}