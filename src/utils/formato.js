// UTILS: Funciones puraas: formato y preparación de datos, independientes de React.

export function formatearPrecio(valor) {
  return `$${Number(valor).toLocaleString('es-CL')}`
}

export function fechaLocalActual() {
  const fecha = new Date()
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

export function formatearFecha(valor) {
  return new Date(`${valor}T00:00:00`).toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function totalPlanes(items) {
  return items.reduce(
    (total, item) => total + item.precio * item.cantidad, 0)
}

export function sincronizarCarrito(selecciones, planes) {
  return selecciones.flatMap((item) => {
    const plan = planes.find((actual) => actual.id === item.id)

    if (!plan || !Number.isInteger(item.cantidad) || item.cantidad < 1) {
      return []
    }

    return [{ ...plan, cantidad: item.cantidad }]
  })
}

export function rutaImagen(imagen) {
  return `/${String(imagen).replace(/^\/+/, '')}`
}