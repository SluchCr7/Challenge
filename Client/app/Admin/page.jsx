'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext';
import {
  RiDashboardLine,
  RiGameLine,
  RiUserSettingsLine,
  RiShieldUserLine,
  RiTrophyLine,
  RiBarChartGroupedLine,
  RiSettings4Line,
  RiFlashlightLine
} from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
  const { users } = useContext(AuthContext);

  const games = [
    { name: 'Players', link: '/Admin/Players', icon: <RiGameLine />, desc: 'Career clues management' },
    { name: 'Password', link: '/Admin/Password', icon: <RiShieldUserLine />, desc: 'Security protocols' },
    { name: 'Guss', link: '/Admin/Guss', icon: <RiFlashlightLine />, desc: 'Enigma initialization' },
    { name: 'Bank', link: '/Admin/Bank', icon: <RiBarChartGroupedLine />, desc: 'Economy & scoring' },
    { name: 'Resk', link: '/Admin/Resk', icon: <RiTrophyLine />, desc: 'Arena risk matrix' },
    { name: 'Offside', link: '/Admin/Offside', icon: <RiGameLine />, desc: 'Positioning rules' },
    { name: 'Round', link: '/Admin/Round', icon: <RiSettings4Line />, desc: 'Cycle management' },
    { name: 'Auction', link: '/Admin/Auction', icon: <RiBarChartGroupedLine />, desc: 'Market bidding' },
    { name: 'Team', link: '/Admin/Team', icon: <RiUserSettingsLine />, desc: 'Squad identity' },
    { name: 'TopTen', link: '/Admin/TopTen', icon: <RiTrophyLine />, desc: 'Ranking records' },
    { name: 'Squad', link: '/Admin/Squad', icon: <RiGameLine />, desc: 'Tactical formations' },
    { name: 'Player Carrer', link: '/Admin/Clubs', icon: <RiUserSettingsLine />, desc: 'Historical clubs' },
  ];

  const adminStats = [
    { label: 'Total Fanbase', value: users?.length || 0, icon: <RiUserSettingsLine />, color: 'blue', link: '/Admin/Users' },
    { label: 'Elite Admins', value: users?.filter((u) => u.isAdmain)?.length || 0, icon: <RiShieldUserLine />, color: 'primary', link: '/Admin/Admins' },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <section className="relative glass-dark border border-white/10 rounded-[4rem] p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              <RiDashboardLine /> Command Center Active
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
              System <br /><span className="text-primary">Control</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs max-w-md mx-auto md:mx-0">
              Oversee arenas, manage legends, and monitor the global stadium performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {adminStats.map((stat, i) => (
              <Link href={stat.link} key={i}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center gap-2 hover:border-primary/30 transition-all bg-white/5"
                >
                  <span className={`text-2xl text-${stat.color}`}>{stat.icon}</span>
                  <span className="text-3xl font-black italic text-white tracking-tighter">{stat.value}</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Arenas Management */}
      <section className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter uppercase">
              Active <span className="text-primary">Arenas</span>
            </h2>
            <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Configure gameplay parameters and database records</p>
          </div>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
          <RiGameLine className="text-white/10 text-4xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <Link href={game.link}>
                <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-4 hover:border-primary/50 transition-all duration-500 overflow-hidden h-full">
                  <div className="absolute -right-4 -top-4 text-9xl text-white/[0.02] font-black italic select-none group-hover:text-primary/[0.05] transition-colors">{i + 1}</div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl text-primary transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{game.name}</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">{game.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-0.5 w-8 bg-primary/20 group-hover:w-full transition-all duration-500" />
                    <RiDashboardLine className="text-white/20 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* System Integrity */}
      <section className="glass border border-white/5 rounded-[4rem] p-12 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-3xl border border-green-500/20">
            <RiSettings4Line className="animate-spin-slow" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">System Pulse</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Database Linked</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Asset Server Online</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global CDN Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
