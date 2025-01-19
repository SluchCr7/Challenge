'use client'
import { OffsideContext } from '@/app/Context/Games/OffsideContext';
import React, { useContext , useEffect} from 'react'
import { useState } from 'react';
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
import GameIntro from '@/app/Components/GameIntro';
const Page = () => {
    const {data} = useContext(OffsideContext)
    const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
    useEffect(() => {
      // Access localStorage only on the client side
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsOffside') : null;
      setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
    }, []);
  return (
    <div>
        {
            lastSelected ?
                <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
                    <span className='border-[1px] border-yellow-600 text-lg w-[80%] p-4 text-center text-yellow-700 font-bold'>{lastSelected?.Clo}</span>
                    <span><IoMdRefresh onClick={() => selectRandomObject(data, remainingObjects , setLastSelected , setRemainingObjects , "Offside")} className='text-2xl text-white cursor-pointer' /></span>
                </div>
                :
                <GameIntro name={"Offside"} team={data} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text={"اللعبه عبارة عن وصف للاعب يجب ان تكتب لاعب في وراقتك خلال 10 ثواني واذا كان الاسم الذي كتبته مشابه للاسم الذي كتبه زميلك او اي لاعب في الفريق الاخر لا تحتسب لك وللذي كتب نفس اللاعب"}/>
        }
    </div>
  )
}

export default Page