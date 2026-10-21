import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { BotonNutrivida } from '../atoms/BotonNutrivida'

// ORGANISMO presentacional: presenta navegación, sesión y estado menú mediante props.
export function Header({enlaces, logo, administrador, sesion, cantidad, expandido, onToggle, onNavegar, onCerrarSesion}) {
  return (
    <header>
      <Navbar expand="lg" expanded={expandido} onToggle={onToggle}>
        <Container fluid className="contenedor encabezado">
          <Navbar.Brand
            as={Link}
            to={administrador ? '/admin' : '/'}
            onClick={onNavegar}
            className="logo"
          >
            <ImagenNutrivida src={logo} alt="NutriVida" className="logo-img" />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="menu-principal"
            label="Abrir o cerrar navegación"
          />

          <Navbar.Collapse id="menu-principal">
            <Nav
              as="nav"
              className="mx-lg-auto"
              aria-label={administrador
                ? 'Navegación del administrador'
                : 'Navegación principal'}
            >
              {enlaces.map((enlace) => (
                <Nav.Link
                  as={Link}
                  key={enlace.to}
                  to={enlace.to}
                  onClick={onNavegar}
                >
                  {enlace.texto}
                </Nav.Link>
              ))}
            </Nav>

            <div className="acciones-header d-flex align-items-center flex-wrap">
              {!administrador && (
                <Link to="/carrito" className="btn-carrito" onClick={onNavegar}>
                  Mis Horas (<span id="contador-carrito">{cantidad}</span>)
                </Link>
              )}

              {!administrador && (
                <span id="saludo-usuario">
                  {sesion ? `Hola, ${sesion.nombre}` : ''}
                </span>
              )}

              {sesion ? (
                <BotonNutrivida
                  secundario={administrador}
                  className={administrador ? '' : 'boton-ingresar'}
                  onClick={onCerrarSesion}
                >
                  Cerrar sesión
                </BotonNutrivida>
              ) : (
                <Link to="/login" className="boton-ingresar" onClick={onNavegar}>
                  Ingresar
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}