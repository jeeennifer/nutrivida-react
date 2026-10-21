import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'

// CONTAINER: decide el acceso a cada grupo de rutas según sesión y rol.
export function AccesoContainer({ administrador = false }) {
  const { sesion } = useNutrivida()
  const location = useLocation()

  useEffect(() => {
    if (!sesion && location.pathname === '/agendar-cita') {
      localStorage.setItem('destinoTrasLogin', '/agendar-cita')
    }
  }, [sesion, location.pathname])

  if (!sesion) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ destino: location.pathname }}
      />
    )
  }

  if (administrador && sesion.tipo !== 'Administrador') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}