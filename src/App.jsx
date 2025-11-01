import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Dashboard from './pages/Dashboard'
import ChoreList from './pages/ChoreList'
import Leaderboard from './pages/Leaderboard'
import EnhancedMarketplace from './pages/EnhancedMarketplace'
import SponsorDashboard from './pages/SponsorDashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// Context
import { UserProvider } from './context/UserContext'
import { ChoreProvider } from './context/ChoreContext'

function App() {
  return (
    <UserProvider>
      <ChoreProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-6 md:px-8 lg:px-12 py-12">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chores" element={<ChoreList />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/marketplace" element={<EnhancedMarketplace />} />
              <Route path="/sponsor" element={<SponsorDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ChoreProvider>
    </UserProvider>
  )
}

export default App
