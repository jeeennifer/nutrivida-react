import { Navigate, useParams } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import {
  validarCorreo,
  validarPassword,
  validarRun,
  validarTexto,
} from '../utils/validaciones'

// CONTAINER: el RUN identifica la cuenta y queda bloqueado durante la edición.
export function UsuarioAdminContainer() {
  const { run } = useParams()
  const { usuarios } = useNutrivida()
  const usuario = usuarios.find((item) => item.run === run)

  if (run && !usuario) {
    return <Navigate to="/admin/usuarios" replace />
  }

  return (
    <EditorUsuarioContainer
      key={run ?? 'nuevo'}
      usuario={usuario}
    />
  )
}

function EditorUsuarioContainer({ usuario }) {
  const { usuarios, guardarUsuario } = useNutrivida()
  const form = useFormulario({
    run: usuario?.run ?? '',
    nombre: usuario?.nombre ?? '',
    apellidos: usuario?.apellidos ?? '',
    correo: usuario?.correo ?? '',
    password: '',
    tipo: usuario?.tipo ?? '',
  })

  const configuracion = {
    ...FORMULARIOS.usuarioAdmin,
    titulo: usuario ? 'Editar usuario' : 'Nuevo usuario',
    volver: '/admin/usuarios',
    campos: FORMULARIOS.usuarioAdmin.campos.map((campo) =>
      campo.name === 'run'
        ? { ...campo, disabled: Boolean(usuario) }
        : campo,
    ),
  }

  function enviar(evento) {
    evento.preventDefault()

    if (form.enviando) {
      return
    }

    const datos = form.valores
    const errores = {
      run: usuario ? '' : validarRun(datos.run),
      nombre: validarTexto(datos.nombre, 'El nombre', 2, 50),
      apellidos: validarTexto(datos.apellidos, 'Los apellidos', 2, 100),
      correo: validarCorreo(datos.correo),
      password: !usuario || datos.password !== ''
        ? validarPassword(datos.password)
        : '',
      tipo: ['Administrador', 'Nutricionista', 'Paciente'].includes(datos.tipo)
        ? ''
        : 'Selecciona un tipo de usuario.',
    }

    if (!form.comprobar(errores, 'Revisa los campos marcados antes de guardar.')) {
      return
    }

    const run = datos.run.trim().toUpperCase()
    const correo = datos.correo.trim().toLowerCase()
    const existe = usuarios.some((actual) =>
      actual.run !== usuario?.run &&
      (actual.run === run || actual.correo.toLowerCase() === correo),
    )

    if (existe) {
      form.error('Ya existe otra cuenta con ese correo o RUN.')
      return
    }

    const nuevos = {
      run,
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo,
      tipo: datos.tipo,
    }

    if (datos.password) {
      nuevos.password = datos.password
    }

    if (!guardarUsuario(nuevos, usuario?.run)) {
      form.error('La cuenta ya no está disponible. Vuelve al listado.')
      return
    }

    form.exito('Usuario guardado correctamente.', '/admin/usuarios')
  }

  return (
    <FormularioNutrivida
      configuracion={configuracion}
      {...form}
      onSubmit={enviar}
    />
  )
}