import { Navigate, useParams } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { EditorUsuarioContainer } from './EditorUsuarioContainer'

// CONTAINER: resuelve el RUN de la ruta y decide si se crea o se edita.
export function UsuarioAdminContainer() {
  const { run } = useParams()
  const { usuarios } = useNutrivida()
  const usuario = usuarios.find((item) => item.run === run)

  if (run && !usuario) {
    return <Navigate to="/admin/usuarios" replace />
  }

  return (
    <EditorUsuarioContainer
      key={run ?? 'nuevo'}
      usuario={usuario}
    />
  )
}

