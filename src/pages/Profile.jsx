import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaTrophy, FaClipboardList, FaCalendarAlt, FaChartLine } from 'react-icons/fa'

// Components
import ProgressBar from '../components/ProgressBar'
import ActivityFeed from '../components/ActivityFeed'

// Context
import { useUser } from '../context/UserContext'

const Profile = () => {
  const { currentUser } = useUser()
  const [activeTab, setActiveTab] = useState('stats')
  
  // Calculate level progress
  const nextLevel = currentUser.level + 1
  const pointsForNextLevel = nextLevel * 100
  const pointsFromLastLevel = (currentUser.level - 1) * 100
  const progress = ((currentUser.points - pointsFromLastLevel) / (pointsForNextLevel - pointsFromLastLevel)) * 100
  
  // Calculate stats
  const totalChores = currentUser.choreHistory.length
  const totalPoints = currentUser.points
  const averagePointsPerChore = totalChores > 0 ? Math.round(totalPoints / totalChores) : 0
  
  // Get chore categories and count
  const choreCategories = {}
  currentUser.choreHistory.forEach(chore => {
    const category = chore.category || 'unknown'
    choreCategories[category] = (choreCategories[category] || 0) + 1
  })
  
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
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center mb-8">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name}
          className="w-32 h-32 rounded-full border-4 border-primary mb-4 md:mb-0 md:mr-8"
        />
        
        <div className="text-center md:text-left">
          <h1 className="heading mb-2">{currentUser.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            <span className={`badge badge-primary age-${currentUser.ageGroup}`}>
              Age: {currentUser.ageGroup}
            </span>
            <span className="badge badge-secondary">
              Level {currentUser.level}
            </span>
            <span className="badge badge-accent">
              <FaStar className="mr-1" /> {currentUser.points} points
            </span>
          </div>
          <p className="text-text-muted">
            Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </motion.div>
      
      {/* Level Progress */}
      <motion.div variants={itemVariants} className="card mb-8">
        <h2 className="subheading mb-4">Level Progress</h2>
        <ProgressBar 
          value={currentUser.points - pointsFromLastLevel} 
          max={pointsForNextLevel - pointsFromLastLevel} 
          label={`Level ${currentUser.level} → ${nextLevel}`} 
          color="primary"
          size="lg"
        />
        <p className="text-center mt-4 text-text-muted">
          {pointsForNextLevel - currentUser.points} more points needed for next level
        </p>
      </motion.div>
      
      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex border-b border-background">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`py-3 px-6 font-display font-bold border-b-2 transition-colors duration-200 ${
              activeTab === 'stats' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            Statistics
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`py-3 px-6 font-display font-bold border-b-2 transition-colors duration-200 ${
              activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            Chore History
          </button>
        </div>
      </motion.div>
      
      {/* Tab Content */}
      {activeTab === 'stats' ? (
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-primary/20 p-3 rounded-full mr-3">
                  <FaClipboardList className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="font-display text-lg">Total Chores</h3>
                  <p className="text-text-muted text-sm">Completed</p>
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-center">
                {totalChores}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-secondary/20 p-3 rounded-full mr-3">
                  <FaStar className="text-secondary text-xl" />
                </div>
                <div>
                  <h3 className="font-display text-lg">Total Points</h3>
                  <p className="text-text-muted text-sm">Earned</p>
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-center">
                {totalPoints}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-accent/20 p-3 rounded-full mr-3">
                  <FaChartLine className="text-accent text-xl" />
                </div>
                <div>
                  <h3 className="font-display text-lg">Average Points</h3>
                  <p className="text-text-muted text-sm">Per chore</p>
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-center">
                {averagePointsPerChore}
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-display text-xl mb-4">Achievements</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border-2 ${totalChores >= 5 ? 'border-primary bg-primary/10' : 'border-background-dark bg-background-dark/50 opacity-50'}`}>
                <div className="flex items-center mb-2">
                  <FaTrophy className={totalChores >= 5 ? 'text-primary' : 'text-text-muted'} />
                  <h4 className="font-bold ml-2">Chore Starter</h4>
                </div>
                <p className="text-sm text-text-muted">Complete 5 chores</p>
                <div className="mt-2">
                  <ProgressBar 
                    value={Math.min(totalChores, 5)} 
                    max={5} 
                    color="primary"
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border-2 ${totalChores >= 20 ? 'border-primary bg-primary/10' : 'border-background-dark bg-background-dark/50 opacity-50'}`}>
                <div className="flex items-center mb-2">
                  <FaTrophy className={totalChores >= 20 ? 'text-primary' : 'text-text-muted'} />
                  <h4 className="font-bold ml-2">Chore Expert</h4>
                </div>
                <p className="text-sm text-text-muted">Complete 20 chores</p>
                <div className="mt-2">
                  <ProgressBar 
                    value={Math.min(totalChores, 20)} 
                    max={20} 
                    color="primary"
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border-2 ${totalPoints >= 500 ? 'border-secondary bg-secondary/10' : 'border-background-dark bg-background-dark/50 opacity-50'}`}>
                <div className="flex items-center mb-2">
                  <FaTrophy className={totalPoints >= 500 ? 'text-secondary' : 'text-text-muted'} />
                  <h4 className="font-bold ml-2">Point Collector</h4>
                </div>
                <p className="text-sm text-text-muted">Earn 500 points</p>
                <div className="mt-2">
                  <ProgressBar 
                    value={Math.min(totalPoints, 500)} 
                    max={500} 
                    color="secondary"
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card">
            <h3 className="font-display text-xl mb-6">Recent Chore History</h3>
            
            {currentUser.choreHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-muted">No chores completed yet. Start completing chores to see your history!</p>
              </div>
            ) : (
              <ActivityFeed activities={currentUser.choreHistory} />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Profile
