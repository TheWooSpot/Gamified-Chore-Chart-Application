import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome } from 'react-icons/fa'

const NotFound = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-9xl font-display text-primary mb-6"
      >
        404
      </motion.div>
      
      <h1 className="heading mb-4">Page Not Found</h1>
      <p className="text-text-muted max-w-md mb-8">
        Oops! It looks like the page you're looking for doesn't exist or has been moved.
      </p>
      
      <Link 
        to="/" 
        className="btn-primary flex items-center"
      >
        <FaHome className="mr-2" />
        Back to Dashboard
      </Link>
    </motion.div>
  )
}

export default NotFound
