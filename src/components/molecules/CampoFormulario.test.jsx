import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CampoFormulario } from './CampoFormulario'

const campo = {
  id: 'correo',
  name: 'correo',
  label: 'Correo',
  ayuda: 'Usa tu correo institucional.',
  tipo: 'email',
}

describe('CampoFormulario', () => {
  it('asocia la etiqueta con la entrada', () => {
    render(<CampoFormulario campo={campo} valor="" error="" onChange={() => {}} />)

    expect(screen.getByLabelText('Correo')).toBeInTheDocument()
  })

  it('muestra el texto de ayuda', () => {
    render(<CampoFormulario campo={campo} valor="" error="" onChange={() => {}} />)

    expect(screen.getByText('Usa tu correo institucional.')).toBeInTheDocument()
  })

  it('muestra el valor recibido', () => {
    render(
      <CampoFormulario campo={campo} valor="ana@duoc.cl" error="" onChange={() => {}} />,
    )

    expect(screen.getByLabelText('Correo')).toHaveValue('ana@duoc.cl')
  })

  it('marca el campo como inválido y muestra el error', () => {
    render(
      <CampoFormulario
        campo={campo}
        valor=""
        error="El correo es obligatorio."
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'true')
  })

  it('no marca el campo como inválido si no hay error', () => {
    render(<CampoFormulario campo={campo} valor="" error="" onChange={() => {}} />)

    expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'false')
  })

  it('llama a onChange cuando la persona escribe', async () => {
    const onChange = vi.fn()
    const usuario = userEvent.setup()
    render(<CampoFormulario campo={campo} valor="" error="" onChange={onChange} />)

    await usuario.type(screen.getByLabelText('Correo'), 'a')

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
