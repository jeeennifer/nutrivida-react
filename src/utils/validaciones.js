// UTILS: reglas originales de Nutrivida.
// Devuelven un mensaje de error o una cadena vacía si el valor es válido.

const PATRON_CORREO = /^[^\s@]+@(duoc\.cl|gmail\.com)$/i

export function validarCorreo(valor) {
  const correo = valor.trim()

  if (correo === '') {
    return 'El correo es obligatorio.'
  }
  if (correo.length > 100) {
    return 'El correo no puede superar los 100 caracteres.'
  }
  if (!PATRON_CORREO.test(correo)) {
    return 'Ingresa un correo válido (ejemplo@duoc.cl o ejemplo@gmail.com).'
  }

  return ''
}

export function validarTexto(valor, nombreCampo, largoMinimo, largoMaximo) {
  const texto = valor.trim()

  if (texto === '') {
    return `${nombreCampo} es obligatorio.`
  }
  if (largoMinimo && texto.length < largoMinimo) {
    return `${nombreCampo} debe tener al menos ${largoMinimo} caracteres.`
  }
  if (largoMaximo && texto.length > largoMaximo) {
    return `${nombreCampo} no puede superar los ${largoMaximo} caracteres.`
  }

  return ''
}

export function validarPassword(valor, minimo = 6) {
  if (valor === '') {
    return 'La contraseña es obligatoria.'
  }
  if (valor.length < minimo) {
    return `La contraseña debe tener al menos ${minimo} caracteres.`
  }
  return ''
}

export function validarRun(valor) {
  const run = valor.trim().toUpperCase()

  if (run === '') {
    return 'El RUN es obligatorio.'
  }

  // Formato original: 7 u 8 dígitos y un número o K al final.
  if (!/^\d{7,8}[0-9K]$/.test(run)) {
    return 'El RUN debe tener entre 8 y 9 caracteres en total, sin puntos ni guion, y terminar en número o K.'
  }

  return ''
}