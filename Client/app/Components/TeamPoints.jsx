'use client';
import React from 'react';
import { GoBlocked } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';

const TeamPoints = ({ team, circles, setCircles, pass, setPass }) => {
  const fillNextCircle = () => {
    const nextIndex = circles.findIndex((state) => state === false);
    if (nextIndex !== -1) {
      const newStates = [...circles];
      newStates[nextIndex] = true;
      setCircles(newStates);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-[#1e293b] rounded-2xl shadow-lg w-full max-w-sm">
      {/* الدوائر */}
      <div className="flex items-center justify-center gap-3">
        {circles.map((isFilled, index) => (
          <span
            key={index}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-full transition-all duration-300 ${
              isFilled ? 'bg-red-600 shadow-md' : 'bg-gray-600'
            }`}
          ></span>
        ))}
      </div>

      {/* الأزرار */}
      <div className="flex items-center justify-between w-full mt-4 px-6">
        {/* زر الباس */}
        <button
          onClick={() => setPass(!pass)}
          disabled={pass}
          className={`flex flex-col items-center gap-1 transition-all ${
            pass
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-green-500 hover:text-green-400'
          }`}
        >
          <GoBlocked className="text-3xl" />
          <span className="text-sm font-medium uppercase">Pass</span>
        </button>

        {/* زر السترايك */}
        <button
          onClick={fillNextCircle}
          className="flex flex-col items-center gap-1 text-red-500 hover:text-red-400 transition-all"
        >
          <IoClose className="text-3xl" />
          <span className="text-sm font-medium uppercase">Strike</span>
        </button>
      </div>
    </div>
  );
};

export default TeamPoints;
