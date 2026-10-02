'use client';
import React from 'react';
import { RiProhibitedLine, RiCloseLine, RiFlashlightLine, RiFocus2Line } from 'react-icons/ri';
import { motion } from 'framer-motion';

const TeamPoints = ({ team, circles, setCircles, pass, setPass }) => {
  const fillNextCircle = () => {
    const nextIndex = circles.findIndex((state) => state === false);
    if (nextIndex !== -1) {
      const newStates = [...circles];
      newStates[nextIndex] = true;
      setCircles(newStates);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-6 bg-surface-card border border-white/10 rounded-2xl shadow-xl w-full max-w-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Team Signature */}
      <div className="text-center space-y-1">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 leading-none">Status Monitor</span>
        <h4 className="text-xl font-black italic text-white tracking-tight uppercase">{team.name}</h4>
      </div>

      {/* Strike Indicators */}
      <div className="flex items-center justify-center gap-3">
        {circles.map((isFilled, index) => (
          <motion.div
            key={index}
            animate={{
              scale: isFilled ? [1, 1.15, 1] : 1,
              backgroundColor: isFilled ? '#EF4444' : 'rgba(255,255,255,0.04)'
            }}
            className={`w-9 h-9 rounded-xl border border-white/5 flex items-center justify-center transition-all duration-300 shadow-md ${isFilled ? 'shadow-rose-500/20 border-rose-500/40' : ''
              }`}
          >
            {isFilled && <RiCloseLine className="text-white text-xl" />}
          </motion.div>
        ))}
      </div>

      {/* Operational Controls */}
      <div className="grid grid-cols-2 gap-3 w-full mt-2">
        {/* Pass Button */}
        <button
          onClick={() => setPass(!pass)}
          disabled={pass}
          className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border transition-all ${pass
              ? 'bg-white/5 border-white/5 text-slate-600 cursor-not-allowed opacity-30'
              : 'bg-surface-subtle border-white/10 text-slate-400 hover:text-primary hover:border-primary/40'
            }`}
        >
          <RiProhibitedLine className="text-xl" />
          <span className="text-[9px] font-black uppercase tracking-wider">Pass</span>
        </button>

        {/* Strike Button */}
        <button
          onClick={fillNextCircle}
          className="flex flex-col items-center justify-center gap-1.5 py-3 bg-surface-subtle border border-rose-500/30 rounded-xl text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
        >
          <RiFocus2Line className="text-xl" />
          <span className="text-[9px] font-black uppercase tracking-wider">Strike</span>
        </button>
      </div>
    </div>
  );
};

export default TeamPoints;
