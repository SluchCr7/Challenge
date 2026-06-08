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
    { id: 2, title: 'Secret Password', link: '/Games/Password', state: 'AVAILABLE', description: 'Unlock the hidden player identity with minimal hints.', icon: <RiFlashlightLine />, color: 'from-blue-600/20 to-blue-950/10' },
    { id: 3, title: 'Risk Arena', link: '/Games/Risk', state: 'AVAILABLE', description: 'High-stakes football trivia across multiple difficulty tiers.', icon: <RiTrophyLine />, color: 'from-amber-600/20 to-amber-950/10' },
    { id: 4, title: 'The Banking Round', link: '/Games/Bank', state: 'AVAILABLE', description: 'Answer rapidly to stack points before the time expires.', icon: <Timer className="w-6 h-6" />, color: 'from-emerald-600/20 to-emerald-950/10' },
    { id: 5, title: 'True Guess', link: '/Games/Guess', state: 'AVAILABLE', description: 'Challenge friends with obscure football facts.', icon: <RiCompass3Line />, color: 'from-purple-600/20 to-purple-950/10' },
    { id: 6, title: 'Visual Identity', link: '/Games/whoinPicture', state: 'AVAILABLE', description: 'Recognize iconic moments and players from cropped images.', icon: <RiBarChartGroupedLine />, color: 'from-rose-600/20 to-rose-950/10' },
    { id: 7, title: 'Elite Auction', link: '/Games/Auction', state: 'AVAILABLE', description: 'Bid against rivals and prove your depth of knowledge.', icon: <Gavel className="w-6 h-6" />, color: 'from-orange-600/20 to-orange-950/10' },
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
    <div className="w-full max-w-7xl mx-auto space-y-28 pb-24 px-4">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-[4rem] border border-white/5 bg-[#030303] shadow-3xl">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[140px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.95, 1.1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15%] right-[-5%] w-[700px] h-[700px] bg-blue-900/20 rounded-full blur-[130px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#030303_100%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-6 py-4 max-w-5xl space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.4em] text-primary uppercase shadow-2xl shadow-primary/15"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Season 04: The Arena of Champions
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-[8.5rem] font-black italic text-white tracking-tighter leading-[0.85] uppercase">
              SHALAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-500">CHALLENGE</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/55 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            The premium stadium for football experts. Test your depth, unlock achievements, and compete with <span className="text-white font-black">{activeFans.toLocaleString()}</span> active fans.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {isLogin ? (
              <button
                onClick={() => document.getElementById('hub').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-primary text-white font-black text-xs rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-[0.3em]"
              >
                <RiPlayFill size={20} className="group-hover:rotate-12 transition-transform" />
                Select Arena
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-10 py-5 bg-white text-black font-black text-xs rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-[0.3em]"
              >
                Unlock Club Access
              </Link>
            )}

            <div className="flex items-center gap-3 p-3 glass rounded-2xl border border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030303] overflow-hidden transform hover:-translate-y-1 transition-transform">
                    <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="player" />
                  </div>
                ))}
              </div>
              <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Compete Globally</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Arenas', value: '14 Arenas', icon: <Gamepad2 className="w-6 h-6" />, desc: 'Live football quizzes' },
          { label: 'Global Ranking', value: '12K+ Players', icon: <RiTrophyLine />, desc: 'Interactive leaderboard' },
          { label: 'Squad Battles', value: 'Multi-Game', icon: <RiTeamLine />, desc: 'Sabahoo tahdy style' },
          { label: 'Platform Status', value: 'Fully Stable', icon: <RiLineChartLine />, desc: 'Realtime sync' },
        ].map((stat, i) => (
          <motion.div
            whileHover={{ y: -4 }}
            key={i}
            className="group relative glass-dark border border-white/5 p-6 rounded-[2.5rem] overflow-hidden flex flex-col justify-between min-h-[140px]"
          >
            <div className="absolute top-4 right-4 text-primary opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</span>
              <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{stat.value}</h3>
              <p className="text-[10px] font-semibold text-white/45 mt-2">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Games Hub */}
      <section id="hub" className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Game Universe</span>
            <h2 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
              Matchday <span className="text-white/40">Arenas</span>
            </h2>
          </div>
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
            <span className="px-5 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Quizzes & Challenges</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 flex flex-col justify-between min-h-[260px]"
            >
              {/* Card Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

              <Link href={game.link} className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl glass-dark border border-white/10 flex items-center justify-center text-xl text-white group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:scale-105">
                    {game.icon}
                  </div>
                  <div className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-white/50 uppercase tracking-widest">
                    {game.state}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-white italic leading-tight uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/40 text-[11px] font-semibold leading-relaxed line-clamp-2">
                    {game.description}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-primary opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 text-[9px] font-black uppercase tracking-[0.2em]">
                    Enter Match <RiPlayFill size={10} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
