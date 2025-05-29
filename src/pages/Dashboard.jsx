import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaStar, FaTrophy, FaClipboardList, FaStore, FaArrowRight } from 'react-icons/fa'

// Components
import UserSwitcher from '../components/UserSwitcher'
import ProgressBar from '../components/ProgressBar'
import ChoreCard from '../components/ChoreCard'
import ActivityFeed from '../components/ActivityFeed'

// Context
import { useUser } from '../context/UserContext'
import { useChore } from '../context/ChoreContext'

// Sample data
import { sampleRewards } from '../data/sampleData'

const Dashboard = () => {
  const { currentUser } = useUser()
  const { chores } = useChore()
  const [suggestedChores, setSuggestedChores] = useState([])
  const [popularRewards, setPopularRewards] = useState([])
  
  // Calculate level progress
  const nextLevel = currentUser.level + 1
  const pointsForNextLevel = nextLevel * 100
  const pointsFromLastLevel = (currentUser.level - 1) * 100
  const progress = ((currentUser.points - pointsFromLastLevel) / (pointsForNextLevel - pointsFromLastLevel)) * 100
  
  useEffect(() => {
    // Get chores appropriate for user's age group
    const ageAppropriateChores = chores.filter(
      chore => chore.ageGroup === currentUser.ageGroup || chore.ageGroup === 'all'
    )
    
    // Randomly select 3 chores
    const shuffled = [...ageAppropriateChores].sort(() => 0.5 - Math.random())
    setSuggestedChores(shuffled.slice(0, 3))
    
    // Get top 3 popular rewards
    const sortedRewards = [...sampleRewards]
      .filter(reward => reward.ageGroup === currentUser.ageGroup || reward.ageGroup === 'all')
      .sort((a, b) => b.popularity - a.popularity)
    setPopularRewards(sortedRewards.slice(0, 3))
  }, [chores, currentUser])
  
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
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="heading mb-2">Welcome, {currentUser.name}!</h1>
          <p className="text-text-muted">Let's see what chores you can tackle today.</p>
        </div>
        <UserSwitcher />
      </motion.div>
      
      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-primary/20 p-3 rounded-full mr-3">
              <FaStar className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="font-display text-lg">Level Progress</h3>
              <p className="text-text-muted text-sm">Level {currentUser.level} → {nextLevel}</p>
            </div>
          </div>
          <ProgressBar 
            value={currentUser.points - pointsFromLastLevel} 
            max={pointsForNextLevel - pointsFromLastLevel} 
            label="XP" 
            color="primary"
          />
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-full mr-3">
              <FaClipboardList className="text-secondary text-xl" />
            </div>
            <div>
              <h3 className="font-display text-lg">Completed Chores</h3>
              <p className="text-text-muted text-sm">This week</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-display font-bold">{currentUser.choreHistory.length}</span>
            <Link to="/chores" className="text-secondary hover:text-secondary-light flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full mr-3">
              <FaStore className="text-accent text-xl" />
            </div>
            <div>
              <h3 className="font-display text-lg">Available Points</h3>
              <p className="text-text-muted text-sm">For rewards</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-display font-bold text-accent">{currentUser.points}</span>
            <Link to="/marketplace" className="text-accent hover:text-accent-light flex items-center">
              Redeem <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Suggested Chores Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="subheading">Suggested Chores</h2>
          <Link to="/chores" className="text-primary hover:text-primary-light flex items-center">
            View All <FaArrowRight className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedChores.map(chore => (
            <ChoreCard key={chore.id} chore={chore} />
          ))}
        </div>
      </motion.div>
      
      {/* Recent Activity & Rewards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="subheading">Recent Activity</h2>
          </div>
          <div className="card">
            <ActivityFeed activities={currentUser.choreHistory.slice(0, 5)} />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="subheading">Popular Rewards</h2>
            <Link to="/marketplace" className="text-primary hover:text-primary-light flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="card">
            <div className="space-y-4">
              {popularRewards.map(reward => (
                <div key={reward.id} className="flex items-center p-2 hover:bg-background rounded-lg transition-colors duration-200">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-bold">{reward.name}</h4>
                    <p className="text-text-muted text-sm">{reward.description}</p>
                  </div>
                  <div className="flex items-center text-accent font-bold">
                    <FaStar className="mr-1" />
                    {reward.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
