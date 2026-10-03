'use client'
import React, { useState } from 'react'
import { deleteItem } from '@/utils/DeleteItem'
import { RiDeleteBin7Line, RiEyeLine, RiCloseLine, RiTeamLine, RiCheckLine } from "react-icons/ri";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Team = ({ team, index }) => {
  const [showPlayers, setShowPlayers] = useState(false)

  return (
    <div className="w-full">
      <div className="card-surface border border-border rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:border-primary/40 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-surface-elevated shrink-0 border border-border">
            {team?.Photo?.[0]?.url ? (
              <Image
                src={team.Photo[0].url}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
                alt={team.Name || "team"}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                لا تتوفر صورة
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-right space-y-1">
            <h3 className="text-base sm:text-lg font-black text-foreground">{team.Name}</h3>
            <span className="text-xs text-muted block">
              {team?.TeamMembers?.length || 0} لاعباً مسجلين
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPlayers(true)}
              className="p-2.5 rounded-lg bg-surface-elevated hover:bg-surface border border-border text-muted hover:text-primary transition-colors"
              title="عرض اللاعبين"
            >
              <RiTeamLine size={18} />
            </button>
            <button
              onClick={() => deleteItem("teams", team._id)}
              className="p-2.5 rounded-lg bg-surface-elevated hover:bg-rose-500/10 text-muted hover:text-rose-400 border border-border hover:border-rose-500/30 transition-colors"
              title="حذف الفريق"
            >
              <RiDeleteBin7Line size={18} />
            </button>
          </div>
        </div>

        {/* Players Overlay */}
        <AnimatePresence>
          {showPlayers && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPlayers(false)}
                className="absolute inset-0 bg-black/80"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative card-surface border border-border p-6 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden rtl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div>
                    <h3 className="text-lg font-black text-foreground">{team.Name}</h3>
                    <p className="text-[10px] font-bold text-primary uppercase">قائمة لاعبي الفريق</p>
                  </div>
                  <button
                    onClick={() => setShowPlayers(false)}
                    className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
                  >
                    <RiCloseLine size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[45vh] overflow-y-auto pr-1">
                  {team?.TeamMembers?.map((player, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-surface-elevated border border-border text-xs font-bold text-foreground flex items-center gap-2"
                    >
                      <RiCheckLine className="text-primary text-sm shrink-0" />
                      <span className="truncate">{player}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Team