import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserMd, FaClinicMedical, FaHeartbeat } from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import Header from '../components/header';
import Footer from '../components/footer';

export default function AboutPage() {
  const stats = [
    { value: "500+", label: "Qualified Doctors" },
    { value: "50+", label: "Medical Specialties" },
    { value: "10K+", label: "Patients Helped" },
    { value: "24/7", label: "Support Available" }
  ];

  const team = [
    { 
      name: "Dr. Ramith Silva", 
      role: "Medical Director", 
      bio: "Board-certified physician with 15 years of clinical experience.",
      image: "/docmale.jpg"
    },
    { 
      name: "Ravi Perera", 
      role: "Technology Lead", 
      bio: "Healthcare technology expert focused on improving patient experiences.",
      image: "/tman.jpg"
    },
    { 
      name: "Shaveen Fernando", 
      role: "Patient Advocate", 
      bio: "Dedicated to ensuring patient needs are at the center of our platform.",
      image: "/advo.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    
      <section className="relative h-[40vh] sm:h-[50vh] bg-gradient-to-r from-blue-600 to-blue-500 overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">About DocFinder</h1>
            <div className="w-16 sm:w-20 h-1 bg-blue-300 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Connecting patients with quality healthcare since 2015
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
              <div className="w-16 sm:w-20 h-1 bg-blue-500 mb-4 sm:mb-6"></div>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                At DocFinder, we believe everyone deserves access to quality healthcare. Our mission is to bridge the gap between patients and healthcare providers through innovative technology.
              </p>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                We're committed to making healthcare more accessible, transparent, and patient-centered by connecting people with the right medical professionals for their needs.
              </p>
              <Link 
                to="/doctors" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-sm sm:text-base"
              >
                Find a Doctor
              </Link>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 grid grid-cols-2 gap-3 sm:gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl h-full">
                <FaUserMd className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4" />
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Verified Doctors</h3>
                <p className="text-gray-600 text-xs sm:text-sm">All providers undergo rigorous credential verification</p>
              </div>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl h-full">
                <FaClinicMedical className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4" />
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Comprehensive Listings</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Find specialists across all major medical fields</p>
              </div>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl h-full">
                <FaHeartbeat className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4" />
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Patient-Centered</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Designed with patient needs as our top priority</p>
              </div>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-xl h-full">
                <IoMdPeople className="text-blue-600 text-2xl sm:text-3xl mb-3 sm:mb-4" />
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Community Trust</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Trusted by thousands of patients nationwide</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
              >
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-gray-600 text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Story</h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-500 mx-auto mb-3 sm:mb-4"></div>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base"
            >
              <p>
                DocFinder was founded in 2015 by a team of healthcare professionals and technologists who saw the need for a better way to connect patients with doctors. Frustrated by the fragmented healthcare system and the difficulty patients faced in finding the right providers, we set out to create a solution.
              </p>
              <p>
                What began as a small local directory has grown into a nationwide platform serving thousands of patients every month. Along the way, we've stayed true to our core values of transparency, quality, and patient empowerment.
              </p>
              <p>
                Today, DocFinder continues to innovate, adding new features like telemedicine integration, patient reviews, and AI-powered matching to further improve the healthcare experience for both patients and providers.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 sm:mt-12 bg-blue-50 rounded-xl p-6 sm:p-8 md:p-12"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Our Vision</h3>
              <p className="text-gray-600 text-sm sm:text-base text-center italic">
                "To create a healthcare ecosystem where every patient can easily find and connect with the perfect doctor for their needs, and where every doctor can focus on what they do best - providing excellent care."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Meet Our Team</h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-500 mx-auto mb-3 sm:mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              The passionate people behind DocFinder
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Find Your Doctor?</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of patients who found quality healthcare through DocFinder
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/doctors"
                className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-sm sm:text-base"
              >
                Browse Doctors
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}