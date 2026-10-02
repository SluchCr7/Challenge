"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import selectRandomObject from "@/utils/getUniqueObject";
import { RiRefreshLine, RiAddLine, RiSubtractLine, RiFocus2Line, RiTrophyLine } from "react-icons/ri";
import { AuctionContext } from "@/app/Context/Games/AuctionContext";
import GameIntro from "@/app/Components/GameIntro";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel } from 'lucide-react';

const Auction = () => {
  const [numAuction, setNumAuction] = useState(0);
  const [button, setButton] = useState("");
  const [questionMode, setQuestionMode] = useState(false);
  const [teamChose, setTeamChose] = useState("");
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [teamOneScore, setTeamOneScore] = useState(0);
  const [teamTwoScore, setTeamTwoScore] = useState(0);
  const intervalRef = useRef(null);

  const { auction } = useContext(AuctionContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("remainingObjectsAuction") : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...auction]);
  }, [auction]);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetGame = () => {
    setQuestionMode(false);
    stopTimer();
    setTime(30);
    setNumAuction(0);
    setButton("");
    selectRandomObject(auction, remainingObjects, setLastSelected, setRemainingObjects, "Auction");
  };

  const handleMinus = () => {
    const newAuction = numAuction - 1;
    setNumAuction(newAuction);
    if (time >= 1 && newAuction === 0) {
      if (teamChose === "First") {
        setTeamOneScore((prev) => prev + 1);
      } else {
        setTeamTwoScore((prev) => prev + 1);
      }
      stopTimer();
      resetGame();
    }
  };

  useEffect(() => {
    if (time < 1 && numAuction > 0) {
      if (teamChose === "First") {
        setTeamTwoScore((prev) => prev + 1);
      } else {
        setTeamOneScore((prev) => prev + 1);
      }
      stopTimer();
      resetGame();
    }
  }, [time]);

  const ScoreCard = ({ team, score, side }) => (
    <div className={`px-5 py-3 rounded-xl border card-surface text-center ${side === 'left' ? 'border-primary/30' : 'border-border'}`}>
      <span className="text-[10px] font-bold text-muted uppercase block">{team}</span>
      <span className="text-2xl font-black text-foreground">{score}</span>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 rtl space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="text-center sm:text-right space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
            <Gavel className="w-3.5 h-3.5" /> لعبة المزاد الكروي
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            تحدي <span className="text-primary">المزاد</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ScoreCard team="الفريق الأول" score={teamOneScore} side="left" />
          <div className="text-center">
            <span className="text-[10px] font-bold text-muted block">المؤقت</span>
            <div className={`text-2xl font-black font-mono ${time <= 5 && isRunning ? 'text-danger animate-pulse' : 'text-primary'}`}>
              {time}s
            </div>
          </div>
          <ScoreCard team="الفريق الثاني" score={teamTwoScore} side="right" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id || lastSelected?.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Task Card */}
            <div className="card-surface border border-border rounded-2xl p-8 sm:p-12 text-center space-y-3 shadow-xl">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">المهمة المطلوبة للمزاد</span>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground leading-relaxed">
                {lastSelected?.question}
              </h2>
            </div>

            {/* Auction Action Area */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {questionMode ? (
                  <motion.div
                    key="execution-mode"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card-surface border border-primary/30 rounded-2xl p-8 text-center space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase">
                        <RiFocus2Line className="animate-spin" />
                        <span>مرحلة التنفيذ المباشر</span>
                      </div>
                      <h3 className="text-2xl font-black text-foreground">
                        الفريق المنفّذ: {teamChose === "First" ? "الفريق الأول" : "الفريق الثاني"}
                      </h3>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      {!isRunning ? (
                        <button
                          onClick={startTimer}
                          className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-xs rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105"
                        >
                          بدء عداد الـ 30 ثانية
                        </button>
                      ) : (
                        <div className="flex items-center gap-8">
                          <button
                            onClick={handleMinus}
                            className="w-16 h-16 rounded-xl bg-primary hover:bg-primary-hover text-background flex items-center justify-center text-3xl font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
                            title="إجابة صحيحة (-1)"
                          >
                            <RiSubtractLine />
                          </button>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-muted block">المتبقي</span>
                            <div className="text-6xl font-black text-primary font-mono">{numAuction}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {(time === 0 || numAuction === 0) && (
                      <div className="pt-4 border-t border-border">
                        <button
                          onClick={resetGame}
                          className="px-6 py-2.5 rounded-xl bg-surface-elevated text-primary hover:text-foreground text-xs font-bold flex items-center gap-2 mx-auto transition-colors"
                        >
                          <span>السؤال التالي</span>
                          <RiRefreshLine />
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="bidding-mode"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-surface border border-border rounded-2xl p-8 space-y-6"
                  >
                    <div className="text-center space-y-1">
                      <h3 className="text-xl font-black text-foreground">تحديد المزايد الأعلى والقيمة</h3>
                      <p className="text-xs text-muted">من الفريق المستعد لذكر أكبر عدد؟</p>
                    </div>

                    {/* Team Selector */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setButton("First")}
                        className={`py-3.5 rounded-xl border text-xs font-black transition-all ${
                          button === "First"
                            ? "bg-primary text-background border-primary shadow-md shadow-primary/20"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        الفريق الأول
                      </button>
                      <button
                        onClick={() => setButton("Second")}
                        className={`py-3.5 rounded-xl border text-xs font-black transition-all ${
                          button === "Second"
                            ? "bg-primary text-background border-primary shadow-md shadow-primary/20"
                            : "bg-surface-elevated border-border text-muted hover:text-foreground"
                        }`}
                      >
                        الفريق الثاني
                      </button>
                    </div>

                    {/* Number Counter */}
                    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-surface-elevated border border-border mx-auto w-fit">
                      <span className="text-xs font-bold text-muted">عدد العناصر في المزاد</span>
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => setNumAuction(Math.max(0, numAuction - 1))}
                          className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-primary transition-colors"
                        >
                          <RiSubtractLine size={18} />
                        </button>
                        <div className="text-4xl font-black text-primary font-mono min-w-[50px] text-center">
                          {numAuction}
                        </div>
                        <button
                          onClick={() => setNumAuction(numAuction + 1)}
                          className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-primary transition-colors"
                        >
                          <RiAddLine size={18} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setQuestionMode(true);
                        setTeamChose(button);
                      }}
                      disabled={!button || numAuction === 0}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                    >
                      تثبيت المزاد وبدء التحدي
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="مزاد الأبطال"
            team={auction}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="زايد على الفريق المنافس بقدرتكم على استحضار الأسماء الصحيحة. الفريق صاحب العرض الأعلى يحصل على 30 ثانية لإثبات مزايدته وكسب النقطة!"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auction;