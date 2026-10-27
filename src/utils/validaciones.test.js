import { describe, it, expect } from 'vitest'
import {
  validarCorreo,
  validarPrecio,
  validarStock,
  validarTexto,
  validarPassword,
  validarRun,
} from './validaciones'

describe('validarCorreo', () => {
  it('acepta correos @duoc.cl y @gmail.com', () => {
    expect(validarCorreo('ana@duoc.cl')).toBe('')
    expect(validarCorreo('ana@gmail.com')).toBe('')
  })

  it('exige que el correo no esté vacío', () => {
    expect(validarCorreo('   ')).toBe('El correo es obligatorio.')
  })

  it('rechaza dominios que no sean duoc.cl o gmail.com', () => {
    expect(validarCorreo('ana@hotmail.com')).toBe(
      'Ingresa un correo válido (ejemplo@duoc.cl o ejemplo@gmail.com).',
    )
  })

  it('rechaza correos de más de 100 caracteres', () => {
    const largo = `${'a'.repeat(95)}@gmail.com`

    expect(validarCorreo(largo)).toBe(
      'El correo no puede superar los 100 caracteres.',
    )
  })
})

describe('validarPrecio', () => {
  it('acepta precios positivos y el cero', () => {
    expect(validarPrecio('25000')).toBe('')
    expect(validarPrecio('0')).toBe('')
  })

  it('rechaza vacío, negativos y texto', () => {
    const mensaje = 'El precio es obligatorio y no puede ser negativo.'

    expect(validarPrecio('')).toBe(mensaje)
    expect(validarPrecio('-1')).toBe(mensaje)
    expect(validarPrecio('abc')).toBe(mensaje)
  })
})

describe('validarStock', () => {
  it('acepta enteros mayores o iguales a 0', () => {
    expect(validarStock('0')).toBe('')
    expect(validarStock('10')).toBe('')
  })

  it('rechaza decimales, negativos y vacío', () => {
    const mensaje = 'El stock debe ser un número entero mayor o igual a 0.'

    expect(validarStock('2.5')).toBe(mensaje)
    expect(validarStock('-3')).toBe(mensaje)
    expect(validarStock('')).toBe(mensaje)
  })
})

describe('validarTexto', () => {
  it('acepta un texto dentro de los largos permitidos', () => {
    expect(validarTexto('Ana Soto', 'El nombre', 3, 50)).toBe('')
  })

  it('indica que el campo es obligatorio si solo hay espacios', () => {
    expect(validarTexto('   ', 'El nombre', 3, 50)).toBe(
      'El nombre es obligatorio.',
    )
  })

  it('indica el largo mínimo', () => {
    expect(validarTexto('Al', 'El nombre', 3, 50)).toBe(
      'El nombre debe tener al menos 3 caracteres.',
    )
  })

  it('indica el largo máximo', () => {
    expect(validarTexto('a'.repeat(51), 'El nombre', 3, 50)).toBe(
      'El nombre no puede superar los 50 caracteres.',
    )
  })
})

describe('validarPassword', () => {
  it('acepta una contraseña con el largo mínimo', () => {
    expect(validarPassword('123456')).toBe('')
  })

  it('exige que no esté vacía', () => {
    expect(validarPassword('')).toBe('La contraseña es obligatoria.')
  })

  it('usa 6 caracteres como mínimo por defecto', () => {
    expect(validarPassword('12345')).toBe(
      'La contraseña debe tener al menos 6 caracteres.',
    )
  })

  it('permite cambiar el mínimo', () => {
    expect(validarPassword('1234567', 8)).toBe(
      'La contraseña debe tener al menos 8 caracteres.',
    )
  })
})

describe('validarRun', () => {
  it('acepta RUN de 8 o 9 caracteres, con dígito o K al final', () => {
    expect(validarRun('12345678')).toBe('')
    expect(validarRun('123456789')).toBe('')
    expect(validarRun('12345678K')).toBe('')
  })

  it('acepta la K en minúscula', () => {
    expect(validarRun('12345678k')).toBe('')
  })

  it('exige que no esté vacío', () => {
    expect(validarRun('')).toBe('El RUN es obligatorio.')
  })

  it('rechaza puntos y guion', () => {
    expect(validarRun('12.345.678-9')).toContain('sin puntos ni guion')
  })

  it('rechaza RUN demasiado cortos', () => {
    expect(validarRun('123456')).toContain('entre 8 y 9 caracteres')
  })
})
