import { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaCheckCircle, 
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaPrint
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-hot-toast';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appointments/user/appointments`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.data.success) {
          throw new Error('Failed to fetch appointments');
        }

        setAppointments(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.response?.data?.message || 'Failed to load appointments');
        toast.error(err.response?.data?.message || 'Failed to load appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);
  const filteredAppointments = appointments
    .filter(appointment => {

      const matchesSearch = 
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctor?.specialty?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
     
      const matchesStatus = 
        filterStatus === 'all' || 
        appointment.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const statusBadge = (status) => {
    const statusMap = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock className="mr-1" /> },
      confirmed: { color: 'bg-blue-100 text-blue-800', icon: <FaCheckCircle className="mr-1" /> },
      paid: { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle className="mr-1" /> },
      completed: { color: 'bg-purple-100 text-purple-800', icon: <FaCheckCircle className="mr-1" /> },
      cancelled: { color: 'bg-red-100 text-red-800', icon: <FaTimesCircle className="mr-1" /> }
    };
    
    const statusConfig = statusMap[status.toLowerCase()] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        {statusConfig.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handlePrint = (appointmentId) => {
    navigate(`/print-appointment/${appointmentId}`);
  };

  if (loading) {
    return (
     <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Appointments</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link 
              to="/" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
 
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">My Appointments</h1>
                  <p className="mt-1">View and manage your upcoming and past appointments</p>
                </div>
                <Link 
                  to="/doctors" 
                  className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-md border border-white/30 transition-colors"
                >
                  Book New Appointment
                </Link>
              </div>
            </div>

         
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaFilter className="mr-2" />
                    Filters
                    {showFilters ? (
                      <FaChevronUp className="ml-2" />
                    ) : (
                      <FaChevronDown className="ml-2" />
                    )}
                  </button>
                  
                  {showFilters && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <h3 className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
                          Filter by Status
                        </h3>
                        {['all', 'pending', 'confirmed', 'paid', 'completed', 'cancelled'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              filterStatus === status ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredAppointments.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No appointments found</p>
                  <Link 
                    to="/doctors" 
                    className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    Book an Appointment
                  </Link>
                </div>
              ) : (
                filteredAppointments.map((appointment) => (
                  <div key={appointment._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={appointment.doctor?.photo || 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png'}
                            alt={`Dr. ${appointment.doctor?.firstName} ${appointment.doctor?.lastName}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                            </h3>
                            {statusBadge(appointment.status)}
                          </div>
                          <p className="text-sm text-blue-600">
                            {appointment.doctor?.specialty?.name || 'Specialist'}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                              {new Date(appointment.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center">
                              <FaClock className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          to={`/appointment-details/${appointment._id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          View Details
                        </Link>
                      
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}