import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-surface border-2 border-border rounded-full transition-all duration-300 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-gradient-to-br rounded-full transition-all duration-300 flex items-center justify-center ${
          isDark
            ? 'translate-x-0 from-primary to-primary-light'
            : 'translate-x-8 from-accent to-accent-light'
        }`}
      >
        {isDark ? (
          <FaMoon className="text-white text-xs transition-transform duration-300 rotate-0" />
        ) : (
          <FaSun className="text-white text-xs transition-transform duration-300 rotate-180" />
        )}
      </div>
    </button>
  )
}

export default ThemeToggle
