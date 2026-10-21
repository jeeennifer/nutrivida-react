import { Modal } from 'react-bootstrap'
import { BotonNutrivida } from '../atoms/BotonNutrivida'

// ORGANISMO: muestra el aviso de disponibilidad recibido desde el container.
export function AvisoCupos({ texto, onCerrar }) {
  return (
    <Modal
      show={Boolean(texto)}
      onHide={onCerrar}
      centered
      aria-labelledby="titulo-aviso"
    >
      <Modal.Header closeButton closeLabel="Cerrar aviso">
        <Modal.Title as="h2" id="titulo-aviso">
          Disponibilidad de planes
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{texto}</Modal.Body>

      <Modal.Footer>
        <BotonNutrivida onClick={onCerrar}>Entendido</BotonNutrivida>
      </Modal.Footer>
    </Modal>
  )
}