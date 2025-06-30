'use client'
import selectRandomObject from '@/utils/getUniqueObject';
import { IoMdRefresh } from "react-icons/io";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { PassContext } from '@/app/Context/Games/PassContext';
import GameIntro from '@/app/Components/GameIntro';

const Password = () => {
  const { pass } = useContext(PassContext);
  const [remainingObjects, setRemainingObjects] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('remainingObjectsPass') : null;
    setRemainingObjects(stored ? JSON.parse(stored) : [...pass]);
  }, [pass]);

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10 flex-col gap-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800'>
      {
        lastSelected ? (
          <div className="flex items-center gap-6 flex-col bg-gray-900 rounded-xl p-6 shadow-lg w-[90%] md:w-[400px]">
            <Image
              src={lastSelected?.Photo[0].url}
              width={500}
              height={500}
              quality={100}
              alt='player'
              className='rounded-lg w-full h-auto object-cover shadow-md border-2 border-yellow-500'
            />
            <p className='text-center uppercase text-2xl text-yellow-400 tracking-wide'>{lastSelected?.name}</p>
            <button
              onClick={() => selectRandomObject(pass, remainingObjects, setLastSelected, setRemainingObjects, "Pass")}
              className='flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-lg'
            >
              <IoMdRefresh className='text-xl' />
              <span>تحديث اللاعب</span>
            </button>
          </div>
        ) : (
          <GameIntro
            name={"Pass"}
            team={pass}
            selectRandomObject={selectRandomObject}
            remainingObjects={remainingObjects}
            setLastSelected={setLastSelected}
            setRemainingObjects={setRemainingObjects}
            text='تظهر صورة واسم اللاعب بشكل عشوائي ... يكون لكل فريق محاولة لتعريف الزميل علي اللاعب من خلال معلومة عن اللاعب'
          />
        )
      }
    </div>
  );
};

export default Password;
