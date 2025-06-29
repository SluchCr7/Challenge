'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { motion } from 'framer-motion'
import { PiSoccerBallBold } from 'react-icons/pi'

const HomePage = () => {
  const games = [
    { id: 1, title: 'من اللاعب', link: '/Games/Whoplayer', state: 'متاحة الان' },
    { id: 2, title: 'كلمة السر', link: '/Games/Password', state: 'متاحة الان' },
    { id: 3, title: 'ريسك', link: '/Games/Resk', state: 'متاحة الان' },
    { id: 4, title: 'بنك', link: '/Games/Bank', state: 'متاحة الان' },
    { id: 5, title: 'اهبد صح', link: '/Games/Guss', state: 'متاحة الان' },
    { id: 6, title: 'مين في الصورة', link: '/Games/whoinPicture', state: 'متاحة الان' },
    { id: 7, title: 'اوف سايد', link: '/Games/Offside', state: 'متاحة الان' },
    { id: 8, title: 'الدور', link: '/Games/Round', state: 'متاحة قريبا' },
    { id: 9, title: 'المزايدة', link: '/Games/Auction', state: 'متاحة قريبا' },
  ]

  const { loginState } = useContext(AuthContext)

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10 w-full px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-green-700 mb-6 tracking-wide">
        {process.env.NEXT_PUBLIC_TITLE || 'تحديات كرة القدم'}
      </h1>

      {loginState ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 w-full">
          {games.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: game.id * 0.1 }}
              className={`rounded-2xl shadow-lg overflow-hidden transition transform w-full hover:scale-105 ${
                game.state === 'متاحة قريبا' ? 'pointer-events-none opacity-10' : ''
              }`}
            >
              <Link href={game.link}>
                <div className="bg-white dark:bg-gray-800 p-6 flex flex-col items-center w-full justify-center text-center h-full">
                  <PiSoccerBallBold className="text-4xl text-yellow-500 mb-4" />
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {game.title}
                  </h2>
                  <span className="text-sm text-green-600 font-medium">{game.state}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
            قم بتسجيل الدخول لتجربة التحديات الكروية!
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition"
          >
            تسجيل الدخول
          </Link>
        </div>
      )}
    </div>
  )
}

export default HomePage
