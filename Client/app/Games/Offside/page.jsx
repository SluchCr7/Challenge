'use client'
import { OffsideContext } from '@/app/Context/Games/OffsideContext';
import React, { useContext, useEffect, useState } from 'react';
import selectRandomObject from '@/utils/getUniqueObject';
import { RiRefreshLine, RiPlayLine, RiShieldLine } from "react-icons/ri";
import GameIntro from '@/app/Components/GameIntro';
import { motion, AnimatePresence } from 'framer-motion';
import { Target } from 'lucide-react';

const OffsidePage = () => {
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
  };

  const startAnalysis = () => {
    setTimer(10);
    setIsTimerActive(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[85vh] rtl space-y-8">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id || lastSelected?.Clo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                  <Target className="w-3.5 h-3.5" /> لعبة التسلل
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  تحدي <span className="text-primary">التسلل</span>
                </h1>
              </div>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                title="تحدي جديد"
              >
                <RiRefreshLine size={20} />
              </button>
            </div>

            {/* Grid Layout: Timer + Clue */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Timer Box */}
              <div className="md:col-span-4 card-surface border border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs font-bold text-muted">المهلة الزمنية</span>
                <div
                  className={`text-6xl font-black italic tracking-tight font-mono ${
                    timer <= 3 && timer > 0 ? 'text-danger animate-pulse' : 'text-foreground'
                  }`}
                >
                  {timer}s
                </div>
                <button
                  disabled={isTimerActive || timer === 0}
                  onClick={startAnalysis}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs rounded-xl shadow-md shadow-primary/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5"
                >
                  <RiPlayLine size={16} />
                  <span>بدء الـ 10 ثوانٍ</span>
                </button>
              </div>

              {/* Clue Box */}
              <div className="md:col-span-8 card-surface border border-border rounded-2xl p-8 sm:p-12 flex flex-col justify-center text-center space-y-3">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">المعطيات المطلوبة</span>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-relaxed">
                  {lastSelected?.Clo}
                </h2>
              </div>
            </div>

            {/* Rules Tip & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface-elevated border border-border">
              <div className="flex items-center gap-3">
                <RiShieldLine className="text-primary text-xl shrink-0" />
                <p className="text-xs text-muted leading-relaxed">
                  أذكر اسماً فريداً ينطبق عليه الشرط قبل انتهاء الـ 10 ثوانٍ دون تكرار أي إجابة سابقة.
                </p>
              </div>
              <button
                onClick={handleRefresh}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-background font-black text-xs shrink-0 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
              >
                <RiRefreshLine size={16} />
                <span>التحدي التالي</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="تحدي التسلل"
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="سرعة بديهة فائقة: أمامك 10 ثوانٍ فقط لذكر اسم لاعب أو نادي يتوافق مع الشرط المطلوب لتفادي الوقوع في مصيدة التسلل!"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffsidePage;
