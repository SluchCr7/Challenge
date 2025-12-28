'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { RiRefreshLine, RiArrowDownSLine, RiArrowUpSLine, RiShieldUserLine, RiCameraLensLine, RiFocus2Line } from "react-icons/ri";
import { PictureContext } from '@/app/Context/Games/PictureContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [showPlayers, setShowPlayers] = useState(false);
  const { team } = useContext(PictureContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPicture') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...team]);
  }, [team]);

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-20 flex-col gap-10 relative overflow-hidden rtl'>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-0 left-0 p-12 opacity-[0.03] text-[200px] font-black italic select-none pointer-events-none -rotate-12 uppercase">Capture</div>

      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-12 w-full max-w-5xl px-6"
          >
            {/* Header Status */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-2xl shadow-primary/10 border border-primary/20">
                <RiCameraLensLine className="animate-pulse" />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">محلل <span className="text-primary">الصور</span></h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">تحديد الهويات من الأرشيف البصري</p>
              </div>
            </div>

            {/* Visual Module */}
            <div className="w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[3.5rem] blur opacity-25 group-hover:opacity-50 transition-all" />
              <div className="glass-dark border border-white/10 rounded-[3rem] p-6 relative overflow-hidden shadow-2xl">
                <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden border-2 border-white/5">
                  <Image
                    src={lastSelected?.Photo[0].url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="target-intel"
                    className="group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 right-8 text-right">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">موقع الالتقاط</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{lastSelected?.Name}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Sector */}
            <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
              <button
                onClick={() => setShowPlayers(!showPlayers)}
                className={`group w-full py-6 rounded-[2.5rem] border-2 transition-all duration-500 flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-[0.4em] ${showPlayers ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'glass border-white/10 text-white/40 hover:border-primary'
                  }`}
              >
                <RiShieldUserLine size={20} /> {showPlayers ? 'إغلاق قائمة الهويات' : 'عرض الهويات المكتشفة'}
                {showPlayers ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </button>

              <AnimatePresence>
                {showPlayers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full glass-dark border border-primary/20 rounded-[3rem] p-10 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {lastSelected?.TeamMembers.map((player, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 glass border border-white/5 rounded-2xl group hover:border-primary/50 transition-all"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
                            <RiFocus2Line />
                          </div>
                          <span className="text-sm font-black italic text-white/80 uppercase tracking-tighter group-hover:text-white">{player}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  selectRandomObject(team, remainingObjects, setLastSelected, setRemainingObjects, "Picture");
                  setShowPlayers(false);
                }}
                className="group w-20 h-20 rounded-[2.5rem] glass border border-white/10 flex items-center justify-center text-primary text-3xl hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
              >
                <RiRefreshLine className="group-hover:rotate-180 transition-transform duration-700" />
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="المسح البصري"
            team={team}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="سيتم عرض لقطة من أرشيف كرة القدم. مهمتك هي التعرف على اللاعبين الموجودين في الكادر بدقة. هل تمتلك مهارة الملاحظة؟"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;