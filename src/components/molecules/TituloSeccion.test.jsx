import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TituloSeccion } from './TituloSeccion'

describe('TituloSeccion', () => {
  it('muestra el título como encabezado', () => {
    render(<TituloSeccion titulo="Nuestros planes" />)

    expect(
      screen.getByRole('heading', { name: 'Nuestros planes' }),
    ).toBeInTheDocument()
  })

  it('muestra el subtítulo y la descripción si se entregan', () => {
    render(
      <TituloSeccion
        titulo="Nuestros planes"
        subtitulo="Cuidamos tu salud"
        descripcion="Elige el plan que más te acomode."
      />,
    )

    expect(screen.getByText('Cuidamos tu salud')).toBeInTheDocument()
    expect(screen.getByText('Elige el plan que más te acomode.')).toBeInTheDocument()
  })

  it('no muestra subtítulo ni descripción si no se entregan', () => {
    const { container } = render(<TituloSeccion titulo="Solo título" />)

    expect(container.querySelector('.subtitulo')).toBeNull()
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })

  it('pone el subtítulo antes del título por defecto', () => {
    render(<TituloSeccion titulo="Título" subtitulo="Subtítulo" />)

    const titulo = screen.getByRole('heading', { name: 'Título' })
    const subtitulo = screen.getByText('Subtítulo')

    expect(
      subtitulo.compareDocumentPosition(titulo) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('pone el subtítulo después del título con subtituloDespues', () => {
    render(<TituloSeccion titulo="Título" subtitulo="Subtítulo" subtituloDespues />)

    const titulo = screen.getByRole('heading', { name: 'Título' })
    const subtitulo = screen.getByText('Subtítulo')

    expect(
      titulo.compareDocumentPosition(subtitulo) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
