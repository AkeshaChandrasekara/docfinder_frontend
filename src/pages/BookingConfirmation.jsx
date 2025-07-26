import { useEffect, useState } from 'react';
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaMoneyBillWave, 
  FaCreditCard,
  FaSpinner,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaHashtag,FaHospital,FaPaypal,FaMoneyCheck
} from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-hot-toast';

export default function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appointments/${id}`,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.data.success) {
          throw new Error('Failed to fetch appointment data');
        }

        setAppointment(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching appointment:', err);
        setError(err.response?.data?.message || 'Failed to load appointment data');
        toast.error(err.response?.data?.message || 'Failed to load appointment data');
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
            <p className="text-gray-600">Loading appointment details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Appointment</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link 
              to="/doctors" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Doctors List
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Appointment Not Found</h2>
            <p className="text-gray-700 mb-6">The requested appointment could not be found.</p>
            <Link 
              to="/doctors" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Doctors List
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
      <main className="flex-grow bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white text-center">
              <div className="flex justify-center mb-3">
                <FaCheckCircle className="h-12 w-12" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Appointment Confirmed!</h1>
              <p className="">Your appointment has been successfully booked</p>
              
             
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FaHashtag className="mr-2" />
                    <span className="font-medium">Appointment Number</span>
                  </div>
                  <p className="text-xl font-bold">{appointment.appointmentNumber}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <FaHashtag className="mr-2" />
                    <span className="font-medium">Your Queue Number</span>
                  </div>
                  <p className="text-xl font-bold">{appointment.patientQueueNumber}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
           
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Appointment Details</h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaUserMd className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Doctor</p>
                        <p className="font-medium">Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}</p>
                        <p className="text-sm text-blue-600">{appointment.doctor?.specialty?.name || 'Specialist'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaCalendarAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaClock className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">Asiri Hospitals</p>
                      </div>
                    </div>
                  </div>
                </div>

               
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-3 text-gray-800">Patient Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="text-blue-500 mt-1 mr-3 w-4 flex-shrink-0">
                        <FaUser />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Patient Name</p>
                        <p className="font-medium">{appointment.patientName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-blue-500 mt-1 mr-3 w-4 flex-shrink-0">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">{appointment.phoneNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="text-blue-500 mt-1 mr-3 w-4 flex-shrink-0">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{appointment.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      {appointment.paymentMethod === 'payAtClinic' ? (
                        <FaMoneyCheck className="text-blue-500 mt-1 mr-3 flex-shrink-0" /> 
                      ) : (
                        <FaCreditCard className="text-blue-500 mt-1 mr-3 flex-shrink-0" /> 
                      )}
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">
                          {appointment.paymentMethod === 'payAtClinic' ? 'Pay at Clinic' : 'Paid Online'}
                        </p>
                        <p className="text-sm">
                          Rs.{appointment.consultationFee || 120} consultation fee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {appointment.notes && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h2 className="text-md font-semibold mb-2 text-blue-800">Your Notes</h2>
                  <p className="text-gray-700 whitespace-pre-line text-sm">{appointment.notes}</p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h2 className="text-md font-semibold mb-2 text-blue-800">What's Next?</h2>
                <ul className="space-y-2 list-disc pl-5 text-sm">
                  <li className="text-gray-700">
                    {appointment.paymentMethod === 'payAtClinic' ? (
                      <>You'll pay the consultation fee when you arrive at the clinic.</>
                    ) : (
                      <>Your payment has been processed successfully.</>
                    )}
                  </li>
                  <li className="text-gray-700">
                    Please arrive at least 15 minutes before your scheduled time (Queue #{appointment.patientQueueNumber}).
                  </li>
                  <li className="text-gray-700">
                    Bring any relevant medical records or identification with you.
                  </li>
                  {appointment.doctor?.address && (
                    <li className="text-gray-700">
                      Clinic location: {appointment.doctor.address}
                    </li>
                  )}
                </ul>
              </div>

          
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link 
                  to="/my-appointments" 
                  className="inline-flex justify-center items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  View My Appointments
                </Link>
                <Link 
                  to="/doctors" 
                  className="inline-flex justify-center items-center px-5 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Book Another Appointment
                </Link>
                <Link 
                  to="/" 
                  className="inline-flex justify-center items-center px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}