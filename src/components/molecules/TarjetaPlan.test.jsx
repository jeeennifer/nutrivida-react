import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { TarjetaPlan } from './TarjetaPlan'

const plan = {
  id: 7,
  etiqueta: 'Nutrición Deportiva',
  nombre: 'Consulta Deportiva',
  descripcion: 'Evaluación completa enfocada en rendimiento.',
  precioTexto: '$25.000',
  imagen: '/assets/img/plan-consulta.jpg',
}

// TarjetaPlan contiene un <Link>, así que necesita un enrutador alrededor.
function mostrar(props) {
  return render(
    <MemoryRouter>
      <TarjetaPlan plan={plan} {...props} />
    </MemoryRouter>,
  )
}

describe('TarjetaPlan', () => {
  it('muestra nombre, etiqueta, descripción y precio del plan', () => {
    mostrar({ mostrarAgendar: false })

    expect(screen.getByRole('heading', { name: 'Consulta Deportiva' })).toBeInTheDocument()
    expect(screen.getByText('Nutrición Deportiva')).toBeInTheDocument()
    expect(screen.getByText('Evaluación completa enfocada en rendimiento.')).toBeInTheDocument()
    expect(screen.getByText('$25.000')).toBeInTheDocument()
  })

  it('muestra la imagen con el nombre del plan como texto alternativo', () => {
    mostrar({ mostrarAgendar: false })

    expect(screen.getByAltText('Consulta Deportiva')).toHaveAttribute(
      'src',
      '/assets/img/plan-consulta.jpg',
    )
  })

  it('enlaza "Ver detalle" a la página del plan', () => {
    mostrar({ mostrarAgendar: false })

    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute(
      'href',
      '/planes/7',
    )
  })

  it('oculta el botón Agendar si mostrarAgendar es false', () => {
    mostrar({ mostrarAgendar: false })

    expect(screen.queryByRole('button', { name: 'Agendar' })).not.toBeInTheDocument()
  })

  it('llama a onAgendar con el id del plan al pulsar Agendar', async () => {
    const onAgendar = vi.fn()
    const usuario = userEvent.setup()
    mostrar({ mostrarAgendar: true, onAgendar })

    await usuario.click(screen.getByRole('button', { name: 'Agendar' }))

    expect(onAgendar).toHaveBeenCalledWith(7)
  })
})
