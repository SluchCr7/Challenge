'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine, RiMailLine, RiArrowRightLine } from 'react-icons/ri'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { Login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.email && formData.password) {
      Login(formData.email, formData.password);
    } else {
      setLoading(false);
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass-dark border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 rotate-6 shadow-xl shadow-primary/20">
            <RiLockPasswordLine className="text-white text-4xl -rotate-6" />
          </div>
          <h2 className="text-4xl font-black italic text-white tracking-tighter uppercase mb-2">Back to Action</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Enter your credentials to enter the arena</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Digital Address</label>
            <div className="relative">
              <RiMailLine className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="stryker@stadium.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-14 pr-6 py-5 rounded-2xl glass border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2">Secret Code</label>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-14 pr-14 py-5 rounded-2xl glass border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end pr-2">
            <Link href="/Pages/Forgot" className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors">
              Lost Access?
            </Link>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary text-[10px] font-bold uppercase tracking-widest bg-primary/10 p-4 rounded-xl border border-primary/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-20 bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-primary/30 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <>Enter Stadium <RiArrowRightLine size={20} /></>
            )}
          </button>

          <p className="text-[10px] font-black text-center text-white/20 uppercase tracking-[0.2em]">
            New to the League?{' '}
            <Link href="/Auth/Signup" className="text-primary hover:text-white transition-colors ml-2 underline decoration-primary/20 underline-offset-4">Create Elite Profile</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
