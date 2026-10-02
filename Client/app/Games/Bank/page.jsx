'use client'
import React, { useContext, useEffect, useRef, useState } from "react";
import { BankContext } from "@/app/Context/Games/BankContext";
import { RiCheckLine, RiCloseLine, RiInformationLine, RiBankLine, RiFlashlightLine, RiRefreshLine, RiPauseLine, RiPlayLine } from "react-icons/ri";
import selectRandomObject from "@/utils/getUniqueObject";
import GameIntro from "@/app/Components/GameIntro";
import { motion, AnimatePresence } from "framer-motion";

const Bank = () => {
  const { data } = useContext(BankContext);
  const [turn, setTurn] = useState("First");
  const [scoreTeamOne, setScoreTeamOne] = useState(0);
  const [scoreTeamTwo, setScoreTeamTwo] = useState(0);
  const [score, setScore] = useState(0);
  const [roundNum, setRoundNum] = useState(1);
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const intervalRef = useRef(null);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRoundAlert, setShowRoundAlert] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsBank') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  const rounds = [1, 2, 3, 4, 5, 6];

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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(120);
  };

  const handleNext = () => {
    if (questionIndex >= 12) {
      setShowRoundAlert(true);
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const proceedToNextRound = () => {
    setShowRoundAlert(false);
    if (roundNum >= 6) {
      stopTimer();
      setShowFinalResult(true);
      return;
    }
    setTurn((prev) => (prev === "First" ? "Second" : "First"));
    setScore(0);
    setTime(120);
    setQuestionIndex(1);
    setRoundNum((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const handleCorrect = () => {
    setScore((prev) => (prev === 0 ? 1 : prev * 2));
    handleNext();
  };

  const handleWrong = () => {
    setScore(0);
    handleNext();
  };

  const handleBank = () => {
    if (turn === "First") {
      setScoreTeamOne((prev) => prev + score);
    } else {
      setScoreTeamTwo((prev) => prev + score);
    }
    setScore(0);
  };

  useEffect(() => {
    if (time === 0) setShowRoundAlert(true);
  }, [time]);

  const ScoreBoard = ({ team, scoreValue, isActive, side }) => (
    <div
      className={`card-surface p-5 rounded-2xl border transition-all duration-300 ${
        isActive
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-border opacity-70"
      }`}
    >
      <div className={`flex flex-col ${side === "left" ? "items-start text-left" : "items-end text-right"}`}>
        <div className="flex items-center gap-2">
          {isActive && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
          <span className="text-xs font-bold text-muted uppercase">الفريق {team}</span>
        </div>
        <h4 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mt-1">{scoreValue}</h4>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-6 space-y-8 rtl">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
            <RiBankLine className="text-sm" /> لعبة البنك التكتيكي
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            تحدي <span className="text-primary">البنك</span>
          </h1>
        </div>
        <button
          onClick={() => setShowInstructions(true)}
          className="p-3 rounded-xl card-surface border border-border text-muted hover:text-primary transition-colors"
          title="تعليمات اللعبة"
        >
          <RiInformationLine size={22} />
        </button>
      </div>

      <AnimatePresence>
        {lastSelected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {/* Score & Rounds Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <ScoreBoard team="الأول" scoreValue={scoreTeamOne} isActive={turn === "First"} side="right" />

              <div className="flex flex-col items-center gap-3">
                <div className="flex bg-surface-elevated p-1.5 rounded-full border border-border">
                  {rounds.map((r) => (
                    <div
                      key={r}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        roundNum === r ? "bg-primary text-background font-black shadow-md shadow-primary/20" : "text-muted"
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-muted">السؤال النشط</span>
                  <h3 className="text-3xl font-black text-foreground">
                    {questionIndex} <span className="text-primary text-lg">/ 12</span>
                  </h3>
                </div>
              </div>

              <ScoreBoard team="الثاني" scoreValue={scoreTeamTwo} isActive={turn === "Second"} side="left" />
            </div>

            {/* Core Game Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar: Chronometer & Floating Bank */}
              <div className="lg:col-span-4 space-y-4">
                {/* Timer Card */}
                <div className="card-surface border border-border rounded-2xl p-6 text-center space-y-4">
                  <span className="text-xs font-bold text-muted block">الوقت المتبقي</span>
                  <div
                    className={`text-5xl font-black italic tracking-tight font-mono ${
                      time <= 15 ? "text-danger animate-pulse" : "text-foreground"
                    }`}
                  >
                    {time}s
                  </div>
                  <div className="flex gap-2">
                    {!isRunning ? (
                      <button
                        onClick={startTimer}
                        className="flex-1 py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs rounded-xl shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <RiPlayLine size={16} /> ابدأ
                      </button>
                    ) : (
                      <button
                        onClick={stopTimer}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-background font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <RiPauseLine size={16} /> إيقاف
                      </button>
                    )}
                    <button
                      onClick={resetTimer}
                      className="px-4 py-3 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-muted hover:text-foreground text-xs font-bold transition-all"
                    >
                      <RiRefreshLine size={16} />
                    </button>
                  </div>
                </div>

                {/* Floating Bank Score Card */}
                <div className="card-surface border border-border rounded-2xl p-6 text-center space-y-4">
                  <RiBankLine className="text-primary text-3xl mx-auto" />
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-muted">الرصيد المعلق</span>
                    <h4 className="text-4xl font-black text-primary">{score}</h4>
                  </div>
                  <button
                    disabled={score === 0}
                    onClick={handleBank}
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-xs rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>بنك! (تأمين النقاط)</span>
                  </button>
                </div>
              </div>

              {/* Main Area: Question & Controls */}
              <div className="lg:col-span-8 space-y-6">
                <div className="card-surface border border-border rounded-2xl p-8 sm:p-12 min-h-[260px] flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lastSelected?.question}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-relaxed max-w-2xl">
                        {lastSelected?.question}
                      </h2>
                      {lastSelected?.Answer && (
                        <div className="inline-block px-4 py-1.5 rounded-full bg-surface-elevated border border-border text-xs font-bold text-muted">
                          الإجابة النموذجية: <span className="text-primary font-black">{lastSelected.Answer}</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Answer Feedback Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleCorrect}
                    className="py-5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <RiCheckLine size={22} />
                    <span>إجابة صحيحة (+مضاعفة)</span>
                  </button>
                  <button
                    onClick={handleWrong}
                    className="py-5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <RiCloseLine size={22} />
                    <span>إجابة خاطئة (تصفير)</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name={"لعبة البنك"}
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text={"12 سؤالاً في 120 ثانية! أجب بشكل صحيح لمضاعفة نقاطك، وقل 'بنك' في الوقت المناسب لتأمين رصيدك قبل أن تخسر كل شيء بإجابة خاطئة."}
          />
        )}
      </AnimatePresence>

      {/* Round Complete Modal */}
      <AnimatePresence>
        {showRoundAlert && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card-surface border border-border p-8 rounded-2xl max-w-md w-full text-center space-y-6"
            >
              <h3 className="text-2xl font-black text-foreground">
                {roundNum >= 6 ? "نهاية المباراة!" : `انتهاء الجولة ${roundNum}`}
              </h3>
              <p className="text-muted text-sm">
                {roundNum >= 6
                  ? `النتيجة النهائية: الفريق الأول (${scoreTeamOne}) - الفريق الثاني (${scoreTeamTwo})`
                  : "استعدوا للانتقال للجولة التالية وتبديل الأدوار بين الفريقين."}
              </p>
              <button
                onClick={proceedToNextRound}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-sm rounded-xl transition-all"
              >
                {roundNum >= 6 ? "مشاهدة النتائج" : "بدء الجولة التالية"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bank;
