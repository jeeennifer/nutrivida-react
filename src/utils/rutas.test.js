import { describe, it, expect } from 'vitest'
import { tituloPagina } from './rutas'

const planes = [{ id: 1, nombre: 'Consulta Deportiva' }]

describe('tituloPagina', () => {
  it('devuelve el título de las rutas fijas', () => {
    expect(tituloPagina('/', planes)).toBe('NutriVida - Clínica Nutricional')
    expect(tituloPagina('/carrito', planes)).toBe('Tu Carrito - NutriVida')
    expect(tituloPagina('/contacto', planes)).toBe('Contacto - NutriVida')
  })

  it('usa el nombre del plan en la ruta de detalle', () => {
    expect(tituloPagina('/planes/1', planes)).toBe(
      'Consulta Deportiva - NutriVida',
    )
  })

  it('usa un título genérico si el plan no existe', () => {
    expect(tituloPagina('/planes/99', planes)).toBe(
      'Detalle de Plan - NutriVida',
    )
  })

  it('usa un título genérico si el artículo del blog no existe', () => {
    expect(tituloPagina('/blog/9999', planes)).toBe('Blog - NutriVida')
  })

  it('reconoce las rutas de edición del panel administrador', () => {
    expect(tituloPagina('/admin/planes/1/editar', planes)).toBe(
      'Nuevo/Editar Plan - Panel Administrador NutriVida',
    )
    expect(tituloPagina('/admin/usuarios/nuevo', planes)).toBe(
      'Nuevo/Editar Usuario - Panel Administrador NutriVida',
    )
  })

  it('devuelve el título de "no encontrada" para rutas desconocidas', () => {
    expect(tituloPagina('/ruta-inexistente', planes)).toBe(
      'Página no encontrada - NutriVida',
    )
  })
})
