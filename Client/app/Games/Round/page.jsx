'use client'
import TeamPoints from '@/app/Components/TeamPoints';
import { RoundContext } from '@/app/Context/Games/RoundContext';
import React, { useContext, useState, useEffect } from 'react';
import { RiRefreshLine, RiLightbulbLine, RiArrowDownSLine, RiArrowUpSLine, RiExchangeLine } from "react-icons/ri";
import selectRandomObject from '@/utils/getUniqueObject';
import { motion, AnimatePresence } from 'framer-motion';

const Round = () => {
  const [scoreTeamOne, setScoreTeamOne] = useState(0);
  const [scoreTeamTwo, setScoreTeamTwo] = useState(0);
  const [circlesUserOne, setCirclesUserOne] = useState([false, false, false]);
  const [circlesUserTwo, setCirclesUserTwo] = useState([false, false, false]);
  const { data } = useContext(RoundContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showExamples, setShowExamples] = useState(false);
  const [passTeamOne, setPassTeamOne] = useState(false);
  const [passTeamTwo, setPassTeamTwo] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsRound') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  const teams = [
    { id: 1, name: "الفريق الأول", score: scoreTeamOne, setter: setScoreTeamOne },
    { id: 2, name: "الفريق الثاني", score: scoreTeamTwo, setter: setScoreTeamTwo },
  ];

  const handleRefresh = () => {
    setCirclesUserOne([false, false, false]);
    setCirclesUserTwo([false, false, false]);
    setPassTeamOne(false);
    setPassTeamTwo(false);
    setShowExamples(false);
  };

  useEffect(() => {
    if (circlesUserOne.every((state) => state === true)) {
      setScoreTeamTwo(scoreTeamTwo + 1);
      handleRefresh();
      selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round");
    }
    if (circlesUserTwo.every((state) => state === true)) {
      setScoreTeamOne(scoreTeamOne + 1);
      handleRefresh();
      selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round");
    }
  }, [circlesUserOne, circlesUserTwo]);

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 rtl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="text-center sm:text-right space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
            <RiExchangeLine className="text-sm" /> لعبة تبادل الأدوار
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            تحدي <span className="text-primary">الدور</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl card-surface border border-border text-center">
            <span className="text-[10px] font-bold text-muted block">الفريق الأول</span>
            <span className="text-xl font-black text-primary">{scoreTeamOne}</span>
          </div>
          <span className="text-muted font-bold">:</span>
          <div className="px-4 py-2 rounded-xl card-surface border border-border text-center">
            <span className="text-[10px] font-bold text-muted block">الفريق الثاني</span>
            <span className="text-xl font-black text-foreground">{scoreTeamTwo}</span>
          </div>
        </div>
      </div>

      {lastSelected ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 w-full">
          {/* Main Question Card */}
          <div className="card-surface border border-border rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block">موضوع الدور</span>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground leading-relaxed">
              {lastSelected?.question}
            </h2>

            {/* Toggle Examples Button */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="px-6 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-xs font-bold text-muted hover:text-foreground flex items-center gap-2 transition-all"
              >
                <RiLightbulbLine className="text-primary" />
                <span>{showExamples ? 'إخفاء الأمثلة' : 'عرض الأمثلة المقترحة'}</span>
                {showExamples ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </button>

              <button
                onClick={() => {
                  handleRefresh();
                  selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round");
                }}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-background text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-primary/20"
              >
                <RiRefreshLine />
                <span>سؤال جديد</span>
              </button>
            </div>

            {/* Examples Grid */}
            <AnimatePresence>
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-right"
                >
                  {lastSelected?.examples?.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface-elevated border border-border text-xs font-bold text-foreground"
                    >
                      {ex}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Teams Interaction Sector */}
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <TeamPoints team={teams[0]} pass={passTeamOne} setPass={setPassTeamOne} circles={circlesUserOne} setCircles={setCirclesUserOne} />
              <TeamPoints team={teams[1]} pass={passTeamTwo} setPass={setPassTeamTwo} circles={circlesUserTwo} setCircles={setCirclesUserTwo} />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="card-surface border border-border rounded-2xl p-12 text-center space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mx-auto">
            <RiExchangeLine />
          </div>
          <h2 className="text-2xl font-black text-foreground">جاهزون لبدء تحدي الدور؟</h2>
          <p className="text-muted text-xs leading-relaxed">
            يتبادل الفريقان ذكر الإجابات الصحيحة بالتناوب. من يتعثر 3 مرات يخسر الجولة وتُمنح النقطة للمنافس!
          </p>
          <button
            onClick={() => selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round")}
            className="px-10 py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            بدء التحدي
          </button>
        </div>
      )}
    </div>
  );
};

export default Round;