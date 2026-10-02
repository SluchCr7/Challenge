'use client'
import React, { useContext, useEffect, useState } from 'react';
import { RiRefreshLine, RiQuestionLine, RiLightbulbLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
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
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[85vh] rtl">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id || lastSelected?.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                  <RiQuestionLine className="text-sm" /> لعبة اللغز الكروي
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  تحدي <span className="text-primary">اللغز</span>
                </h1>
              </div>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                title="لغز جديد"
              >
                <RiRefreshLine size={20} />
              </button>
            </div>

            {/* Question Card */}
            <div className="card-surface border border-border rounded-2xl p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">نص اللغز</span>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground leading-relaxed">
                {lastSelected?.question}
              </h2>
            </div>

            {/* Answer Box */}
            <div className="flex flex-col items-center gap-6">
              <AnimatePresence mode="wait">
                {!showAnswer ? (
                  <motion.button
                    key="reveal-btn"
                    onClick={() => setShowAnswer(true)}
                    className="px-8 py-3.5 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-foreground font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <RiEyeLine size={18} className="text-primary" />
                    <span>عرض الإجابة النموذجية</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="answer-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-surface border border-primary/30 rounded-2xl p-8 text-center w-full max-w-md space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto">
                      <RiLightbulbLine />
                    </div>
                    <span className="text-xs font-bold text-muted uppercase">الإجابة الصحيحة</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                      {lastSelected?.Answer}
                    </h3>
                    <button
                      onClick={() => setShowAnswer(false)}
                      className="text-xs text-muted hover:text-foreground font-medium pt-2 transition-colors block mx-auto"
                    >
                      إخفاء الإجابة
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleRefresh}
                className="px-10 py-4 bg-primary hover:bg-primary-hover text-background font-black text-sm rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <RiRefreshLine size={18} />
                <span>اللغز التالي</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="لعبة اللغز"
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="اختبر ذكاءك الكروي مع باقة من الألغاز والأحاجي الكروية. فكر جيداً وحاول الوصول للإجابة الدقيقة قبل كشف الستار!"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Guess;