'use client'
import Image from 'next/image'
import React, { useContext, useEffect , useState } from 'react'
import { CiSettings } from "react-icons/ci";
import { AuthContext } from '../Context/AuthContext';
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";

const Nav = ({setShowProfile}) => {
  const { loginState, user  , Logout} = useContext(AuthContext)
  const [show , setShow] = useState(false)
  return (
    <div className='flex relative w-full items-center justify-between py-4 px-7 gap-4'>
      <Link href={"/"} className='main_heading text-lg font-bold tracking-[4px]'>Challenge</Link>
        <div className='relative'>
            {
              loginState?
              <>
                  <Image src={user?.profilePhoto?.url} onClick={()=> setShow(!show)}  alt='logo' width={100} height={100} className='w-[40px] h-[40px] rounded-full'/>
              </>
              :
              <>
                <Link href={'/Auth/Login'} className='text-yellow-600 font-bold text-lg border-[1px] border-yellow-600 px-2 py-1 rounded-md hover:bg-yellow-600 hover:text-white transition-all duration-500'>LOG IN</Link>
              </>
            }
            <div className='absolute right-2 top-3 '>
                <div className={`${show ? "flex" : "hidden"} flex-col items-start absolute gap-7 top-14 right-0 p-4 bg-black border-[1px] border-yellow-700 z-[999] rounded-lg w-[200px]`  }>
                  <div onClick={() => { setShowProfile(true); setShow(false) }} className='flex cursor-pointer items-center justify-between w-full '>
                    <span className='text-yellow-600 text-sm'>Profile</span>
                    <span className='text-white text-xs tracking-[2px]'><CiUser/></span>
                  </div>
                  {
                    user.isAdmain &&
                    <Link href={'/Admin'} className='flex items-center cursor-pointer justify-between w-full '> 
                      <span  className="text-yellow-600 text-sm">Admin </span>
                      <span className="text-white text-sm"><CiSettings/></span>
                    </Link>
                  }
                  <div onClick={Logout} className='flex items-center cursor-pointer justify-between w-full '> 
                    <span  className="text-yellow-600 text-sm">Logout </span>
                    <span className="text-white text-sm"><IoIosLogOut/></span>
                  </div>
                  <Link href={'/Contact'} className='flex items-center cursor-pointer justify-between w-full '> 
                    <span  className="text-yellow-600 text-sm">Contact </span>
                    <span className="text-white text-sm"><IoIosCall/></span>
                  </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nav