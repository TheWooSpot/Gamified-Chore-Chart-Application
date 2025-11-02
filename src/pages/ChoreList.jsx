import React from 'react'

// Components
import ChoreFilters from '../components/ChoreFilters'
import ChoreCard from '../components/ChoreCard'

// Context
import { useChore } from '../context/ChoreContext'

const ChoreList = () => {
  const { filteredChores } = useChore()

  return (
    <div>
      <h1 className="heading mb-6">
        Chore List
      </h1>

      <ChoreFilters />

      {filteredChores.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-2xl font-display mb-4">No chores match your filters</h3>
          <p className="text-text-muted">Try adjusting your filter settings to see more chores.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredChores.map(chore => (
            <ChoreCard key={chore.id} chore={chore} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ChoreList
