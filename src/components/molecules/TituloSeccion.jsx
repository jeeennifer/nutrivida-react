// MOLÉCULA: reúne el subtítulo, el encabezado y la descripción de una sección.
export function TituloSeccion({
  titulo,
  subtitulo,
  descripcion,
  subtituloDespues = false,
}) {
  return (
    <div className="titulos-seccion">
      {!subtituloDespues && subtitulo && (
        <p className="subtitulo">{subtitulo}</p>
      )}

      <h2>{titulo}</h2>

      {subtituloDespues && subtitulo && (
        <p className="subtitulo">{subtitulo}</p>
      )}

      {descripcion && <p>{descripcion}</p>}
    </div>
  )
}