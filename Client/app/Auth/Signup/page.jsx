'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
const SignUp = () => {
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name , setName] = useState("")
    const {registerNewUser} = useContext(AuthContext)
  return (
    <div className='flex items-center flex-col gap-4 justify-center w-full min-h-[100vh]'>
        <span className='text-white text-lg tracking-[3px] paragraph text-center'>Create Your Account</span>
        <form onSubmit={(e)=> registerNewUser(name , email , password , e)} action="" className='flex items-center flex-col gap-5 w-full'>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Email' className='w-[80%] md:w-[30%] bg-white p-5 rounded-lg text-black font-bold' />
            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder='Name' className='w-[80%] md:w-[30%] bg-white p-5 rounded-lg text-black font-bold' />
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' className='w-[80%] md:w-[30%] bg-white p-5 rounded-lg text-black font-bold' />
            <button className="w-[30%] mt-2 p-3 bg-white text-black font-bold">Register</button>
            <span>You Have an Account ? <Link className='text-yellow-600' href={'/Auth/Login'}>Login</Link></span>
        </form>
    </div>
  )
}

export default SignUp