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
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      className='relative bg-surface-card border border-white/10 rounded-2xl w-[95%] max-w-lg overflow-hidden flex flex-col max-h-[90vh] shadow-2xl'
    >
      {/* Sticky Header with Close Button */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-5 bg-surface-card/95 border-b border-white/5">
        <h2 className="text-lg font-black italic text-white uppercase tracking-tight">Player Profile</h2>
        <button
          onClick={() => setShowProfile(false)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-subtle hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <RiCloseLine size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {/* Profile Card Header */}
        <div className="flex flex-col items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl p-1 bg-gradient-to-tr from-primary to-emerald-300 overflow-hidden shadow-lg shadow-primary/10">
              <div className="w-full h-full rounded-xl bg-slate-950 overflow-hidden">
                <Image
                  src={user?.profilePhoto?.url || '/default-avatar.png'}
                  alt="profile photo"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              Pro Player
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-black text-white italic tracking-tight mb-0.5 uppercase">
              {user?.Name || 'Anonymous'}
            </h1>
            <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase opacity-90">
              {user?.nickName || 'Elite Marksman'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface-subtle border border-white/5 p-3.5 rounded-xl flex flex-col items-center gap-1.5 transition-colors hover:border-primary/40">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-base font-black text-white italic leading-none">{stat.value}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Info Rows */}
        <div className="space-y-3">
          <div className="flex items-center gap-3.5 p-3.5 bg-surface-subtle border border-white/5 rounded-xl">
            <RiMapPinLine className="text-primary text-lg" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Region</span>
              <span className="text-xs font-bold text-white">Egypt (Middle East)</span>
            </div>
          </div>
          <div className="flex items-center gap-3.5 p-3.5 bg-surface-subtle border border-white/5 rounded-xl">
            <RiCalendarLine className="text-primary text-lg" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Joined Since</span>
              <span className="text-xs font-bold text-white">October 2024</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-8 py-3.5 bg-primary hover:bg-primary-hover text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-98">
          Edit Profile Credentials
        </button>
      </div>
    </motion.div>
  )
}

export default Profile