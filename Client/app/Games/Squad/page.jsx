'use client'
import React, { useContext, useEffect, useState } from 'react'
import { SquadContext } from '../../Context/Games/SquadContext'
import { IoMdRefresh } from 'react-icons/io'
import GameIntro from '@/app/Components/GameIntro'
import selectRandomObject from '@/utils/getUniqueObject'

const Page = () => {
  const { squads } = useContext(SquadContext)
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [remainingObjects, setRemainingObjects] = useState([])
  const [lastSelected, setLastSelected] = useState(null)
  const [selectedPlayersTeamOne , setSelectedPlayersTeamOne] = useState([])
  const [selectedPlayersTeamTwo , setSelectedPlayersTeamTwo] = useState([])
  useEffect(() => {
    if (squads && squads.length) {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectssquad') : null
      const parsed = stored ? JSON.parse(stored) : [...squads]
      setRemainingObjects(parsed)
    }
  }, [squads])

  const handleRefresh = () => {
    selectRandomObject(squads, remainingObjects, setLastSelected, setRemainingObjects, 'squad')
    setValueTeamOne(0)
    setValueTeamTwo(0)
  }

  const addPointToTeamOne = () => setValueTeamOne(prev => prev + 1)
  const addPointToTeamTwo = () => setValueTeamTwo(prev => prev + 1)

  return (
    <div className="min-h-screen py-10 px-4 text-white flex flex-col items-center justify-center">
      {lastSelected ? (
        <>
          {/* العنوان الرئيسي */}
          <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-10">
            {lastSelected?.title}
          </h1>

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* الفريق الأول */}
            <div className="bg-white shadow-lg rounded-2xl p-6 relative">
              {/* النقاط */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-3">
                <span className="font-semibold text-lg">نقاط: {valueTeamOne}</span>
                <button
                  onClick={addPointToTeamOne}
                  className="bg-white text-purple-700 px-3 py-1 rounded-full font-bold text-sm hover:bg-purple-100"
                >
                  +1
                </button>
              </div>
              <h2 className="text-xl font-semibold text-center text-purple-700 mb-6 mt-6">
                {lastSelected?.TeamOne?.name}
              </h2>
              <ul className="space-y-2 text-center text-gray-800 font-medium">
                {lastSelected?.TeamOne?.members.map((player, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedPlayersTeamOne([...selectedPlayersTeamOne, player]);
                      setValueTeamOne((prev)=> prev + 1)
                    }}
                    className={`${selectedPlayersTeamOne.includes(player) ? "line-through text-gray-600 pointer-events-none" : "text-black"}`}
                  >
                    {player}
                  </li>
                ))}
              </ul>
            </div>

            {/* الفريق الثاني */}
            <div className="bg-white shadow-lg rounded-2xl p-6 relative">
              {/* النقاط */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full shadow-md flex items-center gap-3">
                <span className="font-semibold text-lg">نقاط: {valueTeamTwo}</span>
                <button
                  onClick={addPointToTeamTwo}
                  className="bg-white text-red-700 px-3 py-1 rounded-full font-bold text-sm hover:bg-red-100"
                >
                  +1
                </button>
              </div>
              <h2 className="text-xl font-semibold text-center text-red-700 mb-6 mt-6">
                {lastSelected?.TeamTwo?.name}
              </h2>
              <ul className="space-y-2 text-center text-gray-800 font-medium">
                {lastSelected?.TeamTwo?.members.map((player, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedPlayersTeamTwo([...selectedPlayersTeamTwo, player]);
                      setValueTeamTwo((prev) => prev + 1)
                    }}
                    className={`${selectedPlayersTeamTwo.includes(player) ? "line-through text-gray-600 pointer-events-none" : "text-black"}`}
                  >
                    {player}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* زر التحديث */}
          <button
            onClick={handleRefresh}
            className='mt-12 flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-xl'
          >
            <IoMdRefresh className='text-2xl' />
            <span>تحديث التشكيلة</span>
          </button>
        </>
      ) : (
        <GameIntro
          name={'squad'}
          team={squads}
          selectRandomObject={selectRandomObject}
          remainingObjects={remainingObjects}
          setLastSelected={setLastSelected}
          setRemainingObjects={setRemainingObjects}
          text='يتم عرض تشكيلتين .. وكل فريق يختار تشكيلة لكي يخمن اسماء الموجوده فيها ومن يجمع اكبر عدد نقاط يفوز'
        />
      )}
    </div>
  )
}

export default Page
