'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../Context/AuthContext';
import { MdOutlineGames, MdOutlinePeopleAlt, MdOutlineSecurity } from 'react-icons/md';
import { PiSwordFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const { users } = useContext(AuthContext);

  const games = [
    { name: 'Players', link: '/Admin/Players' },
    { name: 'Password', link: '/Admin/Password' },
    { name: 'Guss', link: '/Admin/Guss' },
    { name: 'Bank', link: '/Admin/Bank' },
    { name: 'Resk', link: '/Admin/Resk' },
    { name: 'Offside', link: '/Admin/Offside' },
    { name: 'Round', link: '/Admin/Round' },
    { name: 'Auction', link: '/Admin/Auction' },
    { name: 'Team', link: '/Admin/Team' },
    { name: 'TopTen', link: '/Admin/TopTen' },
    { name: 'Squad', link: '/Admin/Squad' },
  ];

  return (
    <main className="min-h-screen w-full md:w-[80%] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-12 px-6">
      <section className="w-full mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 tracking-tight drop-shadow-md">لوحة التحكم</h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">تحكم كامل في الألعاب والمستخدمين من مكان واحد</p>
        </header>

        {/* 🎮 قسم الألعاب */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <MdOutlineGames className="text-yellow-500 text-3xl" />
            <h2 className="text-2xl font-semibold">الألعاب المتاحة</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {games.map((game, i) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#1e293b] border border-yellow-600 rounded-2xl p-5 text-center shadow-md hover:bg-yellow-500 hover:text-black transition-all cursor-pointer"
              >
                <Link href={game.link}>
                  <span className="text-lg font-semibold tracking-wide">{game.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 👤 قسم المستخدمين */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MdOutlinePeopleAlt className="text-yellow-500 text-3xl" />
            <h2 className="text-2xl font-semibold">المستخدمون</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-[#1e293b] border border-yellow-600 rounded-2xl p-6 text-center shadow-md"
            >
              <Link href="/Admin/Users">
                <p className="text-yellow-500 text-xl font-semibold">المستخدمون</p>
                <p className="text-2xl mt-2 font-bold">{users?.length || 0}</p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-[#1e293b] border border-yellow-600 rounded-2xl p-6 text-center shadow-md"
            >
              <Link href="/Admin/Admins">
                <p className="text-yellow-500 text-xl font-semibold">المسؤولون</p>
                <p className="text-2xl mt-2 font-bold">{users?.filter((u) => u.isAdmain)?.length || 0}</p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPage;
