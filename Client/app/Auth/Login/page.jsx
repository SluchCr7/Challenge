'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
const Login = () => {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const {loginState , user , Login} = useContext(AuthContext)
  return (
    <div className='flex items-center flex-col gap-4 justify-center w-full min-h-[70vh]'>
        <span className='text-2xl uppercase tracking-[5px] paragraph text-center'>Login</span>
        <form onSubmit={(e)=> Login(email , password , e)} action="" className='flex items-center flex-col gap-5 w-full'>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder='Email' className='w-[80%] md:w-[30%] bg-white p-5 rounded-lg text-black font-bold' />
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='Password' className='w-[80%] md:w-[30%] bg-white p-5 rounded-lg text-black font-bold' />
            <button className="w-[30%] p-3 mt-2 bg-white text-black font-bold">LOGIN</button>
            <span>New Account ? <Link className='text-yellow-600' href={'/Auth/Signup'}>Create New User</Link></span>
        </form>
    </div>
  )
}

export default Login