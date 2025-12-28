'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import React, { useState, useContext } from 'react'
import { PictureContext } from '@/app/Context/Games/PictureContext';
import Team from '@/app/Components/Team';
import { RiAddLine, RiSearchLine, RiTeamLine, RiArrowLeftLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const { team } = useContext(PictureContext);

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
              Team <span className="text-primary">Vault</span>
            </h1>
            <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Manage Global Squad Data & Rosters</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-[300px]">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search squad name..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-bold text-sm"
            />
          </div>
          <button
            onClick={() => setShow(true)}
            className="h-14 px-8 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-2"
          >
            <RiAddLine size={20} /> Deploy New Squad
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 px-6">
        <AnimatePresence>
          {team
            .filter((item) => item.Name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((teamItem, index) => (
              <motion.div
                key={teamItem._id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Team team={teamItem} index={index} />
              </motion.div>
            ))
          }
        </AnimatePresence>
      </div>

      {team.filter((item) => item.Name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center opacity-20">
          <RiTeamLine size={80} className="mb-4" />
          <p className="text-xl font-black italic uppercase tracking-widest text-white">No Squads Found in Segment</p>
        </div>
      )}

      <AddPlayer show={show} setShow={setShow} />
    </div>
  );
};

export default TeamPage;
