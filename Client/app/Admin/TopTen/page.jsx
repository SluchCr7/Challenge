'use client';
import React, { useContext, useState } from 'react';
import { TopTenContext } from '@/app/Context/Games/TopTenContext';
import AddPlayer from '@/app/Components/AddPlayer';
import { deleteItem } from '@/utils/DeleteItem';
import { MdDeleteOutline } from 'react-icons/md';

const TopTenPage = () => {
  const [show, setShow] = useState(false);
  const { topTenData } = useContext(TopTenContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = topTenData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col w-full">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between md:w-[85%]">
          <span className="text-white uppercase linkeffect tracking-[5px]">Top Ten Questions</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add
            </button>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="search"
              placeholder="Search by title..."
              className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 w-full mt-6">
          {filteredData.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center border border-yellow-600 p-5 flex-col gap-5 mx-auto w-[85%] rounded-lg"
            >
              <span className="text-yellow-600 font-bold text-xl">#{index + 1}</span>
              <span className="text-white font-bold text-xl">{item.title}</span>

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {item.questions.map((q, i) => (
                  <div key={i} className="flex flex-col items-center border p-3 rounded-md">
                    <span className="text-yellow-500 font-semibold">السؤال {i + 1}</span>
                    <span className="text-white text-sm">{q.name}</span>
                    <span className="text-gray-300 text-xs">النقاط: {q.value}</span>
                  </div>
                ))}
              </div> */}

              <button
                onClick={() => deleteItem('topten', item._id)}
                className="text-white text-2xl hover:text-red-500"
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

export default TopTenPage;
