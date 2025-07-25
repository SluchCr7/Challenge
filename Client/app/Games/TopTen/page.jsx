'use client'
import GameIntro from '@/app/Components/GameIntro'
import { TopTenContext } from '@/app/Context/Games/TopTenContext'
import React, { useContext, useState } from 'react'
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
const page = () => {
  const { topTenData } = useContext(TopTenContext)
  const [valueTeamOne , setValueTeamOne] = useState(0) 
  const [valueTeamTwo , setValueTeamTwo] = useState(0) 
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);
  
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsTopTen') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...topTenData]);
  }, [topTenData]);
  
  return (
    <div className='flex items-center justify-center w-full min-h-screen  py-10 px-4 text-white relative'>
      {
        lastSelected ? (
          <div className='flex items-center flex-col gap-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["First Team", "Second Team"].map((label, i) => (
                <div key={i} className="bg-[#1f2a1f] p-6 rounded-2xl shadow border border-green-600 flex flex-col gap-4">
                  <h2 className="text-center text-xl font-bold text-green-400">{label}</h2>
                  <p className="text-center text-lg">Value: {i === 0 ? valueTeamOne : valueTeamTwo}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Numbers.map((n) => (
                      <button
                        key={n}
                        onClick={() => i === 0 ? setValueTeamOne(valueTeamOne + n) : setValueTeamTwo(valueTeamTwo + n)}
                        className="bg-gray-800 text-white rounded-lg p-2 font-bold hover:bg-green-600 hover:text-white transition"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex items-center flex-col gap-5 w-full'>
              <p className='text-center uppercase text-2xl text-yellow-400 tracking-wide'>{lastSelected?.title}</p>
              <div className="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {lastSelected.questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-[#262626] hover:bg-green-700 text-white p-4 rounded-xl flex items-center justify-center text-center text-lg font-medium shadow border border-gray-600"
                >
                  {index + 1}. {q}
                </div>
              ))}
            </div>
            </div>
            <button
              onClick={() => selectRandomObject(topTenData, remainingObjects, setLastSelected, setRemainingObjects, "TopTen")}
              className='flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-lg'
            >
              <IoMdRefresh className='text-xl' />
              <span>تحديث اللاعب</span>
            </button>
          </div>
        ): (
          <GameIntro
            name={"TopTen"}
            team={topTenData}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text='يظهر سؤال ويكون مطلوب ان تجد اكثر 10 لاعبين فعلوا هذا الانجاز او هدافين او فرق ومن 11 ال 13 يكون السالب'
          />
        )
      }
    </div>
  )
}

export default page