import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function NavSlider({ closeSlider }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 z-50 lg:hidden">
      <div className="absolute right-0 w-80 h-full bg-blue-700 shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-blue-400">
          <div className="flex items-center">
          
            <span className="ml-2 text-white font-bold">DocFinder</span>
          </div>
          <IoMdClose
            onClick={closeSlider}
            className="text-3xl cursor-pointer text-white"
          />
        </div>
        
        <div className="flex flex-col p-4 space-y-6">
          <Link
            to="/"
            onClick={closeSlider}
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            Home
          </Link>
         
          <Link
            to="/doctors"
            onClick={closeSlider}
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            Find Doctors
          </Link>
          <Link
            to="/my-appointments"
            onClick={closeSlider}
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            My Appointments
          </Link>
           <Link
            to="/about"
            onClick={closeSlider}
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={closeSlider}
            className="text-white font-medium text-lg hover:text-blue-200 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/login"
            onClick={closeSlider}
            className="mt-8 px-4 py-2 bg-white text-blue-600 font-medium rounded-md text-center hover:bg-blue-50 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}