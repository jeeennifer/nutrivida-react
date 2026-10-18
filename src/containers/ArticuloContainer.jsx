import { Navigate, useParams } from 'react-router-dom'
import { ArticuloBlog } from '../components/organisms/ArticuloBlog'
import { ARTICULOS } from '../data/articulosData'

// CONTAINER: transforma el parámetro de ruta en el artículo correspondiente.
export function ArticuloContainer() {
  const { id } = useParams()
  const articulo = ARTICULOS.find((item) => item.id === Number(id))

  if (!articulo) {
    return <Navigate to="/blog" replace />
  }

  return <ArticuloBlog articulo={articulo} />
}