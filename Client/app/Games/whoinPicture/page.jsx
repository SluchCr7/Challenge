'use client'
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdRefresh } from "react-icons/io";
import { FaArrowCircleDown } from "react-icons/fa";
import { PictureContext } from '@/app/Context/Games/PictureContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
import { motion } from 'framer-motion';

const Page = () => {
  const [showPlayers, setShowPlayers] = useState(false);
  const { team } = useContext(PictureContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPicture') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...team]);
  }, [team]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex flex-col items-center justify-center w-full">
      {lastSelected ? (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <h2 className="text-2xl font-extrabold tracking-widest text-yellow-500 text-center">
              {lastSelected?.Name}
            </h2>
            <Image
              src={lastSelected?.Photo[0].url}
              alt="team"
              width={1000}
              height={1000}
              className="w-full md:w-[600px] h-[400px] rounded-2xl object-cover shadow-lg"
            />
            <button onClick={() => setShowPlayers(!showPlayers)}>
              <FaArrowCircleDown className="text-3xl text-yellow-500 hover:text-yellow-600 transition cursor-pointer" />
            </button>
          </motion.div>

          {showPlayers && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-center text-green-700 dark:text-yellow-400 font-bold mb-4">اللاعبين في الصورة</h3>
              <div className="flex flex-wrap gap-3 items-center justify-center">
                {lastSelected?.TeamMembers.map((player, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold shadow"
                  >
                    {player}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              selectRandomObject(team, remainingObjects, setLastSelected, setRemainingObjects, "Picture");
              setShowPlayers(false);
            }}
            className="text-yellow-500 text-3xl hover:text-yellow-600 transition"
          >
            <IoMdRefresh />
          </motion.button>
        </div>
      ) : (
        <GameIntro
          name="Picture"
          team={team}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="تظهر صورة لفريق معين وعليك تخمين اللاعبين الموجودين في الصورة"
        />
      )}
    </div>
  );
};

export default Page;