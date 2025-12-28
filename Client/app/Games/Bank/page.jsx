'use client'
import React, { useContext, useEffect, useRef, useState } from "react";
import { BankContext } from "@/app/Context/Games/BankContext";
import { RiCheckLine, RiCloseLine, RiArrowRightSLine, RiInformationLine, RiTimerLine, RiBankLine, RiTrophyLine, RiSkullLine, RiFlashlightLine, RiArrowRightLine } from "react-icons/ri";
import selectRandomObject from "@/utils/getUniqueObject";
import GameIntro from "@/app/Components/GameIntro";
import { motion, AnimatePresence } from "framer-motion";

const Bank = () => {
  const { data } = useContext(BankContext);
  const [turn, setTurn] = useState("First");
  const [ScoreTeamOne, setScoreTeamOne] = useState(0);
  const [ScoreTeamTwo, setScoreTeamTwo] = useState(0);
  const [score, setScore] = useState(0);
  const [roundNum, setRoundNum] = useState(1);
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [Question, setQuestion] = useState(1);
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

  const rounds = ["1", "2", "3", "4", "5", "6"];

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

  const handleNext = () => {
    if (Question === 12) {
      setShowRoundAlert(true);
      return;
    }
    setQuestion((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const proceedToNextRound = () => {
    setShowRoundAlert(false);
    if (roundNum === 6) {
      stopTimer();
      setShowFinalResult(true);
      return;
    }
    setTurn((prev) => (prev === "First" ? "Second" : "First"));
    setScore(0);
    setTime(120);
    setQuestion(1);
    setRoundNum((prev) => prev + 1);
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
  };

  const handleCorrect = () => {
    setScore((prev) => prev === 0 ? 1 : prev * 2);
    handleNext();
  };

  const handleWrong = () => {
    setScore(0);
    handleNext();
  };

  const handleBank = () => {
    if (turn === "First") setScoreTeamOne((prev) => prev + score);
    else setScoreTeamTwo((prev) => prev + score);
    setScore(0);
  };

  useEffect(() => {
    if (time === 0) setShowRoundAlert(true);
  }, [time]);

  const ScoreBoard = ({ team, score, isActive, side }) => (
    <div className={`relative px-8 py-6 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${isActive ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(225,6,0,0.2)] scale-105' : 'glass border-white/10 opacity-50'
      }`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      <div className={`flex flex-col ${side === 'left' ? 'items-start text-left' : 'items-end text-right'}`}>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Squad {team}</span>
        <h4 className="text-4xl font-black italic text-white tracking-tighter leading-none">{score}</h4>
        {isActive && (
          <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-0.5 bg-primary mt-2" />
        )}
      </div>
      <div className={`absolute -bottom-4 ${side === 'left' ? '-left-4' : '-right-4'} text-6xl opacity-[0.03] italic font-black select-none pointer-events-none`}>TEAM</div>
    </div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 space-y-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
            Tactical <br /><span className="text-primary">Bank</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Season 04 • High Complexity</p>
        </div>
        <button
          onClick={() => setShowInstructions(true)}
          className="w-16 h-16 rounded-[2rem] glass border border-white/10 flex items-center justify-center text-primary text-3xl hover:bg-primary/10 transition-all shadow-2xl"
        >
          <RiInformationLine />
        </button>
      </div>

      <AnimatePresence>
        {lastSelected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">

            {/* Score Systems */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <ScoreBoard team="One" score={ScoreTeamOne} isActive={turn === "First"} side="left" />
              <div className="flex flex-col items-center gap-6">
                <div className="flex bg-carbon-light p-2 rounded-full border border-white/5 shadow-2xl">
                  {rounds.map((r) => (
                    <div
                      key={r}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${roundNum.toString() === r ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/20'
                        }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Active Question</span>
                  <h3 className="text-5xl font-black italic text-white tracking-tighter">{Question}<span className="text-primary text-xl">/12</span></h3>
                </div>
              </div>
              <ScoreBoard team="Two" score={ScoreTeamTwo} isActive={turn === "Second"} side="right" />
            </div>

            {/* Timer & Core Game */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Controls Sidebar */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-8">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Chronometer</span>
                    <div className={`text-6xl font-black italic tracking-tighter transition-colors ${time < 20 ? 'text-primary animate-pulse' : 'text-white'}`}>
                      {time}<span className="text-xl">s</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {!isRunning ? (
                      <button onClick={startTimer} className="w-full py-5 bg-green-500 hover:bg-green-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <RiFlashlightLine size={18} /> Initiate
                      </button>
                    ) : (
                      <button onClick={stopTimer} className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                        Pause Link
                      </button>
                    )}
                    <button onClick={() => setTime(120)} className="w-full py-5 glass border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                      Recalibrate
                    </button>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: score > 0 ? [1, 1.05, 1] : 1 }}
                  className="glass-dark border border-primary/30 rounded-[2.5rem] p-8 text-center space-y-4"
                >
                  <RiBankLine className="text-primary text-4xl mx-auto" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Floating Assets</span>
                    <h4 className="text-4xl font-black italic text-primary tracking-tighter">{score}</h4>
                  </div>
                  <button
                    disabled={score === 0}
                    onClick={handleBank}
                    className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary hover:text-white transition-all disabled:opacity-20 disabled:grayscale active:scale-95 flex items-center justify-center gap-2"
                  >
                    Secure Funds
                  </button>
                </motion.div>
              </div>

              {/* Question Area */}
              <div className="lg:col-span-9 space-y-12">
                <div className="relative glass-dark border border-white/10 rounded-[4rem] p-16 overflow-hidden min-h-[400px] flex flex-col justify-center items-center text-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-transparent opacity-30" />
                  <div className="absolute -right-20 -bottom-20 text-[200px] text-white/[0.02] font-black italic select-none -rotate-12 pointer-events-none">BANK</div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lastSelected?.question}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8 relative z-10"
                    >
                      <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight max-w-3xl">
                        {lastSelected?.question}
                      </h2>
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl inline-block">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Target Frequency: {lastSelected?.Answer}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-12">
                  <button onClick={handleCorrect} className="group relative py-8 bg-green-500/10 hover:bg-green-500 rounded-[2.5rem] border-2 border-green-500/30 hover:border-green-500 transition-all duration-500 text-green-500 hover:text-white overflow-hidden active:scale-95 shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                      <RiCheckLine size={80} />
                    </div>
                    <span className="relative z-10 text-xl font-black italic uppercase tracking-tighter">Verified Entry</span>
                  </button>
                  <button onClick={handleWrong} className="group relative py-8 bg-red-500/10 hover:bg-red-500 rounded-[2.5rem] border-2 border-red-500/30 hover:border-red-500 transition-all duration-500 text-red-500 hover:text-white overflow-hidden active:scale-95 shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                      <RiCloseLine size={80} />
                    </div>
                    <span className="relative z-10 text-xl font-black italic uppercase tracking-tighter">Corrupted Exit</span>
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          <GameIntro
            name={"Bank Arena"}
            team={data}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text={"12 questions. 120 seconds. Risk it all or secure your bank. Welcome to the Tactical Arena."}
          />
        )}
      </AnimatePresence>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInstructions(false)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative glass-dark border border-white/10 rounded-[3rem] p-12 max-w-xl text-center shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <RiBankLine className="text-primary text-6xl mx-auto mb-6" />
              <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-4">Protocol Intelligence</h2>
              <div className="space-y-4 text-white/60 text-sm font-medium leading-relaxed uppercase tracking-widest text-center">
                <p>12 High-Speed questions per squad.</p>
                <p>Score doubles with every verified entry.</p>
                <p>Any corruption (Wrong Answer) resets total to zero.</p>
                <p>A squad can BANK the current floating total at any moment.</p>
              </div>
              <button onClick={() => setShowInstructions(false)} className="mt-8 px-12 py-4 bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-primary-hover transition-all">Understood</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Round Result Alert */}
      <AnimatePresence>
        {showRoundAlert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="relative glass-dark border border-white/10 rounded-[3rem] p-12 w-full max-w-lg text-center shadow-2xl">
              <RiTimerLine className="text-primary text-6xl mx-auto mb-6 animate-pulse" />
              <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-2">Round Terminated</h3>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-8">Deploying Squad Rotation Protocol</p>
              <div className="flex gap-4">
                <button onClick={proceedToNextRound} className="flex-1 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-primary-hover transition-all flex items-center justify-center gap-2">
                  Next Cycle <RiArrowRightLine />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Final Result Modal */}
      <AnimatePresence>
        {showFinalResult && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative glass-dark border border-white/10 rounded-[5rem] p-20 w-full max-w-4xl text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[100px]" />
              <RiTrophyLine className="text-primary text-9xl mx-auto mb-8 animate-bounce" />
              <h2 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-12">Victory <span className="text-primary">Secured</span></h2>

              <div className="grid grid-cols-2 gap-12 mb-16">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Squad One Resources</span>
                  <p className="text-6xl font-black italic text-white tracking-tighter">{ScoreTeamOne}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Squad Two Resources</span>
                  <p className="text-6xl font-black italic text-white tracking-tighter">{ScoreTeamTwo}</p>
                </div>
              </div>

              <div className="p-8 glass bg-white/5 border border-white/10 rounded-[3rem] mb-12">
                <span className="text-3xl font-black italic text-primary uppercase tracking-tighter">
                  {ScoreTeamOne > ScoreTeamTwo ? "SQUAD ONE DOMINATION" : ScoreTeamTwo > ScoreTeamOne ? "SQUAD TWO DOMINATION" : "TACTICAL STALEMATE"}
                </span>
              </div>

              <button
                onClick={() => {
                  setShowFinalResult(false);
                  setScoreTeamOne(0);
                  setScoreTeamTwo(0);
                  setRoundNum(1);
                  setTurn("First");
                  setScore(0);
                  setTime(120);
                  setQuestion(1);
                  selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Bank");
                }}
                className="px-16 py-6 bg-white text-black font-black text-sm uppercase tracking-[0.3em] rounded-[2rem] hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95 shadow-2xl shadow-white/5"
              >
                Re-Initiate Campaign
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bank;
