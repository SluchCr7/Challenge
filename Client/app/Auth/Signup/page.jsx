'use client'
import React, { useContext, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi';

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

    setTimeout(() => {
      setLoading(false);
      const { email, password, username } = formData;

      if (!agreeTerms) {
        setError('You must agree to the Terms and Conditions to register.');
        return;
      }

      if (email && password && username) {
        registerNewUser(username, email, password);
      } else {
        setError('Invalid email or password or username');
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white dark:bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6'
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-lightMode-text dark:text-darkMode-text">
          Hello In Challenge 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-lightMode-text2 dark:text-darkMode-text2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm mb-1 text-lightMode-text2 dark:text-darkMode-text2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-white/10 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-1 text-lightMode-text2 dark:text-darkMode-text2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/80 dark:bg-white/10 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 cursor-pointer text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-lightMode-text2 dark:text-darkMode-text2">
              I agree to the{' '}
              <a href="/Pages/Terms" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className="text-sm text-center text-lightMode-text2 dark:text-darkMode-text2">
            Have an account?{' '}
            <a href="/Auth/Login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

export default SignUp
