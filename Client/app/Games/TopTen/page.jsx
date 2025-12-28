'use client'
import React, { useContext, useState, useEffect } from 'react'
import GameIntro from '@/app/Components/GameIntro'
import { TopTenContext } from '@/app/Context/Games/TopTenContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { RiRefreshLine, RiBookOpenLine, RiTrophyLine, RiSkullLine, RiShieldUserLine, RiArrowLeftRightLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'

const Page = () => {
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
    <div className='w-full max-w-7xl mx-auto py-12 px-6 space-y-16 rtl'>
      {lastSelected ? (
        <div className='space-y-16'>

          {/* Header & Score Track */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-right space-y-4 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                <RiBookOpenLine /> استعادة الأرشيف النخبة
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                توب <span className="text-primary">تـين</span>
              </h1>
              <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] max-w-md">{lastSelected?.title}</p>
            </div>

            <div className="flex flex-col items-center gap-6 order-1 lg:order-2">
              <div className="flex items-center gap-4">
                <div className={`px-8 py-5 rounded-[2rem] border-2 transition-all duration-500 ${round === 'First' ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(225,6,0,0.2)]' : 'glass border-white/10 opacity-30'}`}>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block mb-1">الكتيبة الأولى</span>
                  <span className="text-4xl font-black italic text-white tracking-tighter">{valueTeamOne}</span>
                </div>
                <RiArrowLeftRightLine className="text-white/20 text-2xl" />
                <div className={`px-8 py-5 rounded-[2rem] border-2 transition-all duration-500 ${round === 'Second' ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(225,6,0,0.2)]' : 'glass border-white/10 opacity-30'}`}>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 block mb-1">الكتيبة الثانية</span>
                  <span className="text-4xl font-black italic text-white tracking-tighter">{valueTeamTwo}</span>
                </div>
              </div>
              <button
                onClick={() => setRound(prev => prev === 'First' ? 'Second' : 'First')}
                className="px-8 py-3 glass border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white hover:border-primary transition-all"
              >
                تبديل الدور يدوياً
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className='relative'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {questionKeys.map((key, index) => {
                const question = lastSelected[key]
                const isAnswered = answeredCards.includes(index)
                const isNegative = index >= 10;

                return question ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: isAnswered ? 0 : -5 }}
                    onClick={() => handleCardClick(index, question.value)}
                    className={`relative aspect-[4/5] rounded-[2.5rem] border-2 transition-all duration-500 p-6 flex flex-col items-center justify-center text-center gap-4 overflow-hidden group cursor-pointer ${isAnswered
                        ? 'bg-primary border-primary shadow-[0_0_30px_rgba(225,6,0,0.3)]'
                        : 'glass-dark border-white/5 hover:border-primary/50'
                      }`}
                  >
                    {/* Background Number */}
                    <div className={`absolute -right-4 -bottom-4 text-7xl font-black italic select-none transition-all duration-500 ${isAnswered ? 'text-white/10' : 'text-white/[0.02] group-hover:text-primary/10'}`}>
                      {index + 1}
                    </div>

                    {isNegative && !isAnswered && <RiSkullLine className="absolute top-6 right-6 text-primary/40 text-xl" />}
                    {!isNegative && !isAnswered && <RiTrophyLine className="absolute top-6 right-6 text-white/10 text-xl" />}

                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${isAnswered ? 'bg-white/20 text-white' : 'bg-white/5 text-primary'}`}>
                      {isAnswered ? (isNegative ? <RiSkullLine /> : <RiTrophyLine />) : <RiShieldUserLine />}
                    </div>

                    <div className="space-y-1 relative z-10">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${isAnswered ? 'text-white/60' : 'text-white/20'}`}>
                        {isAnswered ? 'تمت الاستعادة' : `تسلسل ${index + 1}`}
                      </span>
                      <h4 className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight transition-all ${isAnswered ? 'text-white' : 'text-white/40'}`}>
                        {isAnswered ? question.name : 'بيانات مشفرة'}
                      </h4>
                    </div>

                    {isAnswered && (
                      <div className="px-4 py-1.5 glass bg-white/10 rounded-full text-[10px] font-black tracking-widest">
                        {question.value > 0 ? `+${question.value}` : question.value} XP
                      </div>
                    )}
                  </motion.div>
                ) : null
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-center pt-8">
            <button
              onClick={handleRefresh}
              className="group relative px-12 py-6 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] shadow-2xl shadow-primary/30 transition-all hover:scale-110 active:scale-95 flex items-center gap-3"
            >
              <RiRefreshLine size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              طلب سجل جديد
            </button>
          </div>

        </div>
      ) : (
        <GameIntro
          name={'سجلات النخبة'}
          team={topTenData}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text='مهمتك هي استعادة قائمة "العشرة الأوائل" في سجل معين. التسلسلات من 1 إلى 10 تمنحك نقاطاً إيجابية، بينما التسلسلات من 11 إلى 13 تحتوي على فخاخ سلبية.'
        />
      )}
    </div>
  )
}

export default Page
