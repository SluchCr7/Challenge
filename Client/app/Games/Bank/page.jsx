"use client"
import { BankContext } from '@/app/Context/Games/BankContext'
import React, {useContext } from 'react'
import { useState , useEffect , useRef } from 'react'
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import selectRandomObject from '@/utils/getUniqueObject'
import { FaArrowAltCircleRight } from "react-icons/fa";
import GameIntro from '@/app/Components/GameIntro';
const Bank = () => {
  const { data } = useContext(BankContext)
  const [turn, setTurn] = useState("First")
  const [ScoreTeamOne , setScoreTeamOne] = useState(0)
  const [ScoreTeamTwo, setScoreTeamTwo] = useState(0)
  const [score, setScore] = useState(0)
  const [increment , setIncrement] = useState(1)
  const [roundNum , setRoundNum] = useState(1)
  const [time, setTime] = useState(120)
  const [isRunning, setIsRunning] = useState(false);
  const [Question, setQuestion] = useState(1)
  const intervalRef = useRef(null); // To keep track of the interval ID
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  useEffect(() => {
    // Access localStorage only on the client side
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsBank') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...data]);
  }, []);
  const rounds = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
  ]
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
  };
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval
      intervalRef.current = null;
      setIsRunning(false); // Update the running state
    }
  };
  const handleNext = () => {
    setQuestion(Question + 1)
    if (Question == 12) {
      turn == "First" ? setTurn("Second") : setTurn("First")
      // randomData()
      setScore(0)
      setTime(120)
      setQuestion(1)
      setRoundNum(roundNum + 1)
    }
    if (roundNum == 3 && Question == 24) {
      setLastSelected(null)
    }
  }
  const handleCorrect = () => {
    setScore(increment)
    setIncrement((prev) => prev * 2);
  }
  const handleBank = () => {
    if(turn == "First"){
      setScoreTeamOne(ScoreTeamOne + score)
      setScore(0)
      setIncrement(1)
    }
    else {
      setScoreTeamTwo(ScoreTeamTwo + score)
      setScore(0)
      setIncrement(1)
    }
  }
  useEffect(() => {
    if (time == 0) {
      if (turn == "First") {
        setTurn("Second")
      }
      else {
        setTurn("First")
      }
    }
  },[time , turn])
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      {
        lastSelected ?
          <div className='flex items-center flex-col gap-4 w-full'>          
          <div className='grid grid-cols-1 md:grid-cols-3 mt-7 gap-10'>
            <div className='flex items-center flex-col text-center gap-4 border-[1px] border-yellow-600 p-5'>
              <span className='text-sm text-yellow-600'>First Team</span>
              <span className='text-sm'>{ScoreTeamOne}</span>
            </div>
            <div className='flex items-center flex-col md:flex-row gap-7'>
              <span className='text-2xl tracking-[3px] text-yellow-600 capitalize'>{turn} Team</span>
              <span className='text-2xl tracking-[3px] text-yellow-600 capitalize'>question {Question}</span>
            </div>
            <div className='flex items-center flex-col text-center gap-4 border-[1px] border-yellow-600 p-5'>
              <span className='text-sm text-yellow-600'>Second Team</span>
              <span className='text-sm'>{ScoreTeamTwo}</span>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            {
              rounds.map((round, index) => {
                return (
                  <div key={index} className={`flex items-center flex-col gap-4 border-[1px] border-yellow-600 ${round == roundNum ? "bg-yellow-600 text-black" : ""}  p-5`}>
                    <span className='text-lg'>Round {round}</span>
                  </div>
                )
              })
            }
          </div>
          <div className='flex items-center flex-col gap-3'>
            <span className='text-lg tracking-[3px]'><span className='text-yellow-700'>{time}</span> seconds</span>
            <div className='buttons grid grid-cols-3 gap-4'>
              <button className='border-[1px] border-yellow-600 p-3 rounded-md text-yellow-600' onClick={startTimer} disabled={isRunning}>Start</button>
              <button className='border-[1px] border-yellow-600 p-3 rounded-md text-yellow-600' onClick={stopTimer} >Stop</button>
              <button className='border-[1px] border-yellow-600 p-3 rounded-md text-yellow-600' onClick={()=> setTime(120)}>Reset</button>
            </div>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
            <div onClick={handleCorrect} className='flex items-center gap-3 border-[1px] border-yellow-600 p-4'>
              <span><FaCheck className='text-green-600 text-xl'/></span>
              <span>Correct</span>
            </div>
            <div onClick={() => { handleNext(); selectRandomObject(data , remainingObjects , setLastSelected , setRemainingObjects , "Bank") }} className='flex items-center gap-3 justify-center w-full border-[1px] border-yellow-600 p-4'>
              <span><FaArrowAltCircleRight className=''/></span>
              <span>Next</span>
            </div>
            <div onClick={() => { setScore(0); setIncrement(1)}} className='flex items-center gap-3 border-[1px] border-yellow-600 p-4'>
              <span><AiOutlineClose className='text-red-600 text-xl'/></span>
              <span>Wrong</span>
            </div>
          </div>
          <div className="flex items-center flex-col gap-3 w-full my-4">
            <div className='flex items-center flex-col gap-2 w-full'>
                <span className="text-yellow-600 border-[1px] border-yellow-600 p-3 w-[80%] md:w-[50%] text-lg text-center rounded-sm">{lastSelected?.question}</span>
                <span className="text-yellow-600 text-lg">{lastSelected?.Answer}</span>
            </div>
            <div className='flex items-center gap-6 justify-center'>
              <span>Score : {score}</span>
              <button onClick={handleBank} className='border-[1px] border-yellow-600 p-3 rounded-md text-yellow-600'>Bank</button>
            </div>
          </div>
          </div>
          :
          <GameIntro name={"Bank"} team={data} selectRandomObject={selectRandomObject} remainingObjects={remainingObjects} setLastSelected={setLastSelected} setRemainingObjects={setRemainingObjects} text={"يتم سؤال الفريق 12 سؤال في 120 ثانية في حالة الاجابة الصحيحة يتضاعف السكور كل مرة وفي حالة الخطاء يصبح النتيجه 0"}/>
      }
    </div>
  )
}

export default Bank