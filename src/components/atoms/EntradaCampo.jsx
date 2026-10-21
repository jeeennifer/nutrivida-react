import { Form } from 'react-bootstrap'

// ÁTOMO: recibe el valor y los eventos por props.
// El estado del formulario se gestionará desde un container.
export function EntradaCampo({ tipo = 'text', opciones = [], ...props }) {
  if (tipo === 'select') {
    return (
      <Form.Select {...props}>
        {opciones.map((opcion) => (
          <option key={opcion.value} value={opcion.value}>
            {opcion.label}
          </option>
        ))}
      </Form.Select>
    )
  }

  return (
    <Form.Control
      as={tipo === 'textarea' ? 'textarea' : 'input'}
      type={tipo === 'textarea' ? undefined : tipo}
      {...props}
    />
  )
}