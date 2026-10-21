import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { NutrividaContainer } from './containers/NutrividaContainer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NutrividaContainer>
        <App />
      </NutrividaContainer>
    </BrowserRouter>
  </StrictMode>,
)