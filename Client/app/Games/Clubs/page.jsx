'use client'

import GameIntro from '@/app/Components/GameIntro'
import { ClubsContext } from '@/app/Context/Games/ClubsContext'
import React, { useContext, useEffect, useState } from 'react'
import selectRandomObject from '@/utils/getUniqueObject'
import { motion } from 'framer-motion'

const Page = () => {
  const { data } = useContext(ClubsContext)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (data && data.length) {
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
    <div className="min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900 textAra">
      {lastSelected ? (
        <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
            رتب المسيرة – من لعب في هذه الأندية؟
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {lastSelected.teams.map((club, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center text-sm font-semibold text-gray-700 dark:text-white border border-gray-300"
              >
                <span className="block text-xs text-gray-500 mb-1">{index + 1}</span>
                {club}
              </motion.div>
            ))}
          </div>

          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)} className="mt-6 bg-green-700 hover:bg-green-800">
              رؤية اللاعب
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-green-600 mt-4"
            >
              اللاعب هو: <span className="underline decoration-dotted">{lastSelected.name}</span>
            </motion.div>
          )}

          <button
            onClick={handleRefresh}
            className="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
          >
            لاعب جديد
          </button>
        </div>
      ) : (
        <GameIntro
          name={'clubs'}
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
