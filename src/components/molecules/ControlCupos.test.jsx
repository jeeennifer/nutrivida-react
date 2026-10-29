import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ControlCupos } from './ControlCupos'

describe('ControlCupos', () => {
  it('desactiva "Restar" cuando solo queda 1 cupo', () => {
    // 1. Preparar: un plan con 1 cupo reservado
    const item = { id: 1, nombre: 'Consulta Deportiva', cantidad: 1 }
    render(<ControlCupos item={item} onSumar={() => {}} onRestar={() => {}} />)

    // 2. Actuar: buscar el botón como lo haría una persona
    const botonRestar = screen.getByRole('button', {
      name: 'Restar cupo de Consulta Deportiva',
    })

    // 3. Verificar: no se puede restar más
    expect(botonRestar).toBeDisabled()
  })

  it('no llama a onRestar al hacer clic con 1 cupo', async () => {
    // 1. Preparar: onRestar es una función espía que anota si la llaman
    const onRestar = vi.fn()
    const usuario = userEvent.setup()
    const item = { id: 1, nombre: 'Consulta Deportiva', cantidad: 1 }
    render(<ControlCupos item={item} onSumar={() => {}} onRestar={onRestar} />)

    // 2. Actuar: intentar hacer clic en el botón desactivado
    await usuario.click(
      screen.getByRole('button', { name: 'Restar cupo de Consulta Deportiva' }),
    )

    // 3. Verificar: la función espía nunca fue llamada
    expect(onRestar).not.toHaveBeenCalled()
  })
})