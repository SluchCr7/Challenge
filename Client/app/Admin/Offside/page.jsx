'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import { OffsideContext } from '@/app/Context/Games/OffsideContext'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { deleteItem } from '@/utils/DeleteItem'
const OffsidePage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [show, setShow] = useState(false)
    const { data: offsideData } = useContext(OffsideContext)
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
          <div className="relative">
            <span className="text-white uppercase linkeffect tracking-[5px]">
              Offside Challenge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Offside
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
          {offsideData
            .filter((item)=> item.Clo.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 w-full p-5"
            >
              <span className="text-white text-sm border-[1px] border-yellow-600 w-[40px] text-center p-2">
                {index + 1}
              </span>
              <span className="text-white text-sm">{item.Clo}</span>
              <button
                onClick={() => deleteItem("offside", item._id)}
                className="text-white text-2xl"
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}
        </div>
        <AddPlayer show={show} setShow={setShow} />
      </div>
    </div>
  )
}

export default OffsidePage