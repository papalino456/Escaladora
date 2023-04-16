import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import SideBar from './components/sideBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <SideBar />
  </React.StrictMode>,
)
