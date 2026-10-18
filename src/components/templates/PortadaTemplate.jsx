import { Container } from 'react-bootstrap'
import { HeroNutricion } from '../organisms/HeroNutricion'
import { GrillaPlanes } from '../organisms/GrillaPlanes'

// TEMPLATE: distribuye la portada y los planes destacados recibidos por props.
export function PortadaTemplate({ hero, planes }) {
  return (
    <>
      <HeroNutricion contenido={hero} />

      <Container fluid className="contenedor seccion">
        <GrillaPlanes
          planes={planes}
          titulo="Algunos de nuestros planes"
          subtitulo="PLANES DESTACADOS"
        />
      </Container>
    </>
  )
}