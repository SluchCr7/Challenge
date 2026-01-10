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
  RiFlashlightLine
} from "react-icons/ri";
import { RiskContext } from "@/app/Context/Games/RiskContext";
import getRandomObjects from "@/utils/getRandomObjects";
import { CategoriesGrid } from "@/app/Components/RiskCategories";
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
  const { risk } = useContext(RiskContext);
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
    setRandomRiskCategories(random);
    randomNumber();
    setValues([]);
    setValueTeamOne(0);
    setValueTeamTwo(0);
    setTurn("First");
    setTime(0);
    setIsRunning(true);
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
        {show ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Game Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Timer & Controls */}
              <div className="glass-dark border border-white/10 rounded-[3rem] p-8 flex flex-col justify-between items-center gap-6 shadow-2xl">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Match Clock</span>
                  <div className="text-5xl font-black italic text-white tracking-tighter">
                    {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
                  </div>
                </div>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`flex-1 h-12 rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest transition-all ${isRunning ? 'bg-amber-500 text-black' : 'bg-green-500 text-white'
                      }`}
                  >
                    {isRunning ? <RiPauseFill size={20} /> : <RiPlayFill size={20} />}
                  </button>
                  <button
                    onClick={() => { setTime(0); setIsRunning(false); }}
                    className="w-12 h-12 glass border border-white/10 rounded-2xl flex items-center justify-center text-white hover:text-primary transition-colors"
                  >
                    <RiRestartLine size={20} />
                  </button>
                </div>
              </div>

              {/* Team Scores */}
              {["Team Alpha", "Team Bravo"].map((label, i) => (
                <div key={i} className={`glass-dark border rounded-[3rem] p-8 space-y-6 relative overflow-hidden transition-all duration-500 ${(turn === "First" && i === 0) || (turn === "Second" && i === 1)
                  ? "border-primary shadow-[0_0_30px_rgba(225,6,0,0.15)] bg-primary/5"
                  : "border-white/5"
                  }`}>
                  {(turn === "First" && i === 0) || (turn === "Second" && i === 1) ? (
                    <div className="absolute top-4 right-6 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary animate-ping" /> Active Turn
                    </div>
                  ) : null}

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${i === 0 ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                      <RiTeamLine />
                    </div>
                    <div>
                      <h4 className="text-white font-black italic uppercase tracking-tighter leading-none">{label}</h4>
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Player Group</p>
                    </div>
                  </div>

                  <div className="text-center py-4 border-y border-white/5">
                    <span className="text-5xl font-black italic text-white tracking-tighter">
                      {i === 0 ? valueTeamOne : valueTeamTwo}
                    </span>
                    <span className="block text-[10px] font-black text-primary uppercase tracking-[0.4em] mt-1">Total Score</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {Numbers.map((n) => (
                      <button
                        key={n}
                        onClick={() => i === 0 ? setValueTeamOne(valueTeamOne + n) : setValueTeamTwo(valueTeamTwo + n)}
                        className="h-10 glass border border-white/5 text-white/50 text-[10px] font-black rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all"
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
              randomReskCategories={randomRiskCategories}
              setQategory={setQategory}
              values={values}
              randomDouble={randomDouble}
              setValues={setValues}
            />

            {/* Footer Navigation */}
            <div className="flex justify-center border-t border-white/5 pt-12">
              <button
                className="px-12 py-6 bg-primary hover:bg-primary-hover text-white font-black text-xs rounded-full uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 transition-all hover:scale-105"
                onClick={randomData}
              >
                Generate New Arena
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark border border-white/10 p-16 rounded-[4rem] text-center space-y-8 max-w-2xl w-full"
            >
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-5xl border border-primary/20">
                  <RiTrophyLine />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">
                  Risk Assessment <br /><span className="text-primary">Arena</span>
                </h1>
                <p className="text-white/50 text-lg leading-relaxed">
                  Test your tactical knowledge in a high-stakes arena. Choose your categories, manage your risk, and dominate the leaderboard.
                </p>
              </div>
              <button
                onClick={() => {
                  setShow(true);
                  randomData();
                }}
                className="w-full h-20 bg-primary hover:bg-primary-hover text-white font-black text-lg uppercase tracking-widest rounded-[2rem] shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
              >
                <RiPlayFill size={28} /> Start Session
              </button>
              <div className="pt-4 flex items-center justify-center gap-2 text-white/20">
                <RiTimerLine />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Estimated Duration: 15-20 Min</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Risk;
