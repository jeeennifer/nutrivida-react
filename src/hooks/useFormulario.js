import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// HOOK: mecánica compartida de formularios controlados.
// Cada container conserva sus reglas de negocio y sus mensajes específicos.
export function useFormulario(iniciales) {
  const [valores, setValores] = useState(iniciales)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const temporizador = useRef(null)
  const navigate = useNavigate()
  useEffect(() => () => clearTimeout(temporizador.current), [])

  function onChange(evento) {
    const { name, value } = evento.target
    setValores((actuales) => ({ ...actuales, [name]: value }))
  }
  function comprobar(nuevosErrores, texto = 'Revisa los campos marcados antes de continuar.') {
    setErrores(nuevosErrores)
    if (Object.values(nuevosErrores).some(Boolean)) {
      setMensaje({ tipo: 'error', texto }); return false
    }
    setMensaje(null)
    return true
  }
  function exito(texto, destino, espera = 700) {
    setMensaje({ tipo: 'exito', texto })
    if (destino) {
      setEnviando(true)
      temporizador.current = setTimeout(() => navigate(destino), espera)
    }
  }
  function error(texto) { setMensaje({ tipo: 'error', texto }) }
  return { valores, setValores, errores, mensaje, enviando, onChange, comprobar, exito, error }
}
