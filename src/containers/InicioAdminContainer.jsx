import { InicioAdministrador } from '../components/organisms/InicioAdministrador'

const OPCIONES = [
  {
    titulo: 'Planes',
    descripcion: 'Crear, editar o eliminar los planes de la clínica.',
    texto: 'Ir a Planes',
    to: '/admin/planes',
  },
  {
    titulo: 'Usuarios',
    descripcion: 'Crear, editar o eliminar usuarios del sistema.',
    texto: 'Ir a Usuarios',
    to: '/admin/usuarios',
  },
]

// CONTAINER: opciones del panel; AccesoContainer ya comprobó el rol.
export function InicioAdminContainer() {
  return <InicioAdministrador opciones={OPCIONES} />
}