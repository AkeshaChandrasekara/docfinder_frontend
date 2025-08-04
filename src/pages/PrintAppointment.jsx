import { useEffect, useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserMd, 
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaHashtag,
  FaSpinner
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function PrintAppointment() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

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
        toast.error(err.response?.data?.message || 'Failed to load appointment data');
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  useEffect(() => {
    if (!loading && appointment) {
   
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [loading, appointment]);

  if (loading || !appointment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Asiri Hospitals</h1>
        <p className="text-gray-600">Appointment Confirmation</p>
      </div>

      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <FaHashtag className="text-blue-500 mr-2" />
            <span className="font-medium">Appointment #:</span>
          </div>
          <span className="font-bold">{appointment.appointmentNumber}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaHashtag className="text-blue-500 mr-2" />
            <span className="font-medium">Queue #:</span>
          </div>
          <span className="font-bold">{appointment.patientQueueNumber}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Appointment Details</h2>
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
              {appointment.doctor?.address && (
                <p className="text-sm text-gray-500">{appointment.doctor.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Patient Information</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <FaUser className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium">{appointment.patientName}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FaPhone className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{appointment.phoneNumber}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FaEnvelope className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{appointment.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Payment Information</h2>
        <div className="flex items-start">
          {appointment.paymentMethod === 'payAtClinic' ? (
            <FaMoneyBillWave className="text-blue-500 mt-1 mr-3 flex-shrink-0" /> 
          ) : (
            <FaCreditCard className="text-blue-500 mt-1 mr-3 flex-shrink-0" /> 
          )}
          <div>
            <p className="text-sm text-gray-500">Payment Method</p>
            <p className="font-medium">
              {appointment.paymentMethod === 'payAtClinic' ? 'Pay at Clinic' : 'Paid Online'}
            </p>
            <p className="text-sm">
              Consultation Fee: Rs.{appointment.consultationFee || 120}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        <p>Please bring this confirmation with you to your appointment</p>
        <p className="mt-2">Thank you for choosing Asiri Hospitals</p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          @page {
            size: auto;
            margin: 10mm;
          }
        }
      `}</style>
    </div>
  );
}