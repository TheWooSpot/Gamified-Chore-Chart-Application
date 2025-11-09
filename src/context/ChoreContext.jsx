import React, { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sampleChores } from '../data/sampleData'

const ChoreContext = createContext()

export const useChore = () => useContext(ChoreContext)

export const ChoreProvider = ({ children }) => {
  const [chores, setChores] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredChores, setFilteredChores] = useState([])
  const [filters, setFilters] = useState({
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
      
      // If no chores from database, use sample chores as fallback
      if (!data || data.length === 0) {
        // Map sample chores to match expected format (name -> title)
        const mappedSampleChores = sampleChores.map(chore => ({
          ...chore,
          title: chore.name,
          estimated_time: parseInt(chore.estimatedTime) || 15
        }))
        setChores(mappedSampleChores)
      } else {
        setChores(data)
      }
    } catch (error) {
      console.error('Error fetching chores:', error)
      // On error, also fallback to sample chores
      const mappedSampleChores = sampleChores.map(chore => ({
        ...chore,
        title: chore.name,
        estimated_time: parseInt(chore.estimatedTime) || 15
      }))
      setChores(mappedSampleChores)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = [...chores]

    if (filters.category !== 'all') {
      result = result.filter(chore => chore.category === filters.category)
    }

    if (filters.difficulty !== 'all') {
      result = result.filter(chore => chore.difficulty === filters.difficulty)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(chore =>
        (chore.title || chore.name || '').toLowerCase().includes(searchLower) ||
        (chore.description || '').toLowerCase().includes(searchLower)
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
