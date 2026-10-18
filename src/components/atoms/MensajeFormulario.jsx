// ÁTOMO: recibe el mensaje y su tipo por props.
// El container decidirá cuándo mostrarlo y qué texto tendrá.
export function MensajeFormulario({ mensaje }) {
  if (!mensaje?.texto) return null

  return (
    <p
      className={`mensaje-formulario ${mensaje.tipo}`}
      role={mensaje.tipo === 'error' ? 'alert' : 'status'}
    >
      {mensaje.texto}
    </p>
  )
}