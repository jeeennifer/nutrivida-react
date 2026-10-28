import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PaginaNoEncontrada } from './PaginaNoEncontrada'

describe('PaginaNoEncontrada', () => {
  it('avisa que la página no existe', () => {
    render(
      <MemoryRouter>
        <PaginaNoEncontrada />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: 'Página no encontrada' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('La dirección solicitada no existe en NutriVida.'),
    ).toBeInTheDocument()
  })

  it('ofrece un enlace para volver al inicio', () => {
    render(
      <MemoryRouter>
        <PaginaNoEncontrada />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
