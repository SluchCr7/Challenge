'use client'
import React, { useContext, useEffect, useState } from 'react';
import { IoMdRefresh } from "react-icons/io";
import { GussContext } from '@/app/Context/Games/GussContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
import { motion } from 'framer-motion';

const Guss = () => {
  const { data } = useContext(GussContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsGuss') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex items-center justify-center w-full">
      {lastSelected ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8 w-full max-w-3xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="border-2 border-yellow-500 bg-white dark:bg-gray-800 text-yellow-700 text-center text-lg font-bold tracking-wide rounded-xl p-6 shadow-md w-[90%]"
          >
            {lastSelected?.question}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-green-700 dark:text-yellow-400 font-semibold text-xl tracking-wider"
          >
            {lastSelected?.Answer}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Guss")}
            className="text-yellow-500 text-3xl hover:text-yellow-600 transition"
          >
            <IoMdRefresh />
          </motion.button>
        </motion.div>
      ) : (
        <GameIntro
          name="Guss"
          team={data}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="تظهر صورة واسم اللاعب بشكل عشوائي... لكل فريق محاولة لتعريف الزميل على اللاعب من خلال معلومة فقط."
        />
      )}
    </div>
  );
};

export default Guss;