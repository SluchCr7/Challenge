'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { IoIosClose } from "react-icons/io";
import Image from 'next/image'
const Profile = ({setShowProfile}) => {
  const { user, UpdatePhoto } = useContext(AuthContext)
  // const [image , setImage] = useState(null)
  return (
    <div className='flex absolute bg-black border-[1px] border-yellow-600 rounded-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] items-center flex-col gap-3 w-[80%] md:w-[400px] p-5'> 
      <div className='flex items-center flex-col gap-2'>
        {/* <input type="file" id='file' 
            className='hidden'
          onChange={(e) => { setImage(e.target.files[0])}}
        /> */}
        {/* <label htmlFor="file" className='w-full p-3'> */}
          <Image  src={user?.profilePhoto?.url} alt="profile photo" width={200} height={200} className={"w-[60px] h-[60px] rounded-full"}/>
        {/* </label> */}
        {/* <button onClick={()=> UpdatePhoto(image , user._id)} className='border-[1px] border-yellow-600 p-1 w-[70px] rounded-sm text-yellow-600'>Update</button> */}
      </div>
      <span className='text-lg text-white'>{user.Name}</span>
      <span className='text-sm text-yellow-600'>{user.nickName}</span>
      <span onClick={()=> setShowProfile(false)} className='absolute top-2 right-1 text-white'><IoIosClose/></span>
    </div>
  )
}

export default Profile