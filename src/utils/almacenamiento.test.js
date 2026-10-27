import { describe, it, expect, vi, afterEach } from 'vitest'
import { leerLista } from './almacenamiento'

afterEach(() => {
  // Devuelve localStorage a la normalidad después de cada prueba
  vi.unstubAllGlobals()
})

describe('almacenamiento', () => {
  it('devuelve los datos iniciales si el navegador bloquea localStorage', () => {
    // 1. Preparar: un localStorage falso que siempre falla
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('almacenamiento bloqueado')
      },
    })
    const iniciales = [{ id: 1, nombre: 'Plan de prueba' }]

    // 2. Actuar
    const resultado = leerLista('planes', iniciales)

    // 3. Verificar: toEqual compara el contenido (la función devuelve una copia)
    expect(resultado).toEqual(iniciales)
  })
})