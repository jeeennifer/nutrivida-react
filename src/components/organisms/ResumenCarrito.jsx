import { BotonNutrivida } from '../atoms/BotonNutrivida'
import { MensajeFormulario } from '../atoms/MensajeFormulario'

// ORGANISMO: presenta el total y las acciones generales de la reserva.
export function ResumenCarrito({ total, mensaje, onVaciar, onConfirmar }) {
  return (
    <aside className="carrito-resumen">
      <h3>Resumen</h3>
      <p>Subtotal: {total}</p>
      <p className="precio-total">Total: {total}</p>

      <BotonNutrivida secundario onClick={onVaciar}>
        Vaciar carrito
      </BotonNutrivida>

      <BotonNutrivida onClick={onConfirmar}>
        Confirmar y agendar
      </BotonNutrivida>

      <MensajeFormulario mensaje={mensaje} />
      <small>Deberás iniciar sesión para completar la contratación.</small>
    </aside>
  )
}