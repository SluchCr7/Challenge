'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { RoundContext } from '@/app/Context/Games/RoundContext';
/*************  ✨ Codeium Command 🌟  *************/
const RoundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const { data : rounds } = useContext(RoundContext);

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
          <h1 className="text-white uppercase tracking-[5px]">Round Challenge</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Round
            </button>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {rounds
            .filter((item)=> item.question.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((round, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-yellow-600 transition-all duration-500 justify-between gap-3 w-full p-5"
            >
              <span className="text-white text-sm border-[1px] border-yellow-600 w-[40px] text-center p-2">
                {index + 1}
              </span>
              <span className="text-white text-sm">{round.question}</span>
              <MdDeleteOutline
                onClick={() => deleteItem("round", round._id)}
                className="text-white text-2xl hover:text-red-600"
              />
            </div>
          ))}
        </div>
        <AddPlayer show={show} setShow={setShow} />
      </div>
    </div>
  );
};


export default RoundPage
