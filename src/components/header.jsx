import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider";

export default function Header() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  return (
    <>
      {isSliderOpen && <NavSlider closeSlider={() => setIsSliderOpen(false)} />}
      <header className="bg-blue-700 w-full h-20 relative flex justify-between items-center px-6 shadow-lg">
        <div className="flex items-center">
      
          <span className="ml-2 text-white font-bold text-xl">DocFinder</span>
        </div>

        <RxHamburgerMenu 
          onClick={() => setIsSliderOpen(true)}
          className="text-3xl cursor-pointer text-white lg:hidden" 
        />

        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="text-white font-medium text-lg hover:text-blue-50 transition-colors duration-300"
          >
            Home
          </Link>
          
          <Link
            to="/doctors"
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            Find Doctors
          </Link>
          <Link
            to="/my-appointments"
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            My Appointments
          </Link>
          <Link
            to="/about"
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="ml-4 px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-300"
          >
            Login
          </Link>
        </nav>
      </header>
    </>
  );
}