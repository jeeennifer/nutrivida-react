import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useFormulario } from './useFormulario'

// useFormulario usa useNavigate, así que necesita un enrutador alrededor.
const envolver = ({ children }) => <MemoryRouter>{children}</MemoryRouter>

function crearHook() {
  return renderHook(() => useFormulario({ correo: '', clave: '' }), {
    wrapper: envolver,
  })
}

describe('useFormulario', () => {
  it('parte con los valores iniciales y sin mensajes', () => {
    const { result } = crearHook()

    expect(result.current.valores).toEqual({ correo: '', clave: '' })
    expect(result.current.errores).toEqual({})
    expect(result.current.mensaje).toBeNull()
    expect(result.current.enviando).toBe(false)
  })

  it('onChange actualiza solo el campo que cambió', () => {
    const { result } = crearHook()

    act(() => {
      result.current.onChange({ target: { name: 'correo', value: 'ana@duoc.cl' } })
    })

    expect(result.current.valores).toEqual({ correo: 'ana@duoc.cl', clave: '' })
  })

  it('comprobar devuelve false y muestra un mensaje de error si hay errores', () => {
    const { result } = crearHook()
    let valido

    act(() => {
      valido = result.current.comprobar({ correo: 'El correo es obligatorio.' })
    })

    expect(valido).toBe(false)
    expect(result.current.errores).toEqual({ correo: 'El correo es obligatorio.' })
    expect(result.current.mensaje).toEqual({
      tipo: 'error',
      texto: 'Revisa los campos marcados antes de continuar.',
    })
  })

  it('comprobar devuelve true y limpia el mensaje si no hay errores', () => {
    const { result } = crearHook()
    let valido

    act(() => {
      result.current.comprobar({ correo: 'Error' })
    })
    act(() => {
      valido = result.current.comprobar({ correo: '', clave: '' })
    })

    expect(valido).toBe(true)
    expect(result.current.mensaje).toBeNull()
  })

  it('exito sin destino solo muestra el mensaje', () => {
    const { result } = crearHook()

    act(() => {
      result.current.exito('Guardado correctamente.')
    })

    expect(result.current.mensaje).toEqual({
      tipo: 'exito',
      texto: 'Guardado correctamente.',
    })
    expect(result.current.enviando).toBe(false)
  })

  it('error muestra un mensaje de tipo error', () => {
    const { result } = crearHook()

    act(() => {
      result.current.error('Credenciales incorrectas.')
    })

    expect(result.current.mensaje).toEqual({
      tipo: 'error',
      texto: 'Credenciales incorrectas.',
    })
  })
})
