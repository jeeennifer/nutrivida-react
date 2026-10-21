import { PortadaTemplate } from '../../templates/PortadaTemplate'
import { HeroNutricion } from '../../organisms/HeroNutricion'
import { InicioContainer } from '../../../containers/InicioContainer'
import { CONTENIDO } from '../../../data/contenido'

// PAGE ("/"): instancia la portada con su hero y conecta el container.
export function InicioPage() {
  return (
    <PortadaTemplate hero={<HeroNutricion contenido={CONTENIDO.hero} />}>
      <InicioContainer />
    </PortadaTemplate>
  )
}