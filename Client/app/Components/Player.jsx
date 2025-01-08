'use client'
import { deleteItem } from '@/utils/DeleteItem';
import React from 'react'
import { useState } from 'react'
import { IoIosClose } from "react-icons/io";

const Player = ({ pla}) => {
    const [viewClow , setViewClow] = useState(false)
  return (
    <div className='w-full'>          
        <div key={pla._id} className='flex items-center flex-col gap-3 p-4 md:w-[500px] w-[100%] border-[1px] border-yellow-600'>
        <div className='flex items-center justify-between w-full'>
            <span>Name :</span>
            <span className='text-white text-sm'>{pla.Answer}</span>
        </div>
        <div className='flex items-center justify-between w-full'>
            <span>Num of Clos :</span>
            <span className='text-white text-sm'>{pla.Clos.length}</span>
        </div>
        <div className='flex items-center flex-col md:flex-row gap-3'>
            <button onClick={() => setViewClow(!viewClow)} className='border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600'>View Clos</button>
            <button onClick={()=> deleteItem("player", pla._id)} className='border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600'>Delete Player</button>
        </div>
        <div className={`Result ${viewClow ? "block" : "hidden"}`}>
            <div className='absolute flex items-end flex-col gap-3 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                {
                    pla.Clos.map((clo , index) => {
                    return (
                        <span key={index} className='text-white text-xs md:text-lg text-right font-bold'>{clo}</span>
                    )
                    })
                }
                <IoIosClose onClick={() => setViewClow(!viewClow)} className='text-4xl absolute top-[-40px] text-white cursor-pointer' />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Player