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
  RiTimerScaleLine,
  RiFocus2Line,
  RiCompass3Line,
  RiBarChartGroupedLine
} from 'react-icons/ri'

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
    { id: 4, title: 'The Banking Round', link: '/Games/Bank', state: 'AVAILABLE', description: 'Answer rapidly to stack points before the time expires.', icon: <RiTimerScaleLine />, color: 'from-emerald-600/20 to-emerald-600/5' },
    { id: 5, title: 'True Guess', link: '/Games/Guss', state: 'AVAILABLE', description: 'Challenge friends with obscure football facts.', icon: <RiCompass3Line />, color: 'from-purple-600/20 to-purple-600/5' },
    { id: 6, title: 'Visual Identity', link: '/Games/whoinPicture', state: 'AVAILABLE', description: 'Recognize iconic moments and players from cropped images.', icon: <RiBarChartGroupedLine />, color: 'from-primary/20 to-primary/5' },
  ]

  if (!isAuthChecked) return null

  return (
    <div className="w-full max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden rounded-[4rem] border border-white/5 bg-carbon-dark">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next Match: Egypt vs Senegal - Live Quizzes Now
            </div>

            <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter leading-[0.9] uppercase">
              Master the <br />
              <span className="text-stroke text-white">Ultimate</span> <span className="text-primary underline decoration-white/10">Challenge</span>
            </h1>

            <p className="text-white/50 font-medium text-lg md:text-xl max-w-2xl mx-auto">
              Join {activeFans.toLocaleString()} active football fanatics. Prove your knowledge, climb the ranks, and earn your place among the legends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {isLogin ? (
              <button
                onClick={() => document.getElementById('categories').scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-primary hover:bg-primary-hover text-white font-heavy text-sm rounded-full shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 uppercase tracking-widest"
              >
                <RiPlayFill size={20} /> Start Game Session
              </button>
            ) : (
              <Link
                href="/Auth/Login"
                className="px-10 py-5 bg-white text-carbon-dark font-heavy text-sm rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 uppercase tracking-widest"
              >
                Unlock Full Experience
              </Link>
            )}

            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-carbon-dark bg-carbon-light flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="fan" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-carbon-dark bg-primary flex items-center justify-center text-[10px] font-black text-white italic">
                {Math.floor(activeFans / 1000)}K+
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-center justify-between border-t border-white/5 glass">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-white font-black text-xl italic leading-none">WEEKLY PRIZE</span>
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase">$2,500 TOTAL POOL</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-white font-black text-xl italic leading-none">ELITE RANK</span>
              <span className="text-primary font-bold text-[10px] tracking-widest uppercase">TOP 100 PLAYERS</span>
            </div>
          </div>
          <RiTrophyLine className="text-white/10 text-6xl rotate-12" />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Challenges', value: '450+', icon: <RiTrophyLine /> },
          { label: 'Expert Fans', value: '1.2M', icon: <RiGroupLine /> },
          { label: 'Real-time Stats', value: 'Live', icon: <RiFlashlightLine /> },
          { label: 'Upcoming Events', value: '12', icon: <RiTimerScaleLine /> },
        ].map((stat, i) => (
          <div key={i} className="glass border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-primary/30 transition-all group">
            <span className="text-3xl text-primary transform group-hover:scale-110 transition-transform">{stat.icon}</span>
            <div className="text-center">
              <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{stat.value}</h3>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories Grid */}
      <section id="categories" className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase">
              Featured <span className="text-primary">Arenas</span>
            </h2>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Choose your discipline and dominate the field</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 glass rounded-full text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">Season 1</button>
            <button className="px-6 py-3 bg-primary rounded-full text-xs font-black uppercase tracking-widest text-white">Live Now</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-[3rem] border border-white/5 bg-gradient-to-br ${game.color} p-1`}
            >
              <Link href={game.link} className="block h-full glass-dark p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center text-3xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {game.icon}
                  </div>
                  <span className="text-[10px] font-black text-primary px-3 py-1 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
                    {game.state}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-white/50 text-sm font-medium leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <RiGroupLine className="text-white/30" />
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">2.4k playing</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <RiPlayFill />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Match Widget Section (Upcoming Matches) */}
      <section className="glass-dark border border-white/10 rounded-[4rem] p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left max-w-lg">
            <h2 className="text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase leading-none">
              Live Match <br /><span className="text-primary">Interactive</span> Hub
            </h2>
            <p className="text-white/50 text-lg">
              Play along with live matches. Guess the next scorer, predict substitutions, and earn 2x XP during game time.
            </p>
            <button className="px-8 py-4 bg-white text-carbon-dark font-heavy text-xs rounded-full uppercase tracking-[0.2em] shadow-2xl transition hover:scale-105">
              View Schedule
            </button>
          </div>

          {/* Mock Match Widget */}
          <div className="w-full max-w-md glass border border-white/10 rounded-[3rem] p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Premier League</span>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live 74'
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-3xl bg-white/5 p-4 flex items-center justify-center border border-white/5">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" className="w-full grayscale brightness-200" alt="team1" />
                </div>
                <span className="text-sm font-black text-white italic uppercase tracking-tighter">ARS</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-white italic tracking-tighter leading-none">2 : 1</span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-2">Score</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-3xl bg-white/5 p-4 flex items-center justify-center border border-white/5">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" className="w-full grayscale brightness-200" alt="team2" />
                </div>
                <span className="text-sm font-black text-white italic uppercase tracking-tighter">MCI</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest line-clamp-1">Guess who scores next?</span>
                <span className="text-xs font-black text-primary italic">+500 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
