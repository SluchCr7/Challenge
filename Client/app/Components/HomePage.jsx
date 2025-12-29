'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  RiTrophyLine,
  RiGroupLine,
  RiFlashlightLine,
  RiPlayFill,
  RiFocus2Line,
  RiCompass3Line,
  RiBarChartGroupedLine
} from 'react-icons/ri'
import { Timer, Gavel, Users, Gamepad2, Flag, RotateCcw, LayoutGrid, ListOrdered } from 'lucide-react';
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
    { id: 1, title: 'Who is the Player?', link: '/Games/Whoplayer', state: 'AVAILABLE', description: 'Guess the legend based on career clues and stats.', icon: <RiFocus2Line />, color: 'from-red-600/20 to-red-600/5' },
    { id: 2, title: 'Secret Password', link: '/Games/Password', state: 'AVAILABLE', description: 'Unlock the hidden player identity with minimal hints.', icon: <RiFlashlightLine />, color: 'from-blue-600/20 to-blue-600/5' },
    { id: 3, title: 'Risk Arena', link: '/Games/Resk', state: 'AVAILABLE', description: 'High-stakes football trivia across multiple difficulty tiers.', icon: <RiTrophyLine />, color: 'from-amber-600/20 to-amber-600/5' },
    { id: 4, title: 'The Banking Round', link: '/Games/Bank', state: 'AVAILABLE', description: 'Answer rapidly to stack points before the time expires.', icon: <Timer />, color: 'from-emerald-600/20 to-emerald-600/5' },
    { id: 5, title: 'True Guess', link: '/Games/Guss', state: 'AVAILABLE', description: 'Challenge friends with obscure football facts.', icon: <RiCompass3Line />, color: 'from-purple-600/20 to-purple-600/5' },
    { id: 6, title: 'Visual Identity', link: '/Games/whoinPicture', state: 'AVAILABLE', description: 'Recognize iconic moments and players from cropped images.', icon: <RiBarChartGroupedLine />, color: 'from-primary/20 to-primary/5' },
    { id: 7, title: 'Elite Auction', link: '/Games/Auction', state: 'AVAILABLE', description: 'Bid against rivals and prove your depth of knowledge.', icon: <Gavel />, color: 'from-orange-600/20 to-orange-600/5' },
    { id: 8, title: 'Club Legends', link: '/Games/Clubs', state: 'AVAILABLE', description: 'Identify global clubs from their history, crests, and stars.', icon: <Users />, color: 'from-cyan-600/20 to-cyan-600/5' },
    { id: 9, title: 'Offside Rule', link: '/Games/Offside', state: 'AVAILABLE', description: 'Test your knowledge on tactical rules and referee decisions.', icon: <Flag />, color: 'from-yellow-600/20 to-yellow-600/5' },
    { id: 10, title: 'Infinity Round', link: '/Games/Round', state: 'AVAILABLE', description: 'Continuous rounds of increasing difficulty to test stamina.', icon: <RotateCcw />, color: 'from-indigo-600/20 to-indigo-600/5' },
    { id: 11, title: 'Squad Builder', link: '/Games/Squad', state: 'AVAILABLE', description: 'Construct the perfect team and solve formation puzzles.', icon: <LayoutGrid />, color: 'from-lime-600/20 to-lime-600/5' },
    { id: 12, title: 'The Top Ten', link: '/Games/TopTen', state: 'AVAILABLE', description: 'Rank and list the greatest players in specific categories.', icon: <ListOrdered />, color: 'from-teal-600/20 to-teal-600/5' },
    { id: 13, title: 'Multi-Challenge', link: '/Games/MultiGame', state: 'AVAILABLE', description: 'A diverse gauntlet of various football mini-games.', icon: <Gamepad2 />, color: 'from-rose-600/20 to-rose-600/5' },
    { id: 14, title: 'Hall of Fame', link: '/Games/Leaderboard', state: 'AVAILABLE', description: 'View the global rankings and elite football legends.', icon: <RiTrophyLine />, color: 'from-slate-600/20 to-slate-600/5' },
  ]

  if (!isAuthChecked) return null

  return (
    <div className="w-full max-w-7xl mx-auto space-y-32 pb-24">
      {/* Hero Section - Redesigned for Maximum Impact */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-[5rem] border border-white/5 bg-[#050505] perspective-1000">
        {/* Advanced Background System */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[130px]"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </div>

        {/* Floating Interactive Icons Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[RiTrophyLine, Timer, RiFlashlightLine, RiFocus2Line].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl text-white/10"
              initial={{ x: Math.random() * 1000, y: Math.random() * 600 }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 20, 0]
              }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              style={{ left: `${20 * i}%`, top: `${15 * i}%` }}
            >
              <Icon />
            </motion.div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 text-center px-6 max-w-5xl space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border border-white/10 text-[11px] font-black tracking-[0.4em] text-primary uppercase shadow-2xl shadow-primary/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Season 04: The Rise of Legends
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-[9rem] font-black italic text-white tracking-tighter leading-[0.85] uppercase">
              ULTIMATE <br />
              <span className="text-stroke-2 text-transparent">CHALLENGE</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 font-medium text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            The definitive football knowledge arena. Join <span className="text-white font-bold">{activeFans.toLocaleString()}</span> fanatics and dominate the global leaderboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            {isLogin ? (
              <button
                onClick={() => document.getElementById('hub').scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-12 py-6 bg-primary text-white font-black text-xs rounded-2xl shadow-2xl shadow-primary/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 uppercase tracking-[0.3em]"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
                <RiPlayFill size={24} className="group-hover:rotate-12 transition-transform" />
                Enter The Arena
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-12 py-6 bg-white text-carbon-dark font-black text-xs rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 uppercase tracking-[0.3em]"
              >
                Unlock Elite Access
              </Link>
            )}

            <div className="flex items-center gap-4 p-3 glass rounded-2xl border border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl border-2 border-carbon-dark overflow-hidden transform hover:-translate-y-1 transition-transform cursor-pointer">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Active Players</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-12 pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 pointer-events-none" />
      </section>

      {/* Stats Board - Premium Glass Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[
          { label: 'Live Arenas', value: '14 ACTIVE', icon: <RiFlashlightLine />, trend: '+3 New' },
          { label: 'Global Ranking', value: '#12,840', icon: <RiTrophyLine />, trend: 'Top 5%' },
          { label: 'Points Pool', value: '1.2M+', icon: <Users />, trend: 'Weekly' },
          { label: 'Daily XP', value: '2.5X BOOST', icon: <Timer />, trend: 'Active' },
        ].map((stat, i) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={i}
            className="group relative glass-dark border border-white/5 p-8 rounded-[3rem] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 text-primary group-hover:scale-110 transition-transform opacity-20 group-hover:opacity-100">
              {stat.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{stat.value}</h3>
              <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-2">{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Games Hub - Bento Style Premium Grid */}
      <section id="hub" className="space-y-16 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">Game Universe</span>
            <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
              Explore <span className="text-stroke-1 text-white opacity-40">The</span> Hub
            </h2>
          </div>
          <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5">
            <button className="px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-primary/20">All Challenges</button>
            <button className="px-6 py-3 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">New Releases</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 ${i === 0 || i === 7 ? 'md:col-span-2' : '' // Highlighting some games by expanding them
                } ${i === 3 ? 'lg:row-span-2 h-full' : ''}`}
            >
              {/* Card Background Visual */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

              <Link href={game.link} className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl glass-dark border border-white/10 flex items-center justify-center text-2xl text-white group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:rotate-12">
                    {game.icon}
                  </div>
                  <div className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[8px] font-black text-white/50 uppercase tracking-widest group-hover:text-white group-hover:bg-primary/20 transition-all">
                    {game.state}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white italic leading-tight uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/40 text-[11px] font-medium leading-relaxed line-clamp-2 group-hover:text-white/70 transition-colors">
                    {game.description}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    Play Now <RiPlayFill />
                  </div>
                </div>
              </Link>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Match Hub - Compact Premium Design */}
      <section className="mx-4">
        <div className="glass-dark border border-white/10 rounded-[4rem] p-12 lg:p-20 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="space-y-8 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.5em]">Live Integration</div>
              <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-[0.9]">
                STADIUM <br /><span className="text-primary underline decoration-white/10">PROTOCOL</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed">
                Experience real-time football synchronization. Predict events as they happen on the pitch and multiply your rewards.
              </p>
              <button className="px-10 py-5 bg-white text-black font-black text-xs rounded-2xl uppercase tracking-[0.3em] shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                View Live Sync Schedule
              </button>
            </div>

            {/* Premium Match Widget Card */}
            <div className="w-full max-w-lg glass-dark border border-white/20 rounded-[4rem] p-10 space-y-10 shadow-3xl relative overflow-hidden backdrop-blur-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Champions League • Final</span>
                </div>
                <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full italic tracking-widest leading-none">
                  LIVE 82'
                </span>
              </div>

              <div className="flex items-center justify-between gap-6 relative">
                <div className="flex flex-col items-center gap-4 group/team">
                  <div className="w-24 h-24 rounded-3xl glass border border-white/10 p-5 flex items-center justify-center transform group-hover/team:scale-110 transition-transform shadow-2xl">
                    <img src="https://upload.wikimedia.org/wikipedia/ar/thumb/7/70/Al_Ahly_SC_logo.svg/1200px-Al_Ahly_SC_logo.svg.png" className="w-full object-contain filter drop-shadow-2xl" alt="team1" />
                  </div>
                  <span className="text-sm font-black text-white italic uppercase tracking-tighter">AHL</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-6xl font-black text-white italic tracking-tighter leading-none flex gap-2">
                    <span>3</span><span className="text-primary">:</span><span>1</span>
                  </div>
                  <div className="mt-4 px-4 py-1.5 glass rounded-full text-[9px] font-black text-white/30 uppercase tracking-[0.4em] border border-white/5">FULL THROTTLE</div>
                </div>

                <div className="flex flex-col items-center gap-4 group/team">
                  <div className="w-24 h-24 rounded-3xl glass border border-white/10 p-5 flex items-center justify-center transform group-hover/team:scale-110 transition-transform shadow-2xl">
                    <img src="https://upload.wikimedia.org/wikipedia/ar/thumb/a/a1/ZamalekSC.png/800px-ZamalekSC.png" className="w-full object-contain filter drop-shadow-2xl" alt="team2" />
                  </div>
                  <span className="text-sm font-black text-white italic uppercase tracking-tighter">ZAM</span>
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-[2.5rem] border border-primary/20 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/50">
                  <span>Active Prediction Pool</span>
                  <span className="text-primary italic">50,000 XP AT STAKE</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-[10px] font-bold text-white/40 text-center uppercase tracking-widest italic">Most players predict a 4th goal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding Area */}
      <section className="text-center py-10 space-y-4">
        <div className="text-5xl md:text-7xl font-black italic text-white/5 uppercase tracking-tighter select-none">
          CHALLENGE UNMATCHED
        </div>
        <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.8em]">Designed for the 1% of Football Experts</p>
      </section>
    </div>
  )
}

export default HomePage
