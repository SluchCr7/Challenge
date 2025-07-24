'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'

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
      setError('You must agree to the Terms and Conditions to register.');
      return;
    }

    if (email && password && username) {
      registerNewUser(username, email, password);
    } else {
      setLoading(false);
      setError('Please fill in all fields correctly.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md border border-[#1f2937] bg-[#101827] text-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-400">Join Challenge Football</h2>
        <p className="text-sm text-center text-gray-400 mb-8">
          Compete with your football knowledge and earn rewards 🏆
        </p>

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

          {/* Username */}
          <div>
            <label htmlFor="username" className="text-sm mb-1 block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Your gamer tag"
              value={formData.username}
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

          {/* Terms */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="terms">
              I agree to the <a href="/Pages/Terms" target="_blank" className="text-green-400 hover:underline">Terms & Conditions</a>
            </label>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>

          {/* Login */}
          <p className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link href="/Auth/Login" className="text-green-400 hover:underline">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp;
