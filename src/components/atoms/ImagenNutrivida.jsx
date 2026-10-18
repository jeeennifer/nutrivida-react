import { Image } from 'react-bootstrap'

// ÁTOMO: muestra una imagen adaptable con datos recibidos por props.
export function ImagenNutrivida({ alt, ...props }) {
  return <Image fluid alt={alt} {...props} />
}