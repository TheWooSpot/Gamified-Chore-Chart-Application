import React, { createContext, useState, useContext, useEffect } from 'react'

// Sample data
import { sampleUsers } from '../data/sampleData'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('choreChampUsers')
    return savedUsers ? JSON.parse(savedUsers) : sampleUsers
  })
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('choreChampCurrentUser')
    return savedUser ? JSON.parse(savedUser) : users[0]
  })

  useEffect(() => {
    localStorage.setItem('choreChampUsers', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('choreChampCurrentUser', JSON.stringify(currentUser))
  }, [currentUser])

  const addPoints = (userId, points) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, points: user.points + points } 
          : user
      )
    )
    
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        points: prev.points + points
      }))
    }
  }

  const redeemPoints = (userId, points) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, points: Math.max(0, user.points - points) } 
          : user
      )
    )
    
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        points: Math.max(0, prev.points - points)
      }))
    }
  }

  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
    }
  }

  const addChoreToHistory = (userId, chore) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              choreHistory: [
                { 
                  id: Date.now().toString(),
                  choreId: chore.id,
                  choreName: chore.name,
                  points: chore.points,
                  completedAt: new Date().toISOString()
                },
                ...user.choreHistory
              ]
            } 
          : user
      )
    )
    
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        choreHistory: [
          { 
            id: Date.now().toString(),
            choreId: chore.id,
            choreName: chore.name,
            points: chore.points,
            completedAt: new Date().toISOString()
          },
          ...prev.choreHistory
        ]
      }))
    }
  }

  return (
    <UserContext.Provider value={{
      users,
      currentUser,
      addPoints,
      redeemPoints,
      switchUser,
      addChoreToHistory
    }}>
      {children}
    </UserContext.Provider>
  )
}
