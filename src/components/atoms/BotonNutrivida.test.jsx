import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BotonNutrivida } from './BotonNutrivida'

describe('BotonNutrivida', () => {
  it('muestra el texto que recibe', () => {
    render(<BotonNutrivida>Agendar</BotonNutrivida>)

    expect(screen.getByRole('button', { name: 'Agendar' })).toBeInTheDocument()
  })

  it('es de tipo button para no enviar formularios por accidente', () => {
    render(<BotonNutrivida>Agendar</BotonNutrivida>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('usa el estilo propio de NutriVida cuando no hay variant', () => {
    render(<BotonNutrivida>Agendar</BotonNutrivida>)

    const boton = screen.getByRole('button')
    expect(boton).toHaveClass('boton')
    expect(boton).not.toHaveClass('boton-secundario')
  })

  it('agrega la clase secundaria con la prop secundario', () => {
    render(<BotonNutrivida secundario>Vaciar</BotonNutrivida>)

    expect(screen.getByRole('button')).toHaveClass('boton', 'boton-secundario')
  })

  it('usa el estilo de Bootstrap cuando recibe variant', () => {
    render(<BotonNutrivida variant="danger">Eliminar</BotonNutrivida>)

    const boton = screen.getByRole('button')
    expect(boton).toHaveClass('btn-danger')
    expect(boton).not.toHaveClass('boton')
  })

  it('llama a onClick al hacer clic', async () => {
    const onClick = vi.fn()
    const usuario = userEvent.setup()
    render(<BotonNutrivida onClick={onClick}>Agendar</BotonNutrivida>)

    await usuario.click(screen.getByRole('button', { name: 'Agendar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no llama a onClick si está desactivado', async () => {
    const onClick = vi.fn()
    const usuario = userEvent.setup()
    render(
      <BotonNutrivida disabled onClick={onClick}>
        Agendar
      </BotonNutrivida>,
    )

    await usuario.click(screen.getByRole('button', { name: 'Agendar' }))

    expect(onClick).not.toHaveBeenCalled()
  })
})
