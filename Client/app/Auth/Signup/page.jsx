'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdPersonAddAlt1 } from 'react-icons/md'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { registerNewUser } = useContext(AuthContext)

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6'
      >
        <div className='flex items-center gap-2'>
          <MdPersonAddAlt1 className='text-3xl text-yellow-500' />
          <h1 className='text-2xl font-bold text-green-700 tracking-wider'>إنشاء حساب جديد</h1>
        </div>

        <form
          onSubmit={(e) => registerNewUser(name, email, password, e)}
          className='w-full flex flex-col gap-4'
        >
          <input
            type='text'
            placeholder='الاسم الكامل'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-4 rounded-lg border border-yellow-500 bg-transparent text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
            required
          />

          <input
            type='email'
            placeholder='البريد الإلكتروني'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-4 rounded-lg border border-yellow-500 bg-transparent text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
            required
          />

          <input
            type='password'
            placeholder='كلمة المرور'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-4 rounded-lg border border-yellow-500 bg-transparent text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600'
            required
          />

          <button
            type='submit'
            className='bg-yellow-500 hover:bg-yellow-600 transition text-white font-bold py-3 rounded-lg w-full'
          >
            تسجيل
          </button>
        </form>

        <p className='text-sm text-gray-600 dark:text-gray-300'>
          لديك حساب بالفعل؟{' '}
          <Link href='/Auth/Login' className='text-yellow-600 hover:underline font-semibold'>
            تسجيل الدخول
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp
