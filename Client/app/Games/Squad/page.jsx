'use client'
import React, { useContext, useEffect, useState } from 'react'
import { SquadContext } from '../../Context/Games/SquadContext'
import { RiRefreshLine, RiTeamLine, RiUserSearchLine, RiFocus2Line, RiTrophyLine } from 'react-icons/ri'
import GameIntro from '@/app/Components/GameIntro'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion, AnimatePresence } from 'framer-motion'

const Page = () => {
  const { squads } = useContext(SquadContext)
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [selectedPlayersTeamOne, setSelectedPlayersTeamOne] = useState([])
  const [selectedPlayersTeamTwo, setSelectedPlayersTeamTwo] = useState([])

  useEffect(() => {
    if (squads && squads.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectssquad') : null
      const parsed = stored ? JSON.parse(stored) : [...squads]
      setRemainingObjects(parsed)
    }
  }, [squads])

  const handleRefresh = () => {
    selectRandomObject(squads, remainingObjects, setLastSelected, setRemainingObjects, 'squad')
    setValueTeamOne(0)
    setValueTeamTwo(0)
    setSelectedPlayersTeamOne([])
    setSelectedPlayersTeamTwo([])
  }

  const TeamPanel = ({ team, score, setter, selected, setSelected, side }) => (
    <div className={`relative glass-dark border border-white/10 rounded-[3rem] p-10 overflow-hidden flex flex-col gap-8 transition-all duration-500 hover:border-primary/30 h-full`}>
      {/* Background Branding */}
      <div className={`absolute -right-10 -bottom-10 text-[180px] font-black italic select-none opacity-[0.02] pointer-events-none -rotate-12`}>SQUAD</div>

      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Operations Unit</span>
          <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{team?.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[9px] font-black text-primary uppercase tracking-widest">Efficiency</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black italic text-white tracking-tighter leading-none">{score}</span>
            <button
              onClick={() => setter(prev => prev + 1)}
              className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95"
            >
              +1
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {team?.members.map((player, idx) => {
          const isSelected = selected.includes(player);
          return (
            <motion.button
              key={idx}
              whileHover={{ x: isSelected ? 0 : 5 }}
              onClick={() => {
                if (!isSelected) {
                  setSelected([...selected, player]);
                  setter(prev => prev + 1);
                }
              }}
              className={`w-full p-4 rounded-2xl border transition-all duration-300 text-right flex items-center justify-between group ${isSelected
                  ? 'bg-primary/20 border-primary/40 text-white/20 cursor-default'
                  : 'glass border-white/5 text-white/70 hover:border-primary/50 hover:bg-white/5'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-primary text-white' : 'bg-white/5 text-white/20 group-hover:text-primary'}`}>
                {isSelected ? <RiFocus2Line /> : <RiUserSearchLine />}
              </div>
              <span className={`text-sm font-black italic uppercase tracking-tighter ${isSelected ? 'line-through' : ''}`}>{player}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 space-y-16 rtl">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-right space-y-2 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                  <RiTeamLine /> تحليل التشكيلات القتالية
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter uppercase leading-none">
                  مسح <span className="text-primary">التشكيلات</span>
                </h1>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">{lastSelected?.title}</p>
              </div>

              <div className="flex gap-4 order-1 md:order-2">
                <button onClick={handleRefresh} className="w-16 h-16 rounded-[2rem] glass border border-white/10 flex items-center justify-center text-primary text-3xl hover:bg-primary/10 hover:rotate-180 transition-all duration-700 shadow-2xl">
                  <RiRefreshLine />
                </button>
              </div>
            </div>

            {/* Battlefields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <TeamPanel
                team={lastSelected?.TeamOne}
                score={valueTeamOne}
                setter={setValueTeamOne}
                selected={selectedPlayersTeamOne}
                setSelected={setSelectedPlayersTeamOne}
                side="right"
              />
              <TeamPanel
                team={lastSelected?.TeamTwo}
                score={valueTeamTwo}
                setter={setValueTeamTwo}
                selected={selectedPlayersTeamTwo}
                setSelected={setSelectedPlayersTeamTwo}
                side="left"
              />
            </div>

            {/* Victory Condition Bar */}
            <div className="glass border border-white/5 rounded-[3rem] p-12 text-center space-y-6 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <RiTrophyLine className="text-primary text-5xl mx-auto mb-2 opacity-50" />
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">أهداف الكتيبة 1</span>
                  <p className="text-4xl font-black italic text-white tracking-tighter">{valueTeamOne}</p>
                </div>
                <div className="h-10 w-px bg-white/10 hidden md:block" />
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">أهداف الكتيبة 2</span>
                  <p className="text-4xl font-black italic text-white tracking-tighter">{valueTeamTwo}</p>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          <GameIntro
            name={'تحليل التشكيلات'}
            team={squads}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text='سيتم عرض تشكيلتين تاريخيتين. تنافس مع الفريق الآخر في تخمين أسماء اللاعبين الموجودين في كل تشكيلة. كل تخمين صحيح يمنحك نقطة استراتيجية.'
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page
