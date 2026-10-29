import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AvisoCupos } from './AvisoCupos'

describe('AvisoCupos', () => {
  it('muestra el aviso cuando hay texto', () => {
    render(<AvisoCupos texto="No quedan más cupos disponibles." onCerrar={() => {}} />)

    expect(screen.getByText('Disponibilidad de planes')).toBeInTheDocument()
    expect(screen.getByText('No quedan más cupos disponibles.')).toBeInTheDocument()
  })

  it('no muestra nada cuando el texto está vacío', () => {
    render(<AvisoCupos texto="" onCerrar={() => {}} />)

    expect(screen.queryByText('Disponibilidad de planes')).not.toBeInTheDocument()
  })

  it('llama a onCerrar al pulsar "Entendido"', async () => {
    const onCerrar = vi.fn()
    const usuario = userEvent.setup()
    render(<AvisoCupos texto="Aviso de prueba." onCerrar={onCerrar} />)

    await usuario.click(screen.getByRole('button', { name: 'Entendido' }))

    expect(onCerrar).toHaveBeenCalledTimes(1)
  })
})
