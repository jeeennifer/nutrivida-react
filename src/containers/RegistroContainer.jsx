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

// CONTAINER: registra pacientes y evita duplicados por RUN o correo.
export function RegistroContainer() {
  const { usuarios, guardarUsuario } = useNutrivida()
  const form = useFormulario({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
  })

  function enviar(evento) {
    evento.preventDefault()

    if (form.enviando) {
      return
    }

    const datos = form.valores
    const errores = {
      run: validarRun(datos.run),
      nombre: validarTexto(datos.nombre, 'El nombre', 2, 50),
      apellidos: validarTexto(datos.apellidos, 'Los apellidos', 2, 100),
      correo: validarCorreo(datos.correo),
      password: validarPassword(datos.password),
    }

    if (!form.comprobar(errores)) {
      return
    }

    const run = datos.run.trim().toUpperCase()
    const correo = datos.correo.trim().toLowerCase()
    const existe = usuarios.some(
      (usuario) => usuario.run === run || usuario.correo.toLowerCase() === correo,
    )

    if (existe) {
      form.error('Ya existe una cuenta con ese correo o RUN.')
      return
    }

    guardarUsuario({
      run,
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo,
      password: datos.password,
      tipo: 'Paciente',
    })

    form.setValores({
      run: '',
      nombre: '',
      apellidos: '',
      correo: '',
      password: '',
    })

    form.exito(
      '¡Cuenta creada con éxito! Ahora puedes iniciar sesión.',
      '/login',
      900,
    )
  }

  return (
    <FormularioNutrivida
      configuracion={FORMULARIOS.registro}
      {...form}
      onSubmit={enviar}
    />
  )
}