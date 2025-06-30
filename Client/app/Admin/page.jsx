'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { PiGameControllerBold, PiUsersThreeBold } from 'react-icons/pi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { motion } from 'framer-motion'

const Page = () => {
  const Games = [
    { id: 1, name: 'Players', link: '/Admin/Players' },
    { id: 2, name: 'Password', link: '/Admin/Password' },
    { id: 3, name: 'Guss', link: '/Admin/Guss' },
    { id: 4, name: 'Bank', link: '/Admin/Bank' },
    { id: 5, name: 'Resk', link: '/Admin/Resk' },
    { id: 6, name: 'Offside', link: '/Admin/Offside' },
    { id: 7, name: 'Round', link: '/Admin/Round' },
    { id: 8, name: 'Auction', link: '/Admin/Auction' },
    { id: 9, name: 'Team', link: '/Admin/Team' },
  ]
  const { users } = useContext(AuthContext)

  return (
    <div className='min-h-screen w-full px-6 py-10 bg-gray-100 dark:bg-gray-900'>
      <h1 className='text-4xl text-center font-bold text-green-700 tracking-wide mb-10'>لوحة التحكم</h1>

      <section className='mb-14'>
        <div className='flex items-center gap-2 mb-4'>
          <PiGameControllerBold className='text-yellow-500 text-2xl' />
          <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>إدارة الألعاب</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
          {Games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className='bg-white dark:bg-gray-800 border border-yellow-500 rounded-xl p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md text-center'
            >
              <Link href={game.link} className='font-bold tracking-wide text-yellow-600 dark:text-yellow-400 hover:text-white'>
                {game.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <div className='flex items-center gap-2 mb-4'>
          <PiUsersThreeBold className='text-yellow-500 text-2xl' />
          <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>إدارة المستخدمين</h2>
        </div>
        <div className='grid grid-cols-2 gap-6'>
          <Link
            href='/Admin/Users'
            className='bg-white dark:bg-gray-800 border border-yellow-500 rounded-xl p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md text-center flex flex-col gap-2 items-center'
          >
            <span className='font-bold text-yellow-600 dark:text-yellow-400'>المستخدمون</span>
            <span className='text-lg font-semibold'>{users?.length || 0}</span>
          </Link>
          <Link
            href='/Admin/Admins'
            className='bg-white dark:bg-gray-800 border border-yellow-500 rounded-xl p-6 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md text-center flex flex-col gap-2 items-center'
          >
            <span className='font-bold text-yellow-600 dark:text-yellow-400'>المسؤولون</span>
            <span className='text-lg font-semibold'>{users?.filter((u) => u.isAdmain)?.length || 0}</span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Page
