import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import { validarCorreo, validarTexto } from '../utils/validaciones'

const INICIALES = {
  nombre: '',
  correo: '',
  mensaje: '',
}

// CONTAINER: validación y confirmación local, igual que el contacto original.
export function ContactoContainer() {
  const form = useFormulario(INICIALES)

  function enviar(evento) {
    evento.preventDefault()

    const datos = form.valores
    const errores = {
      nombre: validarTexto(datos.nombre, 'El nombre', 2, 100),
      correo: validarCorreo(datos.correo),
      mensaje: validarTexto(datos.mensaje, 'El mensaje', 10, 500),
    }

    if (!form.comprobar(errores, 'Revisa los campos marcados antes de enviar.')) {
      return
    }

    form.exito('¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.')
    form.setValores(INICIALES)
  }

  return (
    <FormularioNutrivida
      configuracion={FORMULARIOS.contacto}
      {...form}
      onSubmit={enviar}
    />
  )
}