import { PaginaTemplate } from '../../templates/PaginaTemplate'
import { PaginaNoEncontrada } from '../../organisms/PaginaNoEncontrada'

// PAGE: presenta la alternativa para las direcciones desconocidas.
export function NoEncontradaPage() {
  return (
    <PaginaTemplate>
      <PaginaNoEncontrada />
    </PaginaTemplate>
  )
}