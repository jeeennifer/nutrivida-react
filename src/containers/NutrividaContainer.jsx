import { useEffect, useMemo, useState } from 'react'
import { ContextoNutrivida } from '../context/NutriContext'
import { PLANES_INICIALES } from '../data/planesData'
import { USUARIOS_INICIALES } from '../data/usuariosData'
import { guardarDatos, leerLista, leerObjeto, leerSesion, persistirSesion } from '../utils/almacenamiento'
import { rutaImagen, sincronizarCarrito, totalPlanes } from '../utils/formato'

// CONTAINER raíz: estado y persistencia de Nutrivida.
// Las reglas son las del sitio original: planes con cupos, usuarios y reservas.
// La UI recibe los resultados y callbacks; no accede a localStorage.
export function NutrividaContainer({ children }) {
  const [planes, setPlanes] = useState(() =>
    leerLista('planes', PLANES_INICIALES),
  )
  const [usuarios, setUsuarios] = useState(() =>
    leerLista('usuarios', USUARIOS_INICIALES),
  )
  const [selecciones, setSelecciones] = useState(() => leerLista('carrito'))
  const [identidad, setIdentidad] = useState(leerSesion)
  const [ultimaCita, setUltimaCita] = useState(() => leerObjeto('ultimaCita'))
  const [panelAbierto, setPanelAbierto] = useState(false)
  const [aviso, setAviso] = useState('')

  const sesion = useMemo(() => {
    const usuario = identidad && usuarios.find(
      (item) => item.correo.toLowerCase() === identidad.correo,
    )

    return usuario
      ? {
          run: usuario.run,
          nombre: usuario.nombre,
          correo: usuario.correo,
          tipo: usuario.tipo,
        }
      : null
  }, [identidad, usuarios])

  const catalogo = useMemo(() =>
    planes.map((plan) => ({
      ...plan,
      imagen: rutaImagen(plan.imagen),
    })),
    [planes],
  )

  const carrito = useMemo(() =>
    sincronizarCarrito(selecciones, catalogo),
    [selecciones, catalogo],
  )

  const total = totalPlanes(carrito)
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  // PERSISTENCIA: conserva las mismas claves que utilizaba el sitio HTML.
  useEffect(() => guardarDatos('planes', planes), [planes])
  useEffect(() => guardarDatos('usuarios', usuarios), [usuarios])
  useEffect(() => guardarDatos('carrito', carrito), [carrito])
  useEffect(() => persistirSesion(sesion), [sesion])

  // SINCRONIZACIÓN: recoge cambios realizados desde otra pestaña del sitio.
  useEffect(() => {
    function sincronizar(evento) {
      if (evento.storageArea !== localStorage) {
        return
      }

      if (!evento.key || evento.key === 'planes') {
        setPlanes(leerLista('planes', PLANES_INICIALES))
      }

      if (!evento.key || evento.key === 'usuarios') {
        setUsuarios(leerLista('usuarios', USUARIOS_INICIALES))
      }

      if (!evento.key || evento.key === 'carrito') {
        setSelecciones(leerLista('carrito'))
      }

      if (
        !evento.key ||
        ['sesionActiva', 'correoSesion'].includes(evento.key)
      ) {
        setIdentidad(leerSesion())
      }

      if (!evento.key || evento.key === 'ultimaCita') {
        setUltimaCita(leerObjeto('ultimaCita'))
      }
    }

    window.addEventListener('storage', sincronizar)

    return () => window.removeEventListener('storage', sincronizar)
  }, [])

  // CARRITO: selección de planes y control de sus cantidades.
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
            item.id === id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item,
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

  // SESIÓN: actualiza la identidad y limpia las selecciones al salir.
  function ingresar(usuario) {
    setIdentidad({ correo: usuario.correo.toLowerCase() })
  }

  function cerrarSesion() {
    persistirSesion(null)
    localStorage.removeItem('destinoTrasLogin')
    setIdentidad(null)
    setSelecciones([])
    setPanelAbierto(false)
  }

  // PLANES: IDs estables; editar conserva la imagen original.
  function guardarPlan(datos, id) {
    if (id && !planes.some((plan) => plan.id === id)) {
      return false
    }

    if (id) {
      setPlanes((actuales) =>
        actuales.map((plan) =>
          plan.id === id ? { ...plan, ...datos } : plan,
        ),
      )
    } else {
      setPlanes((actuales) => [
        ...actuales,
        {
          id: Math.max(0, ...actuales.map((plan) => plan.id)) + 1,
          ...datos,
          imagen: '/assets/img/plan-consulta.jpg',
        },
      ])
    }

    return true
  }

  function eliminarPlan(id) {
    setPlanes((actuales) => actuales.filter((plan) => plan.id !== id))
    eliminarDelCarrito(id)
  }

  // USUARIOS: creación, edición y eliminación de cuentas.
  function guardarUsuario(datos, runOriginal) {
    if (
      runOriginal &&
      !usuarios.some((usuario) => usuario.run === runOriginal)
    ) {
      return false
    }

    if (runOriginal) {
      setUsuarios((actuales) =>
        actuales.map((usuario) =>
          usuario.run === runOriginal ? { ...usuario, ...datos } : usuario,
        ),
      )

      if (sesion?.run === runOriginal) {
        setIdentidad({ correo: datos.correo })
      }
    } else {
      setUsuarios((actuales) => [...actuales, datos])
    }

    return true
  }

  function eliminarUsuario(run) {
    setUsuarios((actuales) => actuales.filter((usuario) => usuario.run !== run))

    if (sesion?.run === run) {
      cerrarSesion()
    }
  }

  // RESERVA: valida toda la selección antes de descontar un solo cupo.
  function confirmarCita(fecha, hora) {
    const sesionActual = leerSesion()

    if (
      !sesionActual ||
      sesionActual.correo !== sesion?.correo.toLowerCase()
    ) {
      setIdentidad(sesionActual)

      return {
        error: 'Debes iniciar sesión para confirmar la cita.',
        sinSesion: true,
      }
    }

    if (carrito.length === 0) {
      return { error: 'Tu carrito está vacío.' }
    }

    const actuales = leerLista('planes', planes)

    for (const item of carrito) {
      const plan = actuales.find((actual) => actual.id === item.id)

      if (!plan || item.cantidad > plan.stock) {
        return {
          error: 'Un plan ya no está disponible o no tiene cupos suficientes. ' +
            'Revisa Mis Horas.',
        }
      }
    }

    const actualizados = actuales.map((plan) => ({
      ...plan,
      stock: plan.stock - (
        carrito.find((item) => item.id === plan.id)?.cantidad ?? 0
      ),
    }))

    const cita = { planes: carrito, total, fecha, hora, correoPaciente: sesion.correo }

    guardarDatos('planes', actualizados)
    guardarDatos('ultimaCita', cita)
    setPlanes(actualizados)
    setUltimaCita(cita)
    setSelecciones([])

    return { cita }
  }

  const contexto = {
    planes: catalogo, usuarios, carrito, total, cantidad, sesion, ultimaCita,
    panelAbierto, setPanelAbierto, aviso, setAviso,
    agregarPlan, restarPlan, eliminarDelCarrito, vaciarCarrito,
    ingresar, cerrarSesion, guardarPlan, eliminarPlan, guardarUsuario, eliminarUsuario, confirmarCita,
  }

  return (
    <ContextoNutrivida.Provider value={contexto}>
      {children}
    </ContextoNutrivida.Provider>
  )
}