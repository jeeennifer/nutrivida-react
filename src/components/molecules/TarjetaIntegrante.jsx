import { ImagenNutrivida } from '../atoms/ImagenNutrivida'

// MOLÉCULA: presenta un integrante del equipo clínico o de desarrollo.
export function TarjetaIntegrante({ integrante }) {
  return (
    <article className="tarjeta-equipo h-100">
      {integrante.imagen && (
        <ImagenNutrivida
          className="foto-perfil"
          src={integrante.imagen}
          alt={integrante.nombre}
        />
      )}

      <h3>{integrante.nombre}</h3>
      <p>{integrante.cargo}</p>
    </article>
  )
}