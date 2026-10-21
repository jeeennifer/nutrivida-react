import { Form } from 'react-bootstrap'
import { EtiquetaCampo } from '../atoms/EtiquetaCampo'
import { EntradaCampo } from '../atoms/EntradaCampo'

// MOLÉCULA: reúne etiqueta, entrada, ayuda y mensaje de error.
// Recibe el valor, el error y el manejador del cambio mediante props.
export function CampoFormulario({ campo, valor, error, onChange }) {
  const { label, ayuda, ...entrada } = campo

  return (
    <Form.Group className="grupo-form">
      <EtiquetaCampo id={campo.id}>{label}</EtiquetaCampo>

      <EntradaCampo
        {...entrada}
        value={valor ?? ''}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={`${campo.id}-ayuda ${campo.id}-error`}
      />

      <small id={`${campo.id}-ayuda`}>{ayuda}</small>

      <span
        id={`${campo.id}-error`}
        className="mensaje-error"
        aria-live="polite"
      >
        {error}
      </span>
    </Form.Group>
  )
}