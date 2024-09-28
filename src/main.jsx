import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer} from 'react-toastify';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
    />
    <App />
  </StrictMode>,
)
