'use client'

import React, { useContext, useEffect, useState } from 'react'
import  getRandomObjects  from "@/utils/getRandomObjects"
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { ReskContext } from '@/app/Context/Games/ReskContext'
const Resk = () => {
const [show, setShow] = useState(false)
  const [question, setQuestion] = useState()
  const [answer, setAnswer] = useState()
  const [value, setValue] = useState()
  const [randomReskCategories, setRandomReskCategories] = useState([])
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [turn, setTurn] = useState('First')
  const [values, setValues] = useState([])
  const {resk} = useContext(ReskContext)
  const Numbers = [5, 10, 20, 40]
  const randomData = () => {
    const random = getRandomObjects(resk)
    setRandomReskCategories(random)
    setValues([])
    setValueTeamOne(0)
    setValueTeamTwo(0)
    setTurn('First')
  }
  return (
    <div className='flex items-center justify-center w-full min-h-[50vh] py-8 flex-col gap-5'>
      <div className='flex items-center flex-col gap-3 w-full'>
        {
          show ?
            <div className='flex items-center flex-col gap-7 w-full'>
              <div className='w-full flex items-center gap-5 justify-center p-3'>
                <div className='flex items-center flex-col gap-3'>
                  <div className='flex items-center w-[100%] md:w-[200px] justify-center flex-col gap-3 border-[1px] border-white p-5 rounded-md'>
                    <span className='text-white tracking-[1px] font-bold text-center text-xl'>الفريق الاول</span>
                    <span>Value : {valueTeamOne} </span>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                    {
                      Numbers.map((number) => {
                        return (
                          <div key={number} onClick={() => {
                            setValueTeamOne(valueTeamOne + number)
                          }} className='border-[1px] border-white hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md'>{number}</div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='flex items-center flex-col gap-3'>
                  <div className='flex items-center w-[100%] md:w-[200px] justify-center flex-col gap-3 border-[1px] border-white p-5 rounded-md'>
                    <span className='text-white tracking-[1px] font-bold text-center text-xl'>الفريق الثاني</span>
                    <span>Value : {valueTeamTwo} </span>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
                    {
                      Numbers.map((number) => {
                        return (
                          <div key={number} onClick={() => {
                            setValueTeamTwo(valueTeamTwo + number)
                          }} className='border-[1px] border-white hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md'>{number}</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='flex items-center flex-row gap-4 w-full'>
                <div className='grid grid-cols-1 lg:grid-cols-2  gap-10 w-full'>
                  {
                    randomReskCategories.map((item , index) => {
                      return (
                        <div key={index} className='flex items-center mx-auto flex-col gap-4 w-[80%] md:w-[400px]'>
                          <span className='text-white text-xl font-bold border-[1px] border-white text-center p-5 rounded-md w-full'>{item.name}</span>
                          <div className='resk grid grid-cols-2 md:grid-cols-4 gap-4 w-full'>
                            <span  onClick={() => { setQuestion(item.Easy.question); setAnswer(item.Easy.answer); setValue(item.Easy.value); setValues([...values , item.Easy.question]) }} className={`border-[1px] ${values.find(question => question === item.Easy.question) ? "pointer-events-none bg-yellow-600 text-black" : "text-yellow-600"} border-yellow-600 hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md w-[100%] h-[60px] flex items-center justify-center `}>{item.Easy.value}</span >
                            <span  onClick={() => { setQuestion(item.Medium.question); setAnswer(item.Medium.answer); setValue(item.Medium.value) ; setValues([...values , item.Medium.question]) }} className={`border-[1px] border-yellow-600 hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md w-[100%]  h-[60px] flex items-center justify-center ${values.find(question => question === item.Medium.question) ? "pointer-events-none bg-yellow-600 text-black" : "text-yellow-600"}`}>{item.Medium.value}</span>
                            <span  onClick={() => { setQuestion(item.Hard.question);  setAnswer(item.Hard.answer) ; setValue(item.Hard.value) ; setValues([...values , item.Hard.question]) }} className={`border-[1px] border-yellow-600 hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md w-[100%]  h-[60px] flex items-center justify-center ${values.find(question => question === item.Hard.question) ? "pointer-events-none bg-yellow-600 text-black" : "text-yellow-600"}`}>{item.Hard.value}</span>
                            <span  onClick={() => { setQuestion(item.Expert.question); setAnswer(item.Expert.answer); setValue(item.Expert.value) ; setValues([...values , item.Expert.question]) }} className={`border-[1px] border-yellow-600 hover:bg-yellow-600 hover:text-black transition-all duration-500 p-3 rounded-md w-[100%]  h-[60px] flex items-center justify-center ${values.find(question => question === item.Expert.question) ? "pointer-events-none bg-yellow-600 text-black" : "text-yellow-600"}`}>{item.Expert.value}</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <button className='md:w-[200px] w-[80%] bg-white p-5 flex items-center justify-center rounded-lg text-black font-bold' onClick={() => { randomData() }}>Next Game</button>
              <div className={`Result ${question == null ? "hidden" : 'block'}`}>
                <div className='absolute w-[80%] md:w-[500px] bg-black border-[1px] border-yellow-600 rounded-lg z-[100] text-center p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='flex w-full items-center flex-col gap-5'>
                    <span className='text-white text-lg font-bold'>{value}</span>
                    <span className='text-white text-2xl font-bold'>{question}</span>
                    <span className='text-white text-lg font-bold'>{answer}</span>
                    <div className='flex items-center gap-4'>
                      <button onClick={() =>{
                        setTurn(turn == 'First' ? 'Second' : 'First')
                        setQuestion(null)
                        setAnswer(null) 
                        setValueTeamOne(turn == 'First' ? valueTeamOne + value : valueTeamOne)
                        setValueTeamTwo(turn == "Second" ? valueTeamTwo + value : valueTeamTwo)
                      }} className='w-[40px] h-[40px] rounded-full p-3 text-lg'><FaCheck size={25} color='green' /></button>
                      <button
                        onClick={() => { setQuestion(null); setAnswer(null); setTurn(turn == 'First' ? 'Second' : 'First') }} className='w-[40px] h-[40px] rounded-full p-3 text-lg'>
                        <AiOutlineClose size={25} color='red' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='flex items-center flex-col justify-center w-full gap-4'>
              <button onClick={() => { setShow(true); randomData() }} className='md:w-[200px] w-[80%] bg-white p-5 flex items-center justify-center rounded-lg text-black font-bold'>Start Game</button>
              <p className='text-center w-[80%] text-lg text-white'>هناك 4 مواضيع من الاسئة وكل موضوع يحتوي علي 4 اسئلة متدرجة الصعوبة من 5 الي 40 نقطة وهناك سؤال عشوائي تتضاعف نقاطه</p>
            </div>
        }
      </div>
    </div>
  )
}




export default Resk