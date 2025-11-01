import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ChoreContext = createContext()

export const useChore = () => useContext(ChoreContext)

export const ChoreProvider = ({ children }) => {
  const [chores, setChores] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredChores, setFilteredChores] = useState([])
  const [filters, setFilters] = useState({
    ageGroup: 'all',
    category: 'all',
    difficulty: 'all',
    search: ''
  })

  useEffect(() => {
    fetchChores()
  }, [])

  const fetchChores = async () => {
    try {
      const { data, error } = await supabase
        .from('chores')
        .select('*')
        .order('points', { ascending: true })

      if (error) throw error
      setChores(data || [])
    } catch (error) {
      console.error('Error fetching chores:', error)
    } finally {
      setLoading(false)
    }
  }

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
      loading,
      updateFilters,
      getChoreById
    }}>
      {children}
    </ChoreContext.Provider>
  )
}
