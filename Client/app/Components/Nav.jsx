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
  RiMenu4Fill,
  RiCloseLine,
  RiShieldFlashLine
} from 'react-icons/ri'

const Nav = ({ setShowProfile }) => {
  const { isLogin, user, Logout } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isAdminUser = Boolean(user?.isAdmain || user?.isAdmin)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const baseMenuItems = [
    { name: 'المتصدرون', icon: <RiTrophyLine />, href: '/Games/Leaderboard' },
    { name: 'تواصل معنا', icon: <RiMessage3Line />, href: '/Contact' },
  ]

  const menuItems = isAdminUser
    ? [...baseMenuItems, { name: 'لوحة الإدارة', icon: <RiShieldFlashLine />, href: '/Admin', isAdmin: true }]
    : baseMenuItems

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-300 ease-in-out ${
        scrolled ? 'top-3' : 'top-5'
      }`}
    >
      <div className="card-surface rounded-2xl px-6 py-3 flex items-center justify-between border border-border shadow-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-200 shadow-md shadow-primary/20">
            <span className="text-slate-950 font-black text-lg italic">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-black tracking-tight text-lg leading-none italic">SHALAN</span>
            <span className="text-primary font-bold tracking-[0.25em] text-[9px] leading-none mt-0.5">CHALLENGE</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 text-xs font-bold transition-all px-3 py-1.5 rounded-lg ${
                item.isAdmin
                  ? 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-background'
                  : 'text-muted hover:text-foreground hover:bg-white/5'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* User / XP Indicator */}
        <div className="flex items-center gap-4">
          {isLogin ? (
            <div className="flex items-center gap-4">
              {/* Profile Wrapper */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative p-0.5 bg-gradient-to-tr from-primary to-emerald-400 rounded-full cursor-pointer shadow-md shadow-primary/10"
                >
                  <Image
                    src={user?.profilePhoto?.url || '/default-avatar.png'}
                    alt="User"
                    width={38}
                    height={38}
                    className="rounded-full border border-slate-900 object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary border-2 border-slate-950 rounded-full shadow-sm" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      className="absolute top-14 right-0 w-64 card-surface rounded-2xl border border-border p-3 shadow-2xl z-[110]"
                    >
                      <div className="p-3 border-b border-border mb-1.5 text-right">
                        <p className="text-foreground font-bold truncate text-sm">{user?.Name || 'Player'}</p>
                        <p className="text-muted text-[10px] tracking-wider truncate">{user?.Email}</p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => { setShowProfile(true); setShowDropdown(false); }}
                          className="flex items-center justify-between w-full p-2.5 hover:bg-surface-elevated rounded-xl transition-colors text-muted hover:text-foreground text-right"
                        >
                          <span className="text-xs font-semibold">الملف الشخصي</span>
                          <RiUserLine className="text-primary text-base" />
                        </button>

                        {isAdminUser && (
                          <Link
                            href="/Admin"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center justify-between w-full p-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl transition-colors text-primary text-right"
                          >
                            <span className="text-xs font-bold">لوحة الإدارة</span>
                            <RiDashboardLine className="text-primary text-base" />
                          </Link>
                        )}

                        <button
                          onClick={() => { Logout(); setShowDropdown(false); }}
                          className="flex items-center justify-between w-full p-2.5 hover:bg-rose-500/10 rounded-xl transition-colors text-rose-400 text-right"
                        >
                          <span className="text-xs font-semibold">تسجيل الخروج</span>
                          <RiLogoutBoxLine className="text-base" />
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
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-background text-xs font-black tracking-wider uppercase rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              تسجيل الدخول
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-foreground ml-2 p-1 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
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
            className="md:hidden mt-3 card-surface rounded-2xl border border-border p-5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
                    item.isAdmin
                      ? 'bg-primary/10 border border-primary/30 text-primary'
                      : 'text-muted hover:text-foreground hover:bg-surface-elevated'
                  }`}
                >
                  <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary text-base">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.name}</span>
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
