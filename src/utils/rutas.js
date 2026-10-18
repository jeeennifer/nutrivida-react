import { ARTICULOS } from '../data/articulosData'

// UTILS: títulos del documento HTML original, adaptados a las rutas React.
const TITULOS = {
  '/': 'NutriVida - Clínica Nutricional',
  '/planes': 'Planes - NutriVida',
  '/nosotros': 'Sobre Nosotros - NutriVida',
  '/blog': 'Blog - NutriVida',
  '/contacto': 'Contacto - NutriVida',
  '/login': 'Ingresar - NutriVida',
  '/registro': 'Crear Cuenta - NutriVida',
  '/carrito': 'Tu Carrito - NutriVida',
  '/agendar-cita': 'Agendar Cita - NutriVida',
  '/cita-confirmada': 'Cita Confirmada - NutriVida',
  '/admin': 'Panel Administrador - NutriVida',
  '/admin/planes': 'Planes - Panel Administrador NutriVida',
  '/admin/usuarios': 'Usuarios - Panel Administrador NutriVida',
}

export function tituloPagina(ruta, planes) {
  if (TITULOS[ruta]) {
    return TITULOS[ruta]
  }

  if (/^\/planes\/[^/]+$/.test(ruta)) {
    const id = Number(ruta.split('/')[2])
    const plan = planes.find((plan) => plan.id === id)

    return `${plan?.nombre ?? 'Detalle de Plan'} - NutriVida`
  }

  if (/^\/blog\/[^/]+$/.test(ruta)) {
    const id = Number(ruta.split('/')[2])
    const articulo = ARTICULOS.find((articulo) => articulo.id === id)

    return `${articulo?.titulo ?? 'Blog'} - NutriVida`
  }

  if (ruta.startsWith('/admin/planes/')) {
    return 'Nuevo/Editar Plan - Panel Administrador NutriVida'
  }

  if (ruta.startsWith('/admin/usuarios/')) {
    return 'Nuevo/Editar Usuario - Panel Administrador NutriVida'
  }

  return 'Página no encontrada - NutriVida'
}