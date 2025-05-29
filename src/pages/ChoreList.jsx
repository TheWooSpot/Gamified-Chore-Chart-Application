import { motion } from 'framer-motion'

// Components
import ChoreFilters from '../components/ChoreFilters'
import ChoreCard from '../components/ChoreCard'

// Context
import { useChore } from '../context/ChoreContext'

const ChoreList = () => {
  const { filteredChores } = useChore()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  return (
    <div>
      <motion.h1 
        className="heading mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Chore List
      </motion.h1>
      
      <ChoreFilters />
      
      {filteredChores.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-display mb-4">No chores match your filters</h3>
          <p className="text-text-muted">Try adjusting your filter settings to see more chores.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredChores.map(chore => (
            <ChoreCard key={chore.id} chore={chore} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default ChoreList
