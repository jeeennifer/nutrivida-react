import { Navigate, useParams } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import { validarTexto } from '../utils/validaciones'

// CONTAINER: separa crear/editar y remonta los valores si cambia el ID de ruta.
export function PlanAdminContainer() {
  const { id } = useParams()
  const { planes } = useNutrivida()
  const plan = planes.find((item) => item.id === Number(id))

  if (id && !plan) {
    return <Navigate to="/admin/planes" replace />
  }

  return <EditorPlanContainer key={id ?? 'nuevo'} plan={plan} />
}

function EditorPlanContainer({ plan }) {
  const { guardarPlan } = useNutrivida()
  const form = useFormulario({
    nombre: plan?.nombre ?? '',
    etiqueta: plan?.etiqueta ?? '',
    descripcion: plan?.descripcion ?? '',
    incluye: plan?.incluye.join('\n') ?? '',
    precio: plan?.precio ?? '',
    stock: plan?.stock ?? '',
  })

  const configuracion = {
    ...FORMULARIOS.planAdmin,
    titulo: plan ? 'Editar plan' : 'Nuevo plan',
    volver: '/admin/planes',
  }

  function enviar(evento) {
    evento.preventDefault()

    if (form.enviando) {
      return
    }

    const datos = form.valores
    const precio = Number(datos.precio)
    const stock = Number(datos.stock)

    const precioInvalido =
      datos.precio === '' || !Number.isFinite(precio) || precio < 0
    const stockInvalido =
      datos.stock === '' || !Number.isInteger(stock) || stock < 0

    const errores = {
      nombre: validarTexto(datos.nombre, 'El nombre', 3, 100),
      etiqueta: validarTexto(datos.etiqueta, 'La categoría', 2, 50),
      precio: precioInvalido
        ? 'El precio es obligatorio y no puede ser negativo.'
        : '',
      stock: stockInvalido
        ? 'Los cupos deben ser un número entero igual o mayor a cero.'
        : '',
    }

    if (!form.comprobar(errores, 'Revisa los campos marcados antes de guardar.')) {
      return
    }

    const guardado = guardarPlan(
      {
        nombre: datos.nombre.trim(),
        etiqueta: datos.etiqueta.trim(),
        descripcion: datos.descripcion.trim(),
        descripcionLarga: datos.descripcion.trim(),
        incluye: datos.incluye
          .split('\n')
          .map((linea) => linea.trim())
          .filter(Boolean),
        precio,
        stock,
      },
      plan?.id,
    )

    if (!guardado) {
      form.error('El plan ya no está disponible. Vuelve al listado.')
      return
    }

    form.exito('Plan guardado correctamente.', '/admin/planes')
  }

  return (
    <FormularioNutrivida
      configuracion={configuracion}
      {...form}
      onSubmit={enviar}
    />
  )
}