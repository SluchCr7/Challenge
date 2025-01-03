'use client'
import AddPlayer from '@/app/Components/AddPlayer'
import { PlayerContext } from '@/app/Context/Games/PlayersContext'
import axios from 'axios'
import React, { useState, useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { deleteItem } from '@/utils/DeleteItem';
import Player from '@/app/Components/Player'
/*************  ✨ Codeium Command 🌟  *************/
const PlayersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const { player } = useContext(PlayerContext);
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col md:w-[85%]">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row gap-3 justify-between w-full">
          <div className="relative">
            <span className="text-white uppercase linkeffect tracking-[5px]">
              Player Challenge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Player
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
          {player
            .filter((item)=> item.Answer.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((playerItem, index) => (
            <Player key={index} pla={playerItem} />
          ))}
        </div>
        <AddPlayer show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default PlayersPage;