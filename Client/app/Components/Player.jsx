'use client'
import { deleteItem } from '@/utils/DeleteItem';
import React, { useState } from 'react'
import { RiCloseLine, RiEyeLine, RiDeleteBin7Line, RiFocus2Line, RiTrophyLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

const Player = ({ pla }) => {
    const [viewClow, setViewClow] = useState(false)

    return (
        <div className='w-full'>
            <motion.div
                whileHover={{ y: -5 }}
                className='relative overflow-hidden glass-dark border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 group transition-all duration-500 hover:border-primary/50 shadow-2xl'
            >
                {/* Abstract BG */}
                <div className="absolute -right-4 -top-4 text-9xl text-white/[0.02] font-black italic select-none group-hover:text-primary/[0.05] transition-colors -rotate-12">DATA</div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
                            <RiTrophyLine />
                        </div>
                        <div>
                            <h4 className="text-white font-black italic uppercase tracking-tighter leading-none">{pla.Answer}</h4>
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Target Persona</span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteItem("questions", pla._id)}
                        className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary transition-all"
                    >
                        <RiDeleteBin7Line size={20} />
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="p-4 glass rounded-2xl border border-white/5 space-y-1">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Stats</span>
                        <p className="text-white font-black italic text-xl tracking-tighter">{pla.Clos.length} <span className="text-xs text-primary">Clues</span></p>
                    </div>
                    <div className="p-4 glass rounded-2xl border border-white/5 space-y-1">
                        <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Entry Date</span>
                        <p className="text-white font-black italic text-xl tracking-tighter">Oct 24</p>
                    </div>
                </div>

                <button
                    onClick={() => setViewClow(true)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-white/70 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                >
                    <RiEyeLine size={16} /> Inspect Blueprint
                </button>

                {/* Clue Inspector Modal */}
                <AnimatePresence>
                    {viewClow && (
                        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setViewClow(false)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                className="relative glass-dark border border-white/10 p-12 rounded-[4rem] shadow-2xl w-full max-w-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setViewClow(false)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                >
                                    <RiCloseLine size={24} />
                                </button>

                                <div className="space-y-8">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{pla.Answer}</h3>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Clue Sequence Manifest</p>
                                    </div>

                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                                        {pla.Clos.map((clo, index) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                key={index}
                                                className="p-6 glass border border-white/5 rounded-3xl flex items-center gap-6"
                                            >
                                                <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black italic text-xs">
                                                    {index + 1}
                                                </div>
                                                <p className="text-white font-bold text-lg leading-relaxed">{clo}</p>
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

export default Player