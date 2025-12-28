'use client'
import { AuthContext } from '@/app/Context/AuthContext'
import { deleteItem } from '@/utils/DeleteItem'
import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { RiShieldUserLine, RiVerifiedBadgeLine, RiUserSearchLine, RiDeleteBin7Line, RiArrowLeftLine, RiUserStarLine } from "react-icons/ri";
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Page = () => {
    const [searchValue, setSearchValue] = useState("")
    const { users } = useContext(AuthContext)

    return (
        <div className="w-full max-w-7xl mx-auto space-y-12 py-10">
            <ToastContainer />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-6">
                <div className="flex items-center gap-6">
                    <Link href="/Admin">
                        <button className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all">
                            <RiArrowLeftLine size={20} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-none">
                            Fanbase <span className="text-primary">Registry</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Oversee Global Users & Security Clearances</p>
                    </div>
                </div>

                <div className="relative group w-full md:w-[350px]">
                    <RiUserSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="search"
                        placeholder="Identify fan by name..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-bold text-sm"
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6'>
                <AnimatePresence>
                    {users
                        ?.filter((person) => person.Name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((user, index) => (
                            <motion.div
                                key={user._id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -5 }}
                                className={`glass-dark border border-white/10 rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group transition-all duration-500 hover:border-primary/50 shadow-2xl`}
                            >
                                {/* Role Indicators */}
                                <div className='absolute top-6 right-6 flex items-center gap-3'>
                                    {user.isAdmain && (
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl shadow-lg shadow-primary/10">
                                            <RiShieldUserLine />
                                        </div>
                                    )}
                                    {user.isVerify && (
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 text-xl shadow-lg shadow-blue-500/10">
                                            <RiVerifiedBadgeLine />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full border-4 border-white/5 p-1 bg-carbon-dark relative z-10 overflow-hidden shadow-2xl">
                                            <Image
                                                src={user.profilePhoto?.url || '/default-avatar.png'}
                                                alt='profile'
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-xl font-black italic text-white uppercase tracking-tighter leading-tight">{user.Name}</h3>
                                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{user.isAdmain ? 'Elite Administrator' : 'Global Fan'}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                                    <div className="flex items-center justify-between px-2">
                                        <div className="space-y-1">
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none">Experience</span>
                                            <p className="text-sm font-black italic text-white/60 tracking-tighter">{user.xp || 0} XP</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none">Rank</span>
                                            <p className="text-sm font-black italic text-primary tracking-tighter">#{index + 1}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => deleteItem("auth", user._id)}
                                        className="w-full py-4 bg-white/5 hover:bg-red-500 hover:text-white border border-white/5 rounded-2xl flex items-center justify-center gap-2 text-white/20 font-black text-[10px] uppercase tracking-[0.3em] transition-all"
                                    >
                                        <RiDeleteBin7Line size={16} /> Termination User
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
            </div>

            {users?.filter((person) => person.Name.toLowerCase().includes(searchValue.toLowerCase())).length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center opacity-20">
                    <RiUserStarLine size={80} className="mb-4" />
                    <p className="text-xl font-black italic uppercase tracking-widest text-white">No Fan Records Located</p>
                </div>
            )}
        </div>
    )
}

export default Page