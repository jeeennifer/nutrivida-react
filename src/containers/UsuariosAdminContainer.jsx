import { useNutrivida } from '../hooks/useNutrivida'
import { TablaAdministrador } from '../components/organisms/TablaAdministrador'

// CONTAINER: prepara las filas y conecta las acciones de usuarios.
export function UsuariosAdminContainer() {
  const { usuarios, eliminarUsuario } = useNutrivida()

  const filas = usuarios.map((usuario) => ({
    id: usuario.run,
    celdas: [
      usuario.run,
      `${usuario.nombre} ${usuario.apellidos}`,
      usuario.correo,
      usuario.tipo,
    ],
    editar: `/admin/usuarios/${encodeURIComponent(usuario.run)}/editar`,
  }))

  return (
    <TablaAdministrador
      titulo="Listado de usuarios"
      columnas={['RUN', 'Nombre completo', 'Correo', 'Tipo']}
      filas={filas}
      nuevo={{ to: '/admin/usuarios/nuevo', texto: '+ Nuevo usuario' }}
      onEliminar={eliminarUsuario}
    />
  )
}