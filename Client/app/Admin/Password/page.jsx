'use client'
import react, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { PassContext } from '@/app/Context/Games/PassContext'
import Image from 'next/image'
import AddPlayer from '@/app/Components/AddPlayer'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { deleteItem } from '@/utils/DeleteItem'
const PasswordPage = () => {
    const { pass } = useContext(PassContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    return (
        <div className='flex items-center justify-center w-full min-h-[100vh] p-5'>
            <div className="flex items-start gap-3 flex-col w-full">
                <div className="flex items-start flex-col md:items-center m-auto md:flex-row justify-between md:w-[85%]">
                    <div className="relative">
                        <span className="text-white uppercase linkeffect tracking-[5px]">Password Challenge</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShow(true)} 
                            className="border-[1px] border-yellow-600 p-2 w-[120px] rounded-sm text-yellow-600 text-center"
                        >
                            Add Player
                        </button>
                        <input 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            type="search" 
                            className="border-[1px] border-yellow-600 p-2 w-[200px] rounded-sm text-yellow-600 bg-transparent outline-none" 
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                    {pass
                        .filter((item)=> item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((player, index) => (
                        <div key={index} className="flex items-center gap-3 w-full p-5">
                            <span className="text-white text-sm">{index + 1}</span>
                            <div className="flex items-center flex-col gap-3 w-full">
                                <Image 
                                    src={player.Photo[0].url} 
                                    width={600} 
                                    height={600} 
                                    alt="player" 
                                    className="rounded-md w-[200px] h-[200px]" 
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-sm">{player.name}</span>
                                    <button 
                                        onClick={() => deleteItem("password", player._id)} 
                                        className="text-white text-2xl"
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <AddPlayer show={show} setShow={setShow} />
            </div>
        </div>
    );
};

            

export default PasswordPage