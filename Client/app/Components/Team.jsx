import React, { useState } from 'react'
import { deleteItem } from '@/utils/DeleteItem'
import { MdDeleteOutline } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Image from 'next/image';
const Team = ({ team, index }) => {
    const [showPlayers , setShowPlayers] = useState(false)
  return (
    <div
        key={index}
        className="flex items-center justify-between gap-3 w-full p-5 relative"
    >
        <span className="text-white text-sm border-[1px] border-yellow-600 w-[40px] text-center p-2">
            {index + 1}
        </span>
        <Image onClick={()=> setShowPlayers(!showPlayers)} src={team.Photo[0].url} width={500} height={500} className='w-[500px] rounded-sm' alt="team" />
        <span className="text-white text-sm">{team.Name}</span>
        <MdDeleteOutline
        onClick={() => deleteItem("teams", team._id)}
        className="text-white text-2xl hover:text-red-600"
        />
        <div className={`${showPlayers ? "Result" : ""}`}>
            <div className={`${showPlayers ? "flex" : "hidden"} bg-black fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90%] md:w-[400px] flex-col items-center gap-3 border-[1px] border-yellow-600 p-5 rounded-md`}>
                <Image  src={team.Photo[0].url} width={500} height={500} className='w-[300px] rounded-sm' alt="team" />
                <span className="text-white text-sm tracking-[3px]">{team.Name}</span>
                <div className='flex items-center flex-col gap-3 border-t-[1px] border-yellow-600 py-4 w-full'>
                    <span className='text-yellow-600 text-sm uppercase tracking-[3px]'>Players</span>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {
                            team.TeamMembers.map((player , index) => {
                                return (
                                    <span key={index} className='text-white text-lg text-center'>{player}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <span className='absolute top-2 right-2' onClick={()=> setShowPlayers(false)}><IoIosClose/></span>
            </div>
        </div>
    </div>
  )
}

export default Team