import { Navigate, useSearchParams } from 'react-router-dom'

// CONTAINER: adapta las direcciones HTML antiguas a las rutas de React.
export function RutaAnteriorContainer({ destino, tipo }) {
  const [parametros] = useSearchParams()
  let ruta = destino

  if (tipo === 'detalle') {
    ruta = parametros.get('id')
      ? `/planes/${encodeURIComponent(parametros.get('id'))}`
      : '/planes'
  }

  if (tipo === 'plan') {
    ruta = parametros.get('id')
      ? `/admin/planes/${encodeURIComponent(parametros.get('id'))}/editar`
      : '/admin/planes/nuevo'
  }

  if (tipo === 'usuario') {
    ruta = parametros.get('run')
      ? `/admin/usuarios/${encodeURIComponent(parametros.get('run'))}/editar`
      : '/admin/usuarios/nuevo'
  }

  return <Navigate to={ruta} replace />
}