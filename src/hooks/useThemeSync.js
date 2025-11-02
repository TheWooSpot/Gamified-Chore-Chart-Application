import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabase'

export const useThemeSync = () => {
  const { theme } = useTheme()
  const { currentUser } = useUser()

  useEffect(() => {
    if (!currentUser) return

    const syncTheme = async () => {
      try {
        const { data: existingPrefs } = await supabase
          .from('user_preferences')
          .select('id')
          .eq('user_id', currentUser.id)
          .maybeSingle()

        if (existingPrefs) {
          await supabase
            .from('user_preferences')
            .update({ theme_preference: theme })
            .eq('user_id', currentUser.id)
        } else {
          await supabase
            .from('user_preferences')
            .insert({
              user_id: currentUser.id,
              theme_preference: theme
            })
        }
      } catch (error) {
        console.error('Error syncing theme to Supabase:', error)
      }
    }

    syncTheme()
  }, [theme, currentUser])

  useEffect(() => {
    if (!currentUser) return

    const loadTheme = async () => {
      try {
        const { data } = await supabase
          .from('user_preferences')
          .select('theme_preference')
          .eq('user_id', currentUser.id)
          .maybeSingle()

        if (data && data.theme_preference) {
          const localTheme = localStorage.getItem('theme')
          if (localTheme !== data.theme_preference) {
            localStorage.setItem('theme', data.theme_preference)
            document.documentElement.setAttribute('data-theme', data.theme_preference)
          }
        }
      } catch (error) {
        console.error('Error loading theme from Supabase:', error)
      }
    }

    loadTheme()
  }, [currentUser])
}
