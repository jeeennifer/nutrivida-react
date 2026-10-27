import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCarrito } from './useCarrito'

const catalogo = [
  { id: 1, nombre: 'Plan A', precio: 25000, stock: 3 },
  { id: 2, nombre: 'Plan B', precio: 10000, stock: 1 },
]

beforeEach(() => {
  localStorage.clear()
})

describe('useCarrito', () => {
  it('parte con el carrito vacío', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    expect(result.current.carrito).toEqual([])
    expect(result.current.total).toBe(0)
    expect(result.current.cantidad).toBe(0)
  })

  it('agrega un plan con cantidad 1', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })

    expect(result.current.carrito).toHaveLength(1)
    expect(result.current.carrito[0]).toMatchObject({ id: 1, cantidad: 1 })
  })

  it('suma 1 cuando el plan ya estaba en el carrito', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.agregarPlan(1)
    })

    expect(result.current.carrito[0].cantidad).toBe(2)
  })

  it('calcula el total y la cantidad de cupos', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.agregarPlan(2)
    })

    expect(result.current.total).toBe(60000)
    expect(result.current.cantidad).toBe(3)
  })

  it('no permite pasar el stock y muestra un aviso', () => {
    const { result } = renderHook(() => useCarrito(catalogo))
    let respuesta

    act(() => {
      result.current.agregarPlan(2) // el plan 2 tiene solo 1 cupo
    })
    act(() => {
      respuesta = result.current.agregarPlan(2)
    })

    expect(respuesta).toBe(false)
    expect(result.current.carrito[0].cantidad).toBe(1)
    expect(result.current.aviso).toBe(
      'No quedan más cupos disponibles para este plan.',
    )
  })

  it('avisa si el plan ya no existe en el catálogo', () => {
    const { result } = renderHook(() => useCarrito(catalogo))
    let respuesta

    act(() => {
      respuesta = result.current.agregarPlan(99)
    })

    expect(respuesta).toBe(false)
    expect(result.current.carrito).toEqual([])
    expect(result.current.aviso).toBe('Este plan ya no está disponible.')
  })

  it('abre el panel lateral cuando se pide al agregar', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1, true)
    })

    expect(result.current.panelAbierto).toBe(true)
  })

  it('restarPlan baja la cantidad pero nunca de 1', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.restarPlan(1)
    })
    expect(result.current.carrito[0].cantidad).toBe(1)

    act(() => {
      result.current.restarPlan(1)
    })
    expect(result.current.carrito[0].cantidad).toBe(1)
  })

  it('elimina un plan del carrito', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.agregarPlan(2)
    })
    act(() => {
      result.current.eliminarDelCarrito(1)
    })

    expect(result.current.carrito).toHaveLength(1)
    expect(result.current.carrito[0].id).toBe(2)
  })

  it('vacía todo el carrito', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })
    act(() => {
      result.current.vaciarCarrito()
    })

    expect(result.current.carrito).toEqual([])
    expect(result.current.total).toBe(0)
  })

  it('guarda el carrito en localStorage', () => {
    const { result } = renderHook(() => useCarrito(catalogo))

    act(() => {
      result.current.agregarPlan(1)
    })

    const guardado = JSON.parse(localStorage.getItem('carrito'))
    expect(guardado).toHaveLength(1)
    expect(guardado[0]).toMatchObject({ id: 1, cantidad: 1 })
  })

  it('recupera el carrito guardado al abrir la aplicación', () => {
    localStorage.setItem('carrito', JSON.stringify([{ id: 2, cantidad: 1 }]))

    const { result } = renderHook(() => useCarrito(catalogo))

    expect(result.current.carrito).toHaveLength(1)
    expect(result.current.carrito[0].nombre).toBe('Plan B')
  })
})
