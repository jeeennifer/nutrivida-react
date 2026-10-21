import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CampoFormulario } from '../molecules/CampoFormulario'
import { TituloSeccion } from '../molecules/TituloSeccion'
import { ResumenCita } from '../molecules/ResumenCita'
import { BotonNutrivida } from '../atoms/BotonNutrivida'
import { MensajeFormulario } from '../atoms/MensajeFormulario'

// ORGANISMO: formulario controlado mediante configuración, datos y eventos.
// reutiliza la presentación de los seis formularios.
// El container entrega campos, valores, errores, mensajes y manejadores.
export function FormularioNutrivida({configuracion, valores, errores, mensaje, enviando, onChange, onSubmit, resumen}) {
  return (
    <>
      {configuracion.volver && (
        <Link className="enlace-volver" to={configuracion.volver}>
          ← Volver al listado
        </Link>
      )}

      <div className="form-contenedor">
        <TituloSeccion
          titulo={configuracion.titulo}
          descripcion={configuracion.descripcion}
        />

        {resumen && <ResumenCita {...resumen} />}

        <Form className="formulario" noValidate onSubmit={onSubmit}>
          {configuracion.campos.map((campo) => (
            <CampoFormulario
              key={campo.id}
              campo={campo}
              valor={valores[campo.name]}
              error={errores[campo.name]}
              onChange={onChange}
            />
          ))}

          <BotonNutrivida type="submit" disabled={enviando}>
            {configuracion.textoBoton}
          </BotonNutrivida>

          <MensajeFormulario mensaje={mensaje} />
        </Form>

        {configuracion.pie && (
          <p className="pie-formulario">
            {configuracion.pie.texto}{' '}
            <Link to={configuracion.pie.to}>
              {configuracion.pie.enlace}
            </Link>
          </p>
        )}
      </div>
    </>
  )
}