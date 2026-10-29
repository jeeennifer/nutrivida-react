import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { NutrividaContainer } from './NutrividaContainer'
import { PlanAdminContainer } from './PlanAdminContainer'
import { PlanesAdminContainer } from './PlanesAdminContainer'

// Cada prueba parte con el almacenamiento vacío: así el plan 1 vuelve a $25.000
beforeEach(() => {
  localStorage.clear()
})

describe('PlanAdminContainer', () => {
  it('el precio editado aparece en el listado de planes', async () => {
    // 1. Preparar: abrir el editor del plan 1; el listado es la ruta de destino
    const usuario = userEvent.setup()
    render(
      <NutrividaContainer>
        <MemoryRouter initialEntries={['/admin/planes/1/editar']}>
          <Routes>
            <Route path="/admin/planes/:id/editar" element={<PlanAdminContainer />} />
            <Route path="/admin/planes" element={<PlanesAdminContainer />} />
          </Routes>
        </MemoryRouter>
      </NutrividaContainer>,
    )

    // 2. Actuar: cambiar el precio y guardar, como lo haría el administrador
    const campoPrecio = screen.getByLabelText('Precio (CLP):')
    await usuario.clear(campoPrecio)
    await usuario.type(campoPrecio, '31234')
    await usuario.click(screen.getByRole('button', { name: 'Guardar plan' }))

    // 3. Verificar: tras la redirección (700 ms), la tabla muestra el precio nuevo
    expect(
      await screen.findByText('$31.234', {}, { timeout: 2000 }),
    ).toBeInTheDocument()
  })
})