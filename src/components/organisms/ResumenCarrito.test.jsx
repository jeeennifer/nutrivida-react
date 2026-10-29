import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ResumenCarrito } from './ResumenCarrito'

describe('ResumenCarrito', () => {
  it('muestra el subtotal y el total recibidos', () => {
    render(<ResumenCarrito total="$60.000" mensaje={null} />)

    expect(screen.getByText('Subtotal: $60.000')).toBeInTheDocument()
    expect(screen.getByText('Total: $60.000')).toBeInTheDocument()
  })

  it('llama a onVaciar al pulsar "Vaciar carrito"', async () => {
    const onVaciar = vi.fn()
    const usuario = userEvent.setup()
    render(<ResumenCarrito total="$0" mensaje={null} onVaciar={onVaciar} />)

    await usuario.click(screen.getByRole('button', { name: 'Vaciar carrito' }))

    expect(onVaciar).toHaveBeenCalledTimes(1)
  })

  it('llama a onConfirmar al pulsar "Confirmar y agendar"', async () => {
    const onConfirmar = vi.fn()
    const usuario = userEvent.setup()
    render(<ResumenCarrito total="$0" mensaje={null} onConfirmar={onConfirmar} />)

    await usuario.click(screen.getByRole('button', { name: 'Confirmar y agendar' }))

    expect(onConfirmar).toHaveBeenCalledTimes(1)
  })

  it('muestra el mensaje del container cuando existe', () => {
    render(
      <ResumenCarrito
        total="$0"
        mensaje={{ tipo: 'error', texto: 'Tu carrito está vacío.' }}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Tu carrito está vacío.')
  })

  it('recuerda que hay que iniciar sesión para contratar', () => {
    render(<ResumenCarrito total="$0" mensaje={null} />)

    expect(
      screen.getByText('Deberás iniciar sesión para completar la contratación.'),
    ).toBeInTheDocument()
  })
})
