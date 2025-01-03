'use client'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
const Page = () => {
    const Games = [
        {
            id: 1,
            name: "Players",
            link: "/Admin/Players"
        },
        {
            id: 2,
            name: "Password",
            link: "/Admin/Password"
        },
        {
            id: 3,
            name : "Guss",
            link: "/Admin/Guss"
        },
        {
            id: 4,
            name : "Bank",
            link: "/Admin/Bank"
        },
        {
            id: 5,
            name: "Resk",
            link: "/Admin/Resk"
        },
        {
            id: 6,
            name : "Offside",
            link: "/Admin/Offside"
        },
        {
            id: 7,
            name : "Round",
            link: "/Admin/Round"
        },
        {
            id: 8,
            name : "Auction",
            link: "/Admin/Auction"
        },
        {
            id: 9,
            name : "Team",
            link: "/Admin/Team"
        },
    ]
    const { users } = useContext(AuthContext)
    return (
    <div className='flex items-start p-5 flex-col gap-2 justify-center w-full min-h-[50vh]'>
        <span className='text-2xl text-yellow-600 tracking-[5px] text-center flex items-center justify-center w-full uppercase'>Admin Dashboard</span>
        <div className='flex items-center flex-col gap-5 w-full my-5'>
            <div className='relative'>
                <span className='text-white uppercase linkeffect tracking-[5px]'>Games</span>
            </div>
            <div className='flex items-center justify-center w-full mx-auto'>                 
                <div className='grid grid-cols-2 md:grid-cols-3 mx-auto w-full gap-3'>
                    
                    {
                        Games.map((game) => {
                            return (
                                <Link href={game.link} onClick={() => setTitle(game.name)} key={game.id} className='border-[1px] border-yellow-700 hover:bg-yellow-600 hover:text-white transition-all cursor-pointer duration-500 p-4 rounded-md w-[90%] mx-auto text-yellow-600 text-center font-bold'>
                                    <span>{game.name}</span>
                                </Link>  
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className='flex items-center flex-col gap-5 w-full my-5'>
            <div className='relative'>
                <span className='text-white uppercase linkeffect tracking-[5px]'>Users</span>
            </div>
            <div className='flex items-center justify-center w-full mx-auto'>                 
                <div className='grid grid-cols-2 mx-auto w-full gap-3'>
                    <Link href={"/Admin/Users"} className='border-[1px] flex items-center flex-col gap-2 border-yellow-700 hover:bg-yellow-600 hover:text-white transition-all cursor-pointer duration-500 p-4 rounded-md w-[90%] mx-auto text-yellow-600 text-center font-bold'>
                        <span>Users</span>
                        <span>{users?.length}</span>
                    </Link>  
                    <Link href={"/Admin/Admins"} className='border-[1px] flex items-center flex-col gap-2 border-yellow-700 hover:bg-yellow-600 hover:text-white transition-all cursor-pointer duration-500 p-4 rounded-md w-[90%] mx-auto text-yellow-600 text-center font-bold'>
                        <span>User Admin</span>
                        <span>{users?.filter((user) => user.isAdmain).length}</span>
                    </Link>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page