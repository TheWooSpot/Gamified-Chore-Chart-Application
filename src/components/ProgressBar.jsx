import { motion } from 'framer-motion'

const ProgressBar = ({ value, max, label, color = 'primary', size = 'md', showLabel = true }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const sizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }
  
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    error: 'bg-error'
  }
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className={`w-full ${sizes[size]} bg-background-dark rounded-full overflow-hidden`}>
        <motion.div 
          className={`${colors[color]} h-full rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
