'use client'
import React, { useContext , useState } from 'react'
import { ReskContext } from '@/app/Context/Games/ReskContext'
import AddResk from '@/app/Components/AddResk'
import { deleteItem } from '@/utils/DeleteItem'
import { MdDeleteOutline } from 'react-icons/md'

/*************  ✨ Codeium Command 🌟  *************/
const ReskPage = () => {
  const [show, setShow] = useState(false);
  const { resk } = useContext(ReskContext);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex items-center justify-center w-full min-h-[100vh] p-5">
      <div className="flex items-start gap-3 flex-col w-full">
        <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between md:w-[85%]">
          <div className="relative">
            <span className="text-white uppercase linkeffect tracking-[5px]">
              Resk Challenge
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShow(true)}
              className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
            >
              Add Category
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
          {resk
            .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item, index) => (
              <div
                key={item._id}
                className="flex items-center border-[1px] border-yellow-600 p-5 flex-col gap-5 mx-auto w-[85%]"
              >
                <span>{index + 1}</span>
                <span className="text-yellow-600 tracking-[3px] font-bold">{item.name}</span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                  <div className="flex items-center flex-col gap-1">
                    <span className="text-center text-white text-sm">
                      {item.Easy.question}
                    </span>
                    <span className="text-lg text-yellow-600">{item.Easy.answer}</span>
                  </div>
                  <div className="flex items-center flex-col gap-1">
                    <span className="text-center text-white text-sm">
                      {item.Medium.question}
                    </span>
                    <span className="text-lg text-yellow-600">{item.Medium.answer}</span>
                  </div>
                  <div className="flex items-center flex-col gap-1">
                    <span className="text-center text-white text-sm">
                      {item.Hard.question}
                    </span>
                    <span className="text-lg text-yellow-600">{item.Hard.answer}</span>
                  </div>
                  <div className="flex items-center flex-col gap-1">
                    <span className="text-center text-white text-sm">
                      {item.Expert.question}
                    </span>
                    <span className="text-lg text-yellow-600">{item.Expert.answer}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteItem("resk", item._id)}
                  className="text-white text-2xl cursor-pointer"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
        </div>
        <AddResk show={show} setShow={setShow} />
      </div>
    </div>
    )
}

export default ReskPage