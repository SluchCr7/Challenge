'use client'
import React, { useContext, useState } from 'react'
import { GussContext } from '@/app/Context/Games/GussContext';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { deleteItem } from '@/utils/DeleteItem';
import AddPlayer from '@/app/Components/AddPlayer';

const GussPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const { data: gussData } = useContext(GussContext);
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
          <div className="relative">
            <span className="text-white uppercase tracking-[5px]">Guss Challenge</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Guss
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
          {gussData
            .filter((item)=> item.question.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((guss, index) => (
            <div key={index} className="flex items-center flex-col gap-3 p-5">
              <span className="text-white text-sm border-[1px] border-yellow-600 w-[40px] text-center p-2">
                {index + 1}
              </span>
              <span className="text-white text-sm text-center w-[80%]">{guss.question}</span>
              <span className="text-white text-sm">{guss.Answer}</span>
              <button
                onClick={() => deleteItem("guss", guss._id)}
                className="text-white text-2xl cursor-pointer"
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}
        </div>
        <AddPlayer show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default GussPage