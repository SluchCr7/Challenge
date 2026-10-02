'use client'
import selectRandomObject from '@/utils/getUniqueObject';
import { RiRefreshLine, RiShieldKeyholeLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiAddLine, RiSubtractLine, RiTrophyLine } from "react-icons/ri";
import React, { useContext, useEffect, useState } from 'react';
import { PassContext } from '@/app/Context/Games/PassContext';
import GameIntro from '@/app/Components/GameIntro';
import Loader from '@/app/Components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const Password = () => {
  const { pass } = useContext(PassContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [isRevealed, setIsRevealed] = useState(true);
  const [clueCount, setClueCount] = useState(0);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPass') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...pass]);
  }, [pass]);

  const handleNextTarget = () => {
    selectRandomObject(pass, remainingObjects, setLastSelected, setRemainingObjects, "Pass");
    setClueCount(0);
    setIsRevealed(true);
  };

  if (!pass || pass.length === 0) {
    return <Loader message="جاري تحميل كلمات السر..." />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[85vh] relative rtl">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id || lastSelected?.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-8"
          >
            {/* Top Bar: Title & Scores */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="text-center sm:text-right space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary tracking-wide">
                  <RiLockPasswordLine className="text-sm" /> لعبة كلمة السر
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  الاسم <span className="text-primary">السري</span>
                </h1>
              </div>

              {/* Team Scores */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl card-surface border border-border">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-muted uppercase block">الفريق الأول</span>
                    <span className="text-xl font-black text-primary leading-none">{teamOneScore}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setTeamOneScore(prev => prev + 1)}
                      className="w-5 h-5 rounded bg-primary/20 hover:bg-primary text-primary hover:text-background flex items-center justify-center text-xs font-black transition-colors"
                    >
                      <RiAddLine />
                    </button>
                    <button
                      onClick={() => setTeamOneScore(prev => Math.max(0, prev - 1))}
                      className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-muted flex items-center justify-center text-xs font-black transition-colors"
                    >
                      <RiSubtractLine />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl card-surface border border-border">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-muted uppercase block">الفريق الثاني</span>
                    <span className="text-xl font-black text-foreground leading-none">{teamTwoScore}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setTeamTwoScore(prev => prev + 1)}
                      className="w-5 h-5 rounded bg-primary/20 hover:bg-primary text-primary hover:text-background flex items-center justify-center text-xs font-black transition-colors"
                    >
                      <RiAddLine />
                    </button>
                    <button
                      onClick={() => setTeamTwoScore(prev => Math.max(0, prev - 1))}
                      className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-muted flex items-center justify-center text-xs font-black transition-colors"
                    >
                      <RiSubtractLine />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Secret Dossier Main Card */}
            <div className="card-surface border border-border rounded-2xl p-8 sm:p-14 relative overflow-hidden text-center shadow-xl">
              <div className="space-y-6 relative z-10 flex flex-col items-center">
                {/* Security Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-elevated border border-border text-xs font-bold text-muted">
                  <RiShieldKeyholeLine className="text-primary" />
                  <span>كلمة سر مشفرة للمقدم فقط</span>
                </div>

                {/* Secret Player Name Display */}
                <div className="py-6 w-full flex flex-col items-center justify-center min-h-[160px]">
                  {isRevealed ? (
                    <motion.h2
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight"
                    >
                      {lastSelected?.name}
                    </motion.h2>
                  ) : (
                    <div className="flex items-center gap-3 py-6 px-10 rounded-2xl bg-surface-elevated border border-dashed border-border text-muted">
                      <RiLockPasswordLine className="text-2xl text-primary" />
                      <span className="text-lg font-bold">الاسم مخفي (اضغط كشف)</span>
                    </div>
                  )}
                </div>

                {/* Clue Counter & Reveal Controls */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border w-full max-w-md">
                  <button
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="px-5 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-xs font-bold text-foreground flex items-center gap-2 transition-all active:scale-95"
                  >
                    {isRevealed ? <RiEyeOffLine className="text-base text-primary" /> : <RiEyeLine className="text-base text-primary" />}
                    <span>{isRevealed ? "إخفاء الاسم" : "كشف الاسم"}</span>
                  </button>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-elevated border border-border">
                    <span className="text-xs font-bold text-muted">عدد التلميحات:</span>
                    <span className="text-sm font-black text-primary min-w-[20px] text-center">{clueCount}</span>
                    <button
                      onClick={() => setClueCount(prev => prev + 1)}
                      className="w-6 h-6 rounded bg-primary/10 hover:bg-primary hover:text-background text-primary flex items-center justify-center text-xs font-bold transition-colors ml-1"
                      title="إضافة تلميح"
                    >
                      +
                    </button>
                    {clueCount > 0 && (
                      <button
                        onClick={() => setClueCount(prev => Math.max(0, prev - 1))}
                        className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-muted flex items-center justify-center text-xs font-bold transition-colors"
                        title="إنقاص تلميح"
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>

                {/* Next Target Action */}
                <div className="pt-6 w-full flex justify-center">
                  <button
                    onClick={handleNextTarget}
                    className="px-10 py-4 bg-primary hover:bg-primary-hover text-background font-black text-sm rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                  >
                    <RiRefreshLine size={18} />
                    <span>الاسم التالي</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="p-4 rounded-xl bg-surface-elevated/50 border border-border text-center text-xs text-muted">
              💡 <span className="font-bold text-foreground">قاعدة اللعبة:</span> يُسمح للمتسابق بذكر كلمة واحدة فقط كتلميح لزميله في كل محاولة دون استخدام أي أجزاء من الاسم.
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name={"كلمة السر"}
            team={pass}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="تحدي كلمة السر: ساعد زميلك على تخمين اللاعب المستهدف باستخدام كلمة تلميح واحدة فقط في كل دور. كلما قلت التلميحات زادت براعتكم!"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Password;
