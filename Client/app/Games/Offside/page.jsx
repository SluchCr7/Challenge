'use client'
import { OffsideContext } from '@/app/Context/Games/OffsideContext';
import React, { useContext, useEffect, useState } from 'react';
import selectRandomObject from '@/utils/getUniqueObject';
import { RiRefreshLine, RiFocusFilterLine, RiTimerLine, RiSkullLine, RiShieldLine } from "react-icons/ri";
import GameIntro from '@/app/Components/GameIntro';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const { data } = useContext(OffsideContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [timer, setTimer] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsOffside') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleRefresh = () => {
    setTimer(10);
    setIsTimerActive(false);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Offside");
  }

  const startAnalysis = () => {
    setTimer(10);
    setIsTimerActive(true);
  }

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-20 flex-col gap-10 relative overflow-hidden rtl'>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-[200px] font-black italic select-none pointer-events-none -rotate-12">VAR</div>

      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-12 w-full max-w-4xl px-6"
          >
            {/* Header Status */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary text-4xl shadow-2xl shadow-primary/10 border border-primary/20">
                <RiFocusFilterLine />
              </div>
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">تحدي <span className="text-primary">التسلل</span></h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">بروتوكول تحليل البيانات السريع</p>
              </div>
            </div>

            {/* Analysis Module */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Timer Card */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="glass-dark border border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">نافذة التنفيذ</span>
                  <div className={`text-7xl font-black italic tracking-tighter transition-colors ${timer <= 3 && timer > 0 ? 'text-primary animate-pulse' : 'text-white'}`}>
                    {timer}<span className="text-xl">s</span>
                  </div>
                  <button
                    disabled={isTimerActive || timer === 0}
                    onClick={startAnalysis}
                    className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 disabled:opacity-20 active:scale-95 transition-all"
                  >
                    تفعيل المؤقت
                  </button>
                </div>

                <div className="glass-dark border border-white/10 rounded-[2.5rem] p-6 flex items-center gap-4 opacity-50">
                  <RiShieldLine className="text-primary text-2xl" />
                  <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">تجنب تكرار الأسماء لضمان احتساب النقاط الاستراتيجية.</p>
                </div>
              </div>

              {/* CLUE Module */}
              <div className="lg:col-span-8">
                <div className="h-full glass-dark border border-white/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden flex flex-col justify-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem]" />
                  <div className="absolute -left-10 -bottom-10 text-[180px] text-white/[0.02] font-black italic select-none pointer-events-none">TARGET</div>

                  <div className="space-y-6 relative z-10">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">المعطيات التحليلية</span>
                    <h2 className="text-2xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">
                      {lastSelected?.Clo}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={handleRefresh}
                className="group w-20 h-20 rounded-[2.5rem] glass border border-white/10 flex items-center justify-center text-primary text-3xl hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
              >
                <RiRefreshLine className="group-hover:rotate-180 transition-transform duration-700" />
              </button>
            </div>

          </motion.div>
        ) : (
          <GameIntro
            name="بروتوكول التسلل"
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="تحليل سريع للبيانات. لديك 10 ثوانٍ لاختيار اسم فريد يتناسب مع الوصف. الدقة والسرعة هما مفتاح تجنب التسلل."
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
