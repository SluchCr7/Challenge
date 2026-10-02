'use client'
import React, { useContext, useEffect, useState } from 'react';
import { RiCloseLine, RiRefreshLine, RiEyeLine, RiFlagLine, RiCheckLine, RiUserSearchLine, RiInformationLine } from "react-icons/ri";
import { PlayerContext } from '@/app/Context/Games/PlayersContext';
import selectRandomObject from '@/utils/getUniqueObject';
import { motion, AnimatePresence } from 'framer-motion';
import GameIntro from '@/app/Components/GameIntro';
import Loader from '@/app/Components/Loader';

const WhoPlayer = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const { player } = useContext(PlayerContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPlayer') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...player]);
  }, [player]);

  const handleNextChallenge = () => {
    selectRandomObject(player, remainingObjects, setLastSelected, setRemainingObjects, 'Player');
    setShowAnswer(false);
    setRevealedCluesCount(1);
  };

  if (!player || player.length === 0) {
    return <Loader message="جاري تجهيز بطاقات اللاعبين..." />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6 min-h-[85vh] flex flex-col items-center justify-center rtl">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="text-center sm:text-right space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                  <RiUserSearchLine className="text-sm" /> من هو اللاعب؟
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  تحدي <span className="text-primary">الهوية</span>
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted">
                  التلميحات: <span className="text-primary font-black">{Math.min(revealedCluesCount, lastSelected?.Clos?.length || 0)}</span> / {lastSelected?.Clos?.length || 0}
                </span>
                <button
                  onClick={handleNextChallenge}
                  className="p-2.5 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                  title="تغيير اللاعب"
                >
                  <RiRefreshLine size={20} />
                </button>
              </div>
            </div>

            {/* Clues List */}
            <div className="space-y-3">
              {lastSelected?.Clos?.map((clo, index) => {
                const isRevealed = index < revealedCluesCount;
                return (
                  <motion.div
                    key={`${lastSelected._id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`card-surface border rounded-xl p-5 flex items-start gap-4 transition-all ${
                      isRevealed
                        ? 'border-border bg-surface'
                        : 'border-border/40 opacity-40 select-none'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      isRevealed ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-surface-elevated text-muted'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      {isRevealed ? (
                        <p className="text-foreground font-semibold text-base sm:text-lg leading-relaxed">
                          {clo}
                        </p>
                      ) : (
                        <p className="text-muted font-medium text-sm italic">
                          تلميح مشفر — اضغط على كشف التلميح التالي لإظهاره
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Control Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {revealedCluesCount < (lastSelected?.Clos?.length || 0) && (
                <button
                  onClick={() => setRevealedCluesCount(prev => prev + 1)}
                  className="px-6 py-3 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-foreground font-bold text-xs uppercase tracking-wider transition-all"
                >
                  كشف التلميح التالي (+1)
                </button>
              )}

              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <RiEyeLine size={18} />
                <span>كشف إجابة اللاعب</span>
              </button>

              <button
                onClick={handleNextChallenge}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-muted hover:text-foreground font-bold text-xs transition-all"
              >
                تخطي اللاعب
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="من هو اللاعب؟"
            team={player}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="تحدي المسيرة: استمع إلى تلميحات المسيرة الكروية واحداً تلو الآخر وحاول معرفة اللاعب المستهدف بأقل عدد من التلميحات!"
          />
        )}
      </AnimatePresence>

      {/* Answer Modal */}
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
            onClick={() => setShowAnswer(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-surface border border-border p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-lg text-center space-y-6 relative"
            >
              <button
                onClick={() => setShowAnswer(false)}
                className="absolute top-4 left-4 p-2 rounded-lg bg-surface-elevated hover:bg-surface text-muted hover:text-foreground transition-colors"
              >
                <RiCloseLine size={20} />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-3xl mx-auto">
                <RiCheckLine />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-muted uppercase tracking-widest">اللاعب المستهدف</span>
                <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
                  {lastSelected?.Answer}
                </h2>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-background font-black text-sm rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                >
                  التحدي التالي
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhoPlayer;