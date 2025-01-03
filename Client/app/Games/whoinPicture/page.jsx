'use client'
import React, { useContext } from 'react'
import { useState ,useEffect } from 'react'
import Image from 'next/image'
import { IoMdRefresh } from "react-icons/io";
import { FaArrowCircleDown } from "react-icons/fa";
import { PictureContext } from '@/app/Context/Games/PictureContext'
import selectRandomObject from '@/utils/getUniqueObject';
import GameIntro from '@/app/Components/GameIntro';
const Page = () => {
  const [showPlayers, setShowPlayers] = useState(false)
  const {team} = useContext(PictureContext)
  const [remainingObjects, setRemainingObjects] = useState([...team]);
  const [lastSelected, setLastSelected] = useState(null);
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      {
        lastSelected ? 
          <div className='flex items-center flex-col gap-4'>
            <div className='flex items-center gap-3 flex-col'> 
              <span className='text-yellow-600 text-lg text-center tracking-[3px]'>{lastSelected?.Name}</span>
              <Image src={lastSelected?.Photo[0].url} alt='team' width={1000} height={1000} className='md:w-[500px] w-[95%] h-[300px] rounded-md'/>
              <span onClick={()=> setShowPlayers(!showPlayers)}><FaArrowCircleDown className='text-2xl text-white cursor-pointer mt-4' /></span>
            </div>
            <div className={`${showPlayers ? "grid" : "hidden"}  w-full`}>
              <div className='flex items-center flex-col gap-2 justify-center w-full'>
                <span className='text-white text-xs tracking-[2px]'>Team Players</span>
                {
                  lastSelected?.TeamMembers.map((player , index) => {
                    return (
                      <span key={index} className='text-yellow-600 text-sm'>{player}</span>
                    )
                  })
                }
              </div>
            </div>
            <span onClick={()=> selectRandomObject(team , remainingObjects , setLastSelected , setRemainingObjects)}><IoMdRefresh  className='text-2xl text-white cursor-pointer' /></span>
          </div>
          :
          <GameIntro team={team} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={selectRandomObject}
            text={"تظهر صورة لفريق معين وعليك تخمين اللاعبين الموجودين في الصورة"}/>
      }
    </div>
  )
}

export default Page