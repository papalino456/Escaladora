import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SideBar from './components/sideBar'
import MainSection from './components/mainSection'
import GraphSection from './components/graphSection'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FriendsPage from './components/FriendsPage'
import ProfileSection from './components/friendLeaderBoard'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div className="flex flex-row h-screen w-screen">
        <SideBar />
        <Routes>
          <Route path="/" element={<> <MainSection /> <GraphSection /> </>} />
          <Route path="/friends" element={<> <FriendsPage /> <ProfileSection /> </>} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>,
)
