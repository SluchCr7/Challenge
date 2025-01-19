import React from 'react'

const GameIntro = ({name , team ,selectRandomObject, remainingObjects , setLastSelected , setRemainingObjects , text}) => {
  return (
        <div className='flex items-center flex-col justify-center w-full gap-4'>
            <p className='text-center w-[70%] text-lg text-white'>{text}</p>
            <button onClick={() => { selectRandomObject(team , remainingObjects , setLastSelected , setRemainingObjects , name) } } className='md:w-[200px] w-[80%] bg-white p-5 flex items-center justify-center rounded-lg text-black font-bold'>Start Game</button>
        </div>
  )
}

export default GameIntro