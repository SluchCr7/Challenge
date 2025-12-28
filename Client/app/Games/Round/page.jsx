'use client'
import TeamPoints from '@/app/Components/TeamPoints';
import { RoundContext } from '@/app/Context/Games/RoundContext';
import React, { useContext, useState, useEffect } from 'react'
import { RiRefreshLine, RiLightbulbLine, RiArrowDownSLine, RiArrowUpSLine, RiFlashlightLine, RiFocus2Line } from "react-icons/ri";
import selectRandomObject from '@/utils/getUniqueObject';
import { motion, AnimatePresence } from 'framer-motion';

const Round = () => {
  const [scoreTeamOne, setScoreTeamOne] = useState(0)
  const [scoreTeamTwo, setScoreTeamTwo] = useState(0)
  const [circlesUserOne, setCirclesUserOne] = useState([false, false, false])
  const [circlesUserTwo, setCirclesUserTwo] = useState([false, false, false])
  const { data } = useContext(RoundContext)
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showName, setShowName] = useState(false)
  const [passTeamOne, setPassTeamOne] = useState(false)
  const [passTeamTwo, setPassTeamTwo] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsRound') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  const teams = [
    { id: 1, name: "كتيبة الزمالك", score: scoreTeamOne, setter: setScoreTeamOne },
    { id: 2, name: "فريق الخصم", score: scoreTeamTwo, setter: setScoreTeamTwo },
  ]

  const handleRefresh = () => {
    setCirclesUserOne([false, false, false])
    setCirclesUserTwo([false, false, false])
    setPassTeamOne(false)
    setPassTeamTwo(false)
  }

  useEffect(() => {
    if (circlesUserOne.every((state) => state === true)) {
      setScoreTeamTwo(scoreTeamTwo + 1)
      handleRefresh()
      selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round")
    }
    if (circlesUserTwo.every((state) => state === true)) {
      setScoreTeamOne(scoreTeamOne + 1)
      handleRefresh()
      selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round")
    }
  }, [circlesUserOne, circlesUserTwo]);

  return (
    <div className='flex items-center justify-center w-full min-h-[85vh] py-16 px-6 relative overflow-hidden rtl'>
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-[250px] font-black italic select-none pointer-events-none -rotate-12">ROUND</div>

      <div className='w-full max-w-6xl space-y-16 relative z-10'>
        {/* Header Board */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-right space-y-2">
            <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">تحدي <span className="text-primary">الدور</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">تبادل السيطرة الإستراتيجية</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">معدل الدقة</span>
              <div className="px-6 py-3 glass border border-primary/30 rounded-2xl text-primary font-black italic text-4xl shadow-2xl shadow-primary/10">
                {scoreTeamOne}
              </div>
            </div>
            <div className="h-px w-12 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">معدل الخصم</span>
              <div className="px-6 py-3 glass border border-white/10 rounded-2xl text-white/40 font-black italic text-4xl">
                {scoreTeamTwo}
              </div>
            </div>
          </div>
        </div>

        {lastSelected ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-12 w-full'>

            {/* Core Question & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

              {/* Controls */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-6 flex flex-col items-center justify-center text-center">
                  <RiFlashlightLine className="text-primary text-4xl" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">تحديث الدورة</span>
                    <button onClick={() => { handleRefresh(); selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round") }} className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-primary text-2xl hover:bg-primary hover:text-white transition-all duration-500 shadow-xl mx-auto">
                      <RiRefreshLine />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowName(!showName)}
                  className={`w-full py-6 rounded-[2.5rem] border-2 transition-all duration-500 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] ${showName ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'glass border-white/10 text-white/40 hover:border-primary'
                    }`}
                >
                  <RiLightbulbLine size={18} /> {showName ? 'إخفاء المقترحات' : 'عرض المقترحات'}
                  {showName ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </button>
              </div>

              {/* Question Module */}
              <div className="lg:col-span-9">
                <div className="h-full glass-dark border border-white/10 rounded-[4rem] p-12 md:p-16 relative overflow-hidden flex flex-col justify-center text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem]" />
                  <div className="absolute -left-10 -bottom-10 text-[180px] text-white/[0.01] font-black italic select-none pointer-events-none">TACTIC</div>

                  <div className="space-y-8 relative z-10">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">المهمة الحالية</span>
                    <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">
                      {lastSelected?.question}
                    </h2>
                  </div>

                  <AnimatePresence>
                    {showName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-20'
                      >
                        {lastSelected?.examples.map((answer, index) => (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            key={index}
                            className='glass bg-white/5 border border-white/10 py-4 px-6 rounded-2xl text-[10px] font-black text-white/60 uppercase tracking-widest hover:text-primary hover:border-primary transition-all'
                          >
                            {answer}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Battle Sector */}
            <div className="pt-12 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <TeamPoints team={teams[0]} pass={passTeamOne} setPass={setPassTeamOne} circles={circlesUserOne} setCircles={setCirclesUserOne} />
                <div className="hidden md:flex flex-col items-center justify-center p-8 opacity-10">
                  <RiFocus2Line className="text-7xl animate-spin-slow" />
                  <div className="h-20 w-px bg-white mt-4" />
                </div>
                <TeamPoints team={teams[1]} pass={passTeamTwo} setPass={setPassTeamTwo} circles={circlesUserTwo} setCircles={setCirclesUserTwo} />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className='flex flex-col items-center justify-center py-20 gap-8'>
            <div className="w-32 h-32 rounded-[3.5rem] bg-primary/10 flex items-center justify-center text-primary text-6xl shadow-2xl animate-pulse">
              <RiFocus2Line />
            </div>
            <button
              onClick={() => selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round")}
              className='px-16 py-8 bg-primary hover:bg-primary-hover text-white font-black text-sm uppercase tracking-[0.4em] rounded-[2.5rem] shadow-2xl shadow-primary/30 transition-all hover:scale-110 active:scale-95'
            >
              فتح الثغرة وبدء الدور
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Round;