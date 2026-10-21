import { useNutrivida } from '../hooks/useNutrivida'
import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import { validarTexto, validarPrecio, validarStock } from '../utils/validaciones'


// CONTAINER: formulario de creación y edición de un plan.
export function EditorPlanContainer({ plan }) {
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

    const errores = {
      nombre: validarTexto(datos.nombre, 'El nombre', 3, 100),
      etiqueta: validarTexto(datos.etiqueta, 'La categoría', 2, 50),
      precio: validarPrecio(datos.precio),
      stock: validarStock(datos.stock),
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