import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import { fechaLocalActual, formatearPrecio } from '../utils/formato'
import { presentarReservas } from '../utils/presentacion'

// CONTAINER: fecha, horario, sesión y cupos se comprueban antes de confirmar.
export function AgendarCitaContainer() {
  const { carrito, total, confirmarCita } = useNutrivida()
  const form = useFormulario({ fecha: '', hora: '' })
  const [confirmada, setConfirmada] = useState(false)
  const navigate = useNavigate()
  const hoy = fechaLocalActual()

  const configuracion = {
    ...FORMULARIOS.cita,
    campos: FORMULARIOS.cita.campos.map((campo) =>
      campo.name === 'fecha' ? { ...campo, min: hoy } : campo,
    ),
  }

  function enviar(evento) {
    evento.preventDefault()

    const { fecha, hora } = form.valores
    const horarios = FORMULARIOS.cita.campos
      .find((campo) => campo.name === 'hora')
      .opciones.map((opcion) => opcion.value)
      .filter(Boolean)

    let errorFecha = ''

    if (!fecha) {
      errorFecha = 'Selecciona un día para tu cita.'
    } else if (fecha < hoy) {
      errorFecha = 'La fecha no puede ser anterior a hoy.'
    }

    const errores = {
      fecha: errorFecha,
      hora: horarios.includes(hora) ? '' : 'Selecciona un horario.',
    }

    if (!form.comprobar(errores)) {
      return
    }

    const resultado = confirmarCita(fecha, hora)

    if (resultado.sinSesion) {
      localStorage.setItem('destinoTrasLogin', '/agendar-cita')
      navigate('/login')
      return
    }

    if (resultado.error) {
      form.error(resultado.error)
      return
    }

    // Confirmar vacía el carrito. Este estado permite mostrar primero
    // la confirmación, antes de aplicar la guarda de carrito vacío.
    setConfirmada(true)
  }

  if (confirmada) {
    return <Navigate to="/cita-confirmada" replace />
  }

  if (carrito.length === 0) {
    return <Navigate to="/planes" replace />
  }

  return (
    <FormularioNutrivida
      configuracion={configuracion}
      {...form}
      onSubmit={enviar}
      resumen={{
        items: presentarReservas(carrito),
        total: formatearPrecio(total),
      }}
    />
  )
}