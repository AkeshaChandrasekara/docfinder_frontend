import { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaArrowLeft, 
  FaStar, 
  FaHospital, 
  FaCreditCard, 
  FaMoneyBillWave,
  FaSpinner,
  FaBuilding,
  FaNotesMedical,
  FaMoneyCheck,
  FaMoneyBillAlt
} from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('payAtClinic');
  const [calculatingSlots, setCalculatingSlots] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctors/${id}?populate=specialty`);
        
        if (!response.data.success) {
          throw new Error('Failed to fetch doctor data');
        }

        const normalizedDoctor = {
          ...response.data.data,
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
        setLoading(false);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setError(err.response?.data?.message || 'Failed to load doctor data');
        toast.error(err.response?.data?.message || 'Failed to load doctor data');
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  useEffect(() => {
    if (selectedDate && doctor?.availableDays) {
      setCalculatingSlots(true);
      
      const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
      const normalizeDayName = (day) => day.toLowerCase().trim();
      
      const dayAvailability = doctor.availableDays.find(day => 
        normalizeDayName(day.day) === normalizeDayName(dayOfWeek)
      );
      
      if (dayAvailability) {
        const slots = dayAvailability.slots
          .filter(slot => slot.isAvailable)
          .map(slot => ({
            value: `${slot.startTime}-${slot.endTime}`,
            label: `${slot.startTime} - ${slot.endTime}`,
            rawSlot: slot
          }));
        
        setAvailableSlots(slots);
        setSelectedTime('');
      } else {
        setAvailableSlots([]);
        setSelectedTime('');
      }
      
      setCalculatingSlots(false);
    } else {
      setAvailableSlots([]);
      setSelectedTime('');
    }
  }, [selectedDate, doctor]);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!selectedDate || !selectedTime) {
    toast.error('Please select both date and time');
    return;
  }

  try {
    const [startTime, endTime] = selectedTime.split('-');
    const slotData = availableSlots.find(slot => slot.value === selectedTime)?.rawSlot;

    const appointmentData = {
      doctorId: id,
      date: selectedDate,
      time: selectedTime,
      startTime,
      endTime,
      patientName,
      phoneNumber,
      email,
      notes,
      paymentMethod,
      consultationFee: doctor.consultationFee
    };

    const token = localStorage.getItem('token');
    
    if (paymentMethod === 'payOnline') {
      setProcessingPayment(true);
      
      const paymentIntentResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-payment-intent`,
        {
          amount: doctor.consultationFee * 100,
          doctorId: id,
          appointmentData
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const stripe = await stripePromise;
      
      const result = await stripe.redirectToCheckout({
        sessionId: paymentIntentResponse.data.sessionId
      });

      if (result.error) {
        toast.error(result.error.message);
        setProcessingPayment(false);
      }
      
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/appointments`, 
      appointmentData, 
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    toast.success('Appointment booked successfully!');
    navigate(`/booking-confirmation/${response.data.data._id}`);
  } catch (err) {
    console.error('Error booking appointment:', err);
    const errorMsg = err.response?.data?.message || 'Failed to book appointment';
    toast.error(errorMsg);
    setProcessingPayment(false);
    
    if (err.response?.data?.code === 'SLOT_UNAVAILABLE') {
      setSelectedTime('');
      const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
      toast(`Refreshing availability for ${dayOfWeek}...`);
    }
  }
};
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
            <p className="text-gray-600">Loading doctor information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Doctor</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link 
              to="/doctors" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Back to Doctors List
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Not Found</h2>
            <p className="text-gray-700 mb-6">The requested doctor profile could not be found.</p>
            <Link 
              to="/doctors" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow py-4 sm:py-6">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden border border-gray-200">

            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <Link 
                  to={`/doctors/${id}`} 
                  className="flex items-center text-white hover:text-blue-200 transition-colors text-xs sm:text-sm"
                >
                  <FaArrowLeft className="mr-1 sm:mr-2" /> Back to Doctor Profile
                </Link>
                <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Book Your Appointment</h1>
                <div className="hidden sm:block w-8"></div>
              </div>
            </div>

            <div className="md:flex">
              <div className="md:w-1/3 p-4 sm:p-6 border-r border-gray-200 bg-gradient-to-b from-blue-50 to-white">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="relative">
                    <img 
                      src={doctor.photo || 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png'} 
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://cdn-icons-png.flaticon.com/512/8815/8815112.png';
                      }}
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold shadow-sm flex items-center">
                      <FaStar className="mr-1" />
                      <span>{doctor.rating || 4.0}</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h2 className="text-md sm:text-lg font-bold text-gray-900">Dr. {doctor.firstName} {doctor.lastName}</h2>
                    <p className="text-blue-600 text-xs sm:text-sm font-medium">{doctor.specialty?.name || 'Specialist'}</p>
                    <p className="text-gray-500 text-xs">{doctor.experience}+ years experience</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center text-xs sm:text-sm">
                      <FaHospital className="text-blue-500 mr-2 text-xs sm:text-sm" /> Hospital
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm">{doctor.hospital || 'Not specified'}</p>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center text-xs sm:text-sm">
                      <FaBuilding className="text-blue-500 mr-2 text-xs sm:text-sm" /> Channeling Center
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm">Asiri Hospitals</p>
                  </div>

                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-1 flex items-center text-xs sm:text-sm">
                      <FaMoneyCheck className="text-blue-600 mr-2 text-xs sm:text-sm" /> Consultation Fee
                    </h3>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">Rs.{doctor.consultationFee || 120}</p>
                    
                    <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      <h4 className="font-medium text-blue-800 mb-1 text-xs sm:text-sm">Payment Method</h4>
                      <div className="space-y-1">
                        <div className="flex items-center p-1.5 sm:p-2 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            id="payAtClinic"
                            name="paymentMethod"
                            value="payAtClinic"
                            checked={paymentMethod === 'payAtClinic'}
                            onChange={() => setPaymentMethod('payAtClinic')}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="payAtClinic" className="ml-2 text-xs font-medium text-gray-700 flex items-center">
                            <FaHospital className="mr-1 text-green-500 text-xs sm:text-sm" />
                            Pay at Clinic
                          </label>
                        </div>
                        <div className="flex items-center p-1.5 sm:p-2 rounded-md hover:bg-blue-100 transition-colors cursor-pointer">
                          <input
                            type="radio" 
                            id="payOnline"
                            name="paymentMethod"
                            value="payOnline"
                            checked={paymentMethod === 'payOnline'}
                            onChange={() => setPaymentMethod('payOnline')}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor="payOnline" className="ml-2 text-xs font-medium text-gray-700 flex items-center">
                            <FaCreditCard className="mr-1 text-blue-500 text-xs sm:text-sm" />
                            Pay Online Now
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Appointment Details</h2>
                  <p className="text-gray-500 text-xs sm:text-sm">Fill in your details to book an appointment with Dr. {doctor.firstName}</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-200">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                        <FaCalendarAlt className="text-blue-500 mr-2 text-xs sm:text-sm" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-200">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                        <FaClock className="text-blue-500 mr-2 text-xs sm:text-sm" />
                        Select Time
                      </label>
                      <div className="relative">
                        <select
                          className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                          disabled={!selectedDate || availableSlots.length === 0 || calculatingSlots}
                        >
                          <option value="">{calculatingSlots ? 'Loading slots...' : availableSlots.length === 0 ? 'No available slots' : 'Select a time'}</option>
                          {availableSlots.map((slot, index) => (
                            <option key={index} value={slot.value}>{slot.label}</option>
                          ))}
                        </select>
                        {calculatingSlots && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <FaSpinner className="animate-spin text-gray-400 text-xs sm:text-sm" />
                          </div>
                        )}
                      </div>
                      {selectedDate && availableSlots.length === 0 && !calculatingSlots && (
                        <p className="mt-1 text-xs text-red-500">
                          No available slots for this day. Please try another date.
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2 bg-white p-3 sm:p-4 rounded-lg shadow-xs border border-gray-200">
                      <h3 className="text-sm sm:text-md font-medium text-gray-900 mb-2 sm:mb-3 flex items-center">
                        <FaUser className="text-blue-500 mr-2 text-sm sm:text-lg" />
                        Patient Information
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Full Name"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                              type="tel"
                              className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="+94 76 123 4567"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                              type="email"
                              className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center">
                            Additional Notes
                          </label>
                          <textarea
                            className="w-full p-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            rows="2"
                            placeholder="Any special requirements or notes for the doctor"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-md">Appointment Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        {selectedDate && (
                          <p className="text-gray-700 text-xs sm:text-sm">
                            <span className="font-medium text-gray-900">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        )}
                        {selectedTime && (
                          <p className="text-gray-700 text-xs sm:text-sm">
                            <span className="font-medium text-gray-900">Time:</span> {selectedTime.split('-').join(' - ')}
                          </p>
                        )}
                        {doctor && (
                          <p className="text-gray-700 text-xs sm:text-sm">
                            <span className="font-medium text-gray-900">Doctor:</span> Dr. {doctor.firstName} {doctor.lastName}
                          </p>
                        )}
                        <p className="text-gray-700 text-xs sm:text-sm">
                          <span className="font-medium text-gray-900">Payment:</span> {paymentMethod === 'payAtClinic' ? 'Pay at Clinic' : 'Pay Online Now'}
                        </p>
                        <p className="text-gray-700 text-xs sm:text-sm">
                          <span className="font-medium text-gray-900">Fee:</span> Rs.{doctor.consultationFee || 120}
                        </p>
                      </div>
                      <div className="flex flex-col justify-end">
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center text-xs sm:text-sm"
                          disabled={!selectedDate || !selectedTime || !patientName || !phoneNumber || !email || processingPayment}
                        >
                          {processingPayment ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Processing Payment...
                            </>
                          ) : (
                            <>
                              Confirm Appointment
                              <FaArrowLeft className="ml-2 transform rotate-180 text-xs sm:text-sm" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}