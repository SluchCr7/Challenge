'use client'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiTrophyLine, RiShieldLine, RiFireLine, RiMapPinLine, RiCalendarLine } from 'react-icons/ri'
import Image from 'next/image'

const Profile = ({ setShowProfile }) => {
  const { user } = useContext(AuthContext)

  const stats = [
    { label: 'Total Wins', value: user?.wins || '128', icon: <RiTrophyLine className="text-yellow-500" /> },
    { label: 'XP Points', value: user?.xp || '12,450', icon: <RiFireLine className="text-primary" /> },
    { label: 'Rank', value: '#142', icon: <RiShieldLine className="text-blue-500" /> },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className='relative glass-dark border border-white/10 rounded-[3rem] w-[95%] max-w-lg overflow-hidden flex flex-col max-h-[90vh]'
    >
      {/* Sticky Header with Close Button */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-carbon-dark/80 backdrop-blur-md border-b border-white/5">
        <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">Player Profile</h2>
        <button
          onClick={() => setShowProfile(false)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <RiCloseLine size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Profile Card Header */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-[2.5rem] p-1 bg-gradient-to-tr from-primary to-orange-500 rotate-6 overflow-hidden">
              <div className="w-full h-full rounded-[2rem] bg-carbon-dark overflow-hidden -rotate-6">
                <Image
                  src={user?.profilePhoto?.url || '/default-avatar.png'}
                  alt="profile photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase italic shadow-xl">
              Pro Player
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-black text-white italic tracking-tighter mb-1 uppercase">
              {user?.Name || 'Anonymous'}
            </h1>
            <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase opacity-80">
              {user?.nickName || 'Elite Marksman'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass border border-white/5 p-4 rounded-3xl flex flex-col items-center gap-2 group hover:border-primary/50 transition-colors">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-lg font-black text-white italic leading-none">{stat.value}</span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Info Rows */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 glass border border-white/5 rounded-2xl">
            <RiMapPinLine className="text-primary text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Region</span>
              <span className="text-sm font-bold text-white">Egypt (Middle East)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 glass border border-white/5 rounded-2xl">
            <RiCalendarLine className="text-primary text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Joined Since</span>
              <span className="text-sm font-bold text-white">October 2024</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-10 py-5 bg-primary hover:bg-primary-hover text-white text-sm font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
          Edit Profile Credentials
        </button>
      </div>
    </motion.div>
  )
}

export default Profile