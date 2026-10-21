import { Button } from 'react-bootstrap'

// ÁTOMO: muestra un botón y recibe su contenido y comportamiento por props.
// Sin variant usa el estilo propio de NutriVida; con variant usa el de Bootstrap.
export function BotonNutrivida({
  children,
  variant,
  secundario = false,
  className = '',
  ...props
}) {
  const estilo = variant ? '' : `boton ${secundario ? 'boton-secundario' : ''}`

  return (
    <Button
      type="button"
      variant={variant}
      className={`${estilo} ${className}`.trim()}
      {...props}
    >
      {children}
    </Button>
  )
}