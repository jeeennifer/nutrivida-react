import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'

// ORGANISMO: presenta los datos y párrafos del artículo recibido por props.
//  renderiza texto como React; no inserta HTML con innerHTML.
export function ArticuloBlog({ articulo }) {
  return (
    <article className="articulo-contenido">
      <Link className="enlace-volver" to="/blog">
        ← Volver al blog
      </Link>

      <p className="fecha-blog">{articulo.fecha}</p>
      <h2>{articulo.titulo}</h2>
      <ImagenNutrivida src={articulo.imagen} alt={articulo.alt} />

      {articulo.parrafos.map((parrafo, index) => (
        <p key={index}>{parrafo}</p>
      ))}
    </article>
  )
}