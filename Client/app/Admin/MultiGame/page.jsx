'use client'
import React, { useState, useContext } from 'react'
import { MultiGameContext } from '@/app/Context/Games/MultiGameContext'
import { PassContext } from '@/app/Context/Games/PassContext'
import { GuessContext } from '@/app/Context/Games/GuessContext'
import { OffsideContext } from '@/app/Context/Games/OffsideContext'
import { PictureContext } from '@/app/Context/Games/PictureContext'
import { BankContext } from '@/app/Context/Games/BankContext'
import { motion, AnimatePresence } from 'framer-motion'
import { RiDeleteBin6Line, RiPlayListAddLine, RiCheckLine, RiCloseLine, RiSettings4Line } from 'react-icons/ri'
import Link from 'next/link'

const MultiGameAdmin = () => {
    const { episodes, addEpisode, deleteEpisode, loading: episodesLoading } = useContext(MultiGameContext)
    const { pass } = useContext(PassContext)
    const { data: guessData } = useContext(GuessContext)
    const { data: offsideData } = useContext(OffsideContext)
    const { team: pictureData } = useContext(PictureContext)
    const { data: bankData } = useContext(BankContext)

    // Form States
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedPassword, setSelectedPassword] = useState("")
    const [selectedGuess, setSelectedGuess] = useState("")
    const [selectedOffside, setSelectedOffside] = useState("")
    const [selectedPicture, setSelectedPicture] = useState("")
    const [selectedBankIds, setSelectedBankIds] = useState([]) // Array of selected bank IDs, must be exactly 12

    const [isCreating, setIsCreating] = useState(false)

    const handleBankToggle = (id) => {
        if (selectedBankIds.includes(id)) {
            setSelectedBankIds(selectedBankIds.filter(item => item !== id))
        } else {
            if (selectedBankIds.length < 12) {
                setSelectedBankIds([...selectedBankIds, id])
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedBankIds.length !== 12) {
            alert("Please select exactly 12 questions for the Banking game.")
            return
        }

        const newEpisode = {
            title,
            description,
            game1_password: selectedPassword,
            game2_guess: selectedGuess,
            game3_offside: selectedOffside,
            game4_picture: selectedPicture,
            game5_bank: selectedBankIds
        }

        addEpisode(newEpisode, () => {
            // Reset state
            setTitle("")
            setDescription("")
            setSelectedPassword("")
            setSelectedGuess("")
            setSelectedOffside("")
            setSelectedPicture("")
            setSelectedBankIds([])
            setIsCreating(false)
        })
    }

    return (
        <div className="w-full max-w-7xl mx-auto space-y-12 py-10 px-4">
            {/* Header Section */}
            <div className="relative glass-dark border border-white/10 rounded-[3rem] p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-3">
                        <Link href="/Admin" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">
                            &larr; Back to Control Center
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                            Multi-Game <span className="text-primary">Campaigns</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                            Assemble structured 5-game arenas (Sabahoo Tahdy style) for challenges.
                        </p>
                    </div>
                    {!isCreating && (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <RiPlayListAddLine size={18} /> Create New Campaign
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isCreating ? (
                    <motion.div
                        key="create-form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-dark border border-white/10 rounded-[3rem] p-10 space-y-8"
                    >
                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                            <h2 className="text-2xl font-black italic text-white uppercase tracking-tighter">Campaign Configuration</h2>
                            <button
                                onClick={() => setIsCreating(false)}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                            >
                                <RiCloseLine size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Campaign Title</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Episode 1: The Champions Derby"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-colors text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/50">Description (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Test your skills on iconic derbies and historical squads."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary transition-colors text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Game 1 Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Game 1: Secret Password</label>
                                    <select
                                        required
                                        value={selectedPassword}
                                        onChange={(e) => setSelectedPassword(e.target.value)}
                                        className="w-full p-4 bg-carbon-dark border border-white/10 rounded-2xl text-white outline-none focus:border-primary text-sm"
                                    >
                                        <option value="" disabled>Select Player...</option>
                                        {pass?.map(p => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Game 2 Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Game 2: True Guess</label>
                                    <select
                                        required
                                        value={selectedGuess}
                                        onChange={(e) => setSelectedGuess(e.target.value)}
                                        className="w-full p-4 bg-carbon-dark border border-white/10 rounded-2xl text-white outline-none focus:border-primary text-sm"
                                    >
                                        <option value="" disabled>Select Question...</option>
                                        {guessData?.map(g => (
                                            <option key={g._id} value={g._id}>{g.question.slice(0, 45)}...</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Game 3 Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Game 3: Offside Rule</label>
                                    <select
                                        required
                                        value={selectedOffside}
                                        onChange={(e) => setSelectedOffside(e.target.value)}
                                        className="w-full p-4 bg-carbon-dark border border-white/10 rounded-2xl text-white outline-none focus:border-primary text-sm"
                                    >
                                        <option value="" disabled>Select Position Clue...</option>
                                        {offsideData?.map(o => (
                                            <option key={o._id} value={o._id}>{o.Clo.slice(0, 45)}...</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Game 4 Selector */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary">Game 4: Visual Identity</label>
                                    <select
                                        required
                                        value={selectedPicture}
                                        onChange={(e) => setSelectedPicture(e.target.value)}
                                        className="w-full p-4 bg-carbon-dark border border-white/10 rounded-2xl text-white outline-none focus:border-primary text-sm"
                                    >
                                        <option value="" disabled>Select Squad Image...</option>
                                        {pictureData?.map(t => (
                                            <option key={t._id} value={t._id}>{t.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Game 5 Bank Selector (12 items) */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                    <div>
                                        <label className="text-xs font-black uppercase tracking-widest text-primary block">Game 5: The Banking Round</label>
                                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Select exactly 12 tactical bank questions</span>
                                    </div>
                                    <div className={`text-xs font-black px-4 py-1.5 rounded-full border ${selectedBankIds.length === 12 ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-amber-500/30 text-amber-400 bg-amber-500/10'}`}>
                                        Selected: {selectedBankIds.length} / 12
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {bankData?.map(b => {
                                        const isSelected = selectedBankIds.includes(b._id)
                                        return (
                                            <div
                                                key={b._id}
                                                onClick={() => handleBankToggle(b._id)}
                                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-left ${
                                                    isSelected
                                                        ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/10'
                                                        : 'bg-white/5 border-white/5 text-white/50 hover:border-white/10 hover:text-white/80'
                                                }`}
                                            >
                                                <div className="space-y-1 flex-1 pr-4">
                                                    <p className="text-xs font-bold truncate">{b.question}</p>
                                                    <p className="text-[10px] text-primary italic font-black uppercase tracking-widest">{b.Answer}</p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                                    isSelected ? 'border-primary bg-primary text-white' : 'border-white/20'
                                                }`}>
                                                    {isSelected && <RiCheckLine size={12} />}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="px-6 py-3 border border-white/10 rounded-xl text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={selectedBankIds.length !== 12 || !title || !selectedPassword || !selectedGuess || !selectedOffside || !selectedPicture}
                                    className="px-8 py-3 bg-primary disabled:opacity-40 disabled:hover:scale-100 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Deploy Campaign
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="episodes-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">Deplayed Campaigns</h2>

                        {episodesLoading ? (
                            <div className="py-20 text-center text-white/40 font-bold uppercase tracking-widest text-xs">Loading campaigns...</div>
                        ) : episodes.length === 0 ? (
                            <div className="p-16 border border-dashed border-white/10 rounded-[3rem] text-center text-white/30 font-bold uppercase tracking-[0.2em] text-xs">
                                No active campaigns deployed. Click &quot;Create New Campaign&quot; above.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {episodes.map((ep, idx) => (
                                    <div
                                        key={ep._id}
                                        className="glass-dark border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 relative group min-h-[200px]"
                                    >
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    if(confirm("Are you sure you want to delete this episode?")) {
                                                        deleteEpisode(ep._id)
                                                    }
                                                }}
                                                className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                                            >
                                                <RiDeleteBin6Line size={18} />
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">CAMPAIGN #{episodes.length - idx}</span>
                                            <h3 className="text-xl font-black italic text-white leading-tight uppercase tracking-tighter">{ep.title}</h3>
                                            <p className="text-white/40 text-xs font-semibold leading-relaxed line-clamp-3">{ep.description || 'No description provided.'}</p>
                                        </div>

                                        <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                            <span>5 Games Ready</span>
                                            <span>{new Date(ep.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MultiGameAdmin
