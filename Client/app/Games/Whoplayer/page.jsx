'use client'
import React, { useContext, useEffect, useState } from 'react'
import { RiCloseLine, RiRefreshLine, RiEyeLine, RiFlagLine, RiCheckLine } from "react-icons/ri";
import { PlayerContext } from '@/app/Context/Games/PlayersContext';
import selectRandomObject from '@/utils/getUniqueObject';
import { motion, AnimatePresence } from 'framer-motion';
import GameIntro from '@/app/Components/GameIntro';

const Game = () => {
  const [show, setShow] = useState(false);
  const { player } = useContext(PlayerContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPlayer') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...player]);
  }, [player]);

  return (
    <div className="min-h-[80vh] py-10 px-4 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key="game-session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-12 w-full"
          >
            {/* Header Info */}
            <div className="w-full flex items-center justify-between px-6 border-b border-white/5 pb-8">
              <div className="flex flex-col">
                <span className="text-primary font-black italic text-2xl uppercase tracking-tighter">Who Is He?</span>
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Player Identity Arena</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-white font-black italic text-xl">05/06</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Clues Unlocked</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <motion.button
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    selectRandomObject(player, remainingObjects, setLastSelected, setRemainingObjects, 'Player');
                    setShow(false);
                  }}
                  className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <RiRefreshLine size={24} />
                </motion.button>
              </div>
            </div>

            {/* Clues Card Container */}
            <div className="w-full max-w-3xl space-y-4">
              <AnimatePresence mode="popLayout">
                {lastSelected?.Clos.map((Clo, index) => (
                  <motion.div
                    key={`${lastSelected._id}-${index}`}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-primary rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                    <div className="glass-dark border border-white/10 rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-xl hover:border-primary/30 transition-all duration-300">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black italic text-xs">
                        {index + 1}
                      </div>
                      <p className="text-white font-semibold text-lg md:text-xl leading-relaxed">
                        {Clo}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(true)}
                className="px-10 py-5 bg-white text-carbon-dark font-black text-sm rounded-full shadow-2xl flex items-center gap-3 uppercase tracking-widest transition-all"
              >
                <RiEyeLine size={20} /> Reveal Answer
              </motion.button>

              <button className="px-10 py-5 glass border border-white/10 text-white font-black text-sm rounded-full flex items-center gap-3 uppercase tracking-widest hover:bg-white/5 transition-all">
                <RiFlagLine size={20} /> Surrender
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="intro">
            <GameIntro
              name="Who Player"
              team={player}
              selectRandomObject={selectRandomObject}
              remainingObjects={remainingObjects}
              setLastSelected={setLastSelected}
              setRemainingObjects={setRemainingObjects}
              text="Analyze 5 to 6 critical career clues. If you guess wrong, the next advantage goes to your opponent."
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer Modal */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[2000] p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative glass-dark border border-white/10 p-12 rounded-[4rem] shadow-2xl w-full max-w-2xl text-center space-y-8"
            >
              <button
                onClick={() => setShow(false)}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <RiCloseLine size={28} />
              </button>

              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-4xl text-green-500 border border-green-500/20">
                  <RiCheckLine size={48} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">The Legend is</span>
                <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
                  {lastSelected?.Answer}
                </h2>
              </div>

              <button
                onClick={() => {
                  selectRandomObject(player, remainingObjects, setLastSelected, setRemainingObjects, 'Player');
                  setShow(false);
                }}
                className="px-12 py-6 bg-primary text-white font-black text-xs rounded-full uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
              >
                Next Challenge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;