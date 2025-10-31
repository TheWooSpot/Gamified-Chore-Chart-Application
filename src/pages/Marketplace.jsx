import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSearch, FaTimes, FaStar } from 'react-icons/fa'

// Components
import RewardCard from '../components/RewardCard'

// Context
import { useUser } from '../context/UserContext'

// Sample data
import { sampleRewards } from '../data/sampleData'

const Marketplace = () => {
  const { currentUser } = useUser()
  const [filteredRewards, setFilteredRewards] = useState(sampleRewards)
  const [filters, setFilters] = useState({
    ageGroup: 'all',
    minPoints: 0,
    maxPoints: 1000,
    search: ''
  })
  const [searchInput, setSearchInput] = useState('')
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters(prev => ({ ...prev, search: searchInput }))
    applyFilters({ ...filters, search: searchInput })
  }
  
  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }
  
  const clearFilters = () => {
    const defaultFilters = {
      ageGroup: 'all',
      minPoints: 0,
      maxPoints: 1000,
      search: ''
    }
    setFilters(defaultFilters)
    setSearchInput('')
    applyFilters(defaultFilters)
  }
  
  const applyFilters = (currentFilters) => {
    let result = [...sampleRewards]
    
    if (currentFilters.ageGroup !== 'all') {
      result = result.filter(reward => 
        reward.ageGroup === currentFilters.ageGroup || reward.ageGroup === 'all'
      )
    }
    
    result = result.filter(reward => 
      reward.points >= currentFilters.minPoints && reward.points <= currentFilters.maxPoints
    )
    
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase()
      result = result.filter(reward => 
        reward.name.toLowerCase().includes(searchLower) || 
        reward.description.toLowerCase().includes(searchLower)
      )
    }
    
    setFilteredRewards(result)
  }
  
  const toggleFilters = () => {
    setIsFiltersExpanded(!isFiltersExpanded)
  }
  
  const ageGroups = ['all', '0-5', '6-10', '11-15', '16-20']
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  return (
    <div>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="heading mb-2">Rewards Marketplace</h1>
          <p className="text-text-muted">Redeem your hard-earned points for awesome rewards!</p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-background-light rounded-xl p-3 flex items-center">
          <FaStar className="text-accent mr-2" />
          <span className="font-display font-bold text-xl text-accent">{currentUser.points}</span>
          <span className="ml-1 text-text-muted">available points</span>
        </div>
      </motion.div>
      
      {/* Filters */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="subheading mb-4 md:mb-0">Find Rewards</h2>
          
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchInput}
                onChange={handleSearchChange}
                className="input w-full md:w-64"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary"
              >
                <FaSearch />
              </button>
            </form>
            
            <button 
              onClick={toggleFilters}
              className={`p-3 rounded-xl ${isFiltersExpanded ? 'bg-primary text-white' : 'bg-background-dark text-text-muted'}`}
              aria-label="Toggle filters"
            >
              <FaFilter />
            </button>
            
            {(filters.ageGroup !== 'all' || filters.minPoints > 0 || filters.maxPoints < 1000 || filters.search) && (
              <button 
                onClick={clearFilters}
                className="p-3 rounded-xl bg-error/20 text-error hover:bg-error/30 transition-colors duration-200"
                aria-label="Clear filters"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
        
        {isFiltersExpanded && (
          <motion.div 
            className="bg-background-light rounded-xl p-4 mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-2 font-bold">Age Group</label>
                <div className="flex flex-wrap gap-2">
                  {ageGroups.map(age => (
                    <button
                      key={age}
                      onClick={() => updateFilter('ageGroup', age)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                        filters.ageGroup === age 
                          ? 'bg-primary text-white' 
                          : 'bg-background-dark text-text-muted hover:bg-background'
                      }`}
                    >
                      {age === 'all' ? 'All Ages' : age}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-text-muted mb-2 font-bold">Point Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted text-sm mb-1">Min Points</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={filters.minPoints}
                      onChange={(e) => updateFilter('minPoints', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-1">{filters.minPoints}</div>
                  </div>
                  <div>
                    <label className="block text-text-muted text-sm mb-1">Max Points</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={filters.maxPoints}
                      onChange={(e) => updateFilter('maxPoints', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-1">{filters.maxPoints}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {(filters.ageGroup !== 'all' || filters.minPoints > 0 || filters.maxPoints < 1000 || filters.search) && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-text-muted">Active filters:</span>
            
            {filters.ageGroup !== 'all' && (
              <span className="badge badge-secondary">
                Age: {filters.ageGroup}
                <button 
                  onClick={() => updateFilter('ageGroup', 'all')}
                  className="ml-1 text-xs"
                  aria-label="Remove age filter"
                >
                  ✕
                </button>
              </span>
            )}
            
            {(filters.minPoints > 0 || filters.maxPoints < 1000) && (
              <span className="badge badge-secondary">
                Points: {filters.minPoints} - {filters.maxPoints}
                <button 
                  onClick={() => {
                    updateFilter('minPoints', 0)
                    updateFilter('maxPoints', 1000)
                  }}
                  className="ml-1 text-xs"
                  aria-label="Remove points filter"
                >
                  ✕
                </button>
              </span>
            )}
            
            {filters.search && (
              <span className="badge badge-secondary">
                Search: "{filters.search}"
                <button 
                  onClick={() => updateFilter('search', '')}
                  className="ml-1 text-xs"
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </motion.div>
      
      {/* Rewards Grid */}
      {filteredRewards.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-display mb-4">No rewards match your filters</h3>
          <p className="text-text-muted">Try adjusting your filter settings to see more rewards.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRewards.map(reward => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Marketplace
