import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { BotonNutrivida } from '../atoms/BotonNutrivida'

// ORGANISMO: presenta registros y comunica las acciones administrativas.
export function TablaAdministrador({ titulo, columnas, filas, nuevo, onEliminar }) {
  return (
    <>
      <TituloSeccion titulo={titulo} />
      <Link className="boton" to={nuevo.to}>{nuevo.texto}</Link>

      <Table responsive className="tabla-admin">
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th key={columna} scope="col">{columna}</th>
            ))}
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id}>
              {fila.celdas.map((celda, index) => (
                <td key={index}>{celda}</td>
              ))}

              <td>
                <div className="fila-acciones d-flex flex-wrap gap-2">
                  <Link className="boton" to={fila.editar}>Editar</Link>
                  <BotonNutrivida
                    secundario
                    onClick={() => onEliminar(fila.id)}
                  >
                    Eliminar
                  </BotonNutrivida>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filas.length === 0 && <p>No hay registros para mostrar.</p>}
    </>
  )
}