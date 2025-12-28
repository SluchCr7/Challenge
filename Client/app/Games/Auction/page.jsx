"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import selectRandomObject from "@/utils/getUniqueObject";
import { RiRefreshLine, RiTimerLine, RiGavelLine, RiAddLine, RiSubtractLine, RiFlashlightLine, RiFocus2Line, RiTrophyLine } from "react-icons/ri";
import { AuctionContext } from "@/app/Context/Games/AuctionContext";
import GameIntro from "@/app/Components/GameIntro";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className={`px-8 py-5 rounded-[2rem] border-2 glass transition-all duration-500 overflow-hidden relative ${side === 'left' ? 'border-primary/20' : 'border-white/10'}`}>
      <div className={`absolute -right-6 -bottom-6 text-7xl font-black italic select-none opacity-[0.03] pointer-events-none -rotate-12`}>TEAM</div>
      <div className="flex flex-col gap-1 relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">{team}</span>
        <span className="text-4xl font-black italic text-white tracking-tighter">{score}</span>
      </div>
    </div>
  )

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-16 px-6 relative overflow-hidden rtl'>
      <div className="absolute top-0 left-0 p-20 opacity-[0.03] text-[250px] font-black italic select-none pointer-events-none -rotate-12">AUCTION</div>

      <div className='w-full max-w-6xl space-y-16 relative z-10'>
        {lastSelected ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">

            {/* Header / Timer */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-right space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                  <RiGavelLine /> سوق المزايدات النشط
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">تحدي <span className="text-primary">المزايدة</span></h1>
              </div>

              <div className="flex items-center gap-8">
                <ScoreCard team="الكتيبة الأولى" score={teamOneScore} side="left" />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">المؤقت</span>
                  <div className={`w-24 h-24 rounded-[2.5rem] border-4 flex items-center justify-center text-4xl font-black italic transition-all duration-500 ${time <= 5 && isRunning ? 'border-primary text-primary animate-pulse scale-110' : 'border-white/10 text-white'}`}>
                    {time}
                  </div>
                </div>
                <ScoreCard team="الكتيبة الثانية" score={teamTwoScore} side="right" />
              </div>
            </div>

            {/* Core Question Module */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 text-7xl text-primary/20 opacity-50"><RiFlashlightLine /></div>
              <div className="glass-dark border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden text-center group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-4 block">المهمة المطلوبة</span>
                <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight relative z-10">
                  {lastSelected?.question}
                </h2>
              </div>
              <div className="absolute -bottom-6 -right-6 text-7xl text-primary/20 opacity-50 rotate-180"><RiFlashlightLine /></div>
            </div>

            {/* Interaction Sector */}
            <div className="w-full max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {questionMode ? (
                  <motion.div
                    key="execution-mode"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-dark border border-primary/30 rounded-[3rem] p-12 text-center space-y-10"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3 text-primary">
                        <RiFocus2Line className="text-3xl animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">مرحلة التنفيذ</span>
                      </div>
                      <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        فريق المزايدة: {teamChose === "First" ? "الكتيبة الأولى" : "الكتيبة الثانية"}
                      </h3>
                    </div>

                    <div className="flex flex-col items-center gap-8">
                      {!isRunning ? (
                        <button onClick={startTimer} className="px-12 py-6 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                          بدء بروتوكول التنفيذ
                        </button>
                      ) : (
                        <div className="flex items-center gap-12">
                          <button onClick={handleMinus} className="w-20 h-20 rounded-full glass border border-white/10 flex items-center justify-center text-primary text-4xl hover:bg-primary hover:text-white transition-all shadow-xl">
                            <RiSubtractLine />
                          </button>
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">المتبقي</span>
                            <div className="text-7xl font-black italic text-white tracking-tighter">{numAuction}</div>
                          </div>
                          <button disabled className="w-20 h-20 rounded-full glass border border-white/5 opacity-10 flex items-center justify-center text-white/20">
                            <RiAddLine />
                          </button>
                        </div>
                      )}
                    </div>

                    {(time === 0 || numAuction === 0) && (
                      <button onClick={resetGame} className="text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-all flex items-center gap-2 mx-auto pt-6 border-t border-white/5">
                        إعادة تهيئة النظام <RiRefreshLine />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="bidding-mode"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark border border-white/10 rounded-[3rem] p-12 space-y-10"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">تحديد المزايد الأعلى</h3>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">اختر الفريق وقم بتعيين القيمة</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 h-16">
                      <button
                        onClick={() => setButton("First")}
                        className={`rounded-2xl border-2 font-black text-[10px] uppercase tracking-[0.3em] transition-all ${button === "First" ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" : "glass border-white/10 text-white/30 hover:border-primary"}`}
                      >
                        الكتيبة الأولى
                      </button>
                      <button
                        onClick={() => setButton("Second")}
                        className={`rounded-2xl border-2 font-black text-[10px] uppercase tracking-[0.3em] transition-all ${button === "Second" ? "bg-primary border-primary text-white shadow-xl shadow-primary/20" : "glass border-white/10 text-white/30 hover:border-primary"}`}
                      >
                        الكتيبة الثانية
                      </button>
                    </div>

                    <div className="flex flex-col items-center gap-6 p-8 glass bg-white/5 rounded-[2rem] border border-white/5 mx-auto w-fit">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">تحديد القيمة</span>
                      <div className="flex items-center gap-12">
                        <button onClick={() => setNumAuction(Math.max(0, numAuction - 1))} className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-all">
                          <RiSubtractLine />
                        </button>
                        <div className="text-6xl font-black italic text-primary tracking-tighter min-w-[80px] text-center">{numAuction}</div>
                        <button onClick={() => setNumAuction(numAuction + 1)} className="w-14 h-14 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-all">
                          <RiAddLine />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setQuestionMode(true);
                        setTeamChose(button);
                      }}
                      disabled={!button || numAuction === 0}
                      className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-2xl shadow-xl hover:bg-primary hover:text-white transition-all disabled:opacity-10 active:scale-95"
                    >
                      بدء المباراة
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
            text="زايد على الفريق الآخر بقدرتك على استحضار المعلومات. الفريق الذي يقدم أعلى عرض ملتزم بالتنفيذ خلال 30 ثانية. المخاطرة هي مفتاح الربح."
          />
        )}
      </div>
    </div>
  );
};

export default Auction;