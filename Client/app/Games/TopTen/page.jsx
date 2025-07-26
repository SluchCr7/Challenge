'use client'
import React, { useContext, useState, useEffect } from 'react'
import GameIntro from '@/app/Components/GameIntro'
import { TopTenContext } from '@/app/Context/Games/TopTenContext'
import selectRandomObject from '@/utils/getUniqueObject'
import { IoMdRefresh } from 'react-icons/io'

const Page = () => {
  const { topTenData } = useContext(TopTenContext)
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [answeredCards, setAnsweredCards] = useState([])
  const [round , setRound] = useState(1)
  useEffect(() => {
    if (topTenData && topTenData.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsTopTen') : null
      const parsed = stored ? JSON.parse(stored) : [...topTenData]
      setRemainingObjects(parsed)
    }
  }, [topTenData])

  const handleRefresh = () => {
    setAnsweredCards([]) // تصفير الكروت المجابة عند اختيار سؤال جديد
    selectRandomObject(topTenData, remainingObjects, setLastSelected, setRemainingObjects, 'TopTen')
  }

  const handleCardClick = (index, value) => {
    if (answeredCards.includes(index)) return
    setRound(round = 1 ?  2 : 1)
    if (round = 1) setValueTeamOne(prev => prev + value)
    else setValueTeamTwo(prev => prev + value)

    setAnsweredCards(prev => [...prev, index])
  }

  const questionKeys = [
    'questionOne', 'questionTwo', 'questionThree', 'questionFour', 'questionFive',
    'questionSix', 'questionSeven', 'questionEight', 'questionNine', 'questionTen',
    'questionEleven', 'questionTwelve', 'questionThirteen'
  ]

  return (
    <div className='min-h-screen py-10 px-4 bg-[#121212] text-white flex items-center justify-center'>
      {lastSelected ? (
        <div className='flex flex-col items-center w-full max-w-6xl gap-6'>

          {/* نقاط الفرق */}
          <div className='flex flex-wrap items-center justify-center gap-6 w-full'>
            <div className='bg-blue-900 p-4 rounded-2xl text-center w-40 shadow-md'>
              <h3 className='text-xl font-bold text-blue-300'>Team One</h3>
              <p className='text-3xl font-extrabold text-white mt-1'>{valueTeamOne}</p>
            </div>
            <div className='bg-red-900 p-4 rounded-2xl text-center w-40 shadow-md'>
              <h3 className='text-xl font-bold text-red-300'>Team Two</h3>
              <p className='text-3xl font-extrabold text-white mt-1'>{valueTeamTwo}</p>
            </div>
          </div>

          {/* العنوان */}
          <h2 className='text-yellow-400 text-2xl font-bold tracking-wider text-center'>
            {lastSelected?.title}
          </h2>

          {/* الكروت */}
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full'>
            {questionKeys.map((key, index) => {
              const question = lastSelected[key]
              const isAnswered = answeredCards.includes(index)

              return question ? (
                <div
                  key={index}
                  onClick={() => handleCardClick(index, question.value)}
                  className={`cursor-pointer p-4 rounded-2xl shadow-md text-center font-semibold text-white transition duration-200 border
                    ${isAnswered
                      ? 'bg-green-700 border-green-600 opacity-70 pointer-events-none'
                      : 'bg-[#1f1f1f] hover:bg-green-800 border-gray-600'
                    }`}
                >
                  <p className='text-base'>
                    {index + 1}. {question.name}
                  </p>
                  <p className='text-sm text-yellow-400'>Value: {question.value}</p>
                </div>
              ) : null
            })}
          </div>

          {/* زر التحديث */}
          <button
            onClick={handleRefresh}
            className='mt-6 flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-lg'
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
