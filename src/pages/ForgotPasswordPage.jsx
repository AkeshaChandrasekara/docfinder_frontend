import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgot-password`, { email });
      toast.success('Password reset link sent to your email');
      setEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white p-4">
      <motion.div 
        className="w-full max-w-md relative bg-white rounded-3xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500"></div>
        <div className="relative z-10">
          <motion.div 
            className="pt-8 px-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-200/30 rounded-full blur-md"></div>
                <img 
                  src="/component3.png"
                  className="relative w-20 h-20 drop-shadow-lg"
                  alt="Logo"
                />
              </div>
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold text-gray-800"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Forgot <span className="text-blue-600">Password</span>
            </motion.h1>
            <motion.p 
              className="text-gray-500 mt-1 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {emailSent ? 'Check your email for reset instructions' : 'Enter your email to receive a reset link'}
            </motion.p>
          </motion.div>

          <div className="px-8 pb-8 pt-6">
            {!emailSent ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 text-sm bg-white text-gray-800 border border-gray-200 rounded-lg transition duration-150 placeholder-gray-400 hover:border-gray-300"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-md relative overflow-hidden group mt-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-4"
              >
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="mt-3 text-gray-600">We've sent a password reset link to your email address.</p>
                <p className="mt-1 text-sm text-gray-500 mb-4">Didn't receive it? Check your spam folder.</p>
                <motion.button
                  onClick={() => setEmailSent(false)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Try again with a different email
                </motion.button>
              </motion.div>
            )}

            <motion.div 
              className="text-center text-sm pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-gray-600">Remember your password? </span>
              <motion.span whileHover={{ scale: 1.05 }}>
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Sign in
                </Link>
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}