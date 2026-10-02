'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ClubsContext } from '@/app/Context/Games/ClubsContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldFlashLine, RiRefreshLine, RiEyeLine, RiTimeLine } from 'react-icons/ri'
import GameIntro from '@/app/Components/GameIntro'
import { UserCheck } from 'lucide-react'

const ClubsPage = () => {
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
    <div className="w-full max-w-6xl mx-auto py-12 px-6 rtl space-y-8">
      {lastSelected ? (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="text-center sm:text-right space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                <RiTimeLine className="text-sm" /> لعبة مسيرة اللاعب
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                مسيرة <span className="text-primary">الأندية</span>
              </h1>
            </div>

            <button
              onClick={handleRefresh}
              className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
              title="لاعب جديد"
            >
              <RiRefreshLine size={20} />
            </button>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {lastSelected?.teams?.map((club, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-surface border border-border rounded-xl p-5 text-center space-y-3 hover:border-primary/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-surface-elevated text-primary border border-border flex items-center justify-center mx-auto text-lg group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                  <RiShieldFlashLine />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted block mb-1">المحطة {index + 1}</span>
                  <h3 className="text-base sm:text-lg font-black text-foreground">{club}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reveal Area */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <AnimatePresence mode="wait">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
                >
                  <RiEyeLine size={18} />
                  <span>كشف هوية اللاعب</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-surface border border-primary/30 rounded-2xl p-8 text-center space-y-3 max-w-md w-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-muted uppercase">صاحب المسيرة</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                    {lastSelected?.name}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleRefresh}
              className="px-8 py-3 rounded-xl bg-surface-elevated hover:bg-surface border border-border text-muted hover:text-foreground text-xs font-bold transition-all flex items-center gap-2"
            >
              <RiRefreshLine size={16} />
              <span>اللاعب التالي</span>
            </button>
          </div>
        </div>
      ) : (
        <GameIntro
          name="مسيرة الأندية"
          team={data}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="تتبع المحطات الاحترافية والأندية التي مثلها هذا النجم خلال مسيرته الكروية، وخمّن اسم اللاعب من خلال تسلسل أنديته!"
        />
      )}
    </div>
  )
}

export default ClubsPage
