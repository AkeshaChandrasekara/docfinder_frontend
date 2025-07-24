import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaClinicMedical, FaArrowRight, FaBriefcaseMedical } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-hot-toast';

export default function SpecialitiesPage() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/specialties`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch specialties data');
        }

        setSpecialties(response.data.data);
      } catch (err) {
        console.error('Error fetching specialties:', err);
        setError(err.response?.data?.message || 'Failed to load specialties. Please try again later.');
        toast.error(err.response?.data?.message || 'Failed to load specialties');
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialties();
  }, []);

  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <main className="flex-grow bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <FaClinicMedical className="mr-3 text-blue-600" /> Our Medical Specialties
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of medical specialties and find the right care for you
            </p>
          </div>

          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search specialties..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredSpecialties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSpecialties.map(specialty => (
                <div 
                  key={specialty._id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="p-8 flex flex-col items-center flex-grow">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <FaBriefcaseMedical className="text-4xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-2">{specialty.name}</h3>
                    <p className="text-gray-600 text-justify mb-6 flex-grow">
                      {specialty.description || 'Expert care in this medical specialty'}
                    </p>
                    <Link 
                      to={`/doctors?specialty=${specialty._id}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium mt-auto"
                    >
                      View Doctors <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                  <div className="bg-gray-50 px-6 py-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        24/7 Availability
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Expert Care
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-700">No specialties found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search query</p>
            </div>
          )}

          <div className="mt-16 bg-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="mb-6 max-w-2xl mx-auto">Our patient care team is available 24/7 to help you find the right specialist.</p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}