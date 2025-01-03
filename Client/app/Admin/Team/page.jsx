'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { PictureContext } from '@/app/Context/Games/PictureContext';
import Image from 'next/image';
import Team from '@/app/Components/Team';
const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const {team} = useContext(PictureContext);
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between w-full">
          <h1 className="text-white uppercase tracking-[5px]">Team Challenge</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Team
            </button>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full">
        {team
            .filter((item)=> item.Name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((team, index) => (
              <Team key={index} team={team} index={index} />
          ))}
        </div>
        <AddPlayer show={show} setShow={setShow} />
      </div>
    </div>
  );
};


export default TeamPage
