import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { ContactoContainer } from '../../../containers/ContactoContainer'

// PAGE ("/contacto"): instancia la estructura y conecta su container.
export function ContactoPage() {
  return (
    <PaginaTemplate>
      <ContactoContainer/>
    </PaginaTemplate>
  )
}