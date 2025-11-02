import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../context/UserContext'
import ThemeToggle from './ThemeToggle'

import { FaHome, FaClipboardList, FaTrophy, FaStore, FaUser, FaBars, FaTimes, FaHeart } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  const { currentUser } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: '/', icon: <FaHome />, text: 'Dashboard' },
    { to: '/chores', icon: <FaClipboardList />, text: 'Chores' },
    { to: '/leaderboard', icon: <FaTrophy />, text: 'Leaderboard' },
    { to: '/marketplace', icon: <FaStore />, text: 'Marketplace' },
    { to: '/sponsor', icon: <FaHeart />, text: 'Sponsors' },
    { to: '/profile', icon: <FaUser />, text: 'Profile' }
  ]
  
  const toggleMenu = () => setIsOpen(!isOpen)
  
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50 mb-8 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              className="text-4xl mr-2 group-hover:scale-110 transition-transform"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🌟
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                Chore Champions
              </span>
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                      location.pathname === link.to
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-glow-blue scale-105'
                        : 'hover:bg-surface-hover text-text-muted hover:text-text hover:scale-105'
                    }`}
                  >
                    <span className="mr-2 text-lg">{link.icon}</span>
                    <span>{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Theme Toggle - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full border-3 border-primary shadow-glow-blue"
              />
              <div className="ml-3">
                <p className="font-bold text-text">{currentUser.name}</p>
                <p className="text-xs text-text-muted">Level {currentUser.level}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl px-5 py-3 flex items-center border-2 border-accent/30">
              <span className="text-accent font-display font-bold text-xl">{currentUser.points}</span>
              <span className="ml-2 text-text-muted text-sm">pts</span>
            </div>
          </div>
          
          {/* Theme Toggle & Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              className="text-2xl p-3 rounded-xl bg-surface-hover text-text"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="lg:hidden py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4 pb-4 border-b border-border">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <div className="ml-3 flex-1">
                <p className="font-bold text-text">{currentUser.name}</p>
                <p className="text-xs text-text-muted">Level {currentUser.level}</p>
              </div>
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl px-4 py-2 border border-accent/30">
                <span className="text-accent font-display font-bold text-lg">{currentUser.points}</span>
                <span className="ml-1 text-text-muted text-xs">pts</span>
              </div>
            </div>

            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${
                      location.pathname === link.to
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-glow-blue'
                        : 'bg-surface-hover text-text-muted hover:bg-border hover:text-text'
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
