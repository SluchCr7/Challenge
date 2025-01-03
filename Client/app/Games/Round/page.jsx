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
  const [remainingObjects, setRemainingObjects] = useState([...data]);
  const [lastSelected, setLastSelected] = useState(null);
  const [showName, setShowName] = useState(false)
  const [passTeamOne, setPassTeamOne] = useState(false)
  const [passTeamTwo, setPassTeamTwo] = useState(false)
  const teams = [
    {
      id:1,
      name: "First Team",
      score: scoreTeamOne,
      setter : setScoreTeamOne
    },
    {
      id:2,
      name: "Second Team",
      score: scoreTeamTwo,
      setter: setScoreTeamTwo
    },
  ]
  const handleRefresh = () => {
    setCirclesUserOne([false  , false , false])
    setCirclesUserTwo([false, false, false])
    selectRandomObject(data, remainingObjects, setLastSelected, setRemainingObjects)
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
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      <div className='flex items-center justify-between md:w-[40%] w-[80%]'>
        {
          teams.map((team) => {
            return (
              <div key={team.id} className='flex items-center flex-col gap-3'>
                <span className='text-yellow-600 text-lg tracking-[5px] text-center'>{team.name}</span>
                <div className='flex items-center flex-col gap-2'>
                  <span>{team.score}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        lastSelected ?
          <div className='flex items-center flex-col gap-5 w-full'>
            <div className='flex items-center flex-col gap-3 w-full'>
              <span><IoMdRefresh onClick={()=> {handleRefresh() ; selectRandomObject(data, remainingObjects , setLastSelected , setRemainingObjects)}} className='text-2xl text-white cursor-pointer' /></span>
              <div className='border-[1px] border-yellow-700 p-6 md:w-[500px] w-[80%] rounded-md font-bold text-xl text-center'>
                <span>{lastSelected?.question}</span>
              </div>
              <div onClick={()=> setShowName(!showName)} className='flex items-center gap-2'>
                <span><FaArrowAltCircleDown className='text-xl text-white cursor-pointer' /></span>
                <span className='text-yellow-600 text-lg tracking-[3px]'>اسماء مقترحة</span>
              </div>
              <div className={showName ? 'menu menu_show' : 'menu menu_hidden'}>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 textAra'>
                  {
                    lastSelected?.examples.map((answer , index) => {
                      return (
                        <span key={index} className='text-white text-sm md:text-base text-center'>{answer}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className='flex items-center flex-col md:flex-row mt-5 gap-5 justify-between md:w-[40%] w-[80%]'>
              <TeamPoints team={teams[0]} pass={passTeamOne} setPass={setPassTeamOne} circles={circlesUserOne} setCircles={setCirclesUserOne} />
              <TeamPoints team={teams[1]} pass={passTeamTwo} setPass={setPassTeamTwo} circles={circlesUserTwo} setCircles={setCirclesUserTwo} />
            </div>
          </div>
          :
          <button onClick={()=> selectRandomObject(data, remainingObjects , setLastSelected , setRemainingObjects)} className='border-[1px] border-yellow-600 p-5 rounded-md text-yellow-600 font-bold'>Start New Game</button>
      }

    </div>
  )
}

export default Round