import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomePage() {
  const testimonials = [
    {
      quote: "Found the perfect specialist for my condition within minutes. The platform is incredibly user-friendly!",
      author: "Ravi Perera",
      role: "Patient"
    },
    {
      quote: "As a doctor, I appreciate how DocFinder helps connect me with patients who truly need my expertise.",
      author: "Dr. Anjali Silva",
      role: "Cardiologist"
    },
    {
      quote: "Scheduling appointments has never been easier. The whole family uses DocFinder now.",
      author: "Nimali Fernando",
      role: "Patient"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
   

      <section className="relative h-auto md:h-[64vh] bg-white overflow-hidden flex items-center border-b border-gray-100 py-12 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full">
          <div className="flex flex-col md:flex-row items-center h-full">
            <motion.div 
              className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 h-full flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Find the Right Doctor 
                <br />
                <span className="text-blue-600">For Your Needs</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-lg mx-auto md:mx-0">
                Connect with top-rated specialists in your area and book appointments effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/doctors"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-center"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/specialities"
                  className="bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-bold py-3 px-6 rounded-full transition-colors duration-300 text-center"
                >
                  Browse Specialities
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex items-center justify-center h-full mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="/hd4.png" 
                alt="Doctor illustration"
                className="h-auto max-h-[300px] md:max-h-[100%] w-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How DocFinder Works</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Three simple steps to find and book your perfect doctor
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Search", 
                description: "Find doctors by specialty, location, or name"
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Book", 
                description: "Select available time slots that work for you"
              },
              { 
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: "Consult", 
                description: "Visit the doctor or have an online consultation"
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white p-6 sm:p-8 rounded-2xl overflow-hidden group text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{step.description}</p>
                  
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white mx-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-3xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Browse By Speciality</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Find doctors specialized in various medical fields
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { 
                name: "Cardiology", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                doctors: 24 
              },
              { 
                name: "Neurology", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                doctors: 18 
              },
              { 
                name: "Pediatrics", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                doctors: 32 
              },
              { 
                name: "Dermatology", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                doctors: 15 
              },
              { 
                name: "Orthopedics", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                doctors: 22 
              },
              { 
                name: "Ophthalmology", 
                icon: (
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                doctors: 12 
              }
            ].map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer border border-gray-100"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 mb-3 mx-auto flex items-center justify-center text-blue-600">
                  {specialty.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{specialty.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{specialty.doctors} doctors</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/specialities"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 text-sm sm:text-base"
            >
              View All Specialities
            </Link>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Trusted by Patients & Doctors</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Real experiences from our healthcare community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm h-full flex flex-col relative overflow-hidden group border border-gray-100 hover:border-blue-200 transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-bl-3xl"></div>
                  </div>
                  
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 sm:mr-4">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.author}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-grow mb-4 sm:mb-6">
                    <svg 
                      className="absolute -top-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 text-blue-200 opacity-80" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-gray-600 pl-5 sm:pl-6 text-sm sm:text-base">"{testimonial.quote}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg sm:shadow-xl">
              <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-blue-300 rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
                  <div className="lg:w-2/3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      Find Your Perfect <span className="text-blue-600">Healthcare Match</span> Today
                    </h2>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                      Join thousands who've already found their ideal doctors through our platform.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {[
                        { value: "500+", label: "Verified Doctors" },
                        { value: "95%", label: "Satisfaction Rate" },
                        { value: "24/7", label: "Availability" }
                      ].map((stat, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-gray-700 text-xs sm:text-sm">
                            <span className="text-blue-600">{stat.value}</span> {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-1/3 w-full">
                    <div className="space-y-3 sm:space-y-4">
                      <Link
                        to="/doctors"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-center text-sm sm:text-base"
                      >
                        Find a Doctor
                      </Link>
                      <Link
                        to="/specialities"
                        className="block w-full bg-white border-2 border-blue-600 hover:bg-blue-50 text-blue-600 font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 text-center text-sm sm:text-base"
                      >
                        Browse Specialties
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                  <p className="text-xs sm:text-sm text-gray-500">
                    Trusted by patients and doctors nationwide
                  </p>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    {["hospital", "medical-center", "clinic"].map((icon, i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}