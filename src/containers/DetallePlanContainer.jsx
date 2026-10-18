import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { DetallePlan } from '../components/organisms/DetallePlan'
import { presentarPlan } from '../utils/presentacion'

// CONTAINER: resuelve el ID y reserva antes de navegar al carrito.
export function DetallePlanContainer() {
  const { id } = useParams()
  const { planes, agregarPlan } = useNutrivida()
  const navigate = useNavigate()
  const plan = planes.find((item) => item.id === Number(id))

  if (!plan) {
    return <Navigate to="/planes" replace />
  }

  function agendar(planId) {
    if (agregarPlan(planId)) {
      navigate('/carrito')
    }
  }

  return (
    <DetallePlan
      plan={presentarPlan(plan)}
      onAgendar={agendar}
    />
  )
}