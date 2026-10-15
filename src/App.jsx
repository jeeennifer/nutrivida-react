import Tarjeta from "./components/Tarjeta";

function App() {
  const productos = [
    { id: 1, nombre: "Teclado", precio: 29990 },
    { id: 2, nombre: "Mouse", precio: 15990 },
    { id: 3, nombre: "Monitor", precio: 129990 },
  ];

  return (
    <>
      <Tarjeta
        titulo="Mi primer componente"
        texto="Hecho con React y Vite."
      />

      {productos.map((p) => (
        <Tarjeta
          key={p.id}
          titulo={p.nombre}
          texto={`$${p.precio}`}
        />
      ))}
    </>
  );
}

export default App;