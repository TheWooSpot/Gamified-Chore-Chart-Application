import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'

// Icons
import { FaHome, FaClipboardList, FaTrophy, FaStore, FaUser, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  const { currentUser } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { to: '/', icon: <FaHome />, text: 'Dashboard' },
    { to: '/chores', icon: <FaClipboardList />, text: 'Chores' },
    { to: '/leaderboard', icon: <FaTrophy />, text: 'Leaderboard' },
    { to: '/marketplace', icon: <FaStore />, text: 'Rewards' },
    { to: '/profile', icon: <FaUser />, text: 'Profile' }
  ]
  
  const toggleMenu = () => setIsOpen(!isOpen)
  
  return (
    <header className="bg-background-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div 
              className="text-primary text-3xl mr-2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
            >
              ✨
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl text-primary">
              Chore<span className="text-secondary">Champions</span>
            </h1>
          </Link>
          
          {/* User Info - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center mr-6">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <div className="ml-2">
                <p className="font-bold">{currentUser.name}</p>
                <p className="text-sm text-text-muted">
                  <span className={`age-${currentUser.ageGroup}`}>{currentUser.ageGroup}</span> • Level {currentUser.level}
                </p>
              </div>
            </div>
            <div className="bg-background rounded-xl px-4 py-2 flex items-center">
              <span className="text-accent font-display font-bold">{currentUser.points}</span>
              <span className="ml-1 text-text-muted">points</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {links.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 ${
                      location.pathname === link.to 
                        ? 'bg-primary text-white font-bold' 
                        : 'hover:bg-background text-text-muted hover:text-text'
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* User Info - Mobile */}
            <div className="flex items-center mb-4 pb-4 border-b border-background">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <div className="ml-2">
                <p className="font-bold">{currentUser.name}</p>
                <p className="text-sm text-text-muted">
                  <span className={`age-${currentUser.ageGroup}`}>{currentUser.ageGroup}</span> • Level {currentUser.level}
                </p>
              </div>
              <div className="ml-auto bg-background rounded-xl px-4 py-2 flex items-center">
                <span className="text-accent font-display font-bold">{currentUser.points}</span>
                <span className="ml-1 text-text-muted">points</span>
              </div>
            </div>
            
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === link.to 
                        ? 'bg-primary text-white font-bold' 
                        : 'hover:bg-background text-text-muted hover:text-text'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3 text-xl">{link.icon}</span>
                    <span className="text-lg">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Navbar
