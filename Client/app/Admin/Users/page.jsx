'use client'
import { AuthContext } from '@/app/Context/AuthContext'
import { deleteItem } from '@/utils/DeleteItem'
import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { MdAdminPanelSettings } from "react-icons/md";
import { ToastContainer } from 'react-toastify'
import { MdOutlineVerified } from "react-icons/md";

const Page = () => {
    const [searchValue, setSearchValue] = useState("")
    const { users, user } = useContext(AuthContext)
return (
    <>
        <ToastContainer />
        <div className='flex items-center justify-center w-full min-h-[100vh] p-5'>
            <div className="flex items-start gap-3 flex-col w-full md:w-[85%]">
                <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
                    <div className='relative'>
                        <span className='text-white uppercase linkeffect tracking-[5px]'>Users</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input placeholder='Search User' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" className='border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none' />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 w-full'>
                    {
                        users
                            .filter((person)=> person.Name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((user, index) => {
                            return (
                                <div key={index} className={`flex items-center flex-col gap-3 w-[80%] md:w-full p-5 border-[1px] border-yellow-600 rounded-md relative`}>
                                    <div className='absolute top-2 right-3 flex items-center gap-2'>
                                    {
                                        user.isAdmain &&
                                            <span className=' text-yellow-600'><MdAdminPanelSettings/></span>  
                                    }
                                    {
                                        user.isVerify &&
                                            <span className=' text-yellow-600'><MdOutlineVerified /></span>
                                        
                                    }
                                    </div>
                                    <Image src={user.profilePhoto?.url} alt='profilePhoto' width={100} height={100} className='w-[50px] h-[50px] rounded-full'/>
                                    <span className='text-xl font-bold  text-yellow-600'>{user.Name}</span>
                                    <div className='w-full flex items-center justify-center flex-col md:flex-row gap-3'>
                                        {/* <button onClick={() => makeUserAdmin(user._id)} className='border-[1px] capitalize border-yellow-600 p-4 text-yellow-600 w-full text-sm'>{user.isAdmain ? "remove Admain" : "Make Admain"}</button> */}
                                        <button onClick={() => deleteItem("auth",user._id)} className='border-[1px] text-sm border-yellow-600 p-4 text-yellow-600 w-full'>Delete User</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Page