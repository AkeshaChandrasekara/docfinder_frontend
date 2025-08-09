import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaUserMd, 
  FaStar, 
  FaHospital, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBuilding,
  FaInfoCircle,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaAward,
  FaStethoscope,
  FaMoneyBill
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { FaMoneyCheck } from 'react-icons/fa6';
import Header from '../components/header';
import Footer from '../components/footer';

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/doctors/${id}`
        );
        
        if (!response.data.success) {
          throw new Error('Failed to fetch doctor data');
        }

        const normalizedDoctor = {
          ...response.data.data,
          chanellingCenter: response.data.data.chanellingCenter 
            ? (typeof response.data.data.chanellingCenter === 'object' 
                ? response.data.data.chanellingCenter 
                : { _id: response.data.data.chanellingCenter }) 
            : null,
          availableDays: response.data.data.availableDays?.map(day => ({
            ...day,
            day: day.day.trim(),
            slots: day.slots?.map(slot => ({
              ...slot,
              isAvailable: slot.isAvailable !== false
            }))
          })) || []
        };

        setDoctor(normalizedDoctor);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load doctor profile. Please try again later.');
        toast.error(err.response?.data?.message || 'Failed to load doctor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md border border-gray-100">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Doctor Profile</h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <Link 
              to="/doctors" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Back to Doctors List
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!doctor) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
            <p className="text-gray-700 mb-4">The requested doctor profile could not be found.</p>
            <Link 
              to="/doctors" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Back to Doctors List
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
     
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img 
                    src={doctor.photo} 
                    alt={`${doctor.firstName} ${doctor.lastName}`}
                    className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png';
                    }}
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center">
                    <FaStethoscope className="mr-1" />
                    <span>{doctor.specialty?.name || 'Specialist'}</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white">{doctor.firstName} {doctor.lastName}</h1>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-lg ${i < (doctor.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-white text-sm ml-2">{doctor.rating || 4}.0 ({doctor.reviews || 0} reviews)</span>
                      </div>
                    </div>
                    
                 
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link 
                      to={`/book-appointment/${doctor._id}`}
                      className="flex items-center bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md"
                    >
                      <FaCalendarAlt className="mr-2" /> Book Appointment
                    </Link>
                    <Link 
                      to="/doctors"
                      className="flex items-center border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
                    >
                      Back to Doctors
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
         
              <div className="lg:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <FaBriefcaseMedical className="text-blue-500 mr-2" /> Contact Info
                    </h3>
                    <div className="space-y-4">
                      {doctor.hospital && (
                        <div className="flex items-start">
                          <FaHospital className="text-gray-500 mr-2 mt-0.5" />
                          <span className="text-gray-700 text-sm">{doctor.hospital}</span>
                        </div>
                      )}
                      {doctor.address && (
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-gray-500 mr-2 mt-0.5" />
                          <span className="text-gray-700 text-sm">{doctor.address}</span>
                        </div>
                      )}
                      {doctor.phone && (
                        <div className="flex items-center">
                          <FaPhone className="text-gray-500 mr-2" />
                          <a href={`tel:${doctor.phone}`} className="text-gray-700 hover:text-blue-600 text-sm">
                            {doctor.phone}
                          </a>
                        </div>
                      )}
                      {doctor.email && (
                        <div className="flex items-center">
                          <FaEnvelope className="text-gray-500 mr-2" />
                          <a href={`mailto:${doctor.email}`} className="text-gray-700 hover:text-blue-600 text-sm">
                            {doctor.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {doctor.consultationFee && (
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FaMoneyCheck className="text-blue-500 mr-2" /> Consulation Fee
                      </h3>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600 mr-2">Rs.{doctor.consultationFee}</span>
                       
                      </div>
                    </div>
                  )}

                  
                </div>
              </div>


              <div className="lg:w-3/4 p-6">
         
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`px-5 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <FaInfoCircle className="mr-2" /> About Doctor
                    </button>
                  
                    <button
                      onClick={() => setActiveTab('availability')}
                      className={`px-5 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeTab === 'availability' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <FaClock className="mr-2" /> Availability
                    </button>
                    <button
                      onClick={() => setActiveTab('centers')}
                      className={`px-5 py-3 text-sm font-medium flex items-center whitespace-nowrap ${activeTab === 'centers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <FaBuilding className="mr-2" /> Chanelling Centers
                    </button>
                  </nav>
                </div>

                <div className="space-y-6">
                  {activeTab === 'about' && (
                    <>
                      <div className="bg-white rounded-xl p-5 border">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Bio</h3>
                        <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                          {doctor.bio || "No biography available for this doctor."}
                        </p>
                      </div>

                      {doctor.qualifications?.length > 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                            <FaGraduationCap className="text-blue-500 mr-2" /> Qualifications
                          </h3>
                          <ul className="space-y-3">
                            {doctor.qualifications.map((qual, index) => (
                              <li key={index} className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 flex-shrink-0">
                                  <FaGraduationCap className="text-xs" />
                                </span>
                                <span className="text-gray-700 text-sm">{qual}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                  {doctor.experience && (
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <FaAward className="text-blue-500 mr-2" /> Experience
                      </h3>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-600 mr-2">{doctor.experience}</span>
                        <span className="text-gray-600">years of experience</span>
                      </div>
                    </div>
                  )}
                    </>
                  )}

                  {activeTab === 'experience' && (
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
                        <div className="space-y-4">
                          {doctor.workExperience?.length > 0 ? (
                            doctor.workExperience.map((exp, index) => (
                              <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                                <h4 className="font-medium text-gray-900">{exp.position}</h4>
                                <p className="text-gray-600 text-sm">{exp.hospital}</p>
                                <p className="text-gray-500 text-xs">{exp.from} - {exp.to || 'Present'}</p>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No work experience details available.</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.specializations?.length > 0 ? (
                            doctor.specializations.map((spec, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                {spec}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No specialization details available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'availability' && (
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h3>
                      {doctor.availableDays?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {doctor.availableDays.map((day, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="bg-blue-50 px-4 py-3">
                                <h4 className="font-medium text-gray-900 flex items-center">
                                  <FaCalendarAlt className="text-blue-500 mr-2" />
                                  {day.day}
                                </h4>
                              </div>
                              <div className="p-3 space-y-2">
                                {day.slots?.length > 0 ? (
                                  day.slots.map((slot, slotIndex) => (
                                    <div 
                                      key={slotIndex} 
                                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${slot.isAvailable ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-100'}`}
                                    >
                                      <span className={`flex items-center ${slot.isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>
                                        <FaClock className={`mr-2 ${slot.isAvailable ? 'text-green-500' : 'text-gray-400'}`} />
                                        {slot.startTime} - {slot.endTime}
                                      </span>
                                      {slot.isAvailable ? (
                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
                                          Available
                                        </span>
                                      ) : (
                                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-medium">
                                          Booked
                                        </span>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-gray-500 text-sm text-center py-2">No slots available</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-yellow-700">
                                This doctor hasn't set their availability yet. Please check back later or contact the clinic directly.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

   {activeTab === 'centers' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Chanelling Center</h2>
                      
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center mb-4">
                          <FaBuilding className="text-gray-500 text-s mr-3" />
                          <h3 className="text-m font-semibold text-gray-900">
                            Asiri Hospitals - Colombo 5
                          </h3>
                        </div>
                       
                       
                        </div>
                      </div>
                    
                  )}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  );
}