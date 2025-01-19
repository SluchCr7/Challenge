'use client'
import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
import { AuctionContext } from '@/app/Context/Games/AuctionContext';
import GameIntro from '@/app/Components/GameIntro';
const Auction = () => {
  const [numAuction, setNumAuction] = useState(0)
  const [button , setButton] = useState("")
  const [questionMode, setQuestionMode] = useState(false)
  const [teamChose, setTeamChose] = useState("")
  const [time, setTime] = useState(30)
  const [isRunning, setIsRunning] = useState(false);
  const [teamOneScore , setTeamOneScore] = useState(0)
  const [teamTwoScore , setTeamTwoScore] = useState(0)
  const intervalRef = useRef(null); // To keep track of the interval ID
  const {auction} = useContext(AuctionContext)
    const [remainingObjects, setRemainingObjects] = useState([]
  );
  const [lastSelected, setLastSelected] = useState(null);
  useEffect(() => {
    // Access localStorage only on the client side
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsAuction') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...auction]);
  }, []);
  const startTimer = () => {
    if (isRunning) return; // Prevent restarting the timer while running
    setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current); // Stop the timer when it reaches 0
            setIsRunning(false);
            return 0;
          }
          return prev - 1; // Decrease the timer by 1 second
        });
      }, 1000);
  }
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }
  const handleMinus = () => {
    setNumAuction(numAuction - 1)
    if (time >= 1) {
      if (numAuction == 1) {
        if (teamChose == "First") {
          setTeamOneScore(teamOneScore + 1)
        } else {
          setTeamTwoScore(teamTwoScore + 1)
        }
        stopTimer();
      }
    }
  }
  useEffect(() => {
    if(time < 1){
      if (numAuction > 0) {
        if (teamChose == "First") {
          setTeamTwoScore(teamTwoScore + 1)
        } else {
          setTeamOneScore(teamOneScore + 1)
        }
      }
    }
  },[time , numAuction , teamChose])
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      {
        lastSelected ?
          <>
            <div className='flex items-center gap-5'>
              {
                questionMode ? 
                  isRunning ?
                  <span className='border-[1px] border-yellow-600 w-[50px] h-[50px] rounded-full p-3 text-center'>{time}</span>
                : 
                  <button onClick={startTimer} className='border-[1px] border-yellow-600 w-[150px] p-3 text-center'>Start Time</button>
                :
                  <></>
              }
            </div>
            <div className='w-[90%] md:w-[50%] flex items-center  justify-between'>
              <div className='flex items-center flex-col gap-3'>
                <span className='uppercase text-yellow-600 text-center tracking-[3px]'>First Team</span>
                <span>{teamOneScore}</span>
              </div>
              <div className='flex items-center flex-col gap-3'>
                <span className='uppercase text-yellow-600 text-center tracking-[3px]'>Second Team</span>
                <span>{teamTwoScore}</span>
              </div>
            </div>
            <div className='border-[1px] border-yellow-700 text-yellow-700 text-center p-4 rounded-md text-xl w-[80%] md:w-[500px] font-bold'> 
              <span>{lastSelected?.question}</span>
            </div>
            {
              questionMode ?
                <div className='flex items-center flex-col gap-5 w-full'>
                  <span className='text-yellow-600 tracking-[3px] text-lg'>{teamChose} Team</span>
                  <div className='flex flex-col  items-center gap-3 w-[80%] md:w-[20%]'>
                    <div className='flex items-center gap-5 w-full'>
                      <button onClick={handleMinus} className='text-yellow-600 font-bold text-xl border-[1px] border-yellow-700 p-3 w-[30%] text-center'>-</button>
                      <span className='text-lg text-yellow-600 border-[1px]  border-yellow-700 p-3 w-[70%] text-center'>{numAuction}</span>
                    </div>
                  </div>
                  {
                    time == 0 || numAuction == 0 ?
                      <span onClick={() => { setQuestionMode(false); stopTimer(); setTime(30);  selectRandomObject(auction , remainingObjects , setLastSelected , setRemainingObjects , "Auction")}}><IoMdRefresh className='text-2xl text-white cursor-pointer' /></span>
                      :
                      ""
                  }
                </div>
                :
                <>
                  <div className='flex items-center flex-col gap-4 mt-5 w-full mx-auto'>
                    <span className='text-yellow-600 tracking-[3px] text-lg'>من طلب اعلي مزايدة</span>
                    <div className='flex items-center justify-center flex-col md:flex-row gap-3 w-full md:w-[30%] mx-auto'>
                        <button onClick={() => setButton("First")} className={`border-[1px] w-[50%] md:w-[100%] text-center border-yellow-700 p-6 rounded-md mx-auto ${button == "First" ? "bg-yellow-700 text-white" : "text-yellow-700"}`}>First Team</button>
                        <button onClick={() => setButton("Second")} className={`border-[1px] w-[50%] md:w-[100%] text-center border-yellow-700 p-6 rounded-md mx-auto ${button == "Second" ? "bg-yellow-700 text-white" : "text-yellow-700"}`}>Second Team</button>
                    </div>
                  </div>
                  <div className='flex items-center flex-row gap-3 mt-6'>
                    <span onClick={() => setNumAuction(numAuction - 1)} className='border-[1px] w-[60px] text-center border-yellow-700 text-yellow-700 p-3 rounded-md hover:bg-yellow-700 hover:text-white transition-all duration-700'>-</span>
                    <span className='border-[1px] w-[60px] text-center border-yellow-700 text-yellow-700 p-3 rounded-md hover:bg-yellow-700 hover:text-white transition-all duration-700'>{numAuction}</span>
                    <span onClick={() => setNumAuction(numAuction + 1)} className='border-[1px] w-[60px] text-center border-yellow-700 text-yellow-700 p-3 rounded-md hover:bg-yellow-700 hover:text-white transition-all duration-700'>+</span>
                  </div>
                  <button onClick={() => { setQuestionMode(true); setTeamChose(button)}} className={` mt-5 md:w-[200px] w-[80%] ${button != "" ? "bg-yellow-700 border-[1px] border-yellow-600 text-white" : "bg-gray-900 text-[#333] pointer-events-none" } p-3 rounded-md font-bold`}>Start Game</button>
                </>
            }
          
          </>
          :
          <GameIntro name={"Auction"} team={auction} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text={"يقوم كل فريق بالمزايدة علي الفريق الاخر بعد معرفة السؤال .. واذا اجبت عن العدد المتزايد به في 30 ثانية .. تحصل علي نقطه"}/>
      }
    </div>
  )
}

export default Auction