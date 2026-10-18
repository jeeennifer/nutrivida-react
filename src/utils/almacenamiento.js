// PERSISTENCIA: conserva las claves del sitio HTML
export function leerLista(clave, inicial = []) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave))
    if (Array.isArray(valor)) return valor
  } catch {
    // Un JSON inválido no impide abrir la aplicación.
  }

  return structuredClone(inicial)
}

export function leerObjeto(clave) {
  try {
    return JSON.parse(localStorage.getItem(clave))
  } catch {
    return null
  }
}

export function guardarDatos(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}

export function leerSesion() {
  if (localStorage.getItem('sesionActiva') !== 'true') {
    return null
  }
  const correo = localStorage.getItem('correoSesion')
  return correo
    ? { correo: correo.trim().toLowerCase() }
    : null
}

export function persistirSesion(sesion) {
  if (sesion) {
    localStorage.setItem('sesionActiva', 'true')
    localStorage.setItem('correoSesion', sesion.correo)
    localStorage.setItem('nombreSesion', sesion.nombre)
  } else {
    const claves = [
      'sesionActiva',
      'correoSesion',
      'nombreSesion',
    ]

    for (const clave of claves) {
      localStorage.removeItem(clave)
    }
  }
}

// Acepta el destino antiguo para continuar reservas
// iniciadas en el sitio HTML.
export function destinoPaciente() {
  const destino = localStorage.getItem('destinoTrasLogin')
  localStorage.removeItem('destinoTrasLogin')
  return destino === '/agendar-cita' || destino === 'agendar-cita.html' ? '/agendar-cita' : '/'
}