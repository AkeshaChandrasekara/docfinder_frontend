import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUserMd, FaStar, FaHospital, FaArrowRight } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { toast } from 'react-hot-toast';
import Header from '../components/header';
import Footer from '../components/footer';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleDoctors, setVisibleDoctors] = useState({});
  const doctorsPerSpecialty = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [doctorsRes, specialtiesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors?populate=specialty`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/specialties`)
        ]);

        if (!doctorsRes.data.success || !specialtiesRes.data.success) {
          throw new Error('Failed to fetch data from server');
        }

        setDoctors(doctorsRes.data.data);
        setSpecialties(specialtiesRes.data.data);
        
        const initialVisible = {};
        specialtiesRes.data.data.forEach(specialty => {
          initialVisible[specialty._id] = doctorsPerSpecialty;
        });
        setVisibleDoctors(initialVisible);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Failed to load doctors data. Please try again later.');
        toast.error(err.response?.data?.message || 'Failed to load doctors data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDoctorsBySpecialty = (specialtyId) => {
    return doctors.filter(doctor => {
      const doctorSpecialty = doctor.specialty;
      const doctorSpecialtyId = doctorSpecialty?._id ? doctorSpecialty._id : doctorSpecialty;
      return doctorSpecialtyId === specialtyId;
    });
  };

  const loadMoreDoctors = (specialtyId) => {
    setVisibleDoctors(prev => ({
      ...prev,
      [specialtyId]: prev[specialtyId] + doctorsPerSpecialty
    }));
  };

  const filteredSpecialties = specialties.filter(specialty => {
    const specialtyDoctors = getDoctorsBySpecialty(specialty._id);
    const hasMatchingDoctor = specialtyDoctors.some(doctor => 
      `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return specialtyDoctors.length > 0 && 
      (specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) || hasMatchingDoctor);
  });

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FaUserMd className="mr-3 text-blue-600" /> Our Specialist Doctors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find and book appointments with our qualified specialists
            </p>
          </div>

          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by specialty or doctor name..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredSpecialties.length > 0 ? (
            <div className="space-y-12">
              {filteredSpecialties.map(specialty => {
                const specialtyDoctors = getDoctorsBySpecialty(specialty._id);
                const visibleCount = visibleDoctors[specialty._id] || doctorsPerSpecialty;
                const showLoadMore = specialtyDoctors.length > visibleCount;

                return (
                  <div key={specialty._id} className="border-b border-blue-200 pb-8 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        
                        <h2 className="text-2xl font-bold text-gray-900">
                          {specialty.name}
                        </h2>
                      </div>
                      <div className="text-gray-500">
                        {specialtyDoctors.length} {specialtyDoctors.length === 1 ? 'Doctor' : 'Doctors'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {specialtyDoctors.slice(0, visibleCount).map(doctor => (
  <div key={doctor._id} className="bg-white p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-3 mb-4">
    <img 
  src={doctor.photo} 
  alt={`${doctor.firstName} ${doctor.lastName}`}
  className="w-12 h-12 rounded-lg object-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png';
  }}
/>
                            <div>
                              <h3 className="font-bold text-gray-900">Dr. {doctor.firstName} {doctor.lastName}</h3>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className={i < 4 ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'} />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm mb-4">
                            {doctor.hospital && (
                              <div className="flex items-center text-gray-600">
                                <FaHospital className="mr-2 text-blue-400" /> 
                                <span className="truncate">{doctor.hospital}</span>
                              </div>
                            )}
                            <div className="flex items-center text-gray-600">
                              <GiMedicines className="mr-2 text-blue-400" /> 
                              {doctor.qualifications?.[0] || 'MD'}
                            </div>
                            <div className="text-gray-500">
                              {doctor.experience}+ years experience
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Link 
                              to={`/doctors/${doctor._id}`}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Profile
                            </Link>
                            <Link 
                              to={`/book-appointment/${doctor._id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm flex items-center"
                            >
                              <FaCalendarAlt className="mr-1" /> Book
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {showLoadMore && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => loadMoreDoctors(specialty._id)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
                        >
                          View More {specialty.name} Specialists
                          <FaArrowRight className="ml-2" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm ? 'Try adjusting your search query' : 'No doctors available at the moment'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}