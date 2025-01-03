import React from 'react'
import Link from 'next/link'
const NotFound = () => {
  return (
    <div className='flex items-center flex-col justify-center w-full min-h-[100vh]'>
        <span className='text-9xl text-yellow-700 font-bold'>404</span>
        <span className='text-2xl text-white tracking-[6px] uppercase'>Page Not Found , Please Try Again</span>
          <button
              className='border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center mt-5'>
              <Link href={'/'}>Home</Link>
          </button>
    </div>
  )
}

export default NotFound