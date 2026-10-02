'use client'
import React, { useContext, useState, useEffect } from 'react'
import GameIntro from '@/app/Components/GameIntro'
import { TopTenContext } from '@/app/Context/Games/TopTenContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { RiRefreshLine, RiBookOpenLine, RiTrophyLine, RiSkullLine, RiShieldUserLine, RiArrowLeftRightLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

const TopTenPage = () => {
  const { topTenData } = useContext(TopTenContext)
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [answeredCards, setAnsweredCards] = useState([])
  const [round, setRound] = useState("First")

  useEffect(() => {
    if (topTenData && topTenData.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsTopTen') : null
      const parsed = stored ? JSON.parse(stored) : [...topTenData]
      setRemainingObjects(parsed)
    }
  }, [topTenData])

  const handleRefresh = () => {
    setAnsweredCards([])
    setValueTeamOne(0)
    setValueTeamTwo(0)
    selectRandomObject(topTenData, remainingObjects, setLastSelected, setRemainingObjects, 'TopTen')
  }

  const handleCardClick = (index, value) => {
    if (answeredCards.includes(index)) return

    if (round === 'First') {
      setValueTeamOne(prev => prev + value)
      setRound('Second')
    } else {
      setValueTeamTwo(prev => prev + value)
      setRound('First')
    }

    setAnsweredCards(prev => [...prev, index])
  }

  const questionKeys = [
    'questionOne', 'questionTwo', 'questionThree', 'questionFour', 'questionFive',
    'questionSix', 'questionSeven', 'questionEight', 'questionNine', 'questionTen',
    'questionEleven', 'questionTwelve', 'questionThirteen'
  ]

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 rtl space-y-8">
      {lastSelected ? (
        <div className="space-y-8">
          {/* Header & Teams Turn */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-border">
            <div className="text-center lg:text-right space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                <RiBookOpenLine className="text-sm" /> قائمة العشرة الأوائل
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                توب <span className="text-primary">تـين</span>
              </h1>
              <p className="text-muted text-xs font-semibold max-w-xl">{lastSelected?.title}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className={`px-5 py-3 rounded-xl border transition-all text-center ${
                round === 'First'
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'card-surface border-border opacity-70'
              }`}>
                <span className="text-[10px] font-bold text-muted uppercase block">الفريق الأول</span>
                <span className="text-2xl font-black text-foreground">{valueTeamOne}</span>
              </div>

              <button
                onClick={() => setRound(prev => prev === 'First' ? 'Second' : 'First')}
                className="p-2.5 rounded-xl card-surface border border-border text-muted hover:text-primary transition-colors"
                title="تبديل الدور"
              >
                <RiArrowLeftRightLine size={18} />
              </button>

              <div className={`px-5 py-3 rounded-xl border transition-all text-center ${
                round === 'Second'
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'card-surface border-border opacity-70'
              }`}>
                <span className="text-[10px] font-bold text-muted uppercase block">الفريق الثاني</span>
                <span className="text-2xl font-black text-foreground">{valueTeamTwo}</span>
              </div>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                title="قائمة جديدة"
              >
                <RiRefreshLine size={20} />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {questionKeys.map((key, index) => {
              const question = lastSelected[key]
              const isAnswered = answeredCards.includes(index)
              const isNegative = index >= 10;

              return question ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleCardClick(index, question.value)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-center flex flex-col items-center justify-between min-h-[140px] relative ${
                    isAnswered
                      ? isNegative
                        ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                        : 'bg-primary/10 border-primary/40 text-primary'
                      : 'card-surface border-border hover:border-border/80'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-xs font-bold">
                    <span className="text-muted">#{index + 1}</span>
                    {isNegative ? (
                      <RiSkullLine className={isAnswered ? 'text-rose-400' : 'text-muted/40'} />
                    ) : (
                      <RiTrophyLine className={isAnswered ? 'text-primary' : 'text-muted/40'} />
                    )}
                  </div>

                  <div className="py-2">
                    {isAnswered ? (
                      <h4 className="text-sm sm:text-base font-black leading-tight">{question.name}</h4>
                    ) : (
                      <span className="text-xs text-muted font-bold">إجابة مخفية</span>
                    )}
                  </div>

                  <div className="w-full">
                    {isAnswered ? (
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        question.value > 0 ? 'bg-primary/20 text-primary' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {question.value > 0 ? `+${question.value}` : question.value} نقطة
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted font-mono">اضغط للكشف</span>
                    )}
                  </div>
                </motion.div>
              ) : null
            })}
          </div>

          {/* Footer Next Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleRefresh}
              className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <RiRefreshLine size={18} />
              <span>القائمة التالية</span>
            </button>
          </div>
        </div>
      ) : (
        <GameIntro
          name="توب تين"
          team={topTenData}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="تحدي التوب تين: خمنوا أسماء المتصدرين في هذا السجل الكروي. البطاقات من 1 إلى 10 تمنح نقاطاً، بينما البطاقات من 11 إلى 13 تمثل فخاخاً تخصم نقاطاً!"
        />
      )}
    </div>
  )
}

export default TopTenPage
