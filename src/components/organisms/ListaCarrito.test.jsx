import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ListaCarrito } from './ListaCarrito'

const items = [
  { id: 1, nombre: 'Plan A', cantidad: 2, subtotalTexto: '$50.000', imagen: '/a.jpg' },
  { id: 2, nombre: 'Plan B', cantidad: 1, subtotalTexto: '$10.000', imagen: '/b.jpg' },
]

describe('ListaCarrito', () => {
  it('muestra un mensaje si no hay reservas', () => {
    render(<ListaCarrito items={[]} />)

    expect(screen.getByText('No tienes citas agendadas.')).toBeInTheDocument()
  })

  it('muestra una línea por cada reserva', () => {
    render(<ListaCarrito items={items} />)

    expect(screen.getByText('Plan A')).toBeInTheDocument()
    expect(screen.getByText('Plan B')).toBeInTheDocument()
    expect(screen.getByText('Subtotal: $50.000')).toBeInTheDocument()
    expect(screen.queryByText('No tienes citas agendadas.')).not.toBeInTheDocument()
  })

  it('llama a onEliminar con el id de la reserva', async () => {
    const onEliminar = vi.fn()
    const usuario = userEvent.setup()
    render(<ListaCarrito items={items} onEliminar={onEliminar} />)

    await usuario.click(screen.getByRole('button', { name: 'Eliminar Plan B' }))

    expect(onEliminar).toHaveBeenCalledWith(2)
  })

  it('llama a onSumar con el id de la reserva', async () => {
    const onSumar = vi.fn()
    const usuario = userEvent.setup()
    render(<ListaCarrito items={items} onSumar={onSumar} />)

    await usuario.click(screen.getByRole('button', { name: 'Sumar cupo de Plan A' }))

    expect(onSumar).toHaveBeenCalledWith(1)
  })

  it('llama a onRestar con el id cuando hay más de 1 cupo', async () => {
    const onRestar = vi.fn()
    const usuario = userEvent.setup()
    render(<ListaCarrito items={items} onRestar={onRestar} />)

    await usuario.click(screen.getByRole('button', { name: 'Restar cupo de Plan A' }))

    expect(onRestar).toHaveBeenCalledWith(1)
  })
})
