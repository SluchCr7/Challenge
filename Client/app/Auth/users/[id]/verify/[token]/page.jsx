'use client'
import { AuthContext } from '@/app/Context/AuthContext';
import React, { useContext, useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import Link from 'next/link';
import DownlowdData from '@/app/Components/DownlowdData';

const Page = ({ params }) => {
    const {id , token} = params
    // const [isVerify, setIsVerify] = useState(false)
    const { verifyAccount , isVerify } = useContext(AuthContext)
    useEffect(() => {
        if (!isVerify) {
            verifyAccount(id , token)
        }
    },[isVerify])
  return (
    <div className='flex items-center flex-col justify-center gap-5 w-full min-h-[100vh]'>
        <span className='paragraph text-2xl font-bold tracking-[3px]'>Verify Your Account</span>
        {
            isVerify ?
            <div className='flex items-center flex-col gap-3'>
                <span className='text-green-600 font-bold uppercase tracking-[4px] text-lg'>Your Account Verified Successfuly</span>
                <span className="text-green-500 text-5xl"><FaCircleCheck/></span>
                <Link href={'/Auth/Login'} className='border-[1px] border-yellow-600 p-3 md:w-[400px] w-[80%] text-center rounded-md'>Login Now</Link>
            </div>
            :
            // <div className='flex items-center flex-col gap-3'>
            //     <span className='text-red-600 font-bold uppercase tracking-[4px] text-lg'>Your Account Not Verified</span>
            //     <span className="text-red-600 text-5xl"><IoIosClose/></span>
              // </div>
            <DownlowdData/>
        }
    </div>
  )
}

export default Page