import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaClock, FaCheck } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import Confetti from 'react-confetti'

const ChoreCard = ({ chore }) => {
  const { addPoints, addChoreToHistory, currentUser } = useUser()
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  }
  
  const categoryIcons = {
    bedroom: '🛏️',
    bathroom: '🚿',
    kitchen: '🍽️',
    living: '🛋️',
    outdoor: '🌳',
    pets: '🐾',
    laundry: '👕'
  }
  
  const handleComplete = () => {
    if (!isCompleted) {
      addPoints(currentUser.id, chore.points)
      addChoreToHistory(currentUser.id, chore)
      setIsCompleted(true)
      setShowConfetti(true)
      
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }
  
  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      
      <motion.div 
        className={`card h-full ${isCompleted ? 'opacity-70' : ''}`}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <img 
            src={chore.image} 
            alt={chore.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <span className={`badge ${difficultyColors[chore.difficulty]}`}>
              {chore.difficulty}
            </span>
            <span className={`badge age-${chore.ageGroup}`}>
              {chore.ageGroup}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 badge badge-primary">
            {categoryIcons[chore.category.toLowerCase()] || '📋'} {chore.category}
          </div>
        </div>
        
        <h3 className="font-display text-xl mb-2">{chore.name}</h3>
        <p className="text-text-muted mb-4">{chore.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <FaStar className="text-accent mr-1" />
            <span className="font-bold">{chore.points} points</span>
          </div>
          <div className="flex items-center text-text-muted">
            <FaClock className="mr-1" />
            <span>{chore.estimatedTime}</span>
          </div>
        </div>
        
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-all duration-200 ${
            isCompleted 
              ? 'bg-success/30 text-success cursor-default' 
              : 'bg-primary hover:bg-primary-dark text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <FaCheck className="mr-2" /> Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </button>
      </motion.div>
    </>
  )
}

export default ChoreCard
