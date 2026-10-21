import { BotonNutrivida } from '../atoms/BotonNutrivida'

// MOLÉCULA: muestra la cantidad y comunica qué plan se quiere modificar.
// El container aplicará las reglas de disponibilidad y actualizará el estado.
export function ControlCupos({ item, onSumar, onRestar }) {
  return (
    <div className="control-cantidad d-flex align-items-center gap-3">
      <BotonNutrivida
        className="btn-cantidad"
        variant="light"
        aria-label={`Restar cupo de ${item.nombre}`}
        disabled={item.cantidad <= 1}
        onClick={() => onRestar(item.id)}
      >
        −
      </BotonNutrivida>

      <span aria-label={`Cantidad de ${item.nombre}`}>
        {item.cantidad}
      </span>

      <BotonNutrivida
        className="btn-cantidad"
        variant="light"
        aria-label={`Sumar cupo de ${item.nombre}`}
        onClick={() => onSumar(item.id)}
      >
        +
      </BotonNutrivida>
    </div>
  )
}