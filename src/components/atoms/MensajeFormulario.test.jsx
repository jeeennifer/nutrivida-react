import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MensajeFormulario } from './MensajeFormulario'

describe('MensajeFormulario', () => {
  it('no muestra nada si no hay mensaje', () => {
    const { container } = render(<MensajeFormulario mensaje={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('no muestra nada si el mensaje no tiene texto', () => {
    const { container } = render(
      <MensajeFormulario mensaje={{ tipo: 'error', texto: '' }} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('muestra un error con role alert', () => {
    render(
      <MensajeFormulario mensaje={{ tipo: 'error', texto: 'Algo salió mal.' }} />,
    )

    const mensaje = screen.getByRole('alert')
    expect(mensaje).toHaveTextContent('Algo salió mal.')
    expect(mensaje).toHaveClass('mensaje-formulario', 'error')
  })

  it('muestra un éxito con role status', () => {
    render(
      <MensajeFormulario mensaje={{ tipo: 'exito', texto: 'Cita agendada.' }} />,
    )

    const mensaje = screen.getByRole('status')
    expect(mensaje).toHaveTextContent('Cita agendada.')
    expect(mensaje).toHaveClass('mensaje-formulario', 'exito')
  })
})
