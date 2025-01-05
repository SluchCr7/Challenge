'use client'
import React, { useContext, useEffect, useState } from 'react'
import  getRandomObjects  from "@/utils/getRandomObjects"
import { FaCheck } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { ReskContext } from '@/app/Context/Games/ReskContext'
import { CategoriesGrid } from '@/app/Components/ReskQategories';
const Resk = () => {
  const [show, setShow] = useState(false)
  const [qategory , setQategory] = useState({question : null , answer : null , value : 0})
  const [randomReskCategories, setRandomReskCategories] = useState([])
  const [valueTeamOne, setValueTeamOne] = useState(0)
  const [valueTeamTwo, setValueTeamTwo] = useState(0)
  const [turn, setTurn] = useState('First')
  const [values, setValues] = useState([])
  const [randomDouble , setRandomDouble] = useState(0)
  const {resk} = useContext(ReskContext)
  const Numbers = [5, 10, 20, 40]
  const randomNumber = () => {
    const randomNum = Math.floor(Math.random() * 16) + 1;
    setRandomDouble(randomNum)
  }
  const randomData = () => {
    const random = getRandomObjects(resk)
    setRandomReskCategories(random)
    randomNumber()
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
                <CategoriesGrid randomReskCategories={randomReskCategories} setQategory={setQategory} values={values} randomDouble={randomDouble} setValues={setValues} />
              </div>
              <button className='md:w-[200px] w-[80%] bg-white p-5 flex items-center justify-center rounded-lg text-black font-bold' onClick={() => { randomData() }}>Next Game</button>
              <div className={`Result ${qategory.question == null ? "hidden" : 'block'}`}>
                <div className='absolute w-[80%] md:w-[500px] bg-black border-[1px] border-yellow-600 rounded-lg z-[100] text-center p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='flex w-full items-center flex-col gap-5'>
                    <span className='text-white text-lg font-bold'>{qategory.value}</span>
                    <span className='text-white text-2xl font-bold'>{qategory.question}</span>
                    <span className='text-white text-lg font-bold'>{qategory.answer}</span>
                    <div className='flex items-center gap-4'>
                      <button onClick={() =>{
                        setTurn(turn == 'First' ? 'Second' : 'First')
                        const value = qategory.value
                        setQategory({ question: null , answer: null , value: 0})
                        setValueTeamOne(turn == 'First' ? valueTeamOne + value : valueTeamOne)
                        setValueTeamTwo(turn == "Second" ? valueTeamTwo + value : valueTeamTwo)
                      }} className='w-[40px] h-[40px] rounded-full p-3 text-lg'><FaCheck size={25} color='green' /></button>
                      <button
                        onClick={() => { setQategory({ question: null , answer: null , value: 0}); setTurn(turn == 'First' ? 'Second' : 'First') }} className='w-[40px] h-[40px] rounded-full p-3 text-lg'>
                        <AiOutlineClose size={25} color='red' />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='relative w-full min-h-[70vh]'>
              <div className='flex items-center flex-col justify-center w-full gap-4'>
                <p className='text-center w-[70%] text-lg text-white'>هناك 4 مواضيع من الاسئة وكل موضوع يحتوي علي 4 اسئلة متدرجة الصعوبة من 5 الي 40 نقطة وهناك سؤال عشوائي تتضاعف نقاطه</p>
                <button onClick={() => { setShow(true); randomData() }} className='md:w-[200px] w-[80%] bg-white p-5 flex items-center justify-center rounded-lg text-black font-bold'>Start Game</button>
              </div>
              <ul className='flex absolute bottom-2 right-4 items-end gap-3 flex-col paragraph text-yellow-500 tracking-[1px] text-right'>
                  <li>المربع ذو الحواف الخضراء هو السؤال الدابل</li>
                  <li>عند فتح السؤال عند الاجابه الصحيحه تحتسب النقاط كاملة ... الخطا لا تحتسب اي نقاط ... وعند اغلاق السؤال لا يمكنك فتحه</li>
                  <li>عند سرقة السؤال يمكنك ان تجيب خطا وتحتسب النقاط للفريق الاخر من اسفل الاسكور ... يمكنك اضافة نقاط بشكل يدوي</li>
              </ul>
            </div>
        }
      </div>
    </div>
  )
}




export default Resk