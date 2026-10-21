import { Link } from 'react-router-dom'
import { ResumenCita } from '../molecules/ResumenCita'

// ORGANISMO: presenta la cita autorizada y preparada por el container.
// el container verifica que la cita pertenezca al paciente activo.
export function ConfirmacionCita({ cita }) {
  return (
    <div className="confirmacion-caja">
      {!cita ? (
        <>
          <p>No encontramos una cita reciente.</p>
          <Link className="boton" to="/planes">Ver planes</Link>
        </>
      ) : (
        <>
          <p className="icono-exito">✅</p>
          <h2>¡Tu cita fue agendada con éxito!</h2>

          <p>
            Te esperamos el <strong>{cita.fechaTexto}</strong> a las{' '}
            <strong>{cita.hora}</strong> hrs.
          </p>

          <ResumenCita
            items={cita.planes}
            total={cita.totalTexto}
            mostrarPrecios={false}
          />

          <Link className="boton" to="/">Volver al inicio</Link>
        </>
      )}
    </div>
  )
}