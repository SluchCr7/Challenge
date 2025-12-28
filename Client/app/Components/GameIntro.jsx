import React from 'react'
import { motion } from 'framer-motion'
import { RiPlayFill, RiInformationLine, RiTrophyLine } from 'react-icons/ri'

const GameIntro = ({ name, team, selectRandomObject, remainingObjects, setLastSelected, setRemainingObjects, text }) => {
  return (
    <div className='flex items-center flex-col justify-center w-full max-w-2xl mx-auto gap-8 px-6'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark border border-white/10 rounded-[3rem] p-10 w-full text-center space-y-6 relative overflow-hidden"
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-3xl -ml-16 -mb-16" />

        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-4xl text-primary border border-primary/20">
            <RiInformationLine />
          </div>
        </div>

        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
          {name} Arena <span className="text-primary">Rules</span>
        </h2>

        <p className='text-center text-white/60 font-medium text-lg leading-relaxed'>
          {text}
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-white font-black italic text-xl">1.2K</span>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Active Players</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-primary font-black italic text-xl">+500</span>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Potential XP</span>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { selectRandomObject(team, remainingObjects, setLastSelected, setRemainingObjects, name) }}
        className='w-full md:w-[300px] h-20 bg-primary hover:bg-primary-hover shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 rounded-[2rem] text-white font-black text-lg uppercase tracking-widest transition-all'
      >
        <RiPlayFill size={28} />
        Enter Arena
      </motion.button>

      <div className="flex items-center gap-2 text-white/20">
        <RiTrophyLine />
        <span className="text-[10px] font-bold uppercase tracking-widest">Official Season 1 Qualifying Arena</span>
      </div>
    </div>
  )
}

export default GameIntro