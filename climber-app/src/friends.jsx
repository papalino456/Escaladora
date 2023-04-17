import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SideBar from './components/sideBar'





ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        return(
      <div className="flex flex-row h-screen w-screen">
        <SideBar />
        <MainSection />
        <GraphSection />
      </div>
        )
    </React.StrictMode>,
)