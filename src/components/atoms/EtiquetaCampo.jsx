import { Form } from 'react-bootstrap'

// ÁTOMO: etiqueta accesible asociada al identificador del campo.
export function EtiquetaCampo({ id, children }) {
  return <Form.Label htmlFor={id}>{children}</Form.Label>
}