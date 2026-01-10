'use client'
import React, { useContext, useEffect, useState } from 'react';
import { RiRefreshLine, RiFlashlightLine, RiQuestionLine, RiLightbulbLine, RiEyeLine } from "react-icons/ri";
import { GuessContext } from '@/app/Context/Games/GuessContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
import { motion, AnimatePresence } from 'framer-motion';

const Guess = () => {
  const { data } = useContext(GuessContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsGuess') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  const handleRefresh = () => {
    setShowAnswer(false);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Guess");
  }

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-20 flex-col gap-10 relative overflow-hidden rtl'>
      <div className="absolute top-0 left-0 p-12 opacity-[0.03] text-[200px] font-black italic select-none pointer-events-none">ENIGMA</div>

      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-12 w-full max-w-4xl px-6"
          >
            {/* Header Status */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-2xl shadow-primary/10 border border-primary/20">
                <RiQuestionLine />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">تحدي <span className="text-primary">اللغز</span></h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">حل الأحاجي الكروية المعقدة</p>
              </div>
            </div>

            {/* Question Module */}
            <div className="w-full relative">
              <div className="absolute -top-6 -left-6 text-7xl text-primary/20 opacity-50"><RiFlashlightLine /></div>
              <div className="glass-dark border border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden text-center group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight relative z-10">
                  {lastSelected?.question}
                </h2>
              </div>
              <div className="absolute -bottom-6 -right-6 text-7xl text-primary/20 opacity-50 rotate-180"><RiFlashlightLine /></div>
            </div>

            {/* Answer Sector */}
            <div className="flex flex-col items-center gap-8 w-full">
              <AnimatePresence mode="wait">
                {!showAnswer ? (
                  <motion.button
                    key="reveal-trigger"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAnswer(true)}
                    className="px-12 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-white/50 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-3"
                  >
                    <RiEyeLine size={20} /> عرض الإجابة النموذجية
                  </motion.button>
                ) : (
                  <motion.div
                    key="answer-box"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-dark border border-primary/40 rounded-[2.5rem] p-8 md:p-12 text-center w-full max-w-lg relative"
                  >
                    <RiLightbulbLine className="text-primary text-5xl mx-auto mb-4 animate-pulse" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">التحليل النهائي</span>
                      <h3 className="text-4xl font-black italic text-primary tracking-tighter uppercase leading-none">{lastSelected?.Answer}</h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleRefresh}
                className="group w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary transition-all duration-500 shadow-xl"
              >
                <RiRefreshLine size={24} className="group-hover:rotate-180 transition-transform duration-700" />
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="مختبر الألغاز"
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="اختبر ذكاءك الكروي مع مجموعة من الألغاز المحيرة. هل يمكنك الوصول للحل الصحيح قبل انتهاء الوقت؟"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guess;