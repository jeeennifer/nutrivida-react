import { Route, Routes } from 'react-router-dom'
import { SitioContainer } from './containers/SitioContainer'
import { AccesoContainer } from './containers/AccesoContainer'
import { RutaAnteriorContainer } from './containers/RutaAnteriorContainer'
import { InicioPage } from './components/pages/publicas/InicioPage'
import { NosotrosPage } from './components/pages/publicas/NosotrosPage'
import { ContactoPage } from './components/pages/publicas/ContactoPage'
import { InicioAdminPage } from './components/pages/admin/InicioAdminPage'
import { PlanesAdminPage } from './components/pages/admin/PlanesAdminPage'
import { PlanAdminPage } from './components/pages/admin/PlanAdminPage'
import { UsuariosAdminPage } from './components/pages/admin/UsuariosAdminPage'
import { UsuarioAdminPage } from './components/pages/admin/UsuarioAdminPage'
import { BlogPage } from './components/pages/blog/BlogPage'
import { ArticuloPage } from './components/pages/blog/ArticuloPage'
import { IngresoPage } from './components/pages/auth/IngresoPage'
import { RegistroPage } from './components/pages/auth/RegistroPage'
import { PlanesPage } from './components/pages/reservas/PlanesPage'
import { DetallePlanPage } from './components/pages/reservas/DetallePlanPage'
import { CarritoPage } from './components/pages/reservas/CarritoPage'
import { AgendarCitaPage } from './components/pages/reservas/AgendarCitaPage'
import { ConfirmacionPage } from './components/pages/reservas/ConfirmacionPage'
import { NoEncontradaPage } from './components/pages/publicas/NoEncontradaPage'
import './App.css'


const RUTAS_ANTERIORES = [
  ['index.html', '/'],
  ['planes.html', '/planes'],
  ['detalle-plan.html', '/planes', 'detalle'],
  ['nosotros.html', '/nosotros'],
  ['blog.html', '/blog'],
  ['blog-detalle-1.html', '/blog/1'],
  ['blog-detalle-2.html', '/blog/2'],
  ['blog-detalle-3.html', '/blog/3'],
  ['contacto.html', '/contacto'],
  ['login.html', '/login'],
  ['registro.html', '/registro'],
  ['carrito.html', '/carrito'],
  ['agendar-cita.html', '/agendar-cita'],
  ['cita-confirmada.html', '/cita-confirmada'],
  ['admin-home.html', '/admin'],
  ['admin-planes.html', '/admin/planes'],
  ['admin-plan-form.html', '/admin/planes/nuevo', 'plan'],
  ['admin-usuarios.html', '/admin/usuarios'],
  ['admin-usuario-form.html', '/admin/usuarios/nuevo', 'usuario'],
]

// APLICACIÓN: define las rutas; los containers gestionan datos y acciones.
function App() {
  return (
    <Routes>
      <Route element={<SitioContainer />}>
        <Route index element={<InicioPage />} />
        <Route path="nosotros" element={<NosotrosPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<ArticuloPage />} />
        <Route path="login" element={<IngresoPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="planes" element={<PlanesPage />} />
        <Route path="planes/:id" element={<DetallePlanPage />} />
        <Route path="carrito" element={<CarritoPage />} />

        <Route element={<AccesoContainer />}>
          <Route path="agendar-cita" element={<AgendarCitaPage />} />
          <Route path="cita-confirmada" element={<ConfirmacionPage />} />
        </Route>

        <Route element={<AccesoContainer administrador />}>
          <Route path="admin" element={<InicioAdminPage />} />
          <Route path="admin/planes" element={<PlanesAdminPage />} />
          <Route path="admin/planes/nuevo" element={<PlanAdminPage />} />
          <Route path="admin/planes/:id/editar" element={<PlanAdminPage />} />
          <Route path="admin/usuarios" element={<UsuariosAdminPage />} />
          <Route path="admin/usuarios/nuevo" element={<UsuarioAdminPage />} />
          <Route path="admin/usuarios/:run/editar" element={<UsuarioAdminPage />} />
        </Route>

        {RUTAS_ANTERIORES.map(([ruta, destino, tipo]) => (
          <Route
            key={ruta}
            path={ruta}
            element={
              <RutaAnteriorContainer destino={destino} tipo={tipo} />
            }
          />
        ))}

        <Route path="*" element={<NoEncontradaPage />} />
      </Route>
    </Routes>
  )
}

export default App