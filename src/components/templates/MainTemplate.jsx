// TEMPLATE: distribución común mediante espacios recibidos por props.
// header: encabezado; children: página; footer: pie; overlays: paneles y avisos.
export function MainTemplate({ header, children, footer, overlays }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {header}
      <main className="flex-grow-1">{children}</main>
      {footer}
      {overlays}
    </div>
  )
}