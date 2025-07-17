import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: ''
  });

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
        token: res.access_token
      }).then((res) => {
        if (res.data.message == "User created") {
          toast.success("Your account is created now you can login via google.");
        } else {
          localStorage.setItem("token", res.data.token);
          navigate(res.data.user.type == "admin" ? "/admin" : "/");
        }
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const signup = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", 
      formData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      if (res.data.message === "User created") {
        toast.success("Account created successfully! Please login.");
        navigate('/login');
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    }).catch((error) => {
      toast.error(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100">
      
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-600 to-blue-800 items-start justify-center pt-40 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-4/5 z-10"
        >
          <motion.img 
            src='/logo.png'
            className="w-32 h-32 mx-auto mb-6"
            alt="DocFinder Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.h1 
            className="text-5xl font-bold text-white mb-2 font-sans tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            DocFinder
          </motion.h1>
          <motion.div 
            className="w-32 h-0.5 bg-blue-400 mx-auto mb-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
          <motion.p 
            className="text-blue-200 text-lg italic tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            "Find Your Perfect Doctor in Minutes"
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            background: "white",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div className="text-center mb-6">
            <motion.h3 
              className="text-2xl font-bold text-blue-800 mb-1 font-sans"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Create Your Account
            </motion.h3>
            <motion.p 
              className="text-blue-600 text-sm mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Join DocFinder to find the best healthcare providers
            </motion.p>
            <motion.div 
              className="w-16 h-1 bg-blue-500 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex space-x-4"
            >
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-800 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-800 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                  placeholder="Last Name"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <label htmlFor="mobile" className="block text-sm font-medium text-blue-800 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-blue-800 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                placeholder="Email Address"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 bg-white"
                placeholder="Password"
                minLength="6"
              />
            </motion.div>

            <motion.button
              onClick={signup}
              className="w-full py-2 px-4 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 flex items-center justify-center mt-2"
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
              <span className="font-medium">Sign Up</span>
            </motion.button>

            <motion.div 
              className="relative mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-blue-500">Or continue with</span>
              </div>
            </motion.div>

            <motion.button
              onClick={() => {googleLogin()}}
              className="w-full flex justify-center items-center py-2 px-4 border border-blue-200 text-sm rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </motion.button>

            <motion.div 
              className="text-center text-sm pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <span className="text-blue-600">Already have an account? </span>
              <Link to="/login" className="font-medium text-blue-800 hover:text-blue-600">
                Sign in
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}