import { describe, it, expect, beforeEach } from 'vitest'
import {
  leerLista,
  leerObjeto,
  guardarDatos,
  leerSesion,
  persistirSesion,
  guardarDestinoTrasLogin,
  destinoPaciente,
} from './almacenamiento'

beforeEach(() => {
  localStorage.clear()
})

describe('leerLista y guardarDatos', () => {
  it('guarda una lista y luego la recupera igual', () => {
    const lista = [{ id: 1, cantidad: 2 }]

    guardarDatos('carrito', lista)

    expect(leerLista('carrito')).toEqual(lista)
  })

  it('devuelve la lista inicial si no hay nada guardado', () => {
    expect(leerLista('carrito', [{ id: 9 }])).toEqual([{ id: 9 }])
  })

  it('devuelve la lista inicial si el JSON guardado está dañado', () => {
    localStorage.setItem('carrito', '{esto no es json')

    expect(leerLista('carrito')).toEqual([])
  })

  it('devuelve la lista inicial si lo guardado no es una lista', () => {
    localStorage.setItem('carrito', JSON.stringify({ id: 1 }))

    expect(leerLista('carrito')).toEqual([])
  })
})

describe('leerObjeto', () => {
  it('devuelve null si el JSON está dañado', () => {
    localStorage.setItem('perfil', '{roto')

    expect(leerObjeto('perfil')).toBeNull()
  })
})

describe('sesión', () => {
  it('guarda la sesión y la lee con el correo limpio y en minúscula', () => {
    persistirSesion({ correo: '  ANA@Duoc.cl ', nombre: 'Ana' })

    expect(leerSesion()).toEqual({ correo: 'ana@duoc.cl' })
  })

  it('no hay sesión si nunca se inició', () => {
    expect(leerSesion()).toBeNull()
  })

  it('cerrar sesión borra los datos guardados', () => {
    persistirSesion({ correo: 'ana@duoc.cl', nombre: 'Ana' })

    persistirSesion(null)

    expect(leerSesion()).toBeNull()
    expect(localStorage.getItem('nombreSesion')).toBeNull()
  })
})

describe('destinoPaciente', () => {
  it('devuelve /agendar-cita si el usuario venía de reservar', () => {
    guardarDestinoTrasLogin('/agendar-cita')

    expect(destinoPaciente()).toBe('/agendar-cita')
  })

  it('acepta el destino antiguo del sitio HTML', () => {
    guardarDestinoTrasLogin('agendar-cita.html')

    expect(destinoPaciente()).toBe('/agendar-cita')
  })

  it('devuelve / si no había destino o es desconocido', () => {
    expect(destinoPaciente()).toBe('/')

    guardarDestinoTrasLogin('/otra-ruta')
    expect(destinoPaciente()).toBe('/')
  })

  it('borra el destino después de leerlo', () => {
    guardarDestinoTrasLogin('/agendar-cita')

    destinoPaciente()

    expect(destinoPaciente()).toBe('/')
  })
})
