'use client'
import React, { useContext, useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import { PlayerContext } from '@/app/Context/Games/PlayersContext';
import selectRandomObject from '@/utils/getUniqueObject';
import { motion } from 'framer-motion';
import GameIntro from '@/app/Components/GameIntro';

const Game = () => {
  const [show, setShow] = useState(false);
  const { player } = useContext(PlayerContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPlayer') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...player]);
  }, [player]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex flex-col items-center justify-center w-full">
      {lastSelected ? (
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <motion.div
            key={lastSelected?._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full space-y-4"
          >
            {lastSelected?.Clos.map((Clo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.4 }}
                className="border border-yellow-500 rounded-lg bg-white dark:bg-gray-800 text-yellow-600 p-6 shadow-md"
              >
                {Clo}
              </motion.div>
            ))}
          </motion.div>

          <button
            onClick={() => setShow(true)}
            className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition"
          >
            عرض الإجابة
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              selectRandomObject(player, remainingObjects, setLastSelected, setRemainingObjects, 'Player');
              setShow(false);
            }}
            className="text-yellow-600 text-3xl hover:text-yellow-700 transition"
          >
            <IoMdRefresh />
          </motion.button>
        </div>
      ) : (
        <GameIntro
          name="Player"
          team={player}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="هناك من 5 إلى 6 أدلة، والمهمة هي أن تخمن اللاعب. في حالة التخمين الخطأ، يكون الدليل القادم للفريق الآخر فقط."
        />
      )}

      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-[85%] max-w-xl text-center">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <IoIosClose />
            </button>
            <h2 className="text-3xl font-bold text-green-700 dark:text-yellow-400 tracking-wide">
              {lastSelected?.Answer}
            </h2>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Game;