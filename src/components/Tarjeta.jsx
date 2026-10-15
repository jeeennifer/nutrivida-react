import { Button, Card } from "react-bootstrap";

function Tarjeta({ titulo, texto }) {
  return (
    <Card style={{ width: "18rem", margin: "1rem", display: "inline-block" }}>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{texto}</Card.Text>
        <Button variant="primary">Agregar</Button>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;