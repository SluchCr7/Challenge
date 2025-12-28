'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine, RiMailLine, RiUserAddLine, RiShieldFlashLine, RiArrowRightUpLine } from 'react-icons/ri'

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { registerNewUser } = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { email, password, username } = formData;

    if (!agreeTerms) {
      setLoading(false);
      setError('You must agree to the Arena Protocols.');
      return;
    }

    if (email && password && username) {
      registerNewUser(username, email, password);
    } else {
      setLoading(false);
      setError('Required field data missing.');
    }
  };

  return (
    <div className="min-h-[95vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-xl glass-dark border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center mb-6 group">
            <RiUserAddLine className="text-primary text-4xl group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase mb-2">Join Elite Rank</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] text-center">Your professional journey in football knowledge starts here</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Digital Identify */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Display Name</label>
              <div className="relative">
                <RiUserAddLine className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  name="username"
                  placeholder="Striker7"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Comm Channel</label>
              <div className="relative">
                <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="email"
                  name="email"
                  placeholder="hq@arena.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Access Key Override</label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-14 pr-14 py-5 rounded-2xl glass border border-white/5 text-white placeholder:text-white/10 focus:ring-2 focus:ring-primary/50 transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                {showPassword ? <RiEyeOffLine size={24} /> : <RiEyeLine size={24} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-3 p-4 glass border border-white/5 rounded-2xl group cursor-pointer" onClick={() => setAgreeTerms(!agreeTerms)}>
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreeTerms ? 'bg-primary border-primary shadow-[0_0_10px_rgba(225,6,0,0.5)]' : 'border-white/10'}`}>
              {agreeTerms && <RiShieldFlashLine className="text-white text-xs" />}
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">
              I acknowledge the <span className="text-white font-black group-hover:text-primary transition-colors">Arena Protocols</span>
            </span>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-[10px] font-black uppercase tracking-widest text-center">{error}</motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-20 bg-primary hover:bg-primary-hover text-white font-black text-sm uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-primary/30 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4"
          >
            {loading ? 'CALIBRATING...' : <><RiUserAddLine size={24} /> INITIATE PROFILE</>}
          </button>

          <p className="text-[10px] font-black text-center text-white/20 uppercase tracking-[0.2em]">
            Already an Arena Member?{' '}
            <Link href="/Auth/Login" className="text-primary hover:text-white transition-colors ml-2 underline underline-offset-4 flex items-center justify-center gap-1 mt-2">
              STADIUM ENTRANCE <RiArrowRightUpLine />
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp
