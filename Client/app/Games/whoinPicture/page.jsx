'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { RiRefreshLine, RiArrowDownSLine, RiArrowUpSLine, RiCameraLensLine, RiCheckLine } from "react-icons/ri";
import { PictureContext } from '@/app/Context/Games/PictureContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
import Loader from '@/app/Components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

const WhoInPicturePage = () => {
  const [showPlayers, setShowPlayers] = useState(false);
  const { team } = useContext(PictureContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPicture') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...team]);
  }, [team]);

  const handleRefresh = () => {
    setShowPlayers(false);
    selectRandomObject(team, remainingObjects, setLastSelected, setRemainingObjects, "Picture");
  };

  if (!team || team.length === 0) {
    return <Loader message="جاري تحميل الأرشيف الصوري..." />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[85vh] rtl space-y-8">
      <AnimatePresence mode="wait">
        {lastSelected ? (
          <motion.div
            key={lastSelected?._id || lastSelected?.Name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-border">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
                  <RiCameraLensLine className="text-sm" /> لعبة من في الصورة؟
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
                  أرشيف <span className="text-primary">الصور</span>
                </h1>
                <p className="text-xs text-muted font-semibold">{lastSelected?.Name}</p>
              </div>

              <button
                onClick={handleRefresh}
                className="p-3 rounded-xl card-surface border border-border text-primary hover:bg-surface-elevated transition-colors"
                title="صورة جديدة"
              >
                <RiRefreshLine size={20} />
              </button>
            </div>

            {/* Visual Frame */}
            <div className="card-surface border border-border rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-surface-elevated">
                {lastSelected?.Photo?.[0]?.url ? (
                  <Image
                    src={lastSelected.Photo[0].url}
                    layout="fill"
                    objectFit="contain"
                    quality={95}
                    alt={lastSelected?.Name || "Football archive"}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-sm font-semibold">
                    لا تتوفر صورة لهذا السجل
                  </div>
                )}
              </div>
            </div>

            {/* Member Reveal Area */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setShowPlayers(!showPlayers)}
                  className="px-6 py-3 rounded-xl card-surface border border-border text-foreground hover:border-primary/50 text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <span>{showPlayers ? 'إخفاء أسماء اللاعبين' : 'كشف اللاعبين في الصورة'}</span>
                  {showPlayers ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </button>

                <button
                  onClick={handleRefresh}
                  className="px-8 py-3 bg-primary hover:bg-primary-hover text-background font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
                >
                  <RiRefreshLine size={16} />
                  <span>الصورة التالية</span>
                </button>
              </div>

              <AnimatePresence>
                {showPlayers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="card-surface border border-primary/20 rounded-2xl p-6 sm:p-8"
                  >
                    <span className="text-xs font-bold text-primary uppercase block mb-4">قائمة اللاعبين في الصورة:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {lastSelected?.TeamMembers?.map((player, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-surface-elevated border border-border text-xs font-bold text-foreground flex items-center gap-2"
                        >
                          <RiCheckLine className="text-primary text-sm shrink-0" />
                          <span>{player}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <GameIntro
            name="من في الصورة؟"
            team={team}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text="تحدي الملاحظة البصرية: سنعرض لقطة من أرشيف كرة القدم التاريخي. كم لاعباً وشخصية تستطيع التعرف عليها في الصورة قبل كشف الأسماء؟"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhoInPicturePage;