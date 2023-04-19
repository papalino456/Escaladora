import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SideBar from './components/sideBar'
import friend from './components/friendLeaderBoard'




ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        return(
      <div className="flex flex-row h-screen w-screen">
        <SideBar />
        <friend />
        <MainSection />
      </div>
        )
    </React.StrictMode>,
)