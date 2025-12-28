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
    <div className="flex flex-col items-center gap-6 p-8 glass-dark border border-white/10 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Team Signature */}
      <div className="text-center space-y-1">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 leading-none">Status Monitor</span>
        <h4 className="text-2xl font-black italic text-white tracking-tighter uppercase">{team.name}</h4>
      </div>

      {/* Strike Indicators */}
      <div className="flex items-center justify-center gap-4">
        {circles.map((isFilled, index) => (
          <motion.div
            key={index}
            animate={{
              scale: isFilled ? [1, 1.2, 1] : 1,
              backgroundColor: isFilled ? '#E10600' : 'rgba(255,255,255,0.05)'
            }}
            className={`w-10 h-10 rounded-2xl border border-white/5 flex items-center justify-center transition-all duration-500 shadow-2xl ${isFilled ? 'shadow-primary/30 border-primary/50' : ''
              }`}
          >
            {isFilled && <RiCloseLine className="text-white text-2xl" />}
          </motion.div>
        ))}
      </div>

      {/* Operational Controls */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        {/* Pass Button */}
        <button
          onClick={() => setPass(!pass)}
          disabled={pass}
          className={`flex flex-col items-center justify-center gap-2 py-4 rounded-2xl border transition-all ${pass
              ? 'bg-white/5 border-white/5 text-white/10 cursor-not-allowed opacity-20'
              : 'glass border-white/10 text-white/40 hover:text-primary hover:border-primary'
            }`}
        >
          <RiProhibitedLine className="text-2xl" />
          <span className="text-[9px] font-black uppercase tracking-widest">Pass Protocol</span>
        </button>

        {/* Strike Button */}
        <button
          onClick={fillNextCircle}
          className="flex flex-col items-center justify-center gap-2 py-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/10 active:scale-95"
        >
          <RiFocus2Line className="text-2xl" />
          <span className="text-[9px] font-black uppercase tracking-widest">Execute Strike</span>
        </button>
      </div>
    </div>
  );
};

export default TeamPoints;
