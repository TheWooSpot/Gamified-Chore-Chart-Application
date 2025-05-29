import React, { createContext, useState, useContext, useEffect } from 'react'

// Sample data
import { sampleChores } from '../data/sampleData'

const ChoreContext = createContext()

export const useChore = () => useContext(ChoreContext)

export const ChoreProvider = ({ children }) => {
  const [chores, setChores] = useState(() => {
    const savedChores = localStorage.getItem('choreChampChores')
    return savedChores ? JSON.parse(savedChores) : sampleChores
  })
  
  const [filteredChores, setFilteredChores] = useState(chores)
  const [filters, setFilters] = useState({
    ageGroup: 'all',
    category: 'all',
    difficulty: 'all',
    search: ''
  })

  useEffect(() => {
    localStorage.setItem('choreChampChores', JSON.stringify(chores))
  }, [chores])

  useEffect(() => {
    let result = [...chores]
    
    if (filters.ageGroup !== 'all') {
      result = result.filter(chore => chore.ageGroup === filters.ageGroup)
    }
    
    if (filters.category !== 'all') {
      result = result.filter(chore => chore.category === filters.category)
    }
    
    if (filters.difficulty !== 'all') {
      result = result.filter(chore => chore.difficulty === filters.difficulty)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(chore => 
        chore.name.toLowerCase().includes(searchLower) || 
        chore.description.toLowerCase().includes(searchLower)
      )
    }
    
    setFilteredChores(result)
  }, [chores, filters])

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const getChoreById = (id) => {
    return chores.find(chore => chore.id === id)
  }

  return (
    <ChoreContext.Provider value={{
      chores,
      filteredChores,
      filters,
      updateFilters,
      getChoreById
    }}>
      {children}
    </ChoreContext.Provider>
  )
}
