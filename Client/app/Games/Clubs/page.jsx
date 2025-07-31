'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ClubsContext } from '@/app/Context/Games/ClubsContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion } from 'framer-motion'
import GameIntro from '@/app/Components/GameIntro'

const Page = () => {
  const { data } = useContext(ClubsContext)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (data?.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsclubs') : null
      const parsed = stored ? JSON.parse(stored) : [...data]
      setRemainingObjects(parsed)
    }
  }, [data])

  const handleRefresh = () => {
    setShowAnswer(false)
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, 'clubs')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 textAra">
      {lastSelected ? (
        <div className="flex flex-col items-center gap-10 w-full max-w-6xl mx-auto">
          {/* عنوان اللعبة */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center w-full"
          >
            <h1 className="text-2xl md:text-4xl font-extrabold text-green-700 dark:text-green-400">
              🧠 رتب المسيرة – من لعب في هذه الأندية؟
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">هل يمكنك معرفة اللاعب من خلال مسيرته؟</p>
          </motion.div>

          {/* عرض الأندية */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            {lastSelected.teams.map((club, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md p-5 text-center flex flex-col items-center justify-center"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">#{index + 1}</span>
                <span className="text-base font-bold text-gray-800 dark:text-white">{club}</span>
              </motion.div>
            ))}
          </div>

          {/* زر رؤية اللاعب */}
          {!showAnswer ? (
            <motion.button
              onClick={() => setShowAnswer(true)}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition-all"
            >
              👀 رؤية اللاعب
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-green-700 dark:text-green-400 mt-6"
            >
              🧍 اللاعب هو: <span className="underline decoration-dotted">{lastSelected.name}</span>
            </motion.div>
          )}

          {/* زر لاعب جديد */}
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-md mt-10 transition-all"
          >
            🔄 لاعب جديد
          </motion.button>
        </div>
      ) : (
        <GameIntro
          name="clubs"
          team={data}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text="يظهر لك ترتيب الأندية التي لعب لها لاعب معين. هل يمكنك أن تعرف من هو؟ اضغط لرؤية اللاعب، ثم انتقل إلى التالي!"
        />
      )}
    </div>
  )
}

export default Page
