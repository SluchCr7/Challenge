'use client'
import React, { useContext, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { addQuiston } from '@/utils/addQuestion'
import { ReskContext } from '../Context/Games/ReskContext';
const AddResk = ({setShow , show}) => {
    const [name, setName] = useState("")    
    const {addResk } = useContext(ReskContext)
    const [easy, setEasy] = useState({ question : "", answer : ""})
    const [medium, setMedium] = useState({ question : "", answer : ""})
    const [hard, setHard] = useState({ question : "", answer : ""}) 
    const [expert, setExpert] = useState({ question : "", answer : ""})
return (
    <div className={`${show ? "Result" : ""}`}>            
        <div className={`${show ? "flex" : "hidden"} items-center flex-col gap-3 p-10 w-[90%] md:w-[70%] fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] rounded-sm bg-black border-[1px] border-yellow-700`}>
            <div className='flex items-start flex-col gap-2 w-full'>
                <span className='text-sm text-yellow-600 tracking-[3px]'>name</span>
                <input className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={name} onChange={(e)=> setName(e.target.value)} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                <div className='flex items-start flex-col gap-2'>
                    <label className="text-sm text-yellow-600 tracking-[3px]">Easy</label>
                    <input placeholder='Easy Question' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={easy.question} onChange={(e)=> setEasy({question : e.target.value , answer : easy.answer})} />
                    <input placeholder='Easy Answer' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={easy.answer} onChange={(e)=> setEasy({question : easy.question , answer : e.target.value})} />
                </div>
                <div className='flex items-start flex-col gap-2'>
                    <label className="text-sm text-yellow-600 tracking-[3px]">Medium</label>
                    <input placeholder='Medium Question' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={medium.question} onChange={(e)=> setMedium({question : e.target.value , answer : medium.answer})} />
                    <input placeholder='Medium Answer' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={medium.answer} onChange={(e)=> setMedium({question : medium.question , answer : e.target.value})} />
                </div>
                <div className='flex items-start flex-col gap-2'>
                    <label className="text-sm text-yellow-600 tracking-[3px]">Hard</label>
                    <input placeholder='Hard Question' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={hard.question} onChange={(e)=> setHard({question : e.target.value , answer : hard.answer})} />
                    <input placeholder='Hard Answer' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={hard.answer} onChange={(e)=> setHard({question : hard.question , answer : e.target.value})} />
                </div>
                <div className='flex items-start flex-col gap-2'>
                    <label className="text-sm text-yellow-600 tracking-[3px]">Expert</label>
                    <input placeholder='Expert Question' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={expert.question} onChange={(e)=> setExpert({question : e.target.value , answer : expert.answer})} />
                    <input placeholder='Expert Answer' className='w-[100%] p-3 border-[1px] border-yellow-600 bg-transparent text-yellow-600 rounded-lg' type="text" name="" id="" value={expert.answer} onChange={(e)=> setExpert({question : expert.question , answer : e.target.value})} />
                </div>
            </div>
            <button onClick={(e) => addResk(e , name , easy , medium , hard , expert)} className='w-[100%] p-3 bg-white text-black font-bold'>Add Guss quistion</button>
            <span onClick={() => setShow(false)} className='absolute top-1 right-2 text-lg'><IoIosClose/></span>
        </div>
    </div>
  )
}

export default AddResk