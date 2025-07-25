'use client'
import React, { useContext, useState, useEffect } from 'react'
import GameIntro from '@/app/Components/GameIntro'
import { TopTenContext } from '@/app/Context/Games/TopTenContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { IoMdRefresh } from 'react-icons/io'

const Numbers = [1, 2, 3, 4, 5]

const Page = () => {
  const { topTenData } = useContext(TopTenContext)
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)

  // تخزين أو تحميل remainingObjects من localStorage
  useEffect(() => {
    if (topTenData && topTenData.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsTopTen') : null
      const parsed = stored ? JSON.parse(stored) : [...topTenData]
      setRemainingObjects(parsed)
    }
  }, [topTenData])

  // عند الضغط على "تحديث اللاعب"
  const handleRefresh = () => {
    selectRandomObject(topTenData, remainingObjects, setLastSelected, setRemainingObjects, 'TopTen')
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10 px-4 text-white relative'>
      {lastSelected ? (
        <div className='flex items-center flex-col gap-4 w-full'>
          {/* عرض العنوان */}
          <p className='text-center uppercase text-2xl text-yellow-400 tracking-wide'>{lastSelected?.title}</p>

          {/* عرض الأسئلة */}
          {Array.isArray(lastSelected.questions) && lastSelected.questions.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full'>
              {lastSelected.questions.map((q, index) => (
                <div
                  key={index}
                  className='bg-[#262626] hover:bg-green-700 text-white p-4 rounded-xl flex flex-col items-center justify-center text-center text-lg font-medium shadow border border-gray-600'
                >
                  <span>{index + 1}. {q.name}</span>
                  <span className='text-sm text-yellow-400'>Value: {q.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-red-400 text-center mt-4'>لا توجد بيانات لهذا السؤال</p>
          )}

          {/* زر التحديث */}
          <button
            onClick={handleRefresh}
            className='mt-6 flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-lg'
          >
            <IoMdRefresh className='text-xl' />
            <span>تحديث السؤال</span>
          </button>
        </div>
      ) : (
        <GameIntro
          name={'TopTen'}
          team={topTenData}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text='يظهر سؤال ويكون مطلوب أن تجد أكثر 10 لاعبين فعلوا هذا الإنجاز أو هدافين أو فرق، ومن 11 إلى 13 يكونوا سالب.'
        />
      )}
    </div>
  )
}

export default Page
