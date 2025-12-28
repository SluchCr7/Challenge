'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ClubsContext } from '@/app/Context/Games/ClubsContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldFlashLine, RiRefreshLine, RiEyeLine, RiEarthLine, RiTimeLine } from 'react-icons/ri'
import GameIntro from '@/app/Components/GameIntro'
import {UserX } from 'lucide-react';

const Page = () => {
  const { data } = useContext(ClubsContext)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (data?.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsclubs') : null
      const parsed = stored ? JSON.parse(stored) : [...data]
      setRemainingObjects(parsed)
    }
  }, [data])

  const handleRefresh = () => {
    setShowAnswer(false)
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, 'clubs')
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 space-y-12 rtl">
      {lastSelected ? (
        <div className="space-y-16">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-right space-y-2 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                <RiTimeLine /> مسيرة كروية نشطة
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                محلل <span className="text-primary">المسيرات</span>
              </h1>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">تتبع المسار المهني للأسطورة</p>
            </div>

            <div className="flex gap-4 order-1 md:order-2">
              <button onClick={handleRefresh} className="w-16 h-16 rounded-[2rem] glass border border-white/10 flex items-center justify-center text-primary text-3xl hover:bg-primary/10 hover:rotate-180 transition-all duration-700 shadow-2xl">
                <RiRefreshLine />
              </button>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {lastSelected.teams.map((club, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-5 hover:border-primary/50 transition-all duration-500 overflow-hidden text-center group-hover:scale-105">
                    <div className="absolute -right-4 -top-4 text-7xl text-white/[0.02] font-black italic select-none -rotate-12 group-hover:text-primary/[0.05] transition-all">#{index + 1}</div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                      <RiShieldFlashLine />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">المحطة {index + 1}</span>
                      <h3 className="text-xl font-black italic text-white uppercase tracking-tighter leading-tight">{club}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reveal Sector */}
          <div className="flex flex-col items-center gap-8">
            <AnimatePresence mode="wait">
              {!showAnswer ? (
                <motion.button
                  key="reveal-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setShowAnswer(true)}
                  className="group relative px-16 py-8 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2.5rem] shadow-2xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 flex items-center gap-4"
                >
                  <RiEyeLine size={24} className="group-hover:animate-pulse" /> كشف هوية اللاعب
                </motion.button>
              ) : (
                <motion.div
                  key="answer-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-dark border border-primary/40 rounded-[3rem] p-10 md:p-14 text-center space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <UserX className="text-primary text-6xl mx-auto mb-4" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">تم تحديد الهوية</span>
                    <h2 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">{lastSelected.name}</h2>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <button onClick={handleRefresh} className="text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2 mx-auto">
                      انتقال للهدف التالي <RiRefreshLine />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <GameIntro
          name="تحليل المسيرات"
          team={data}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="سنعرض لك المحطات الاحترافية للاعب غامض. هل يمكنك فك رموز المسيرة وتحديد هوية الأسطورة؟ ابدأ التحليل الآن."
        />
      )}
    </div>
  )
}

export default Page
