import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa'
import { useChore } from '../context/ChoreContext'

const ChoreFilters = () => {
  const { filters, updateFilters } = useChore()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchInput, setSearchInput] = useState(filters.search)
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }
  
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    updateFilters({ search: searchInput })
  }
  
  const clearFilters = () => {
    setSearchInput('')
    updateFilters({
      category: 'all',
      difficulty: 'all',
      search: ''
    })
  }
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  
  const categories = [
    'all', 'bedroom', 'bathroom', 'kitchen', 'living room', 'outdoor', 'pets', 'laundry'
  ]
  
  const difficulties = ['all', 'easy', 'medium', 'hard']
  
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="subheading mb-4 md:mb-0">Find Chores</h2>
        
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex-grow">
            <input
              type="text"
              placeholder="Search chores..."
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
            onClick={toggleExpand}
            className={`p-3 rounded-xl ${isExpanded ? 'bg-primary text-white' : 'bg-background-dark text-text-muted'}`}
            aria-label="Toggle filters"
          >
            <FaFilter />
          </button>
          
          {(filters.category !== 'all' || filters.difficulty !== 'all' || filters.search) && (
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
      
      {isExpanded && (
        <motion.div 
          className="bg-background-light rounded-xl p-4 mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted mb-2 font-bold">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => updateFilters({ category })}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      filters.category === category 
                        ? 'bg-primary text-white' 
                        : 'bg-background-dark text-text-muted hover:bg-background'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-text-muted mb-2 font-bold">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => updateFilters({ difficulty })}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      filters.difficulty === difficulty 
                        ? 'bg-primary text-white' 
                        : 'bg-background-dark text-text-muted hover:bg-background'
                    }`}
                  >
                    {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {(filters.ageGroup !== 'all' || filters.category !== 'all' || filters.difficulty !== 'all' || filters.search) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-text-muted">Active filters:</span>
          
          {filters.category !== 'all' && (
            <span className="badge badge-primary">
              Category: {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
              <button 
                onClick={() => updateFilters({ category: 'all' })}
                className="ml-1 text-xs"
                aria-label="Remove category filter"
              >
                ✕
              </button>
            </span>
          )}
          
          {filters.difficulty !== 'all' && (
            <span className="badge badge-primary">
              Difficulty: {filters.difficulty.charAt(0).toUpperCase() + filters.difficulty.slice(1)}
              <button 
                onClick={() => updateFilters({ difficulty: 'all' })}
                className="ml-1 text-xs"
                aria-label="Remove difficulty filter"
              >
                ✕
              </button>
            </span>
          )}
          
          {filters.search && (
            <span className="badge badge-primary">
              Search: "{filters.search}"
              <button 
                onClick={() => updateFilters({ search: '' })}
                className="ml-1 text-xs"
                aria-label="Remove search filter"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default ChoreFilters
