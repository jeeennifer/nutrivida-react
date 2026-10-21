import { Container } from 'react-bootstrap'

// TEMPLATE: define el ancho y el espaciado de las vistas interiores.
// `className` permite añadir la clase propia de una vista (por ejemplo, la del artículo).
export function PaginaTemplate({ children, className = '' }) {
  return (
    <Container fluid className={`contenedor seccion ${className}`.trim()}>
      {children}
    </Container>
  )
}