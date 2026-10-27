import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  formatearPrecio,
  fechaLocalActual,
  formatearFecha,
  totalPlanes,
  sincronizarCarrito,
  rutaImagen,
} from './formato'

afterEach(() => {
  vi.useRealTimers()
})

describe('formatearPrecio', () => {
  it('agrega el símbolo $ y el separador de miles chileno', () => {
    expect(formatearPrecio(25000)).toBe('$25.000')
  })

  it('acepta el precio como texto numérico', () => {
    expect(formatearPrecio('31234')).toBe('$31.234')
  })

  it('formatea el cero', () => {
    expect(formatearPrecio(0)).toBe('$0')
  })
})

describe('fechaLocalActual', () => {
  it('devuelve la fecha de hoy con formato AAAA-MM-DD', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 2, 5)) // 5 de marzo de 2026 (hora local)

    expect(fechaLocalActual()).toBe('2026-03-05')
  })

  it('rellena con ceros el mes y el día de un dígito', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 0, 9)) // 9 de enero de 2026

    expect(fechaLocalActual()).toBe('2026-01-09')
  })
})

describe('formatearFecha', () => {
  it('escribe la fecha en español con día, mes y año', () => {
    const texto = formatearFecha('2026-01-05')

    expect(texto).toContain('enero')
    expect(texto).toContain('2026')
    expect(texto).toContain('5')
  })
})

describe('totalPlanes', () => {
  it('suma precio por cantidad de cada plan', () => {
    const items = [
      { precio: 25000, cantidad: 2 },
      { precio: 10000, cantidad: 1 },
    ]

    expect(totalPlanes(items)).toBe(60000)
  })

  it('devuelve 0 si el carrito está vacío', () => {
    expect(totalPlanes([])).toBe(0)
  })
})

describe('sincronizarCarrito', () => {
  const catalogo = [
    { id: 1, nombre: 'Plan A', precio: 25000, stock: 5 },
    { id: 2, nombre: 'Plan B', precio: 10000, stock: 3 },
  ]

  it('combina cada selección con los datos actuales del plan', () => {
    const resultado = sincronizarCarrito([{ id: 2, cantidad: 3 }], catalogo)

    expect(resultado).toEqual([
      { id: 2, nombre: 'Plan B', precio: 10000, stock: 3, cantidad: 3 },
    ])
  })

  it('descarta planes que ya no existen en el catálogo', () => {
    const resultado = sincronizarCarrito([{ id: 99, cantidad: 1 }], catalogo)

    expect(resultado).toEqual([])
  })

  it('descarta cantidades inválidas (cero, negativas o decimales)', () => {
    const selecciones = [
      { id: 1, cantidad: 0 },
      { id: 1, cantidad: -2 },
      { id: 2, cantidad: 1.5 },
    ]

    expect(sincronizarCarrito(selecciones, catalogo)).toEqual([])
  })
})

describe('rutaImagen', () => {
  it('agrega una barra inicial si falta', () => {
    expect(rutaImagen('assets/img/plan.jpg')).toBe('/assets/img/plan.jpg')
  })

  it('no duplica las barras iniciales', () => {
    expect(rutaImagen('///assets/img/plan.jpg')).toBe('/assets/img/plan.jpg')
  })
})
