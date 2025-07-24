'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#101827] text-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-400">Welcome Back</h2>
        <p className="text-sm text-center text-gray-400 mb-8">Login to continue your football challenge ⚽</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm mb-1 block text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#1f2937] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="text-sm mb-1 block text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#1f2937] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 cursor-pointer text-gray-400"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link href="/Pages/Forgot" className="text-green-400 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{' '}
            <Link href="/Auth/Signup" className="text-green-400 hover:underline">Sign up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
