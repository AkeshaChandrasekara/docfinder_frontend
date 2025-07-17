import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google",{
        token : res.access_token
      }).then(
        (res)=>{
          if(res.data.message == "User created"){
            toast.success("Your account is created now you can login via google.")
          }else{
            localStorage.setItem("token",res.data.token)
            if(res.data.user.type == "admin"){
              window.location.href = "/admin"
            }else{
              window.location.href = "/"
            }
          }
        }
      )
    }
  })
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  function login() {
    const loginData = {
      email: email.trim(),
      password: password.trim()
    };

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", 
      loginData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      if (!res.data.user) {
        toast.error(res.data.message);
        return;
      }
      toast.success("Login success");
      localStorage.setItem("token", res.data.token);
      if (res.data.user.type === "admin") {
        window.location.href = "/admin"; 
      } else {
        window.location.href = "/";
      }
    }).catch((error) => {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    });
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side - Full Height Image (unchanged) */}
      <div className="hidden md:flex md:w-1/2 h-full relative">
        <img 
          src="/doc55.png" 
          alt="Medical professionals"
          className="w-full h-full object-cover"
        />
        {/* Darker gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent"></div>
      </div>

      {/* Right Side - Dark Theme Login Container */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-800">
        <motion.div 
          className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Dark header with accent elements */}
          <div className="relative overflow-hidden bg-gray-800">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600 rounded-full opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-600 rounded-full opacity-10"></div>
            
            <motion.div 
              className="p-8 text-center relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/component3.png"
                  className="w-20 h-20 drop-shadow-lg"
                  alt="Logo"
                />
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold text-white"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                Welcome to <span className="text-blue-400">DocFinder</span>
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Sign in to access your dashboard
              </motion.p>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="px-8 pb-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, staggerChildren: 0.1 }}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
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
                      className="block w-full pl-10 pr-3 py-3 text-sm bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 placeholder-gray-400"
                      placeholder="email@example.com"
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <motion.div whileHover={{ scale: 1.01 }}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 text-sm bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 placeholder-gray-400"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-600 bg-gray-700"
                    />
                  </motion.div>
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </Link>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={login}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-lg relative overflow-hidden group"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              </motion.button>

              <motion.div 
                className="relative my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </motion.div>

              <motion.button
                onClick={() => {googleLogin()}}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-700 text-sm rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 relative overflow-hidden group"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: "rgba(55, 65, 81, 0.5)"
                }}
              >
                <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                <svg className="w-5 h-5 mr-2 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="relative z-10 text-gray-300">Sign in with Google</span>
              </motion.button>

              <motion.div 
                className="text-center text-sm pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-gray-400">Don't have an account? </span>
                <motion.span whileHover={{ scale: 1.05 }}>
                  <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                    Sign up
                  </Link>
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}