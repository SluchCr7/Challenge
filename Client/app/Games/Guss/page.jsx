'use client'
import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { IoMdRefresh } from "react-icons/io";
import { GussContext } from '@/app/Context/Games/GussContext';
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
const Guss = () => {
    const { data } = useContext(GussContext)
    const [remainingObjects, setRemainingObjects] = useState([]);
    const [lastSelected, setLastSelected] = useState(null);
    useEffect(() => {
        // Access localStorage only on the client side
        const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsGuss') : null;
        setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
    }, []);
    return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
        <div>
            {
                lastSelected ?
                    <div className="flex items-center gap-3 flex-col">
                        <div className='flex items-center flex-col gap-4'>
                            <span className='text-2xl text-yellow-600 border-[1px] tracking-[3px] border-yellow-600 p-6 w-[90%] text-center'>{lastSelected?.question}</span>
                            <span className='text-lg text-white'>{lastSelected?.Answer}</span>
                        </div>
                        <span><IoMdRefresh onClick={() => selectRandomObject(data , remainingObjects , setLastSelected , setRemainingObjects , "Guss")} className='text-2xl text-white cursor-pointer' /></span>
                    </div>
                    :
                    <GameIntro name="Guss" team={data} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text={"تظهر صورة واسم اللاعب بشكل عشوائي ... يكون لكل فريق محاولة لتعريف الزميل علي اللاعب من خلال معلومة عن اللاعب"}/>
            }
        </div>
    </div>
  )
}


export default Guss