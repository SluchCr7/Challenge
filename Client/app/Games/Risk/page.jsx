"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiTimerLine,
  RiPlayFill,
  RiPauseFill,
  RiRestartLine,
  RiTrophyLine,
  RiTeamLine,
  RiFlashlightLine,
  RiAlertLine
} from "react-icons/ri";
import { RiskContext } from "@/app/Context/Games/RiskContext";
import getRandomObjects from "@/utils/getRandomObjects";
import { CategoriesGrid } from "@/app/Components/RiskCategories";
import Loader from "@/app/Components/Loader";
import { motion, AnimatePresence } from "framer-motion";

const Risk = () => {
  const [show, setShow] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [qategory, setQategory] = useState({ question: null, answer: null, value: 0 });
  const [randomRiskCategories, setRandomRiskCategories] = useState([]);
  const [valueTeamOne, setValueTeamOne] = useState(0);
  const [valueTeamTwo, setValueTeamTwo] = useState(0);
  const [turn, setTurn] = useState("First");
  const [values, setValues] = useState([]);
  const [randomDouble, setRandomDouble] = useState(0);
  const { risk, loading, error, fetchRisk } = useContext(RiskContext);
  const Numbers = [5, 10, 20, 40];
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const randomNumber = () => {
    const randomNum = Math.floor(Math.random() * 16) + 1;
    setRandomDouble(randomNum);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const randomData = () => {
    const random = getRandomObjects(risk);
    if (Array.isArray(random) && random.length > 0) {
      setRandomRiskCategories(random);
      randomNumber();
      setValues([]);
      setValueTeamOne(0);
      setValueTeamTwo(0);
      setTurn("First");
      setTime(0);
      setIsRunning(true);
    }
  };

  const handleStartSession = () => {
    const random = getRandomObjects(risk);
    if (Array.isArray(random) && random.length > 0) {
      setRandomRiskCategories(random);
      setShow(true);
      randomNumber();
      setValues([]);
      setValueTeamOne(0);
      setValueTeamTwo(0);
      setTurn("First");
      setTime(0);
      setIsRunning(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[85vh] py-10 px-4 text-white relative max-w-7xl mx-auto">
      {/* Floating Info Toggle */}
      <div className="fixed top-32 right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-primary text-2xl shadow-2xl hover:bg-white/5 transition-all"
        >
          <RiInformationLine />
        </motion.button>
      </div>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="fixed top-48 right-8 bg-carbon-dark border border-white/10 p-8 rounded-[2.5rem] shadow-2xl w-[320px] z-[120] space-y-4"
          >
            <h4 className="text-white font-black italic uppercase tracking-tighter flex items-center gap-2">
              <RiFlashlightLine className="text-primary" /> Arena Protocol
            </h4>
            <ul className="space-y-3 text-xs font-medium text-white/50">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Highlighted card = 2x Points
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Correct Answer = Full Points
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Wrong Answer = 0 Points
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Manual overrides available below
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* active Question Modal */}
      <AnimatePresence>
        {qategory.question && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[2000] p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="glass-dark border border-white/10 p-12 rounded-[4rem] shadow-2xl w-full max-w-3xl text-center space-y-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em]">
                  Challenge Value: {qategory.value} Points
                </div>
                <h3 className="text-3xl md:text-5xl font-black italic text-white tracking-tighter leading-tight uppercase">
                  {qategory.question}
                </h3>
              </div>

              {/* Reveal Hint/Answer if needed */}
              <div className="p-8 glass bg-white/5 rounded-[2rem] border border-white/5 group">
                <p className="text-white filter blur-md group-hover:blur-none transition-all duration-500 font-bold text-xl uppercase tracking-widest italic">
                  {qategory.answer}
                </p>
                <span className="block mt-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Hover to reveal answer</span>
              </div>

              <div className="flex justify-center gap-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setTurn(turn === "First" ? "Second" : "First");
                    const val = qategory.value;
                    setQategory({ question: null, answer: null, value: 0 });
                    setValueTeamOne(turn === "First" ? valueTeamOne + val : valueTeamOne);
                    setValueTeamTwo(turn === "Second" ? valueTeamTwo + val : valueTeamTwo);
                  }}
                  className="w-20 h-20 flex items-center justify-center bg-green-500 text-white rounded-3xl shadow-xl shadow-green-500/20 hover:bg-green-600 transition-colors"
                >
                  <RiCheckLine size={32} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setQategory({ question: null, answer: null, value: 0 });
                    setTurn(turn === "First" ? "Second" : "First");
                  }}
                  className="w-20 h-20 flex items-center justify-center bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-colors"
                >
                  <RiCloseLine size={32} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        {loading ? (
          <Loader message="Loading Arena..." />
        ) : error ? (
          <div className="w-full flex justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark border border-primary/20 p-12 rounded-[3rem] text-center space-y-6 max-w-lg w-full shadow-2xl"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl border border-primary/20">
                <RiAlertLine />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                  Unable to load arena data
                </h2>
                <p className="text-white/40 text-xs font-medium">
                  {error}
                </p>
              </div>
              <button
                onClick={fetchRisk}
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-black text-xs rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <RiRestartLine size={18} /> Retry
              </button>
            </motion.div>
          </div>
        ) : risk.length < 4 ? (
          <div className="w-full flex justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark border border-white/10 p-12 rounded-[3rem] text-center space-y-6 max-w-lg w-full shadow-2xl"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center text-white/40 text-4xl border border-white/10">
                <RiInformationLine />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                  No categories available
                </h2>
                <p className="text-white/40 text-xs font-medium">
                  At least 4 categories are required to enter the arena.
                </p>
              </div>
              <button
                onClick={fetchRisk}
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-black text-xs rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <RiRestartLine size={18} /> Reload Categories
              </button>
            </motion.div>
          </div>
        ) : show ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Game Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
              {/* Timer & Controls */}
              <div className="glass-dark border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center gap-4 shadow-lg">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Match Clock</span>
                  <div className="text-4xl font-black italic text-white tracking-tight">
                    {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
                  </div>
                </div>

                <div className="flex gap-2.5 w-full">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 h-11 rounded-xl flex items-center justify-center text-xs font-black uppercase tracking-wider transition-all shadow-sm ${isRunning ? 'bg-amber-400 text-slate-950' : 'bg-primary text-slate-950 hover:bg-primary-hover'
                      }`}
                  >
                    {isRunning ? <RiPauseFill size={18} /> : <RiPlayFill size={18} />}
                  </button>
                  <button
                    onClick={() => { setTime(0); setIsRunning(false); }}
                    className="w-11 h-11 bg-surface-subtle border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 transition-colors"
                  >
                    <RiRestartLine size={18} />
                  </button>
                </div>
              </div>

              {/* Team Scores */}
              {["Team Alpha", "Team Bravo"].map((label, i) => (
                <div key={i} className={`glass-dark border rounded-2xl p-6 space-y-4 relative overflow-hidden transition-all duration-300 ${(turn === "First" && i === 0) || (turn === "Second" && i === 1)
                  ? "border-primary shadow-[0_0_20px_rgba(0,229,153,0.15)] bg-surface-subtle/90 ring-1 ring-primary/30"
                  : "border-white/5 opacity-80"
                  }`}>
                  {(turn === "First" && i === 0) || (turn === "Second" && i === 1) ? (
                    <div className="absolute top-3.5 right-4 text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" /> Active Turn
                    </div>
                  ) : null}

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${i === 0 ? 'bg-sky-500/15 text-sky-400' : 'bg-emerald-500/15 text-primary'
                      }`}>
                      <RiTeamLine />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase tracking-tight leading-none text-base">{label}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Player Group</p>
                    </div>
                  </div>

                  <div className="text-center py-2 border-y border-white/5">
                    <span className="text-4xl font-black italic text-white tracking-tight">
                      {i === 0 ? valueTeamOne : valueTeamTwo}
                    </span>
                    <span className="block text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-0.5">Total Score</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {Numbers.map((n) => (
                      <button
                        key={n}
                        onClick={() => i === 0 ? setValueTeamOne(valueTeamOne + n) : setValueTeamTwo(valueTeamTwo + n)}
                        className="h-8 bg-surface-subtle border border-white/5 text-slate-400 text-[10px] font-bold rounded-lg hover:bg-primary hover:text-slate-950 hover:border-primary transition-all"
                      >
                        +{n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Questions Grid */}
            <CategoriesGrid
              randomRiskCategories={randomRiskCategories}
              setQategory={setQategory}
              values={values}
              randomDouble={randomDouble}
              setValues={setValues}
            />

            {/* Footer Navigation */}
            <div className="flex justify-center border-t border-white/5 pt-8">
              <button
                className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-slate-950 font-black text-xs rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                onClick={randomData}
              >
                Generate New Arena
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-surface border border-white/10 p-10 sm:p-14 rounded-3xl text-center space-y-6 max-w-xl w-full shadow-2xl"
            >
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-surface-subtle border border-primary/20 flex items-center justify-center text-primary text-4xl shadow-md shadow-primary/10">
                  <RiTrophyLine />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-black italic text-white uppercase tracking-tight leading-tight">
                  Risk Assessment <br /><span className="text-primary">Arena</span>
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
                  Test your tactical knowledge in a high-stakes arena. Choose your categories, manage your risk, and dominate the leaderboard.
                </p>
              </div>
              <button
                onClick={handleStartSession}
                className="w-full h-14 bg-primary hover:bg-primary-hover text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2.5"
              >
                <RiPlayFill size={20} /> Start Session
              </button>
              <div className="pt-2 flex items-center justify-center gap-1.5 text-slate-500">
                <RiTimerLine size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Estimated Duration: 15-20 Min</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Risk;
