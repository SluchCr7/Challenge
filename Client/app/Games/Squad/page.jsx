'use client'
import React, { useContext, useEffect, useState } from 'react'
import { SquadContext } from '../../Context/Games/SquadContext'
import { RiRefreshLine, RiTeamLine, RiCheckLine, RiTrophyLine } from 'react-icons/ri'
import GameIntro from '@/app/Components/GameIntro'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion, AnimatePresence } from 'framer-motion'

const SquadPage = () => {
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

  const TeamPanel = ({ team, score, setter, selected, setSelected, teamLabel }) => (
    <div className="card-surface border border-border rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <span className="text-[10px] font-bold text-muted uppercase block">{teamLabel}</span>
          <h3 className="text-xl sm:text-2xl font-black text-foreground">{team?.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-primary font-mono">{score}</span>
          <span className="text-xs text-muted">/ {team?.members?.length || 11}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {team?.members?.map((player, idx) => {
          const isSelected = selected.includes(player);
          return (
            <button
              key={idx}
              onClick={() => {
                if (!isSelected) {
                  setSelected([...selected, player]);
                  setter(prev => prev + 1);
                } else {
                  setSelected(selected.filter(p => p !== player));
                  setter(prev => Math.max(0, prev - 1));
                }
              }}
              className={`p-3 rounded-xl border text-right flex items-center justify-between transition-all ${
                isSelected
                  ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                  : 'bg-surface-elevated border-border text-muted hover:text-foreground hover:border-border/80'
              }`}
            >
              <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-primary' : ''}`}>
                {player}
              </span>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                isSelected ? 'bg-primary text-background' : 'bg-surface border border-border text-transparent'
              }`}>
                <RiCheckLine size={14} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-6 rtl space-y-8">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="text-center sm:text-right space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                  <RiTeamLine className="text-sm" /> تشكيلة المباراة
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  تحدي <span className="text-primary">التشكيل</span>
                </h1>
                <p className="text-muted text-xs font-semibold">{lastSelected?.title}</p>
              </div>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                title="مباراة جديدة"
              >
                <RiRefreshLine size={20} />
              </button>
            </div>

            {/* Squads Matchup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TeamPanel
                team={lastSelected?.TeamOne}
                score={valueTeamOne}
                setter={setValueTeamOne}
                selected={selectedPlayersTeamOne}
                setSelected={setSelectedPlayersTeamOne}
                teamLabel="الفريق الأول"
              />
              <TeamPanel
                team={lastSelected?.TeamTwo}
                score={valueTeamTwo}
                setter={setValueTeamTwo}
                selected={selectedPlayersTeamTwo}
                setSelected={setSelectedPlayersTeamTwo}
                teamLabel="الفريق الثاني"
              />
            </div>

            {/* Summary Bar */}
            <div className="card-surface border border-border rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted font-bold">
                <RiTrophyLine className="text-primary text-base" />
                <span>المجموع: الفريق الأول ({valueTeamOne}) - الفريق الثاني ({valueTeamTwo})</span>
              </div>
              <button
                onClick={handleRefresh}
                className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-background text-xs font-black transition-all flex items-center gap-1.5"
              >
                <RiRefreshLine size={14} />
                <span>المباراة التالية</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="تحدي التشكيلات"
            team={squads}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="اختبار الذاكرة التاريخية: سنعرض لكم مباراة تاريخية شهيرة، ومهمتكم هي ذكر وتذكر التشكيل الأساسي لكلا الفريقين في تلك القمة!"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default SquadPage
