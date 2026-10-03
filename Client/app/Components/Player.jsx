'use client'
import { deleteItem } from '@/utils/DeleteItem';
import React, { useState } from 'react'
import { RiCloseLine, RiEyeLine, RiDeleteBin7Line, RiTrophyLine } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion';

const Player = ({ pla }) => {
  const [viewClow, setViewClow] = useState(false)

  return (
    <div className="w-full">
      <div className="card-surface border border-border rounded-xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-primary/40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl">
              <RiTrophyLine />
            </div>
            <div>
              <h4 className="text-foreground font-black text-base">{pla?.Answer}</h4>
              <span className="text-[10px] font-bold text-muted block">
                {pla?.Clos?.length || 0} تلميحات مسجلة
              </span>
            </div>
          </div>

          <button
            onClick={() => deleteItem("questions", pla._id)}
            className="w-9 h-9 rounded-lg bg-surface-elevated hover:bg-rose-500/10 text-muted hover:text-rose-400 border border-border hover:border-rose-500/30 flex items-center justify-center transition-colors"
            title="حذف"
          >
            <RiDeleteBin7Line size={16} />
          </button>
        </div>

        <button
          onClick={() => setViewClow(true)}
          className="w-full py-2.5 rounded-lg bg-surface-elevated hover:bg-surface border border-border text-muted hover:text-foreground text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <RiEyeLine size={15} className="text-primary" />
          <span>استعراض التلميحات</span>
        </button>

        {/* Clue Inspector Modal */}
        <AnimatePresence>
          {viewClow && (
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setViewClow(false)}
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
                    <h3 className="text-lg font-black text-foreground">{pla?.Answer}</h3>
                    <p className="text-[10px] font-bold text-primary uppercase">قائمة التلميحات المسجلة</p>
                  </div>
                  <button
                    onClick={() => setViewClow(false)}
                    className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors"
                  >
                    <RiCloseLine size={18} />
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                  {pla?.Clos?.map((clo, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-surface-elevated border border-border flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-black shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-foreground text-xs font-semibold leading-relaxed pt-0.5">
                        {clo}
                      </p>
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

export default Player