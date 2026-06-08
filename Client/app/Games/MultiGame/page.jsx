'use client'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiShieldKeyholeLine, RiQuestionLine, RiCameraLensLine, RiBankLine, RiTrophyLine, RiArrowLeftLine, RiPlayFill, RiCheckLine, RiCloseLine, RiTimerLine } from 'react-icons/ri'
import { Target } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

// Contexts
import { MultiGameContext } from '@/app/Context/Games/MultiGameContext'
// Components
import Loader from '@/app/Components/Loader'

const MultiGame = () => {
  const { episodes, loading: listLoading } = useContext(MultiGameContext)

  // Episode Selection & Session States
  const [selectedEpisode, setSelectedEpisode] = useState(null) // Populated episode data from backend
  const [loadingEpisode, setLoadingEpisode] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // 0 to 4 (5 games)
  const [gameScores, setGameScores] = useState([
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
    { teamOne: 0, teamTwo: 0 },
  ])
  const [gameState, setGameState] = useState('selection') // selection, intro, playing, transition, results
  const [gameTimer, setGameTimer] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [tempScore, setTempScore] = useState(0) // Used for Banking floating score
  const [roundSubStep, setRoundSubStep] = useState(1) // Bank question index (1 to 12)
  const [showAnswer, setShowAnswer] = useState(false)

  const timerRef = useRef(null)

  // Static structure of games
  const gamesConfig = [
    { name: 'Password', label: 'Decryption', icon: <RiShieldKeyholeLine /> },
    { name: 'Guess', label: 'Enigma', icon: <RiQuestionLine /> },
    { name: 'Offside', label: 'VAR Analysis', icon: <Target className="w-5 h-5" /> },
    { name: 'Picture', label: 'Capture', icon: <RiCameraLensLine /> },
    { name: 'Bank', label: 'Final Tactical', icon: <RiBankLine /> },
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
    if (currentStep === 4) { // Bank timer expires
      nextStage()
    } else if (currentStep === 2) { // Offside timer expires
      // Auto-advance or lock
    }
  }

  // Load a selected episode from the backend
  const handleSelectEpisode = async (id) => {
    setLoadingEpisode(true)
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/multigame/${id}`)
      setSelectedEpisode(res.data)
      setGameScores([
        { teamOne: 0, teamTwo: 0 },
        { teamOne: 0, teamTwo: 0 },
        { teamOne: 0, teamTwo: 0 },
        { teamOne: 0, teamTwo: 0 },
        { teamOne: 0, teamTwo: 0 },
      ])
      setCurrentStep(0)
      setGameState('intro')
    } catch (err) {
      console.error("Error loading episode:", err)
      alert("Failed to load campaign data.")
    } finally {
      setLoadingEpisode(false)
    }
  }

  const startCurrentGame = () => {
    setRoundSubStep(1)
    setTempScore(0)
    setShowAnswer(false)

    if (currentStep === 2) {
      setGameTimer(15) // 15 seconds for Offside VAR analysis
      setIsTimerActive(true)
    }
    if (currentStep === 4) {
      setGameTimer(120) // 2 minutes for Bank round
      setIsTimerActive(true)
    }

    setGameState('playing')
  }

  const updateScore = (team, points) => {
    const newScores = [...gameScores]
    if (team === 1) newScores[currentStep].teamOne += points
    else newScores[currentStep].teamTwo += points
    setGameScores(newScores)
  }

  const nextStage = () => {
    setIsTimerActive(false)
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

  // Bank Specific Logic
  const handleBankCorrect = () => {
    const currentFloating = tempScore === 0 ? 100 : tempScore * 2
    setTempScore(currentFloating)
    if (roundSubStep >= 12) {
      nextStage()
    } else {
      setRoundSubStep(prev => prev + 1)
    }
  }

  const handleBankWrong = () => {
    setTempScore(0)
    if (roundSubStep >= 12) {
      nextStage()
    } else {
      setRoundSubStep(prev => prev + 1)
    }
  }

  const secureBank = (team) => {
    updateScore(team, tempScore)
    setTempScore(0)
  }

  // Active items from the selected episode data
  const getActiveGameData = () => {
    if (!selectedEpisode) return null
    switch (currentStep) {
      case 0: return selectedEpisode.game1_password
      case 1: return selectedEpisode.game2_guess
      case 2: return selectedEpisode.game3_offside
      case 3: return selectedEpisode.game4_picture
      case 4: return selectedEpisode.game5_bank // Array of 12 items
      default: return null
    }
  }

  const activeData = getActiveGameData()

  // Selection Screen
  if (gameState === 'selection') {
    return (
      <div className="w-full max-w-6xl mx-auto py-12 px-4 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em]">Sabahoo Challenge Mode</span>
          <h1 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">
            Multi-Game <span className="text-primary">Arenas</span>
          </h1>
          <p className="text-white/40 font-medium text-lg max-w-2xl mx-auto">
            Select an episode below to launch the definitive 5-game gauntlet. Play with fixed, static questions created by our master editors.
          </p>
        </div>

        {listLoading || loadingEpisode ? (
          <Loader message={loadingEpisode ? "Synchronizing Arena Data..." : "Retrieving Active Campaigns..."} />
        ) : episodes.length === 0 ? (
          <div className="p-20 border border-dashed border-white/10 rounded-[3rem] text-center text-white/30 font-bold uppercase tracking-widest text-sm">
            No active campaigns found. Check back later or ask an Admin to deploy one!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {episodes.map((ep, idx) => (
              <motion.div
                key={ep._id}
                whileHover={{ y: -6 }}
                className="glass-dark border border-white/10 rounded-[3rem] p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 relative overflow-hidden group min-h-[280px]"
              >
                {/* Visual Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 p-6 text-primary opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all">
                  <RiTrophyLine size={64} />
                </div>

                <div className="space-y-4 relative z-10">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-primary uppercase tracking-widest">
                    Campaign #{episodes.length - idx}
                  </span>
                  <h3 className="text-2xl font-black italic text-white leading-tight uppercase tracking-tighter">
                    {ep.title}
                  </h3>
                  <p className="text-white/40 text-xs font-semibold leading-relaxed line-clamp-3">
                    {ep.description || 'Test your tactical intelligence across 5 diverse arenas in this elite challenge.'}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectEpisode(ep._id)}
                  className="mt-8 w-full py-4 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 relative z-10"
                >
                  <RiPlayFill size={18} /> Launch Campaign
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Progress Bar Header
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
            className={`w-14 h-14 rounded-2xl glass border-2 flex items-center justify-center text-xl transition-all ${
              currentStep === i
                ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                : currentStep > i
                ? 'bg-primary text-white'
                : 'bg-carbon-light text-white/20'
            }`}
          >
            {currentStep > i ? <RiCheckLine /> : g.icon}
          </motion.div>
          <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${currentStep === i ? 'text-primary' : 'text-white/20'}`}>
            {g.label}
          </span>
        </div>
      ))}
    </div>
  )

  // Transition Screen between games
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
        <div className="grid grid-cols-2 gap-12 pt-10 border-t border-white/5 max-w-md mx-auto">
          <div className="text-center">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Team One Score</span>
            <p className="text-4xl font-black italic text-white">{gameScores[currentStep]?.teamOne || 0}</p>
          </div>
          <div className="text-center">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Team Two Score</span>
            <p className="text-4xl font-black italic text-white">{gameScores[currentStep]?.teamTwo || 0}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Results Scorecard
  if (gameState === 'results') {
    return (
      <div className="w-full max-w-7xl mx-auto py-20 px-6 flex flex-col items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.05)_0%,transparent_100%)] -z-10" />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-dark border border-white/10 rounded-[5rem] p-12 md:p-24 w-full max-w-4xl text-center space-y-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[120px]" />
          <RiTrophyLine className="text-primary text-9xl mx-auto animate-bounce" />
          <div className="space-y-4">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">CAMPAIGN COMPLETED</span>
            <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-none">
              Final <span className="text-primary">Standings</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">
              {selectedEpisode?.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-2xl mx-auto">
            <div className={`p-8 glass rounded-[3rem] border-2 space-y-4 ${totalOne >= totalTwo ? 'border-primary/40 bg-primary/5' : 'border-white/5 opacity-60'}`}>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Team One Score</span>
              <p className="text-7xl font-black italic text-white tracking-tighter">{totalOne}</p>
              {totalOne >= totalTwo && <div className="text-primary font-black text-[10px] uppercase tracking-widest">Campaign Winner</div>}
            </div>
            <div className={`p-8 glass rounded-[3rem] border-2 space-y-4 ${totalTwo >= totalOne ? 'border-primary/40 bg-primary/5' : 'border-white/5 opacity-60'}`}>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Team Two Score</span>
              <p className="text-7xl font-black italic text-white tracking-tighter">{totalTwo}</p>
              {totalTwo >= totalOne && <div className="text-primary font-black text-[10px] uppercase tracking-widest">Campaign Winner</div>}
            </div>
          </div>

          {/* Game breakdown */}
          <div className="pt-8 border-t border-white/5 max-w-3xl mx-auto">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/40 mb-6">Game-by-Game Performance</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {gameScores.map((s, i) => (
                <div key={i} className="px-4 py-3 glass rounded-2xl flex flex-col items-center border border-white/5">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">{gamesConfig[i].label}</span>
                  <span className="text-xs font-black text-white">T1: {s.teamOne} | T2: {s.teamTwo}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8 flex justify-center gap-6">
            <button
              onClick={() => setGameState('selection')}
              className="px-10 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] hover:bg-white/5 transition-all"
            >
              Other Campaigns
            </button>
            <button
              onClick={() => {
                setGameScores([
                  { teamOne: 0, teamTwo: 0 },
                  { teamOne: 0, teamTwo: 0 },
                  { teamOne: 0, teamTwo: 0 },
                  { teamOne: 0, teamTwo: 0 },
                  { teamOne: 0, teamTwo: 0 },
                ])
                setCurrentStep(0)
                setGameState('intro')
              }}
              className="px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.4em] rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Restart Session
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10">
      <div className="flex items-center gap-4 max-w-4xl mx-auto px-6">
        <button
          onClick={() => {
            if (confirm("Are you sure you want to exit this campaign session?")) {
              setGameState('selection')
            }
          }}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <RiArrowLeftLine /> Exit Session
        </button>
        <span className="text-white/20 text-xs">|</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{selectedEpisode?.title}</span>
      </div>

      <ProgressBar />

      <AnimatePresence mode="wait">
        {gameState === 'intro' ? (
          <motion.div
            key={`intro-${currentStep}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center flex-col justify-center w-full max-w-2xl mx-auto gap-8 px-6"
          >
            <div className="glass-dark border border-white/10 rounded-[3rem] p-10 w-full text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-4xl text-primary border border-primary/20">
                  {gamesConfig[currentStep].icon}
                </div>
              </div>

              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block">Phase {currentStep + 1} of 5</span>
              <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
                {gamesConfig[currentStep].name} Arena
              </h2>

              <p className="text-center text-white/60 font-medium text-lg leading-relaxed">
                {currentStep === 0 && "Identify the footballer using keywords/clues. Pass options back and forth."}
                {currentStep === 1 && "Answer the obscure enigma/question. Reveal validation answer when completed."}
                {currentStep === 2 && "Read the tactical positioning clue. High speed turn: timer counts down 15s."}
                {currentStep === 3 && "Analyze the crop team photography. Correctly identify all team members to secure points."}
                {currentStep === 4 && "Final stage. Rapid banking trivia. Get answers correct to multiply points. Secure points to lock them in."}
              </p>
            </div>

            <button
              onClick={startCurrentGame}
              className="w-full md:w-[300px] h-20 bg-primary hover:bg-primary-hover shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 rounded-[2.5rem] text-white font-black text-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <RiPlayFill size={28} /> Start Arena
            </button>
          </motion.div>
        ) : gameState === 'playing' ? (
          <motion.div
            key={`play-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* HUD */}
            <div className="flex justify-between items-center max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl glass border border-green-500/30 flex items-center justify-center text-green-400 font-black italic text-xl">
                  {gameScores.reduce((acc, curr) => acc + curr.teamOne, 0)}
                </div>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">T1 Assets</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">T2 Assets</span>
                <div className="w-14 h-14 rounded-2xl glass border border-blue-500/30 flex items-center justify-center text-blue-400 font-black italic text-xl">
                  {gameScores.reduce((acc, curr) => acc + curr.teamTwo, 0)}
                </div>
              </div>
            </div>

            {/* Game Renderers */}
            {currentStep === 0 && ( // PASSWORD
              <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
                <div className="glass-dark border border-white/10 rounded-[4rem] p-12 text-center space-y-8 w-full relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  <div className="relative w-64 h-64 mx-auto rounded-[3rem] border-4 border-primary p-2 overflow-hidden shadow-2xl">
                    {activeData?.Photo?.[0]?.url ? (
                      <Image src={activeData.Photo[0].url} layout="fill" objectFit="cover" alt="ID" className="grayscale group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full bg-carbon-dark flex items-center justify-center text-white/20">No Image</div>
                    )}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter">{activeData?.name}</h2>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => { updateScore(1, 1); nextStage() }} className="px-8 py-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-white transition-all">T1 Correct</button>
                    <button onClick={() => { updateScore(2, 1); nextStage() }} className="px-8 py-4 bg-blue-500/10 border border-blue-500/30 text-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">T2 Correct</button>
                  </div>
                  <button onClick={nextStage} className="w-full py-4 text-white/20 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.4em]">Skip Arena</button>
                </div>
              </div>
            )}

            {currentStep === 1 && ( // GUESS
              <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
                <div className="glass-dark border border-white/10 rounded-[4rem] p-12 text-center space-y-10 w-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><RiQuestionLine size={100} /></div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Decryption Question</span>
                    <h2 className="text-3xl md:text-5xl font-black italic text-white uppercase tracking-tighter leading-tight">{activeData?.question}</h2>
                  </div>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 glass bg-primary/10 border border-primary/20 rounded-[2rem] mx-auto w-fit">
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest block mb-2">Verified Answer</span>
                        <h3 className="text-4xl font-black italic text-primary tracking-tighter">{activeData?.Answer}</h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    {!showAnswer ? (
                      <button onClick={() => setShowAnswer(true)} className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Verify Answer</button>
                    ) : (
                      <div className="flex gap-4">
                        <button onClick={() => { updateScore(1, 1); nextStage() }} className="px-10 py-5 bg-green-500/20 border border-green-500/40 text-green-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-500 hover:text-white transition-colors">T1 Scored</button>
                        <button onClick={() => { updateScore(2, 1); nextStage() }} className="px-10 py-5 bg-blue-500/20 border border-blue-500/40 text-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-colors">T2 Scored</button>
                      </div>
                    )}
                  </div>
                  <button onClick={nextStage} className="pt-8 block text-white/10 hover:text-primary transition-colors text-[9px] font-black uppercase tracking-[0.5em] mx-auto font-black">Skip Arena</button>
                </div>
              </div>
            )}

            {currentStep === 2 && ( // OFFSIDE
              <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-stretch">
                  <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="glass-dark border border-white/10 rounded-[3rem] p-8 text-center space-y-4 h-full flex flex-col justify-center">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Time Remaining</span>
                      <div className={`text-7xl font-black italic tracking-tighter ${gameTimer <= 5 ? 'text-primary animate-pulse' : 'text-white'}`}>
                        {gameTimer}s
                      </div>
                      <div className="flex justify-center text-primary text-2xl">
                        <RiTimerLine className={isTimerActive ? "animate-spin-slow" : ""} />
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8">
                    <div className="glass-dark border border-white/10 rounded-[4rem] p-16 h-full flex flex-col justify-center text-center relative overflow-hidden">
                      <div className="absolute -left-10 -bottom-10 opacity-5 -rotate-12"><Target size={200} /></div>
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Target Rule Clue</span>
                      <h2 className="text-3xl md:text-4xl font-black italic text-white uppercase tracking-tighter leading-tight relative z-10">{activeData?.Clo}</h2>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { updateScore(1, 1); nextStage() }} className="px-12 py-5 bg-green-500/10 border-2 border-green-500/20 text-green-500 rounded-[2rem] font-black text-xs hover:bg-green-500 hover:text-white transition-all">SQUAD 1 CLEAR</button>
                  <button onClick={() => { updateScore(2, 1); nextStage() }} className="px-12 py-5 bg-blue-500/10 border-2 border-blue-500/20 text-blue-500 rounded-[2rem] font-black text-xs hover:bg-blue-500 hover:text-white transition-all">SQUAD 2 CLEAR</button>
                </div>
                <button onClick={nextStage} className="text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.6em]">Skip Arena</button>
              </div>
            )}

            {currentStep === 3 && ( // PICTURE
              <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
                <div className="w-full glass-dark border border-white/10 rounded-[4rem] p-8 relative overflow-hidden group">
                  <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden border-2 border-white/5">
                    {activeData?.Photo?.[0]?.url ? (
                      <Image src={activeData.Photo[0].url} layout="fill" objectFit="cover" alt="Visual" className="group-hover:scale-105 transition-transform duration-1000" />
                    ) : (
                      <div className="w-full h-full bg-carbon-dark flex items-center justify-center text-white/20">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">Squad Identification</span>
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">{activeData?.Name}</h2>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-6">
                  <button onClick={() => setShowAnswer(!showAnswer)} className="w-full py-6 glass border-2 border-white/10 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-[10px] tracking-[0.4em] uppercase hover:border-primary transition-all">
                    {showAnswer ? 'Hide Identified Players' : 'Show Identified Players'}
                  </button>
                  <AnimatePresence>
                    {showAnswer && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="w-full grid grid-cols-2 gap-4">
                        {activeData?.TeamMembers?.map((m, i) => (
                          <div key={i} className="p-4 glass rounded-2xl border border-white/5 text-center text-xs font-black italic text-white/60 uppercase">{m}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex gap-4">
                    <button onClick={() => { updateScore(1, 1); nextStage() }} className="px-12 py-5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl font-black text-xs hover:bg-green-500 hover:text-white transition-all">SQUAD 1 SECURE</button>
                    <button onClick={() => { updateScore(2, 1); nextStage() }} className="px-12 py-5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl font-black text-xs hover:bg-blue-500 hover:text-white transition-all">SQUAD 2 SECURE</button>
                  </div>
                </div>
                <button onClick={nextStage} className="text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.6em]">Skip Arena</button>
              </div>
            )}

            {currentStep === 4 && ( // BANK
              <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-5xl mx-auto">
                <div className="lg:w-1/3 flex flex-col gap-6">
                  <div className="glass-dark border border-white/10 rounded-[3rem] p-8 text-center space-y-6">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block">Bank Timer</span>
                    <div className={`text-6xl font-black italic tracking-tighter ${gameTimer < 20 ? 'text-primary animate-pulse' : 'text-white'}`}>
                      {gameTimer}s
                    </div>
                  </div>

                  <div className="glass-dark border border-primary/40 rounded-[3rem] p-8 text-center space-y-6">
                    <RiBankLine className="text-primary text-5xl mx-auto" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Floating Cash</span>
                      <p className="text-5xl font-black italic text-primary tracking-tighter">{tempScore}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button onClick={() => secureBank(1)} className="py-4 bg-green-500/10 border border-green-500/20 rounded-xl text-[9px] font-black uppercase text-green-500 hover:bg-green-500 hover:text-white transition-colors">Bank T1</button>
                      <button onClick={() => secureBank(2)} className="py-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[9px] font-black uppercase text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">Bank T2</button>
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3 space-y-6">
                  <div className="h-[320px] glass-dark border border-white/10 rounded-[4rem] p-12 relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="absolute top-6 right-8 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black italic text-xs">
                        {roundSubStep}/12
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-4">Tactical Level</span>
                    <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase tracking-tighter leading-tight">
                      {activeData?.[roundSubStep - 1]?.question}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <button onClick={handleBankCorrect} className="py-6 bg-green-500/10 border-2 border-green-500/20 rounded-[2rem] text-green-500 font-black italic text-lg uppercase tracking-tighter hover:bg-green-500 hover:text-white transition-all shadow-xl shadow-green-500/10">Correct</button>
                    <button onClick={handleBankWrong} className="py-6 bg-red-500/10 border-2 border-red-500/20 rounded-[2rem] text-red-500 font-black italic text-lg uppercase tracking-tighter hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/10">Wrong</button>
                  </div>
                  <button onClick={nextStage} className="w-full text-white/10 hover:text-primary transition-colors font-black text-[9px] uppercase tracking-[0.8em]">Skip Banking</button>
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