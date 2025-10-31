import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa'

// Context
import { useUser } from '../context/UserContext'

const Leaderboard = () => {
  const { users } = useUser()
  const [timeframe, setTimeframe] = useState('all-time')
  
  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)
  
  // Get top 10 users
  const topUsers = sortedUsers.slice(0, 10)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  // Trophy colors for top 3
  const trophyColors = ['text-yellow-400', 'text-gray-400', 'text-amber-700']
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="heading mb-2">Leaderboard</h1>
          <p className="text-text-muted">See who's leading the pack in completing chores!</p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-background-light rounded-xl p-1 flex">
          <button 
            onClick={() => setTimeframe('all-time')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              timeframe === 'all-time' ? 'bg-primary text-white' : 'text-text-muted hover:text-text'
            }`}
          >
            All Time
          </button>
          <button 
            onClick={() => setTimeframe('this-week')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              timeframe === 'this-week' ? 'bg-primary text-white' : 'text-text-muted hover:text-text'
            }`}
          >
            This Week
          </button>
        </div>
      </motion.div>
      
      {/* Top 3 Podium */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topUsers.slice(0, 3).map((user, index) => (
          <div key={user.id} className={`card text-center ${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
            <div className="relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                {index === 0 ? (
                  <FaTrophy className="text-5xl text-yellow-400" />
                ) : index === 1 ? (
                  <FaMedal className="text-4xl text-gray-400" />
                ) : (
                  <FaMedal className="text-4xl text-amber-700" />
                )}
              </div>
              
              <div className="pt-8 pb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className={`w-24 h-24 rounded-full mx-auto border-4 ${
                    index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-amber-700'
                  }`}
                />
                <h3 className="font-display text-xl mt-4">{user.name}</h3>
                <p className="text-text-muted">
                  <span className={`age-${user.ageGroup}`}>{user.ageGroup}</span> • Level {user.level}
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <FaStar className="text-accent mr-2" />
                  <span className="text-2xl font-display font-bold">{user.points}</span>
                  <span className="ml-1 text-text-muted">points</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      
      {/* Rest of Leaderboard */}
      <motion.div variants={itemVariants} className="card">
        <h2 className="subheading mb-6">Top Champions</h2>
        
        <div className="space-y-4">
          {topUsers.slice(3).map((user, index) => (
            <div key={user.id} className="flex items-center p-3 hover:bg-background rounded-lg transition-colors duration-200">
              <div className="w-8 text-center font-display font-bold text-text-muted">
                {index + 4}
              </div>
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-12 h-12 rounded-full mx-4"
              />
              <div className="flex-grow">
                <h4 className="font-bold">{user.name}</h4>
                <p className="text-text-muted text-sm">
                  <span className={`age-${user.ageGroup}`}>{user.ageGroup}</span> • Level {user.level}
                </p>
              </div>
              <div className="flex items-center">
                <FaStar className="text-accent mr-2" />
                <span className="font-display font-bold">{user.points}</span>
                <span className="ml-1 text-text-muted text-sm">points</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Leaderboard
