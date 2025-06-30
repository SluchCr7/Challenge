'use client'
import React, { useContext, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { ReskContext } from '../Context/Games/ReskContext';

const AddResk = ({ setShow, show }) => {
  const [name, setName] = useState("");
  const { addResk } = useContext(ReskContext);
  const [easy, setEasy] = useState({ question: "", answer: "" });
  const [medium, setMedium] = useState({ question: "", answer: "" });
  const [hard, setHard] = useState({ question: "", answer: "" });
  const [expert, setExpert] = useState({ question: "", answer: "" });

  return (
    <div className={`${show ? "fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen py-10 px-4">
        <div className="flex flex-col gap-6 p-8 w-[90%] md:w-[60%] bg-gray-100 dark:bg-gray-900 border-2 border-yellow-500 rounded-2xl shadow-xl relative">
          <div className='flex flex-col gap-2 w-full'>
            <label className='text-sm text-green-700 dark:text-yellow-400 tracking-widest'>اسم التحدي</label>
            <input
              className='w-full p-3 border border-yellow-500 bg-transparent text-yellow-600 rounded-lg'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {[{ label: 'Easy', state: easy, setState: setEasy }, { label: 'Medium', state: medium, setState: setMedium }, { label: 'Hard', state: hard, setState: setHard }, { label: 'Expert', state: expert, setState: setExpert }].map(({ label, state, setState }) => (
            <div key={label} className='flex flex-col gap-4 w-full'>
              <label className='text-sm text-green-700 dark:text-yellow-400 tracking-widest'>{label}</label>
              <input
                placeholder={`${label} Question`}
                className='w-full p-3 border border-yellow-500 bg-transparent text-yellow-600 rounded-lg'
                type="text"
                value={state.question}
                onChange={(e) => setState({ ...state, question: e.target.value })}
              />
              <input
                placeholder={`${label} Answer`}
                className='w-full p-3 border border-yellow-500 bg-transparent text-yellow-600 rounded-lg'
                type="text"
                value={state.answer}
                onChange={(e) => setState({ ...state, answer: e.target.value })}
              />
            </div>
          ))}

          <button
            onClick={(e) => addResk(e, name, easy, medium, hard, expert)}
            className='w-full p-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition duration-300'
          >
            إضافة السؤال
          </button>

          <span onClick={() => setShow(false)} className='absolute top-3 right-4 text-2xl text-yellow-500 cursor-pointer hover:text-yellow-600 transition'>
            <IoIosClose />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddResk;
