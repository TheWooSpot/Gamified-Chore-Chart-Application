import { motion } from 'framer-motion'
import { FaStar, FaClock } from 'react-icons/fa'

const ActivityFeed = ({ activities }) => {
  // Format date to relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    
    if (diffDay > 0) {
      return diffDay === 1 ? 'yesterday' : `${diffDay} days ago`
    } else if (diffHour > 0) {
      return diffHour === 1 ? '1 hour ago' : `${diffHour} hours ago`
    } else if (diffMin > 0) {
      return diffMin === 1 ? '1 minute ago' : `${diffMin} minutes ago`
    } else {
      return 'just now'
    }
  }
  
  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-text-muted text-center py-4">No recent activity</p>
      ) : (
        activities.map((activity, index) => (
          <motion.div 
            key={activity.id}
            className="bg-background-light rounded-xl p-4 flex items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-primary/20 rounded-full p-3 mr-4">
              <FaStar className="text-primary" />
            </div>
            
            <div className="flex-grow">
              <h4 className="font-bold">{activity.choreName}</h4>
              <div className="flex items-center mt-1">
                <span className="text-accent font-medium mr-2">+{activity.points} points</span>
                <span className="text-text-muted text-sm flex items-center">
                  <FaClock className="mr-1" /> {getRelativeTime(activity.completedAt)}
                </span>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  )
}

export default ActivityFeed
