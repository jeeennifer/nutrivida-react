import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { BlogContainer } from '../../../containers/BlogContainer'

// PAGE ("/blog"): instancia la estructura y conecta su container.
export function BlogPage() {
  return (
    <PaginaTemplate>
      <BlogContainer />
    </PaginaTemplate>
  )
}