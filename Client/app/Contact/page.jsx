import React from 'react'
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Contact = () => {
    const ways = [
        {
            id:1,
            icon: <FaPhoneAlt className='text-3xl text-yellow-600' />,
            title : "+201550662103"
        },
        {
            id: 2,
            icon : <MdEmail className='text-3xl text-yellow-600' />,
            title : "ahmedking10710@gmail.com"
        },
    ]
    const social = [
        {
            icon: <FaFacebook />,
            color : "bg-blue-500"
        },
        {
            icon: <FaInstagramSquare />,
            color : "bg-red-700"
        },
        {
            icon: <FaTwitter />,
            color : "bg-blue-700"
        },
        {
            icon: <FaWhatsapp />,
            color : "bg-green-500"
        },
    ]
  return (
    <div className='w-full flex items-center flex-col justify-center py-20'>
        <span className='text-lg  font-bold tracking-[5px] paragraph uppercase'>Contact Us</span>
        <p className='text-yellow-600 text-sm mt-5 tracking-[3px]'>You can contact with Us by send Message or Email by any next ways</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
                ways.map((way , index) => {
                    return (
                        <div key={index} className='flex items-center flex-col gap-3 mt-10 border-[1px] border-yellow-600 p-5'>
                            {way.icon}
                            <span className='text-white text-sm tracking-[3px]'>{way.title}</span>
                        </div>
                    )
                })
            }
        </div>
        <div className='flex items-center my-5 gap-5 flex-col md:flex-row'>
            {
                social.map((icon , index) => {
                    return (
                        <div key={index} className={`outline-none bg-${icon.color} p-3 rounded-full w-[50px] text-xl h-[50px] flex items-center justify-center ${icon.color}`}>
                            {icon.icon}
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Contact