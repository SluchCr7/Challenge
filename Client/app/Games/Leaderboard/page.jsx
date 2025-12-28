'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiTrophyLine, RiMedalLine, RiFireLine, RiShieldLine, RiTeamLine, RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri'
import Image from 'next/image'

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('Global')

    const topThree = [
        { name: 'Kylian_7', points: '14,250', rank: 2, avatar: '12', trend: 'up' },
        { name: 'Salah_King', points: '18,900', rank: 1, avatar: '15', trend: 'neutral' },
        { name: 'Cr7_Legacy', points: '12,800', rank: 3, avatar: '18', trend: 'down' },
    ]

    const leaderboardData = [
        { rank: 4, name: 'Zizou_Art', points: '11,400', level: 42, winRate: '78%', active: true },
        { rank: 5, name: 'Messi_Goal', points: '10,900', level: 38, winRate: '82%', active: false },
        { rank: 6, name: 'Erling_Machine', points: '9,850', level: 35, winRate: '65%', active: true },
        { rank: 7, name: 'Vini_Skill', points: '8,400', level: 31, winRate: '70%', active: true },
        { rank: 8, name: 'Bellingham_Jr', points: '7,200', level: 29, winRate: '68%', active: false },
        { rank: 9, name: 'Mbappe_Speed', points: '6,800', level: 27, winRate: '72%', active: true },
        { rank: 10, name: 'Neymar_Fun', points: '5,500', level: 25, winRate: '60%', active: false },
    ]

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
                        Hall of <br /><span className="text-primary">Legends</span>
                    </h1>
                    <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">Real-time Global Rankings • Season 04</p>
                </div>

                <div className="flex bg-carbon-light p-2 rounded-[2rem] border border-white/5 shadow-2xl">
                    {['Global', 'Regional', 'Friends'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Podium Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-20">
                {/* Rank 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative h-[400px] glass-dark border border-white/10 rounded-t-[3rem] p-8 flex flex-col items-center justify-end gap-6 overflow-hidden md:order-1"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-400" />
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-400 p-1 bg-carbon-dark relative z-10">
                            <img src={`https://i.pravatar.cc/150?u=${topThree[0].avatar}`} className="w-full h-full rounded-full grayscale" alt="rank2" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white border-4 border-carbon-dark z-20">
                            <RiMedalLine size={20} />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">{topThree[0].name}</h3>
                        <span className="text-primary font-bold text-2xl italic tracking-tighter">{topThree[0].points}</span>
                    </div>
                    <div className="w-full h-32 bg-gray-400/10 rounded-t-3xl flex items-center justify-center text-gray-400 font-black text-6xl italic opacity-20">2ND</div>
                </motion.div>

                {/* Rank 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-[480px] glass-dark border border-primary/30 rounded-t-[4rem] p-10 flex flex-col items-center justify-end gap-6 overflow-hidden md:order-2 shadow-2xl shadow-primary/10"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary animate-pulse" />
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-carbon-dark relative z-10">
                            <img src={`https://i.pravatar.cc/150?u=${topThree[1].avatar}`} className="w-full h-full rounded-full" alt="rank1" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white border-4 border-carbon-dark z-20 shadow-2xl">
                            <RiTrophyLine size={24} />
                        </div>
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[60px] -z-10" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{topThree[1].name}</h3>
                        <span className="text-primary font-bold text-4xl italic tracking-tighter">{topThree[1].points}</span>
                    </div>
                    <div className="w-full h-40 bg-primary/10 rounded-t-[2.5rem] flex items-center justify-center text-primary font-black text-8xl italic opacity-20">1ST</div>
                </motion.div>

                {/* Rank 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative h-[360px] glass-dark border border-white/10 rounded-t-[3rem] p-8 flex flex-col items-center justify-end gap-6 overflow-hidden md:order-3"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-700" />
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full border-4 border-amber-700 p-1 bg-carbon-dark relative z-10">
                            <img src={`https://i.pravatar.cc/150?u=${topThree[2].avatar}`} className="w-full h-full rounded-full grayscale brightness-75" alt="rank3" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center text-white border-4 border-carbon-dark z-20">
                            <RiMedalLine size={20} />
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-black italic text-white uppercase tracking-tighter">{topThree[2].name}</h3>
                        <span className="text-primary font-bold text-xl italic tracking-tighter">{topThree[2].points}</span>
                    </div>
                    <div className="w-full h-24 bg-amber-700/10 rounded-t-3xl flex items-center justify-center text-amber-700 font-black text-5xl italic opacity-20">3RD</div>
                </motion.div>
            </div>

            {/* Table Section */}
            <div className="glass-dark border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="grid grid-cols-6 p-8 border-b border-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                    <div className="col-span-1 pl-4">Rank</div>
                    <div className="col-span-2">Player</div>
                    <div className="col-span-1 text-center">Score</div>
                    <div className="col-span-1 text-center">Efficiency</div>
                    <div className="col-span-1 text-right pr-4">Profile</div>
                </div>

                <div className="flex flex-col">
                    {leaderboardData.map((player, i) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            key={player.rank}
                            className="grid grid-cols-6 p-8 items-center border-b last:border-0 border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                        >
                            <div className="col-span-1 flex items-center gap-4 pl-4">
                                <span className="text-lg font-black italic text-white/40 group-hover:text-primary transition-colors">#{player.rank}</span>
                                {player.rank < 6 ? <RiArrowUpSLine className="text-green-500" /> : <RiArrowDownSLine className="text-red-500" />}
                            </div>

                            <div className="col-span-2 flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-carbon-light p-0.5 border border-white/10 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${player.rank + 10}`} className="w-full h-full rounded-xl brightness-90 group-hover:brightness-100 transition-all" alt="user" />
                                    </div>
                                    {player.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-carbon-dark shadow-lg" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black italic text-white uppercase tracking-tighter leading-none">{player.name}</h4>
                                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">Level {player.level}</span>
                                </div>
                            </div>

                            <div className="col-span-1 text-center font-black italic text-white text-lg tracking-tighter">
                                {player.points}
                            </div>

                            <div className="col-span-1 text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs font-bold text-white/60">{player.winRate}</span>
                                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: player.winRate }} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 text-right pr-4">
                                <button className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/30 hover:text-primary hover:border-primary transition-all ml-auto">
                                    <RiShieldLine />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-8 bg-white/5 flex items-center justify-center">
                    <button className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] hover:text-primary transition-colors">
                        Load More Season Rankings
                    </button>
                </div>
            </div>

            {/* Achievements Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-dark border border-white/10 rounded-[3rem] p-10 flex items-center gap-8 relative overflow-hidden group">
                    <div className="w-24 h-24 rounded-3xl bg-amber-500/10 flex items-center justify-center text-5xl text-amber-500 border border-amber-500/20 group-hover:rotate-12 transition-transform shadow-2xl shadow-amber-500/10">
                        <RiFireLine />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">Weekly Scorcher</h4>
                        <p className="text-white/40 text-sm font-medium">Achieve 90% accuracy in "Risk" mode for 3 consecutive games.</p>
                        <span className="inline-block mt-2 text-[9px] font-black text-amber-500 uppercase tracking-widest">+2.5K BONUS XP</span>
                    </div>
                    <div className="absolute -right-8 -bottom-8 text-white/[0.02] text-9xl font-black italic select-none">HOT</div>
                </div>

                <div className="glass-dark border border-white/10 rounded-[3rem] p-10 flex items-center gap-8 relative overflow-hidden group border-blue-500/30">
                    <div className="w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center text-5xl text-blue-500 border border-blue-500/20 group-hover:rotate-12 transition-transform shadow-2xl shadow-blue-500/10">
                        <RiShieldLine />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter leading-none">Invincible Guard</h4>
                        <p className="text-white/40 text-sm font-medium">Clear the "Who Player" arena without using any hints.</p>
                        <span className="inline-block mt-2 text-[9px] font-black text-blue-500 uppercase tracking-widest">ELITE BADGE EARNED</span>
                    </div>
                    <div className="absolute -right-8 -bottom-8 text-white/[0.02] text-9xl font-black italic select-none">SHIELD</div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
