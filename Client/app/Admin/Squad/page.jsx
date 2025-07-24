'use client';
import React, { useContext, useState } from 'react';
import { SquadContext } from '@/app/Context/SquadContext';
import AddPlayer from '@/app/Components/AddPlayer';
import { deleteItem } from '@/utils/DeleteItem';
import { MdDeleteOutline } from 'react-icons/md';

const SquadPage = () => {
  const [show, setShow] = useState(false);
  const { squads } = useContext(SquadContext);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col w-full">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between md:w-[85%]">
          <span className="text-white uppercase linkeffect tracking-[5px]">Squads</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Squad
            </button>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 w-full">
          {squads
            .filter((item) =>
              (item.TeamOne?.name + item.TeamTwo?.name).toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={item._id}
                className="flex items-center border-[1px] border-yellow-600 p-5 flex-col gap-5 mx-auto w-[85%]"
              >
                <span className="text-yellow-600 font-bold text-xl">#{index + 1}</span>
                <span className="text-white font-bold text-xl">{item.title}</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <h3 className="text-white text-lg text-center mb-1">Team One: {item.TeamOne.name}</h3>
                    {item.TeamOne.members.map((m, i) => (
                      <div key={i} className="text-yellow-400 text-sm text-center">{m}</div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-white text-lg text-center mb-1">Team Two: {item.TeamTwo.name}</h3>
                    {item.TeamTwo.members.map((m, i) => (
                      <div key={i} className="text-yellow-400 text-sm text-center">{m}</div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => deleteItem("squad", item._id)}
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

export default SquadPage;
