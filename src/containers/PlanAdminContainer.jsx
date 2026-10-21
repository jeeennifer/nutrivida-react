import { Navigate, useParams } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { EditorPlanContainer } from './EditorPlanContainer'


// CONTAINER: separa crear/editar y remonta los valores si cambia el ID de ruta.
export function PlanAdminContainer() {
  const { id } = useParams()
  const { planes } = useNutrivida()
  const plan = planes.find((item) => item.id === Number(id))

  if (id && !plan) {
    return <Navigate to="/admin/planes" replace />
  }
  return <EditorPlanContainer key={id ?? 'nuevo'} plan={plan} />
}

