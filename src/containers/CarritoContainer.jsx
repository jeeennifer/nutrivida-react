import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { CarritoTemplate } from '../components/templates/CarritoTemplate'
import { formatearPrecio } from '../utils/formato'
import { presentarReservas } from '../utils/presentacion'

// CONTAINER: controla el resumen y conserva el destino al pedir iniciar sesión.
export function CarritoContainer() {
  const datos = useNutrivida()
  const [mensaje, setMensaje] = useState(null)
  const navigate = useNavigate()

  function confirmar() {
    if (datos.carrito.length === 0) {
      setMensaje({
        tipo: 'error',
        texto: 'Tu carrito está vacío. Agrega al menos un plan antes de continuar.',
      })

      return
    }

    if (!datos.sesion) {
      localStorage.setItem('destinoTrasLogin', '/agendar-cita')
      navigate('/login')
      return
    }

    navigate('/agendar-cita')
  }

  return (
    <CarritoTemplate
      listado={{
        items: presentarReservas(datos.carrito),
        onSumar: datos.agregarPlan,
        onRestar: datos.restarPlan,
        onEliminar: datos.eliminarDelCarrito,
      }}
      resumen={{
        total: formatearPrecio(datos.total),
        mensaje,
        onVaciar: datos.vaciarCarrito,
        onConfirmar: confirmar,
      }}
    />
  )
}