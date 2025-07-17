import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-reset-token/${token}`);
        setValidToken(true);
      } catch (error) {
        toast.error('Invalid or expired reset token');
        navigate('/forgot-password');
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password/${token}`, { password });
      toast.success('Password updated successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!validToken) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="hidden md:flex md:w-4/5 bg-slate-900 items-start justify-center pt-40 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-4/5 z-10"
        >
          <motion.img 
            src='/logo.png'
            className="w-36 h-36 mx-auto mb-4"
            alt="DocFinder Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.h1 
            className="text-6xl font-bold text-white mb-2 font-serif tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            DOCFINDER
          </motion.h1>
          <motion.div 
            className="w-32 h-0.5 bg-blue-600 mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
          <motion.p 
            className="text-gray-400 text-l italic tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            "Find Your Perfect Doctor in Minutes"
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full md:w-4/5 bg-white flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h3 
              className="text-3xl font-bold text-gray-950 mb-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Set New Password
            </motion.h3>
            <motion.p 
              className="text-gray-500 text-sm mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Create a new password for your account
            </motion.p>
            <motion.div 
              className="w-16 h-0.5 bg-blue-500 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                placeholder="••••••••"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength="8"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                placeholder="••••••••"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 flex items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                backgroundColor: '#2563eb',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)'
              }}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </motion.button>
          </form>

          <motion.div 
            className="text-center text-sm pt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Back to login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}