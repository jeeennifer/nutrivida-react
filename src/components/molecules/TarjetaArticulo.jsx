import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'

// MOLÉCULA: presenta el resumen de un artículo del blog original.
export function TarjetaArticulo({ articulo }) {
  return (
    <article className="producto h-100 d-flex flex-column">
      <ImagenNutrivida src={articulo.imagen} alt={articulo.alt} />

      <div className="producto-contenido d-flex flex-column flex-grow-1">
        <div className="meta-blog">
          <span className="categoria-blog">{articulo.categoria}</span>
          {articulo.fecha}
        </div>

        <h3>{articulo.titulo}</h3>
        <p className="descripcion-plan">{articulo.descripcion}</p>

        <Link to={`/blog/${articulo.id}`} className="enlace-blog">
          Leer más →
        </Link>
      </div>
    </article>
  )
}