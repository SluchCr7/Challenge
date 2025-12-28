'use client'
import React, { useContext, useState } from 'react'
import { ReskContext } from '@/app/Context/Games/ReskContext'
import AddResk from '@/app/Components/AddResk'
import { deleteItem } from '@/utils/DeleteItem'
import { RiDeleteBin7Line, RiFlashlightLine, RiSearchLine, RiAddLine, RiArrowLeftLine, RiFocus2Line, RiFireLine, RiTrophyLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const ReskPage = () => {
  const [show, setShow] = useState(false);
  const { resk } = useContext(ReskContext);
  const [searchTerm, setSearchTerm] = useState('');

  const TierLabel = ({ level, icon, color }) => (
    <div className={`flex flex-col gap-2 p-5 glass border border-white/5 rounded-3xl relative overflow-hidden group hover:border-white/10 transition-all`}>
      <div className={`absolute -right-4 -bottom-4 text-6xl opacity-[0.03] italic font-black select-none ${color}`}>{level.toUpperCase()}</div>
      <div className="flex items-center justify-between relative z-10">
        <span className={`text-[9px] font-black uppercase tracking-widest ${color}`}>{level} Protocol</span>
        <div className={`${color} opacity-50`}>{icon}</div>
      </div>
      <div className="space-y-1 relative z-10">
        <p className="text-white font-bold text-sm leading-tight text-right line-clamp-2">{level === 'Easy' ? '...' : ''} {level === 'Expert' ? '' : ''}</p>
        <span className="text-[10px] font-black italic uppercase text-white/20 tracking-wider">Verification Needed</span>
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        <div className="flex items-center gap-6">
          <Link href="/Admin">
            <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all">
              <RiArrowLeftLine size={20} />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
              Risk <span className="text-primary">Matrix</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage Tiered Challenge Data</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-[300px]">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search matrix ID..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-bold text-sm"
            />
          </div>
          <button
            onClick={() => setShow(true)}
            className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-2"
          >
            <RiAddLine size={20} /> Deploy Matrix
          </button>
        </div>
      </div>

      {/* Matrix List */}
      <div className="grid grid-cols-1 gap-12 px-6">
        <AnimatePresence>
          {resk
            .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-dark border border-white/10 rounded-[3rem] p-10 space-y-8 relative group hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-10 flex flex-col items-center">
                  <div className="h-20 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black italic text-sm shadow-xl shadow-primary/20">
                    {index + 1}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl text-primary">
                      <RiFlashlightLine />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{item.name}</h3>
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2 block">Matrix Group Designation</span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteItem("resk", item._id)}
                    className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary transition-all group-hover:bg-primary/10"
                  >
                    <RiDeleteBin7Line size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest w-fit border border-green-500/20">
                      <RiFocus2Line /> Easy
                    </div>
                    <div className="p-5 glass rounded-2xl border border-white/5 space-y-2">
                      <p className="text-white/60 text-xs font-bold leading-relaxed line-clamp-3">{item.Easy.question}</p>
                      <p className="text-green-500 font-black italic text-lg tracking-tighter">{item.Easy.answer}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest w-fit border border-blue-500/20">
                      <RiFlashlightLine /> Medium
                    </div>
                    <div className="p-5 glass rounded-2xl border border-white/5 space-y-2">
                      <p className="text-white/60 text-xs font-bold leading-relaxed line-clamp-3">{item.Medium.question}</p>
                      <p className="text-blue-500 font-black italic text-lg tracking-tighter">{item.Medium.answer}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest w-fit border border-amber-500/20">
                      <RiFireLine /> Hard
                    </div>
                    <div className="p-5 glass rounded-2xl border border-white/5 space-y-2">
                      <p className="text-white/60 text-xs font-bold leading-relaxed line-clamp-3">{item.Hard.question}</p>
                      <p className="text-amber-500 font-black italic text-lg tracking-tighter">{item.Hard.answer}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest w-fit border border-primary/20">
                      <RiTrophyLine /> Expert
                    </div>
                    <div className="p-5 glass rounded-2xl border border-white/5 space-y-2">
                      <p className="text-white/60 text-xs font-bold leading-relaxed line-clamp-3">{item.Expert.question}</p>
                      <p className="text-primary font-black italic text-lg tracking-tighter">{item.Expert.answer}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <AddResk show={show} setShow={setShow} />
    </div>
  )
}

export default ReskPage