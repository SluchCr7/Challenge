'use client'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { CiSettings, CiUser } from 'react-icons/ci'
import { IoIosLogOut, IoIosCall } from 'react-icons/io'
import { FaChevronDown } from 'react-icons/fa'

const Nav = ({ setShowProfile }) => {
  const { isLogin , isAuthChecked , user, Logout } = useContext(AuthContext)
  const [show, setShow] = useState(false)

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl uppercase font-bold tracking-wide text-green-700 hover:text-yellow-500 transition"
        >
          PlayTactic
        </Link>

        <div className="relative">
          {isLogin ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShow(!show)}>
              <Image
                src={user?.profilePhoto?.url}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border-2 border-yellow-500"
              />
              <FaChevronDown className="text-sm text-gray-600 dark:text-white" />
            </div>
          ) : (
            <Link
              href="/Auth/Login"
              className="px-4 py-2 border border-yellow-600 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300"
            >
              تسجيل الدخول
            </Link>
          )}

          {/* القائمة المنسدلة */}
          {show && (
            <div className="absolute top-14 right-0 w-[200px] bg-white dark:bg-gray-800 border border-yellow-500 rounded-xl shadow-lg z-50">
              <div className="flex flex-col p-4 gap-4 text-sm text-gray-800 dark:text-white">
                <button
                  onClick={() => {
                    setShowProfile(true)
                    setShow(false)
                  }}
                  className="flex items-center justify-between hover:text-yellow-500 transition"
                >
                  <span>الملف الشخصي</span>
                  <CiUser />
                </button>

                {user?.isAdmain && (
                  <Link
                    href="/Admin"
                    onClick={() => setShow(false)}
                    className="flex items-center justify-between hover:text-yellow-500 transition"
                  >
                    <span>لوحة التحكم</span>
                    <CiSettings />
                  </Link>
                )}

                <Link
                  href="/Contact"
                  onClick={() => setShow(false)}
                  className="flex items-center justify-between hover:text-yellow-500 transition"
                >
                  <span>تواصل معنا</span>
                  <IoIosCall />
                </Link>

                <button
                  onClick={() => {
                    Logout()
                    setShow(false)
                  }}
                  className="flex items-center justify-between text-red-600 hover:text-red-700 transition"
                >
                  <span>تسجيل الخروج</span>
                  <IoIosLogOut />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Nav
