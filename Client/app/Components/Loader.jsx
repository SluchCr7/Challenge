'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Loader = ({ message = "جاري تحميل البيانات..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[45vh] w-full py-12">
      <div className="relative w-16 h-16 mb-4">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        {/* Inner reverse rotating ring */}
        <div className="absolute inset-2 rounded-full border-2 border-emerald-400/10 border-b-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
        {/* Core pulsing dot */}
        <div className="absolute inset-5 bg-primary rounded-full animate-ping opacity-75" />
      </div>
      <p className="text-muted font-bold text-xs tracking-wider text-center">
        {message}
      </p>
    </div>
  )
}

export default Loader
