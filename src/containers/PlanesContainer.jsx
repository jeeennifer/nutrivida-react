import { useNutrivida } from '../hooks/useNutrivida'
import { GrillaPlanes } from '../components/organisms/GrillaPlanes'
import { presentarPlan } from '../utils/presentacion'

// CONTAINER: conecta el catálogo y abre el panel al reservar un cupo.
export function PlanesContainer() {
  const { planes, agregarPlan } = useNutrivida()
  const listado = planes.map(presentarPlan)

  return (
    <GrillaPlanes
      planes={listado}
      titulo="Elige el que se adapta a ti"
      subtitulo="NUESTROS PLANES"
      mostrarAgendar
      onAgendar={(id) => agregarPlan(id, true)}
    />
  )
}