'use client'
import selectRandomObject from '@/utils/getUniqueObject';
import { RiRefreshLine, RiShieldKeyholeLine, RiUserSearchLine, RiLockPasswordLine } from "react-icons/ri";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { PassContext } from '@/app/Context/Games/PassContext';
import GameIntro from '@/app/Components/GameIntro';
import { motion, AnimatePresence } from 'framer-motion';

const Password = () => {
  const { pass } = useContext(PassContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPass') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...pass]);
  }, [pass]);

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-20 flex-col gap-10 relative overflow-hidden'>
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] text-[300px] font-black italic select-none">PASS</div>

      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            className="w-full max-w-2xl"
          >
            <div className="glass-dark border border-white/10 rounded-[4rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
              {/* Decorative Scanner Line */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-20 opacity-30"
              />

              <div className="space-y-10 relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] border-4 border-primary p-2 bg-carbon-dark relative z-10 overflow-hidden shadow-2xl shadow-primary/20">
                    <Image
                      src={lastSelected?.Photo[0].url}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      alt='player'
                      className='grayscale group-hover:grayscale-0 transition-all duration-700'
                    />
                  </div>
                  {/* Corner Brackets */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl" />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl" />
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                    <RiShieldKeyholeLine /> Identity Confirmed
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
                    {lastSelected?.name}
                  </h2>
                  <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Registry Serial: {lastSelected?._id?.slice(-8) || '00-XX-78'}</p>
                </div>

                <button
                  onClick={() => selectRandomObject(pass, remainingObjects, setLastSelected, setRemainingObjects, "Pass")}
                  className="group relative px-12 py-6 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl shadow-primary/30 transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-3"
                >
                  <RiRefreshLine size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                  Next Target
                </button>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-8 flex justify-center gap-12">
              <div className="flex items-center gap-3">
                <RiUserSearchLine className="text-primary text-xl" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Scan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Link Stable</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name={"Decryption Arena"}
            team={pass}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="Identify the encrypted personality. Use single-word clues to guide your teammate to the target. Speed is the essence of victory."
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Password;
