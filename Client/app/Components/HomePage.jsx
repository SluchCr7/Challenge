'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import Nav from './Nav'
import Profile from './Profile'
import DownlowdData from './DownlowdData'
const HomePage = () => {
    const games = [
        {
            id:1,
            title:"من اللاعب",
            link: "/Games/Whoplayer",
            state : "متاحة الان"
        },
        {
            id:2,
            title : "كلمة السر",
            link: "/Games/Password",
            state : "متاحة الان"
        },
        {
            id:3,
            title : "ريسك",
            link: "/Games/Resk",
            state : "متاحة الان"
        },
        {
            id:4,
            title : "بنك",
            link: "/Games/Bank",
            state : "متاحة الان"
        },
        {
            id:5,
            title : "اهبد صح",
            link: "/Games/Guss",
            state : "متاحة الان"
        },
        {
            id:6,
            title : "مين في الصورة",
            link: "/Games/whoinPicture",
            state : "متاحة الان"
        },
        {
            id: 7,
            title : "اوفسايد",
            link: "/Games/Offside",
            state : "متاحة الان"
        },
        {
            id: 8,
            title : "الدور",
            link: "/Games/Round",
            state : "متاحة الان"
        },
        {
            id: 9,
            title : "المزايدة",
            link: "/Games/Auction",
            state : "متاحة الان"
        }
    ]
    const { loginState} = useContext(AuthContext)
return (
    <div className='flex items-center flex-col gap-10 w-full justify-center min-h-[50vh]'>
        <span className="text-2xl md:text-4xl text-yellow-600 tracking-[3px] font-bold text-center">{process.env.NEXT_PUBLIC_TITLE}</span>
        {
            loginState
                    ?
                    <div className="flex items-center flex-col gap-4">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full'>
                            {
                                games.map(game => {
                                    return (
                                        <div key={game.id} className={`flex items-center flex-col gap-3 w-full ${game.state == "متاحة قريبا" ? "pointer-events-none " : ""}`}>
                                            <Link key={game.id} href={game.link} className={`md:w-[200px] w-[100%] text-center flex flex-col justify-center items-center ${game.state == "متاحة قريبا" ? "bg-gray-950" : "bg-yellow-700"} p-5 rounded-sm text-white font-bold`}>{game.title}</Link>
                                            <span className='text-yellow-600 text-sm'>{game.state}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            :
            <div className='flex items-center flex-col gap-3'>
                <DownlowdData/>
            </div>
        }
    </div>
  )
}

export default HomePage