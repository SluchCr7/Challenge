'use client'
import React, { useState } from 'react'
import { deleteItem } from '@/utils/DeleteItem'
import { RiDeleteBin7Line, RiEyeLine, RiCloseLine, RiTeamLine, RiFocus2Line } from "react-icons/ri";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Team = ({ team, index }) => {
    const [showPlayers, setShowPlayers] = useState(false)

    return (
        <div className='w-full'>
            <motion.div
                whileHover={{ y: -5 }}
                className="glass-dark border border-white/10 rounded-[2.5rem] p-6 relative overflow-hidden group transition-all duration-500 hover:border-primary/50"
            >
                {/* Background Index */}
                <div className="absolute -right-4 -top-8 text-9xl text-white/[0.02] font-black italic select-none group-hover:text-primary/[0.05] transition-all">#{index + 1}</div>

                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all shadow-xl">
                        <Image
                            src={team.Photo[0].url}
                            layout="fill"
                            objectFit="cover"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700"
                            alt="team"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <RiEyeLine className="text-white text-2xl" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-right space-y-1">
                        <h3 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">{team.Name}</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">Squad Registry ID: {team._id?.slice(-6)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowPlayers(true)}
                            className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all"
                        >
                            <RiTeamLine size={20} />
                        </button>
                        <button
                            onClick={() => deleteItem("teams", team._id)}
                            className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-white/20 hover:text-red-500 hover:border-red-500 transition-all"
                        >
                            <RiDeleteBin7Line size={20} />
                        </button>
                    </div>
                </div>

                {/* Players Overlay */}
                <AnimatePresence>
                    {showPlayers && (
                        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowPlayers(false)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                className="relative glass-dark border border-white/10 p-12 rounded-[4rem] shadow-2xl w-full max-w-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setShowPlayers(false)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    <RiCloseLine size={24} />
                                </button>

                                <div className="space-y-10">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="relative w-64 h-40 rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-2xl">
                                            <Image src={team.Photo[0].url} layout="fill" objectFit="cover" alt="team" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{team.Name}</h3>
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Active Roster Matrix</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                                        {team.TeamMembers.map((player, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-center gap-4 p-5 glass border border-white/5 rounded-2xl group hover:border-primary/50 transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary text-xs">
                                                    <RiFocus2Line />
                                                </div>
                                                <span className="text-sm font-black italic text-white/70 uppercase tracking-tighter group-hover:text-white">{player}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default Team