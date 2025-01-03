'use client'
import React from 'react'
import { useEffect } from 'react'
import { GoBlocked } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
const TeamPoints = ({ team , circles , setCircles , pass, setPass}) => {
    const fillNextCircle = () => {
        const nextIndex = circles.findIndex((state) => state === false);
        if (nextIndex !== -1) {
        const newStates = [...circles];
        newStates[nextIndex] = true;
        setCircles(newStates);
    }
    };
    return (
        <div className='flex items-center flex-col gap-3'>
            <div className='flex items-center gap-3'>
                {
                circles.map((isFilled, index) => {
                    return (
                        <span key={index} className={`w-[30px] h-[30px] ${isFilled ? "bg-red-700" : "bg-gray-700"} rounded-full`}></span>
                    )
                })
                }
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className={`flex items-center flex-col gap-1 ${pass ? "pointer-events-none text-gray-700" : "text-green-600"}`}>
                    <span><GoBlocked onClick={() => setPass(!pass)} className={`text-3xl`} /></span>
                    <span className='text-base uppercase'>Pass</span>
                </div>
                <div className='flex items-center flex-col gap-1 text-red-600'>
                    <span><IoClose onClick={fillNextCircle} className='text-3xl ' /></span>
                    <span className='text-base uppercase'>Strike</span>
                </div>
            </div>
        </div>
    )
}

export default TeamPoints