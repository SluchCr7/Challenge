'use client'
import Image from 'next/image'
import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthContext } from '../Context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiUserLine,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiMessage3Line,
  RiDashboardLine,
  RiTrophyLine,
  RiInformationLine,
  RiMenu4Fill,
  RiCloseLine
} from 'react-icons/ri'

const Nav = ({ setShowProfile }) => {
  const { isLogin, isAuthChecked, user, Logout } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Leaderboard', icon: <RiTrophyLine />, href: '/Games/Leaderboard' },
    { name: 'Categories', icon: <RiDashboardLine />, href: '#categories' },
    { name: 'Contact', icon: <RiMessage3Line />, href: '/Contact' },
  ]

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-500 ease-in-out ${scrolled ? 'top-4' : 'top-6'
        }`}
    >
      <div className={`glass-dark rounded-[2.5rem] px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl overflow-visible`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl italic">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-xl leading-none italic">SHALAN</span>
            <span className="text-primary font-bold tracking-[0.2em] text-[10px] leading-none">CHALLENGE</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-semibold transition-all hover:scale-105"
            >
              <span className="text-lg text-primary">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* User / XP Indicator */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <div className="flex items-center gap-4">
              {/* XP Indicator */}
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Lv. 24</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-black text-primary italic">ELITE STRIKER</span>
              </div>

              {/* Profile Wrapper */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative p-1 bg-gradient-to-tr from-primary to-red-400 rounded-full cursor-pointer"
                >
                  <Image
                    src={user?.profilePhoto?.url || '/default-avatar.png'}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-carbon-dark"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-carbon-dark rounded-full shadow-lg" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-16 right-0 w-64 glass-dark rounded-[2rem] border border-white/10 p-3 shadow-2xl z-[110]"
                    >
                      <div className="p-4 border-b border-white/5 mb-2">
                        <p className="text-white font-bold truncate">{user?.Name || 'Player'}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider">{user?.Email}</p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => { setShowProfile(true); setShowDropdown(false); }}
                          className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-2xl transition-colors text-white/70 hover:text-white"
                        >
                          <RiUserLine className="text-primary text-lg" />
                          <span className="text-sm font-semibold">Profile Dashboard</span>
                        </button>

                        {user?.isAdmain && (
                          <Link
                            href="/Admin"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-2xl transition-colors text-white/70 hover:text-white"
                          >
                            <RiSettings4Line className="text-primary text-lg" />
                            <span className="text-sm font-semibold">Admin Panel</span>
                          </Link>
                        )}

                        <button
                          onClick={() => { Logout(); setShowDropdown(false); }}
                          className="flex items-center gap-3 w-full p-3 hover:bg-red-500/10 rounded-2xl transition-colors text-red-500"
                        >
                          <RiLogoutBoxLine className="text-lg" />
                          <span className="text-sm font-semibold">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <Link
              href="/Auth/Login"
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-heavy rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              JOIN THE CLUB
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-white ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu4Fill />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-dark rounded-[2.5rem] border border-white/10 p-6 overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white flex items-center gap-4 text-lg font-bold transition-all"
                >
                  <span className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Nav
