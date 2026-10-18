import { Button } from 'react-bootstrap'

// ÁTOMO: muestra un botón y recibe su contenido y comportamiento por props desde un container.
export function BotonNutrivida({ children, secundario = false, className = '', ...props}) {
  return (
    <Button
      type="button"
      className={`boton ${secundario ? 'boton-secundario' : ''} ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
}