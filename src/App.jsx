import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Dashboard from './pages/Dashboard'
import ChoreList from './pages/ChoreList'
import Leaderboard from './pages/Leaderboard'
import Marketplace from './pages/Marketplace'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Context
import { UserProvider } from './context/UserContext'
import { ChoreProvider } from './context/ChoreContext'

function App() {
  const location = useLocation()
  
  return (
    <UserProvider>
      <ChoreProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chores" element={<ChoreList />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </ChoreProvider>
    </UserProvider>
  )
}

export default App
