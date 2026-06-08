'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ message = "Loading Arena Data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full py-12">
      <div className="relative w-24 h-24 mb-6">
        {/* Outer glowing ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/20 border-l-transparent"
        />
        {/* Inner reverse rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500/20 border-l-transparent"
        />
        {/* Core pulsing light */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-6 bg-primary rounded-full blur-[4px] opacity-80"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-white/60 font-black text-xs uppercase tracking-[0.4em] text-center"
      >
        {message}
      </motion.p>
    </div>
  )
}

export default Loader
