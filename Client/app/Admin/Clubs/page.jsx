'use client'
import React, { useContext, useState } from 'react'
import { RiDeleteBin7Line, RiRefreshLine, RiAddLine, RiSearchLine, RiArrowLeftLine, RiTimeLine } from "react-icons/ri";
import { deleteItem } from '@/utils/DeleteItem';
import AddPlayer from '@/app/Components/AddPlayer';
import { ClubsContext } from '@/app/Context/Games/ClubsContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const ClubsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const { data } = useContext(ClubsContext);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-10">
      {/* Sub-header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        <div className="flex items-center gap-6">
          <Link href="/Admin">
            <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all">
              <RiArrowLeftLine size={20} />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
              Career <span className="text-primary">Timeline</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage Historical Path Sequences</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-[300px]">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search legend path..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-bold text-sm"
            />
          </div>
          <button
            onClick={() => setShow(true)}
            className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-2"
          >
            <RiAddLine size={20} /> Deploy New Path
          </button>
        </div>
      </div>

      {/* Career Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
        <AnimatePresence>
          {data
            ?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((player, index) => (
              <motion.div
                key={player._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group transition-all duration-500 hover:border-primary/50"
              >
                <div className="absolute -right-4 -top-8 text-8xl text-white/[0.02] font-black italic select-none group-hover:text-primary/[0.05] transition-all">#{index + 1}</div>

                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  <RiTimeLine />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none">Legend Identity</span>
                    <h3 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{player.name}</h3>
                  </div>

                  <div className="p-4 glass rounded-2xl border border-white/5 space-y-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Station Count</span>
                    <p className="text-white font-black italic text-lg tracking-tighter">{player.teams?.length || 0} <span className="text-[10px] text-primary">Clubs</span></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => deleteItem("clubs", player._id)}
                    className="w-full py-4 bg-white/5 hover:bg-red-500 hover:text-white border border-white/5 rounded-2xl flex items-center justify-center gap-2 text-white/20 font-black text-[10px] uppercase tracking-[0.3em] transition-all"
                  >
                    <RiDeleteBin7Line size={16} /> Delete Sequence
                  </button>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center opacity-20">
          <RiTimeLine size={80} className="mb-4" />
          <p className="text-xl font-black italic uppercase tracking-widest text-white">No Career Paths Found</p>
        </div>
      )}

      <AddPlayer show={show} setShow={setShow} />
    </div>
  );
};

export default ClubsPage