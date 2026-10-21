import { useNutrivida } from '../hooks/useNutrivida'
import { ConfirmacionCita } from '../components/organisms/ConfirmacionCita'
import { formatearFecha, formatearPrecio } from '../utils/formato'

// CONTAINER: solo muestra la última cita del correo que tiene la sesión activa.
export function ConfirmacionContainer() {
  const { sesion, ultimaCita } = useNutrivida()

  const cita = ultimaCita?.correoPaciente === sesion?.correo
    ? {
        ...ultimaCita,
        fechaTexto: formatearFecha(ultimaCita.fecha),
        totalTexto: formatearPrecio(ultimaCita.total),
      }
    : null

  return <ConfirmacionCita cita={cita} />
}