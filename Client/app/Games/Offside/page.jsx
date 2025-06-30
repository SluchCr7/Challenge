'use client'
import { OffsideContext } from '@/app/Context/Games/OffsideContext';
import React, { useContext, useEffect, useState } from 'react';
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
import GameIntro from '@/app/Components/GameIntro';
import { motion } from 'framer-motion';

const Page = () => {
  const { data } = useContext(OffsideContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsOffside') : null;
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="border-2 border-yellow-500 bg-white dark:bg-gray-800 text-yellow-700 text-center text-lg font-bold tracking-wide rounded-xl p-6 shadow-md w-[85%]"
          >
            {lastSelected?.Clo}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Offside")}
            className="text-yellow-500 text-3xl hover:text-yellow-600 transition"
          >
            <IoMdRefresh />
          </motion.button>
        </motion.div>
      ) : (
        <GameIntro
          name="Offside"
          team={data}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="اللعبة عبارة عن وصف للاعب، يجب أن تكتب اسم لاعب في ورقتك خلال 10 ثوانٍ. إذا كان الاسم مطابقًا لاسم كتبه زميلك أو أي لاعب من الفريق الآخر، فلا تحتسب لك النقطة."
        />
      )}
    </div>
  );
};

export default Page;
