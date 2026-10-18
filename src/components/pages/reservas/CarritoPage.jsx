import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { CarritoContainer } from '../../../containers/CarritoContainer'

// PAGE ("/carrito"): instancia la estructura y conecta su container.
export function CarritoPage() {
  return (
    <PaginaTemplate>
      <CarritoContainer/>
    </PaginaTemplate>
  )
}