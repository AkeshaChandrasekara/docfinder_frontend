import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../components/header';
import Footer from '../components/footer';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!session_id || session_id === '{CHECKOUT_SESSION_ID}') {
          throw new Error('Invalid session ID');
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/payments/success`,
          {
            params: { session_id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );

        if (response.data.success && response.data.appointmentId) {
          navigate(`/booking-confirmation/${response.data.appointmentId}`);
        } else {
          throw new Error(response.data.message || 'Failed to get appointment details');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        toast.error(error.response?.data?.message || 'Payment verification failed');
        navigate('/doctors');
      }
    };

    verifyPayment();
  }, [session_id, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-bold mb-4">Processing Your Payment</h2>
          <p>Please wait while we verify your payment...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}