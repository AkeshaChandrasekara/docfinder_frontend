import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DoctorsPage from './pages/DoctorsPage'
import SpecialitiesPage from './pages/SpecialitiesPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AdminHomePage from './pages/adminHomePage'
import DoctorProfile from './pages/DoctorProfile'
import BookingPage from './pages/BookingPage'
import BookingConfirmation from './pages/BookingConfirmation'
import MyAppointments from './pages/MyAppointments'
import AppointmentDetails from './pages/AppointmentDetails'
import PaymentSuccess from './pages/PaymentSuccess'





function App() {
  const [count, setCount] = useState(0)



  return (
    <div className='bg-primary'>
     <BrowserRouter>
      <Toaster position='top-right'/>
      <GoogleOAuthProvider clientId='421805444081-blvotlcv0g91ed8rcmd5fp32241sglha.apps.googleusercontent.com'>
      <Routes path="/*">          
        <Route path="/*" element={<HomePage/>}/>   
        <Route path="/login" element={<LoginPage/>}/>
   <Route path="/signup" element={<SignUpPage/>}/> 
    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/> 
            <Route path="/reset-password/:token" element={<ResetPasswordPage/>}/>
            <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/specialities" element={<SpecialitiesPage />} />
             <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/admin/*" element={<AdminHomePage/>}/>
         
  <Route path="/book-appointment/:id" element={<BookingPage />} />
   <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
   <Route path="/my-appointments" element={<MyAppointments />} />
    <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
    <Route path="/payment-success" element={<PaymentSuccess />} />


       
                   
      </Routes>
      </GoogleOAuthProvider>
     </BrowserRouter>
    </div>
  )
}

export default App
