import { useContext } from 'react'
import { ContextoNutrivida } from '../context/NutriContext'

// HOOK: centraliza el acceso al contexto de la clínica para los containers.
export function useNutrivida() {
  const contexto = useContext(ContextoNutrivida)

  if (!contexto) {
    throw new Error('Usa el container dentro de NutrividaContainer.')
  }

  return contexto
}