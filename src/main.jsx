import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App'
import './styles/index.css'
import {ToastContainer} from 'react-toastify'
import { SwiggyAuthProvider } from './context/SwiggyAuth'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SwiggyAuthProvider>
    <ToastContainer/>
    <App />
    </SwiggyAuthProvider>
  </StrictMode>,
)
