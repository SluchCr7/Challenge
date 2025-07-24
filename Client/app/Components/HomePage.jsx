'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { motion } from 'framer-motion'
import { PiSoccerBallBold } from 'react-icons/pi'
import { FaInfoCircle } from 'react-icons/fa'

const HomePage = () => {
  const games = [
    { id: 1, title: 'من اللاعب', link: '/Games/Whoplayer', state: 'متاحة الان', description: 'خمّن اللاعب بناءً على الأدلة المقدمة' },
    { id: 2, title: 'كلمة السر', link: '/Games/Password', state: 'متاحة الان', description: 'اكشف كلمة السر الخاصة بلاعب شهير' },
    { id: 3, title: 'ريسك', link: '/Games/Resk', state: 'متاحة الان', description: 'أسئلة بمستويات صعوبة متنوعة لاختبار معلوماتك الكروية' },
    { id: 4, title: 'بنك', link: '/Games/Bank', state: 'متاحة الان', description: 'جاوب بسرعة لتحصيل النقاط في وقت محدد' },
    { id: 5, title: 'اهبد صح', link: '/Games/Guss', state: 'متاحة الان', description: 'اعرض معلومة عن اللاعب وزميلك يخمّن' },
    { id: 6, title: 'مين في الصورة', link: '/Games/whoinPicture', state: 'متاحة الان', description: 'تعرف على اللاعبين في الصورة' },
    { id: 7, title: 'اوف سايد', link: '/Games/Offside', state: 'متاحة الان', description: 'اكتب اسم لاعب مختلف عن الآخرين في نفس اللحظة' },
    { id: 8, title: 'الدور', link: '/Games/Round', state: 'متاحة قريبا', description: 'قريباً: جولات متتابعة في تحدٍ سريع' },
    { id: 9, title: 'المزايدة', link: '/Games/Auction', state: 'متاحة قريبا', description: 'قريباً: راوغ وراهن في لعبة المزايدة الذكية' },
    { id: 10, title: 'توب 10', link: '/Games/Top10', state: 'متاحة قريبا', description: 'قريباً: يكون عليك تخمين من هم اكثر 10 لاعبين قاموا شئ معين مثل مشاركه او اهداف' },
    { id: 11, title: 'اسكور شيت', link: '/Games/Squad', state: 'متاحة قريبا', description: 'يتم عرض فريقين وكل فريق ياخ فريق من الاثنين ويكون مطالبا بتخميين اللاعبين في تشكيلة ذلك الفريق' },
  ]

  const { loginState } = useContext(AuthContext)

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8 px-4 w-full">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-green-700 mb-10 tracking-wide">
        {process.env.NEXT_PUBLIC_TITLE || 'تحديات كرة القدم'}
      </h1>

      {loginState ? (
        <div className="grid grid-cols-1 textAra sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: game.id * 0.1 }}
              className={`rounded-xl textAra shadow-md overflow-hidden transition transform hover:scale-105 border ${
                game.state === 'متاحة قريبا' ? 'pointer-events-none opacity-30 border-gray-400' : 'border-yellow-500'
              }`}
            >
              <Link href={game.link} className="block h-full">
                <div className="bg-white dark:bg-gray-800 p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start flex-col gap-3 mb-4">
                    <PiSoccerBallBold className="text-3xl text-yellow-500" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{game.title}</h2>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-start gap-2">
                  
                    {game.description}
                  </p>

                  <span className="text-xs font-semibold text-green-600 mt-auto text-right">{game.state}</span>
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
            href="/Auth/Login"
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
