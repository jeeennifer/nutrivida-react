import { Link } from 'react-router-dom'
import { ImagenNutrivida } from '../atoms/ImagenNutrivida'
import { BotonNutrivida } from '../atoms/BotonNutrivida'
import { PrecioPlan } from '../atoms/PrecioPlan'

// MOLÉCULA: presenta un plan y comunica su ID al pulsar Agendar.
export function TarjetaPlan({ plan, mostrarAgendar, onAgendar }) {
  return (
    <article className="producto h-100 d-flex flex-column">
      <ImagenNutrivida src={plan.imagen} alt={plan.nombre} />

      <div className="producto-contenido d-flex flex-column flex-grow-1">
        <p className="subtitulo etiqueta-plan">{plan.etiqueta}</p>
        <h3>{plan.nombre}</h3>
        <p className="descripcion-plan">{plan.descripcion}</p>

        <p className="precio">
          <PrecioPlan>{plan.precioTexto}</PrecioPlan>
        </p>

        <Link className="boton boton-secundario" to={`/planes/${plan.id}`}>
          Ver detalle
        </Link>

        {mostrarAgendar && (
          <BotonNutrivida onClick={() => onAgendar(plan.id)}>
            Agendar
          </BotonNutrivida>
        )}
      </div>
    </article>
  )
}