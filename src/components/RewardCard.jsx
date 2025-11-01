import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useUser } from '../context/UserContext'

const RewardCard = ({ reward }) => {
  const { currentUser, redeemPoints } = useUser()
  const [isRedeemed, setIsRedeemed] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const canAfford = currentUser.points >= reward.points
  
  const handleRedeem = () => {
    if (canAfford && !isRedeemed) {
      setShowConfirmation(true)
    }
  }
  
  const confirmRedeem = () => {
    redeemPoints(currentUser.id, reward.points)
    setIsRedeemed(true)
    setShowConfirmation(false)
  }
  
  const cancelRedeem = () => {
    setShowConfirmation(false)
  }
  
  return (
    <div className={`card h-full ${isRedeemed ? 'opacity-70' : ''}`}>
      <div className="relative">
        <img
          src={reward.image}
          alt={reward.name}
          loading="eager"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <span className={`badge badge-secondary`}>
            {reward.ageGroup === 'all' ? 'All Ages' : reward.ageGroup}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 badge badge-accent flex items-center">
          <FaHeart className="mr-1" /> {reward.popularity}% Popular
        </div>
      </div>
      
      <h3 className="font-display text-2xl mb-3">{reward.name}</h3>
      <p className="text-text-muted mb-6 text-base leading-relaxed">{reward.description}</p>

      <div className="flex items-center mb-6">
        <FaStar className="text-accent mr-2 text-xl" />
        <span className="font-bold text-lg">{reward.points} points</span>
      </div>
      
      {showConfirmation ? (
        <div className="space-y-2">
          <p className="text-sm text-text-muted mb-2">Are you sure you want to redeem this reward?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={cancelRedeem}
              className="py-3 px-5 rounded-xl font-bold text-base bg-background-dark hover:bg-background text-text-muted transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmRedeem}
              className="py-3 px-5 rounded-xl font-bold text-base bg-success hover:bg-success/80 text-white transition-all duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleRedeem}
          disabled={!canAfford || isRedeemed}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-all duration-200 ${
            isRedeemed 
              ? 'bg-success/30 text-success cursor-default' 
              : canAfford
                ? 'bg-secondary hover:bg-secondary-dark text-white'
                : 'bg-background-dark text-text-muted cursor-not-allowed'
          }`}
        >
          {isRedeemed ? (
            'Redeemed'
          ) : (
            <>
              <FaShoppingCart className="mr-2" />
              {canAfford ? 'Redeem Reward' : 'Not Enough Points'}
            </>
          )}
        </button>
      )}
    </div>
  )
}

export default RewardCard
