import { describe, it, expect } from 'vitest'
import { presentarPlan, presentarReservas } from './presentacion'

describe('presentarPlan', () => {
  it('agrega el precio formateado sin perder los datos del plan', () => {
    const plan = { id: 1, nombre: 'Consulta Deportiva', precio: 25000 }

    const resultado = presentarPlan(plan)

    expect(resultado).toEqual({
      id: 1,
      nombre: 'Consulta Deportiva',
      precio: 25000,
      precioTexto: '$25.000',
    })
  })

  it('no modifica el plan original', () => {
    const plan = { id: 1, precio: 25000 }

    presentarPlan(plan)

    expect(plan).toEqual({ id: 1, precio: 25000 })
  })
})

describe('presentarReservas', () => {
  it('calcula el subtotal formateado de cada reserva', () => {
    const items = [
      { id: 1, precio: 25000, cantidad: 2 },
      { id: 2, precio: 10000, cantidad: 3 },
    ]

    const resultado = presentarReservas(items)

    expect(resultado[0].subtotalTexto).toBe('$50.000')
    expect(resultado[1].subtotalTexto).toBe('$30.000')
  })

  it('devuelve una lista vacía si no hay reservas', () => {
    expect(presentarReservas([])).toEqual([])
  })
})
