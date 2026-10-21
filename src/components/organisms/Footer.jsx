import { Container } from 'react-bootstrap'

// ORGANISMO: recibe las líneas del pie de página y las presenta.
export function Footer({ lineas }) {
  return (
    <footer className="footer-minimalista">
      <Container fluid className="contenedor">
        {lineas.map((linea) => (
          <p key={linea}>{linea}</p>
        ))}
      </Container>
    </footer>
  )
}