'use client'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldKeyholeLine, RiQuestionLine, RiCameraLensLine, RiBankLine, RiTrophyLine, RiArrowRightUpLine, RiFlashlightLine, RiShieldUserLine, RiRefreshLine, RiCheckLine, RiCloseLine, RiTimerLine } from 'react-icons/ri'
import Image from 'next/image'
import {Target } from 'lucide-react';

// Contexts
import { PassContext } from '@/app/Context/Games/PassContext'
import { GussContext } from '@/app/Context/Games/GussContext'
import { OffsideContext } from '@/app/Context/Games/OffsideContext'
import { PictureContext } from '@/app/Context/Games/PictureContext'
import { BankContext } from '@/app/Context/Games/BankContext'

// Utils
import selectRandomObject from '@/utils/getUniqueObject'
import GameIntro from '@/app/Components/GameIntro'

const MultiGame = () => {
  // Global States
  const [currentStep, setCurrentStep] = useState(0) // 0 to 4 (5 games)
  const [gameScores, setGameScores] = useState([
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
  ])
  const [gameState, setGameState] = useState('intro') // intro, playing, transition, results
  const [gameStarted, setGameStarted] = useState(false)

  // Context Data
  const { pass } = useContext(PassContext)
  const { data: gussData } = useContext(GussContext)
  const { data: offsideData } = useContext(OffsideContext)
  const { team: pictureData } = useContext(PictureContext)
  const { data: bankData } = useContext(BankContext)

  // Individual Game Local States
  const [lastSelected, setLastSelected] = useState(null)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [gameTimer, setGameTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [tempScore, setTempScore] = useState(0) // Used for games like Bank
  const [roundSubStep, setRoundSubStep] = useState(1) // General sub-step tracker
  const [showAnswer, setShowAnswer] = useState(false)

  const timerRef = useRef(null)

  const gamesConfig = [
    { name: 'Password', label: 'Decryption', icon: <RiShieldKeyholeLine />, context: pass, storageKey: 'MG_Pass' },
    { name: 'Guss', label: 'Enigma', icon: <RiQuestionLine />, context: gussData, storageKey: 'MG_Guss' },
    { name: 'Offside', label: 'VAR Analysis', icon: <Target />, context: offsideData, storageKey: 'MG_Off' },
    { name: 'Picture', label: 'Capture', icon: <RiCameraLensLine />, context: pictureData, storageKey: 'MG_Pic' },
    { name: 'Bank', label: 'Final Tactical', icon: <RiBankLine />, context: bankData, storageKey: 'MG_Bank' },
  ]

  // Timer Effect
  useEffect(() => {
    if (isTimerActive && gameTimer > 0) {
      timerRef.current = setInterval(() => setGameTimer(t => t - 1), 1000)
    } else if (gameTimer === 0 && isTimerActive) {
      handleStepExpiration()
    }
    return () => clearInterval(timerRef.current)
  }, [isTimerActive, gameTimer])

  const handleStepExpiration = () => {
    setIsTimerActive(false)
    // Auto-advance or trigger turn loss depending on game
    if (currentStep === 4) { // Bank
      nextStage()
    } else if (currentStep === 2) { // Offside
      // End round
    }
  }

  const startCurrentGame = () => {
    const config = gamesConfig[currentStep]
    setRemainingObjects([...config.context])
    selectRandomObject(config.context, [...config.context], setLastSelected, setRemainingObjects, config.storageKey)
    setRoundSubStep(1)
    setTempScore(0)
    setShowAnswer(false)

    if (currentStep === 2) setGameTimer(10) // Offside
    if (currentStep === 4) setGameTimer(120) // Bank

    setGameState('playing')
  }

  const updateScore = (team, points) => {
    const newScores = [...gameScores]
    if (team === 1) newScores[currentStep].teamOne += points
    else newScores[currentStep].teamTwo += points
    setGameScores(newScores)
  }

  const nextStage = () => {
    if (currentStep < 4) {
      setGameState('transition')
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setGameState('intro')
      }, 3000)
    } else {
      setGameState('results')
    }
  }

  const totalOne = gameScores.reduce((acc, curr) => acc + curr.teamOne, 0)
  const totalTwo = gameScores.reduce((acc, curr) => acc + curr.teamTwo, 0)

  // Sub-Game Handlers
  const handleBankCorrect = () => {
    const currentFloating = tempScore === 0 ? 1 : tempScore * 2
    setTempScore(currentFloating)
    setRoundSubStep(prev => prev + 1)
    if (roundSubStep >= 12) {
      nextStage()
    } else {
      selectRandomObject(bankData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Bank')
    }
  }

  const handleBankWrong = () => {
    setTempScore(0)
    setRoundSubStep(prev => prev + 1)
    if (roundSubStep >= 12) {
      nextStage()
    } else {
      selectRandomObject(bankData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Bank')
    }
  }

  const secureBank = (team) => {
    updateScore(team, tempScore)
    setTempScore(0)
  }

  // UI Components
  const ProgressBar = () => (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-6 relative">
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />
      {gamesConfig.map((g, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <motion.div
            animate={{
              scale: currentStep === i ? 1.2 : 1,
              borderColor: currentStep >= i ? '#E10600' : 'rgba(255,255,255,0.1)'
            }}
            className={`w-14 h-14 rounded-2xl glass border-2 flex items-center justify-center text-xl transition-all ${currentStep === i ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(225,6,0,0.3)]' : currentStep > i ? 'bg-primary text-white' : 'bg-carbon-light text-white/20'
              }`}
          >
            {currentStep > i ? <RiCheckLine /> : g.icon}
          </motion.div>
          <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${currentStep === i ? 'text-primary' : 'text-white/20'}`}>{g.label}</span>
        </div>
      ))}
    </div>
  )

  const TransitionOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/95 backdrop-blur-2xl px-6"
    >
      <div className="text-center space-y-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/20 border-l-transparent mx-auto"
        />
        <div className="space-y-2">
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter">Synchronizing</h2>
          <p className="text-primary font-bold uppercase tracking-[0.5em] text-xs">Deploying Next Arena Framework</p>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-10">
          <div className="text-center">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Team One Partial</span>
            <p className="text-3xl font-black italic text-white">{gameScores[currentStep].teamOne}</p>
          </div>
          <div className="text-center">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Team Two Partial</span>
            <p className="text-3xl font-black italic text-white">{gameScores[currentStep].teamTwo}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  if (gameState === 'results') {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 px-6 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.05)_0%,transparent_100%)] -z-10" />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-dark border border-white/10 rounded-[5rem] p-16 md:p-24 w-full max-w-4xl text-center space-y-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[120px]" />
          <RiTrophyLine className="text-primary text-9xl mx-auto animate-bounce" />
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">Campaign <span className="text-primary">Concluded</span></h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.5em] text-xs">Final Performance Metrics Processed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="p-12 glass rounded-[3rem] border-2 border-primary/20 space-y-4">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Ultimate Squad Score</span>
              <p className="text-8xl font-black italic text-white tracking-tighter">{totalOne}</p>
              {totalOne > totalTwo && <div className="text-primary font-black text-[10px] uppercase tracking-widest">Arena Dominator</div>}
            </div>
            <div className="p-12 glass rounded-[3rem] border-2 border-white/5 space-y-4 opacity-50">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Rival Squad Score</span>
              <p className="text-8xl font-black italic text-white tracking-tighter">{totalTwo}</p>
              {totalTwo > totalOne && <div className="text-primary font-black text-[10px] uppercase tracking-widest">Arena Dominator</div>}
            </div>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-6">
            {gameScores.map((s, i) => (
              <div key={i} className="px-6 py-3 glass rounded-2xl flex flex-col items-center">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">{gamesConfig[i].label}</span>
                <span className="text-xs font-black text-white">T1: {s.teamOne} | T2: {s.teamTwo}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="px-16 py-8 bg-white text-black font-black text-sm uppercase tracking-[0.5em] rounded-[2.5rem] hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-2xl"
          >
            Re-Deploy Campaign
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-7xl mx-auto space-y-12 py-10'>
      <ProgressBar />

      <AnimatePresence mode="wait">
        {gameState === 'intro' ? (
          <motion.div
            key={`intro-${currentStep}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GameIntro
              name={gamesConfig[currentStep].name}
              text={`Phase ${currentStep + 1} of the MultiGame Campaign. Master the ${gamesConfig[currentStep].label} mechanics to secure vital scoreboard assets.`}
              team={gamesConfig[currentStep].context}
              remainingObjects={[]}
              setLastSelected={() => { }} // Dummy as selectRandomObject will handle start
              setRemainingObjects={() => { }}
              selectRandomObject={startCurrentGame}
            />
          </motion.div>
        ) : gameState === 'playing' ? (
          <motion.div
            key={`play-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Global Score HUD */}
            <div className="flex justify-between items-center px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass border border-primary/30 flex items-center justify-center text-primary font-black italic">{totalOne}</div>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Current T1 Assets</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Current T2 Assets</span>
                <div className="w-12 h-12 rounded-xl glass border border-white/5 flex items-center justify-center text-white/40 font-black italic">{totalTwo}</div>
              </div>
            </div>

            {/* Game Specific Rendering */}
            {currentStep === 0 && ( // PASSWORD
              <div className="flex flex-col items-center gap-12">
                <div className="glass-dark border border-white/10 rounded-[4rem] p-12 text-center space-y-8 w-full max-w-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <div className="relative w-64 h-64 mx-auto rounded-[3rem] border-4 border-primary p-2 overflow-hidden shadow-2xl">
                    <Image src={lastSelected?.Photo[0].url} layout="fill" objectFit="cover" alt="ID" className="grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">{lastSelected?.name}</h2>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => { updateScore(1, 1); selectRandomObject(pass, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Pass') }} className="px-8 py-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all">T1 Correct</button>
                    <button onClick={() => { updateScore(2, 1); selectRandomObject(pass, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Pass') }} className="px-8 py-4 bg-blue-500/10 border border-blue-500/30 text-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">T2 Correct</button>
                  </div>
                  <button onClick={nextStage} className="w-full py-4 text-white/20 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.4em]">Finalize Step</button>
                </div>
              </div>
            )}

            {currentStep === 1 && ( // GUSS
              <div className="flex flex-col items-center gap-12">
                <div className="glass-dark border border-white/10 rounded-[4rem] p-12 text-center space-y-10 w-full max-w-4xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><RiQuestionLine size={100} /></div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Decryption Request</span>
                    <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">{lastSelected?.question}</h2>
                  </div>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 glass bg-primary/10 border border-primary/20 rounded-[2rem] mx-auto w-fit">
                        <h3 className="text-4xl font-black italic text-primary tracking-tighter">{lastSelected?.Answer}</h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {!showAnswer ? (
                      <button onClick={() => setShowAnswer(true)} className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Verify Logic</button>
                    ) : (
                      <div className="flex gap-4">
                        <button onClick={() => { updateScore(1, 1); setShowAnswer(false); selectRandomObject(gussData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Guss') }} className="px-10 py-5 bg-green-500/20 border border-green-500/40 text-green-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">T1 Scored</button>
                        <button onClick={() => { updateScore(2, 1); setShowAnswer(false); selectRandomObject(gussData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Guss') }} className="px-10 py-5 bg-blue-500/20 border border-blue-500/40 text-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest">T2 Scored</button>
                      </div>
                    )}
                  </div>
                  <button onClick={nextStage} className="pt-8 block text-white/10 hover:text-primary transition-colors text-[9px] font-black uppercase tracking-[0.5em] mx-auto">Seal Arena</button>
                </div>
              </div>
            )}

            {currentStep === 2 && ( // OFFSIDE
              <div className="flex flex-col items-center gap-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-5xl items-stretch">
                  <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="glass-dark border border-white/10 rounded-[3rem] p-8 text-center space-y-4 h-full flex flex-col justify-center">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Time Threshold</span>
                      <div className={`text-7xl font-black italic tracking-tighter ${gameTimer <= 3 ? 'text-primary animate-pulse' : 'text-white'}`}>{gameTimer}s</div>
                      {!isTimerActive && (
                        <button onClick={() => setIsTimerActive(true)} className="w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl">Activate Monitor</button>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="glass-dark border border-white/10 rounded-[4rem] p-16 h-full flex flex-col justify-center text-center relative overflow-hidden">
                      <div className="absolute -left-10 -bottom-10 opacity-5 -rotate-12"><Target size={200} /></div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Target Intel</span>
                      <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight relative z-10">{lastSelected?.Clo}</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { updateScore(1, 1); setGameTimer(10); setIsTimerActive(false); selectRandomObject(offsideData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Off') }} className="px-12 py-5 glass border-2 border-green-500/20 text-green-500 rounded-[2rem] font-black text-xs">SQUAD 1 CLEAR</button>
                  <button onClick={() => { updateScore(2, 1); setGameTimer(10); setIsTimerActive(false); selectRandomObject(offsideData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Off') }} className="px-12 py-5 glass border-2 border-blue-500/20 text-blue-500 rounded-[2rem] font-black text-xs">SQUAD 2 CLEAR</button>
                </div>
                <button onClick={nextStage} className="text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.6em]">Proceed to Visual Sector</button>
              </div>
            )}

            {currentStep === 3 && ( // PICTURE
              <div className="flex flex-col items-center gap-12">
                <div className="w-full max-w-4xl glass-dark border border-white/10 rounded-[4rem] p-8 md:p-12 relative overflow-hidden group">
                  <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden border-2 border-white/5">
                    <Image src={lastSelected?.Photo[0].url} layout="fill" objectFit="cover" alt="Visual" className="group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">{lastSelected?.Name}</span>
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Capture Identification</h2>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-6">
                  <button onClick={() => setShowAnswer(!showAnswer)} className="w-full py-6 glass border-2 border-white/10 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-[10px] tracking-[0.4em] uppercase hover:border-primary transition-all">
                    <RiShieldUserLine size={20} /> Inspect Identified Units {showAnswer ? '-' : '+'}
                  </button>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="w-full grid grid-cols-2 gap-4">
                        {lastSelected?.TeamMembers.map((m, i) => (
                          <div key={i} className="p-4 glass rounded-2xl border border-white/5 text-center text-xs font-black italic text-white/60 uppercase">{m}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex gap-4">
                    <button onClick={() => { updateScore(1, 1); setShowAnswer(false); selectRandomObject(pictureData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Pic') }} className="px-12 py-5 bg-primary/10 border border-primary/20 text-primary rounded-2xl font-black text-xs">SQUAD 1 SECURE</button>
                    <button onClick={() => { updateScore(2, 1); setShowAnswer(false); selectRandomObject(pictureData, remainingObjects, setLastSelected, setRemainingObjects, 'MG_Pic') }} className="px-12 py-5 glass border border-white/10 text-white/40 rounded-2xl font-black text-xs">SQUAD 2 SECURE</button>
                  </div>
                </div>
                <button onClick={nextStage} className="text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.6em]">Deployment: Final Bank</button>
              </div>
            )}

            {currentStep === 4 && ( // BANK
              <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-6xl mx-auto">
                <div className="lg:w-1/3 flex flex-col gap-6">
                  <div className="glass-dark border border-white/10 rounded-[3rem] p-10 space-y-10 flex flex-col items-center justify-center text-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Chronometer</span>
                      <div className={`text-7xl font-black italic tracking-tighter transition-colors ${gameTimer < 20 ? 'text-primary animate-pulse' : 'text-white'}`}>{gameTimer}s</div>
                    </div>
                    <div className="space-y-4">
                      <button onClick={() => setIsTimerActive(!isTimerActive)} className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isTimerActive ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500' : 'bg-green-500 text-white shadow-xl shadow-green-500/20'}`}>
                        {isTimerActive ? 'Hold Frequency' : 'Initiate Link'}
                      </button>
                    </div>
                  </div>

                  <div className="glass-dark border border-primary/40 rounded-[3rem] p-10 text-center space-y-8">
                    <RiBankLine className="text-primary text-5xl mx-auto" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Floating Assets</span>
                      <p className="text-6xl font-black italic text-primary tracking-tighter">{tempScore}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => secureBank(1)} className="py-4 glass border border-white/10 rounded-xl text-[9px] font-black uppercase text-white/40 hover:bg-white/5">Secure T1</button>
                      <button onClick={() => secureBank(2)} className="py-4 glass border border-white/10 rounded-xl text-[9px] font-black uppercase text-white/40 hover:bg-white/5">Secure T2</button>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3 space-y-8">
                  <div className="h-[400px] glass-dark border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="absolute top-0 right-10 flex flex-col items-center">
                      <div className="h-12 w-px bg-primary/40" />
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black italic text-xs">{roundSubStep}/12</div>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-4">Encryption Level 5</span>
                    <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">{lastSelected?.question}</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <button onClick={handleBankCorrect} className="py-8 bg-green-500/10 border-2 border-green-500/20 rounded-[2.5rem] text-green-500 font-black italic text-xl uppercase tracking-tighter hover:bg-green-500 hover:text-white transition-all shadow-2xl active:scale-95">Verified</button>
                    <button onClick={handleBankWrong} className="py-8 bg-red-500/10 border-2 border-red-500/20 rounded-[2.5rem] text-red-500 font-black italic text-xl uppercase tracking-tighter hover:bg-red-500 hover:text-white transition-all shadow-2xl active:scale-95">Corrupted</button>
                  </div>
                  <button onClick={nextStage} className="w-full text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.8em]">Finalize Campaign Link</button>
                </div>
              </div>
            )}

          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {gameState === 'transition' && <TransitionOverlay />}
      </AnimatePresence>
    </div>
  )
}

export default MultiGame