'use client'
import React, { useContext, useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import { useState } from 'react';
import { PlayerContext } from '@/app/Context/Games/PlayersContext';
import selectRandomObject from '@/utils/getUniqueObject';
import { motion } from 'framer-motion';
import GameIntro from '@/app/Components/GameIntro';
const Game = () => {
  const [show, setShow] = useState(false)
  const { player } = useContext(PlayerContext)
  const [remainingObjects, setRemainingObjects] = useState([...player]);
  const [lastSelected, setLastSelected] = useState(null);
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      {
        lastSelected ? 
          <div className='flex items-center flex-col gap-3'>
            {
              lastSelected?.Clos.map((Clo , index) => {
                return (
                  <motion.div initial={{ opacity: 0 , y: 50 }} animate={{ opacity: 1 , y: 0 }} transition={{ duration: 2 , delay : index * 2 }}  key={index}  className='w-[90%] text-right bg-white p-5 rounded-lg text-black font-bold'>
                    {Clo}
                  </motion.div>
                )
              })
            }
            <button onClick={()=> setShow(true)} className='border-[1px] border-yellow-600 p-3 rounded-md font-bold'>Show Answer</button>
            <div className={`Result ${show ? "flex" : "hidden"}`}>
              <div className={`flex text-center items-center bg-white text-black md:w-[500px] w-[80%] p-9 rounded-md absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>
                <span className='text-2xl tracking-[3px] flex items-center justify-center w-full'>{lastSelected?.Answer}</span>
                <span className='absolute top-1 right-2 text-2xl' onClick={()=> setShow(false)}><IoIosClose/></span>
              </div>
            </div>
            <span className='text-lg text-yellow-600 cursor-pointer' onClick={()=> { selectRandomObject(player , remainingObjects , setLastSelected , setRemainingObjects) } }><IoMdRefresh/></span>
          </div>
          :
          <>
            <GameIntro team={player} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text='هناك من 5 الي 6 ادلة والمهمة هي ان تخمن اللاعب وفي حالة التخمين الخطا يكون الدليل القادم للفريق الاخر فقط ' />
          </>
      }
    </div>
  )
}

export default Game