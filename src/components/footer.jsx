import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-start">
             
              <span className="ml-0 text-white font-bold text-xl">DocFinder</span>
            </div>
            <p className="text-blue-100">
              Connecting patients with the best healthcare professionals in your area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-blue-100 hover:text-white transition-colors duration-300">
                  Find Doctors
                </Link>
              </li>
              <li>
                <Link to="/specialities" className="text-blue-100 hover:text-white transition-colors duration-300">
                  Specialities
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <IoMdMail className="text-white mt-1" />
                <span className="text-blue-100">info@docfinder.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <FiPhone className="text-white mt-1" />
                <span className="text-blue-100">011 222 3333</span>
              </div>
          
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
              <button className="bg-white hover:bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-r-md transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} DocFinder | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}