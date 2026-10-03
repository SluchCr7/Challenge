'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { motion } from 'framer-motion'
import {
  RiTrophyLine,
  RiFlashlightLine,
  RiPlayFill,
  RiFocus2Line,
  RiCompass3Line,
  RiBarChartGroupedLine,
  RiTeamLine,
  RiLineChartLine
} from 'react-icons/ri'
import { Timer, Gavel, Users, Gamepad2, Flag, RotateCcw, LayoutGrid, ListOrdered } from 'lucide-react'
import Loader from './Loader'

const HomePage = () => {
  const { isLogin, isAuthChecked } = useContext(AuthContext)
  const [activeFans, setActiveFans] = useState(12840)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFans(prev => prev + Math.floor(Math.random() * 5) - 2)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const games = [
    { id: 1, title: 'Who is the Player?', link: '/Games/Whoplayer', state: 'AVAILABLE', description: 'Guess the legend based on career clues and stats.', icon: <RiFocus2Line />, color: 'from-red-600/20 to-red-950/10' },
    { id: 2, title: 'Password Challange', link: '/Games/Password', state: 'AVAILABLE', description: 'Unlock the hidden player identity with minimal hints.', icon: <RiFlashlightLine />, color: 'from-blue-600/20 to-blue-950/10' },
    { id: 3, title: 'Risk', link: '/Games/Risk', state: 'AVAILABLE', description: 'High-stakes football trivia across multiple difficulty tiers.', icon: <RiTrophyLine />, color: 'from-amber-600/20 to-amber-950/10' },
    { id: 4, title: 'Bank', link: '/Games/Bank', state: 'AVAILABLE', description: 'Answer rapidly to stack points before the time expires.', icon: <Timer className="w-6 h-6" />, color: 'from-emerald-600/20 to-emerald-950/10' },
    { id: 5, title: 'True Guess', link: '/Games/Guess', state: 'AVAILABLE', description: 'Challenge friends with obscure football facts.', icon: <RiCompass3Line />, color: 'from-purple-600/20 to-purple-950/10' },
    { id: 6, title: 'who in Picture', link: '/Games/whoinPicture', state: 'AVAILABLE', description: 'Recognize iconic moments and players from cropped images.', icon: <RiBarChartGroupedLine />, color: 'from-rose-600/20 to-rose-950/10' },
    { id: 7, title: 'Auction', link: '/Games/Auction', state: 'AVAILABLE', description: 'Bid against rivals and prove your depth of knowledge.', icon: <Gavel className="w-6 h-6" />, color: 'from-orange-600/20 to-orange-950/10' },
    { id: 8, title: 'Club Legends', link: '/Games/Clubs', state: 'AVAILABLE', description: 'Identify global clubs from their history, crests, and stars.', icon: <Users className="w-6 h-6" />, color: 'from-cyan-600/20 to-cyan-950/10' },
    { id: 9, title: 'Offside Rule', link: '/Games/Offside', state: 'AVAILABLE', description: 'Test your knowledge on tactical rules and referee decisions.', icon: <Flag className="w-6 h-6" />, color: 'from-yellow-600/20 to-yellow-950/10' },
    { id: 10, title: 'Infinity Round', link: '/Games/Round', state: 'AVAILABLE', description: 'Continuous rounds of increasing difficulty to test stamina.', icon: <RotateCcw className="w-6 h-6" />, color: 'from-indigo-600/20 to-indigo-950/10' },
    { id: 11, title: 'Squad Builder', link: '/Games/Squad', state: 'AVAILABLE', description: 'Construct the perfect team and solve formation puzzles.', icon: <LayoutGrid className="w-6 h-6" />, color: 'from-lime-600/20 to-lime-950/10' },
    { id: 12, title: 'The Top Ten', link: '/Games/TopTen', state: 'AVAILABLE', description: 'Rank and list the greatest players in specific categories.', icon: <ListOrdered className="w-6 h-6" />, color: 'from-teal-600/20 to-teal-950/10' },
    { id: 13, title: 'Hall of Fame', link: '/Games/Leaderboard', state: 'AVAILABLE', description: 'View the global rankings and elite football legends.', icon: <RiTrophyLine />, color: 'from-slate-600/20 to-slate-950/10' },
    { id: 14, title: 'Multi-Challenge', link: '/Games/MultiGame', state: 'CAMPAIGNS', description: 'Structured 5-game campaign episodes (Sabahoo style).', icon: <Gamepad2 className="w-6 h-6" />, color: 'from-red-500/30 to-red-950/20' },
  ]

  if (!isAuthChecked) {
    return <Loader message="Initializing Football Stadium..." />
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-20 pb-20 px-4">
      {/* Hero Section */}
      <section className="relative min-h-[72vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,_#0E1C2E_0%,_#09101C_50%,_#080C14_100%)] shadow-2xl">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-primary/15 to-transparent blur-3xl" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-6 py-12 max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-subtle/80 border border-primary/20 text-[10px] font-black tracking-[0.3em] text-primary uppercase shadow-md shadow-primary/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Season 04: The Arena of Champions
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black italic text-white tracking-tighter leading-[0.9] uppercase">
              SHALAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-sky-400">CHALLENGE</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            The premier stadium for football tactical trivia. Test your knowledge, master difficulty tiers, and compete with <span className="text-white font-bold">{activeFans.toLocaleString()}</span> active fans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            {isLogin ? (
              <button
                onClick={() => document.getElementById('hub').scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-primary hover:bg-primary-hover text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2.5 uppercase tracking-[0.2em]"
              >
                <RiPlayFill size={18} className="group-hover:rotate-6 transition-transform" />
                Select Arena
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs rounded-xl shadow-lg hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-2.5 uppercase tracking-[0.2em]"
              >
                Unlock Club Access
              </Link>
            )}

            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-surface-subtle/80 rounded-xl border border-white/5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full border border-slate-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="player" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Community</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Arenas', value: '14 Arenas', icon: <Gamepad2 className="w-5 h-5" />, desc: 'Live football quizzes' },
          { label: 'Global Ranking', value: '12K+ Players', icon: <RiTrophyLine className="w-5 h-5" />, desc: 'Interactive leaderboard' },
          { label: 'Squad Battles', value: 'Multi-Game', icon: <RiTeamLine className="w-5 h-5" />, desc: 'Sabahoo tahdy style' },
          { label: 'Platform Status', value: 'Fully Stable', icon: <RiLineChartLine className="w-5 h-5" />, desc: 'Realtime sync' },
        ].map((stat, i) => (
          <div
            key={i}
            className="group relative glass-dark border border-white/5 p-5 rounded-2xl flex flex-col justify-between min-h-[120px] transition-colors hover:border-primary/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <div className="text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
            </div>
            <div className="space-y-0.5 mt-2">
              <h3 className="text-xl font-black text-white italic tracking-tight uppercase">{stat.value}</h3>
              <p className="text-[10px] font-medium text-slate-500">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* The Games Hub */}
      <section id="hub" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Game Universe</span>
            <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tight uppercase leading-none">
              Matchday <span className="text-slate-500">Arenas</span>
            </h2>
          </div>
          <div className="flex">
            <span className="px-4 py-2 bg-surface-subtle border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
              14 Quizzes & Challenges
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative card-surface rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-200 p-5 flex flex-col justify-between min-h-[220px]"
            >
              <Link href={game.link} className="flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-white/5 flex items-center justify-center text-lg text-primary group-hover:bg-primary group-hover:text-slate-950 transition-colors">
                    {game.icon}
                  </div>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                    {game.state}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-white italic leading-snug uppercase tracking-tight group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-normal leading-relaxed line-clamp-2">
                    {game.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                    Enter Match <RiPlayFill size={10} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
