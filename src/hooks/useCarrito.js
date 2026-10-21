import { useEffect, useMemo, useState } from 'react'
import { guardarDatos, leerLista } from '../utils/almacenamiento'
import { sincronizarCarrito, totalPlanes } from '../utils/formato'

// HOOK: estado y reglas del carrito de reservas.
// Recibe el catálogo para conocer los precios y los cupos disponibles.
export function useCarrito(catalogo) {
  const [selecciones, setSelecciones] = useState(() => leerLista('carrito'))
  const [panelAbierto, setPanelAbierto] = useState(false)
  const [aviso, setAviso] = useState('')

  const carrito = useMemo(
    () => sincronizarCarrito(selecciones, catalogo),
    [selecciones, catalogo],
  )

  const total = totalPlanes(carrito)
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  // PERSISTENCIA: guarda el carrito en cada cambio.
  useEffect(() => guardarDatos('carrito', carrito), [carrito])

  // SINCRONIZACIÓN: recoge cambios realizados desde otra pestaña del sitio.
  useEffect(() => {
    function sincronizar(evento) {
      if (evento.storageArea !== localStorage) {
        return
      }

      if (!evento.key || evento.key === 'carrito') {
        setSelecciones(leerLista('carrito'))
      }
    }

    window.addEventListener('storage', sincronizar)

    return () => window.removeEventListener('storage', sincronizar)
  }, [])

  // ACCIONES: selección de planes y control de sus cantidades.
  function agregarPlan(id, abrirPanel = false) {
    const plan = catalogo.find((item) => item.id === id)

    if (!plan) {
      setAviso('Este plan ya no está disponible.')
      return false
    }

    const cantidadActual = carrito.find((item) => item.id === id)?.cantidad ?? 0

    if (cantidadActual >= plan.stock) {
      setAviso('No quedan más cupos disponibles para este plan.')
      return false
    }

    setSelecciones((actuales) => {
      const existe = actuales.some((item) => item.id === id)

      return existe
        ? actuales.map((item) =>
            item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
          )
        : [...actuales, { id, cantidad: 1 }]
    })

    if (abrirPanel) {
      setPanelAbierto(true)
    }

    return true
  }

  function restarPlan(id) {
    setSelecciones((actuales) =>
      actuales.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item,
      ),
    )
  }

  function eliminarDelCarrito(id) {
    setSelecciones((actuales) => actuales.filter((item) => item.id !== id))
  }

  function vaciarCarrito() {
    setSelecciones([])
  }

  return {
    carrito,
    total,
    cantidad,
    panelAbierto,
    setPanelAbierto,
    aviso,
    setAviso,
    agregarPlan,
    restarPlan,
    eliminarDelCarrito,
    vaciarCarrito,
  }
}