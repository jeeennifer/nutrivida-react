import { useNutrivida } from '../hooks/useNutrivida'
import { TablaAdministrador } from '../components/organisms/TablaAdministrador'
import { formatearPrecio } from '../utils/formato'

// CONTAINER: adapta registros a la tabla y conecta el borrado de planes.
export function PlanesAdminContainer() {
  const { planes, eliminarPlan } = useNutrivida()

  const filas = planes.map((plan) => ({
    id: plan.id,
    celdas: [
      plan.nombre,
      plan.etiqueta,
      formatearPrecio(plan.precio),
      plan.stock,
    ],
    editar: `/admin/planes/${plan.id}/editar`,
  }))

  return (
    <TablaAdministrador
      titulo="Listado de planes"
      columnas={['Nombre', 'Categoría', 'Precio', 'Stock']}
      filas={filas}
      nuevo={{ to: '/admin/planes/nuevo', texto: '+ Nuevo plan' }}
      onEliminar={eliminarPlan}
    />
  )
}