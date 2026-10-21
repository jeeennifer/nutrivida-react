import { Container } from 'react-bootstrap'

// TEMPLATE: esqueleto de la portada. El hero va a todo el ancho
// y el resto del contenido dentro del contenedor.
export function PortadaTemplate({ hero, children }) {
  return (
    <>
      {hero}

      <Container fluid className="contenedor seccion">
        {children}
      </Container>
    </>
  )
}