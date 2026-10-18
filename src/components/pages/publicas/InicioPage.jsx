import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { InicioContainer } from '../../../containers/InicioContainer'

// PAGE ("/"): instancia la estructura y conecta su container.
export function InicioPage() {
  return <PaginaTemplate portada><InicioContainer /></PaginaTemplate>
}