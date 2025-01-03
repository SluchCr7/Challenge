'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import { AuctionContext } from '@/app/Context/Games/AuctionContext'
import { deleteItem } from '@/utils/DeleteItem'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";

const AuctionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
    const { auction } = useContext(AuctionContext);
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
          <div className="relative flex items-center gap-3">
            <span className="text-white uppercase linkeffect tracking-[5px]">
              Auction Challenge
            </span>
            {/* <span className="text-yellow-600 font-bold">{auction.length} Item</span> */}
          </div>
          <div className="flex items-center gap-3">
            <button
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
              onClick={() => setShow(true)}
            >
              Add Auction
            </button>
            <input
              className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          {auction
            .filter((item)=> item.question.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 w-full p-5"
            >
              <span className="text-white text-sm border-[1px] border-yellow-600 w-[40px] text-center p-2">
                {index + 1}
              </span>
              <span className="text-white text-sm">{item.question}</span>
              <button
                className="text-white text-2xl"
                onClick={() => deleteItem("auction", item._id)}
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


export default AuctionPage