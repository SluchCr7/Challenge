'use client'
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import Image from 'next/image'
import { PassContext } from '@/app/Context/Games/PassContext'
import GameIntro from '@/app/Components/GameIntro';
const Password = () => {
    const { pass } = useContext(PassContext)
    const [remainingObjects, setRemainingObjects] = useState([...pass]);
    const [lastSelected, setLastSelected] = useState(null);
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
        <div className='flex items-center flex-col gap-3'>
          {
            lastSelected ? 
              <div className="flex items-center gap-3 flex-col">
                <Image src={lastSelected?.Photo[0].url} width={1000} height={1000} alt='player' className='rounded-md md:w-[400px] w-[80%] h-[400px]' />
                <p className='text-center uppercase w-[70%] text-lg text-white'>{lastSelected?.name}</p>
                <span><IoMdRefresh onClick={() => selectRandomObject(pass, remainingObjects , setLastSelected , setRemainingObjects)} className='text-2xl text-white cursor-pointer' /></span>
              </div>
              : 
              <GameIntro team={pass} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text='تظهر صورة واسم اللاعب بشكل عشوائي ... يكون لكل فريق محاولة لتعريف الزميل علي اللاعب من خلال معلومة عن اللاعب' />
          }
        </div>
    </div>
  )
}

export default Password