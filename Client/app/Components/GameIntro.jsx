import React from 'react'
import { motion } from 'framer-motion'
import { RiPlayFill, RiInformationLine, RiTrophyLine } from 'react-icons/ri'

const GameIntro = ({ name, team, selectRandomObject, remainingObjects, setLastSelected, setRemainingObjects, text }) => {
  return (
    <div className='flex items-center flex-col justify-center w-full max-w-2xl mx-auto gap-6 px-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-surface border border-white/10 rounded-2xl p-8 w-full text-center space-y-5 relative overflow-hidden shadow-xl"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-subtle border border-primary/25 flex items-center justify-center text-3xl text-primary shadow-sm">
            <RiInformationLine />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tight">
          {name} Arena <span className="text-primary">Rules</span>
        </h2>

        <p className='text-center text-slate-400 font-normal text-base leading-relaxed max-w-lg mx-auto'>
          {text}
        </p>

        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex flex-col items-center">
            <span className="text-white font-black italic text-lg">1.2K</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Active Players</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-primary font-black italic text-lg">+500</span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Potential XP</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { selectRandomObject(team, remainingObjects, setLastSelected, setRemainingObjects, name) }}
        className='w-full md:w-[260px] h-14 bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center justify-center gap-2.5 rounded-xl text-slate-950 font-black text-xs uppercase tracking-widest transition-all'
      >
        <RiPlayFill size={20} />
        Enter Arena
      </motion.button>

      <div className="flex items-center gap-1.5 text-slate-500">
        <RiTrophyLine size={14} />
        <span className="text-[10px] font-bold uppercase tracking-wider">Official Season 04 Qualifying Arena</span>
      </div>
    </div>
  );
};

export default GameIntro