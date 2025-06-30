'use client'
import TeamPoints from '@/app/Components/TeamPoints';
import { RoundContext } from '@/app/Context/Games/RoundContext';
import React, { useContext, useState , useEffect} from 'react'
import { IoMdRefresh } from "react-icons/io";
import selectRandomObject from '@/utils/getUniqueObject';
import { FaArrowAltCircleDown } from "react-icons/fa";

const Round = () => {
  const [scoreTeamOne , setScoreTeamOne] = useState(0)
  const [scoreTeamTwo, setScoreTeamTwo] = useState(0)
  const [circlesUserOne , setCirclesUserOne] = useState([false  , false , false])
  const {data} = useContext(RoundContext)
  const [circlesUserTwo, setCirclesUserTwo] = useState([false, false, false])
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showName, setShowName] = useState(false)
  const [passTeamOne, setPassTeamOne] = useState(false)
  const [passTeamTwo, setPassTeamTwo] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsRound') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, []);

  const teams = [
    {
      id:1,
      name: "الفريق الأول",
      score: scoreTeamOne,
      setter : setScoreTeamOne
    },
    {
      id:2,
      name: "الفريق الثاني",
      score: scoreTeamTwo,
      setter: setScoreTeamTwo
    },
  ]

  const handleRefresh = () => {
    setCirclesUserOne([false  , false , false])
    setCirclesUserTwo([false, false, false])
    setPassTeamOne(false)
    setPassTeamTwo(false)
  }

  useEffect(() => {
    if (circlesUserOne.every((state) => state === true)){
      setScoreTeamTwo(scoreTeamTwo + 1)
      handleRefresh()
      selectRandomObject(data, remainingObjects , setLastSelected , setRemainingObjects)
    }
    if (circlesUserTwo.every((state) => state === true)){
      setScoreTeamOne(scoreTeamOne + 1)
      handleRefresh()
      selectRandomObject(data, remainingObjects , setLastSelected , setRemainingObjects)
    }
  }, [circlesUserOne , circlesUserTwo])

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10 px-4 bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-5xl'>
        <h1 className='text-center text-3xl md:text-4xl font-bold text-yellow-600 tracking-wider mb-8'>تحدي الدور</h1>

        {lastSelected ? (
          <div className='space-y-10 w-full'>
            <div className='flex items-center w-full justify-between text-center text-lg font-semibold text-white mb-4'>
              <div className='flex flex-col gap-2'>
                <span className='text-yellow-500'>{teams[0].name}</span>
                <span>{teams[0].score}</span>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-yellow-500'>{teams[1].name}</span>
                <span>{teams[1].score}</span>
              </div>
            </div>

            <div className='text-center'>
              <button onClick={() => { handleRefresh(); selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round") }} className='text-3xl text-yellow-500 hover:text-yellow-400 transition'>
                <IoMdRefresh />
              </button>
            </div>

            <div className='bg-white dark:bg-gray-800 border border-yellow-500 p-6 rounded-lg text-center shadow text-xl font-semibold text-gray-800 dark:text-white'>
              {lastSelected?.question}
            </div>

            <div onClick={() => setShowName(!showName)} className='flex items-center justify-center gap-2 cursor-pointer'>
              <FaArrowAltCircleDown className='text-yellow-500 text-xl' />
              <span className='text-yellow-500 font-medium tracking-wide'>أسماء مقترحة</span>
            </div>

            {showName && (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center'>
                {lastSelected?.examples.map((answer, index) => (
                  <span key={index} className='bg-gray-800 text-white py-2 px-3 rounded-lg text-sm'>{answer}</span>
                ))}
              </div>
            )}

            <div className='flex flex-col md:flex-row justify-evenly items-center w-full gap-6'>
              <TeamPoints team={teams[0]} pass={passTeamOne} setPass={setPassTeamOne} circles={circlesUserOne} setCircles={setCirclesUserOne} />
              <TeamPoints team={teams[1]} pass={passTeamTwo} setPass={setPassTeamTwo} circles={circlesUserTwo} setCircles={setCirclesUserTwo} />
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <button onClick={() => selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects, "Round")} className='bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl font-bold text-lg transition'>
              بدء اللعبة
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Round;