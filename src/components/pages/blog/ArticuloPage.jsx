import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { ArticuloContainer } from '../../../containers/ArticuloContainer'

// PAGE ("/blog/:id"): instancia la estructura y conecta su container.
export function ArticuloPage() {
  return (
    <PaginaTemplate className="articulo-blog">
      <ArticuloContainer />
    </PaginaTemplate>
  )
}