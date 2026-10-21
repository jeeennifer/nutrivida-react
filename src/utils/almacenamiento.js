// PERSISTENCIA: única puerta de entrada a localStorage. Conserva las claves del sitio HTML.
// Si el navegador bloquea el almacenamiento, la aplicación sigue funcionando sin guardar.

const CLAVE_DESTINO = 'destinoTrasLogin'

function leer(clave) {
  try {
    return localStorage.getItem(clave)
  } catch {
    return null
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(clave, valor)
  } catch {
    // Sin almacenamiento disponible: simplemente no se guarda.
  }
}

function borrar(clave) {
  try {
    localStorage.removeItem(clave)
  } catch {
    // Sin almacenamiento disponible: no hay nada que borrar.
  }
}

export function leerLista(clave, inicial = []) {
  try {
    const valor = JSON.parse(leer(clave))
    if (Array.isArray(valor)) return valor
  } catch {
    // Un JSON inválido no impide abrir la aplicación.
  }

  return structuredClone(inicial)
}

export function leerObjeto(clave) {
  try {
    return JSON.parse(leer(clave))
  } catch {
    return null
  }
}

export function guardarDatos(clave, valor) {
  escribir(clave, JSON.stringify(valor))
}

export function leerSesion() {
  if (leer('sesionActiva') !== 'true') {
    return null
  }

  const correo = leer('correoSesion')
  return correo ? { correo: correo.trim().toLowerCase() } : null
}

export function persistirSesion(sesion) {
  if (sesion) {
    escribir('sesionActiva', 'true')
    escribir('correoSesion', sesion.correo)
    escribir('nombreSesion', sesion.nombre)
  } else {
    for (const clave of ['sesionActiva', 'correoSesion', 'nombreSesion']) {
      borrar(clave)
    }
  }
}

// ---------- A dónde seguir después de iniciar sesión ----------
export function guardarDestinoTrasLogin(ruta) {
  escribir(CLAVE_DESTINO, ruta)
}

export function borrarDestinoTrasLogin() {
  borrar(CLAVE_DESTINO)
}

// Acepta el destino antiguo para continuar reservas
// iniciadas en el sitio HTML.
export function destinoPaciente() {
  const destino = leer(CLAVE_DESTINO)
  borrar(CLAVE_DESTINO)
  return destino === '/agendar-cita' || destino === 'agendar-cita.html'
    ? '/agendar-cita'
    : '/'
}