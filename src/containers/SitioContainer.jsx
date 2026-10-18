import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { MainTemplate } from '../components/templates/MainTemplate'
import { Header } from '../components/organisms/Header'
import { Footer } from '../components/organisms/Footer'
import { CarritoLateral } from '../components/organisms/CarritoLateral'
import { AvisoCupos } from '../components/organisms/AvisoCupos'
import { formatearPrecio } from '../utils/formato'
import { presentarReservas } from '../utils/presentacion'
import { tituloPagina } from '../utils/rutas'

const ENLACES_PUBLICOS = [
  { to: '/', texto: 'Inicio' },
  { to: '/planes', texto: 'Planes' },
  { to: '/nosotros', texto: 'Nosotros' },
  { to: '/blog', texto: 'Blog' },
  { to: '/contacto', texto: 'Contacto' },
]

const ENLACES_ADMIN = [
  { to: '/admin', texto: 'Inicio' },
  { to: '/admin/planes', texto: 'Planes' },
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/', texto: 'Ver sitio' },
]

const PIE_PUBLICO = [
  'NutriVida · Clínica de Asesoría Nutricional · Temuco, Región de La Araucanía',
  'Desarrollado por: Vicente, Michael y Jennifer · DSY1104',
]

const PIE_ADMIN = ['NutriVida · Panel Administrador · DSY1104']

// CONTAINER: conecta el marco común con sesión, navegación y carrito lateral.
export function SitioContainer() {
  const datos = useNutrivida()
  const [menu, setMenu] = useState({ ruta: null, abierto: false })
  const location = useLocation()
  const navigate = useNavigate()
  const administrador = location.pathname.startsWith('/admin')
  const titulo = tituloPagina(location.pathname, datos.planes)
  const expandido = menu.ruta === location.key && menu.abierto

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.title = titulo
  }, [titulo])

  function setExpandido(abierto) {
    setMenu({ ruta: location.key, abierto })
  }

  function cerrarSesion() {
    datos.cerrarSesion()
    navigate(administrador ? '/login' : '/')
  }

  return (
    <MainTemplate
      header={
        <Header
          enlaces={administrador ? ENLACES_ADMIN : ENLACES_PUBLICOS}
          logo="/assets/img/logo.png"
          administrador={administrador}
          sesion={datos.sesion}
          cantidad={datos.cantidad}
          expandido={expandido}
          onToggle={setExpandido}
          onNavegar={() => setExpandido(false)}
          onCerrarSesion={cerrarSesion}
        />
      }
      footer={
        <Footer lineas={administrador ? PIE_ADMIN : PIE_PUBLICO} />
      }
      overlays={
        <>
          <CarritoLateral
            abierto={location.pathname === '/planes' && datos.panelAbierto}
            items={presentarReservas(datos.carrito)}
            total={formatearPrecio(datos.total)}
            onCerrar={() => datos.setPanelAbierto(false)}
            onSumar={datos.agregarPlan}
            onRestar={datos.restarPlan}
            onEliminar={datos.eliminarDelCarrito}
          />

          <AvisoCupos
            texto={datos.aviso}
            onCerrar={() => datos.setAviso('')}
          />
        </>
      }
    >
      <Outlet />
    </MainTemplate>
  )
}