import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const UserSwitcher = () => {
  const { users, currentUser, switchUser } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  
  const handleUserSwitch = (userId) => {
    switchUser(userId)
    setIsOpen(false)
  }
  
  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-background-light rounded-xl p-2 hover:bg-background transition-colors duration-200"
      >
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{currentUser.name}</span>
        <FaChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-56 bg-background-light rounded-xl shadow-lg z-10 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2 max-h-64 overflow-y-auto">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleUserSwitch(user.id)}
                  className={`w-full flex items-center px-4 py-2 text-left hover:bg-background transition-colors duration-200 ${
                    user.id === currentUser.id ? 'bg-primary/10' : ''
                  }`}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-text-muted">
                      <span className={`age-${user.ageGroup}`}>{user.ageGroup}</span> • Level {user.level}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserSwitcher
