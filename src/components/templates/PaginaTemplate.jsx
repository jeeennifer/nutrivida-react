import { Container } from 'react-bootstrap'

// TEMPLATE: define el ancho y el espaciado de las vistas interiores.
export function PaginaTemplate({ children, portada = false, articulo = false }) {
  if (portada) return <>{children}</>

  return (
    <Container
      fluid
      className={`contenedor seccion ${articulo ? 'articulo-blog' : ''}`}
    >
      {children}
    </Container>
  )
}