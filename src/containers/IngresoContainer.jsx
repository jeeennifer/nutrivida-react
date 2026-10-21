import { useLocation } from 'react-router-dom'
import { useNutrivida } from '../hooks/useNutrivida'
import { useFormulario } from '../hooks/useFormulario'
import { FormularioNutrivida } from '../components/organisms/FormularioNutrivida'
import { FORMULARIOS } from '../data/formularios'
import { validarCorreo, validarPassword } from '../utils/validaciones'
import { destinoPaciente } from '../utils/almacenamiento'

// CONTAINER: comprueba la cuenta guardada y distingue administrador/paciente.
export function IngresoContainer() {
  const { usuarios, ingresar } = useNutrivida()
  const form = useFormulario({ correo: '', password: '' })
  const location = useLocation()

  function enviar(evento) {
    evento.preventDefault()

    if (form.enviando) {
      return
    }

    const { correo, password } = form.valores
    const errores = {
      correo: validarCorreo(correo),
      password: validarPassword(password),
    }

    if (!form.comprobar(errores)) {
      return
    }

    const correoNormalizado = correo.trim().toLowerCase()
    const usuario = usuarios.find(
      (item) => item.correo.toLowerCase() === correoNormalizado,
    )

    if (!usuario) {
      form.error('No existe una cuenta con ese correo. Regístrate para continuar.')
      return
    }

    if (usuario.password !== password) {
      form.error('La contraseña es incorrecta.')
      return
    }

    ingresar(usuario)

    let destino = destinoPaciente()

    if (usuario.tipo === 'Administrador') {
      destino = '/admin'
    } else if (location.state?.destino === '/agendar-cita') {
      destino = '/agendar-cita'
    }

    form.exito('¡Sesión iniciada correctamente!', destino, 600)
  }

  return (
    <FormularioNutrivida
      configuracion={FORMULARIOS.ingreso}
      {...form}
      onSubmit={enviar}
    />
  )
}