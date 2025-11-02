import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'
import { supabase } from '../lib/supabase'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const { currentUser } = useUser()
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)

    if (currentUser) {
      syncThemeToSupabase(theme)
    }
  }, [theme, currentUser])

  useEffect(() => {
    if (currentUser) {
      loadThemeFromSupabase()
    }
  }, [currentUser])

  const syncThemeToSupabase = async (themeValue) => {
    try {
      const { data: existingPrefs } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', currentUser.id)
        .maybeSingle()

      if (existingPrefs) {
        await supabase
          .from('user_preferences')
          .update({ theme_preference: themeValue })
          .eq('user_id', currentUser.id)
      } else {
        await supabase
          .from('user_preferences')
          .insert({
            user_id: currentUser.id,
            theme_preference: themeValue
          })
      }
    } catch (error) {
      console.error('Error syncing theme to Supabase:', error)
    }
  }

  const loadThemeFromSupabase = async () => {
    try {
      const { data } = await supabase
        .from('user_preferences')
        .select('theme_preference')
        .eq('user_id', currentUser.id)
        .maybeSingle()

      if (data && data.theme_preference) {
        const localTheme = localStorage.getItem('theme')
        if (localTheme !== data.theme_preference) {
          setTheme(data.theme_preference)
        }
      }
    } catch (error) {
      console.error('Error loading theme from Supabase:', error)
    }
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
