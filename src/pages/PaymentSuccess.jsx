import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Header from '../components/header';
import Footer from '../components/footer';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        let session_id = searchParams.get('session_id');
        
        console.log('Payment success page loaded with session_id:', session_id);

        if (!session_id) {
          throw new Error('Missing session ID parameter');
        }

        if (session_id.includes('CHECKOUT_SESSION_ID')) {
          const stripeSessionId = localStorage.getItem('stripe_session_id');
          if (stripeSessionId) {
            session_id = stripeSessionId;
            console.log('Using session ID from localStorage:', session_id);
          } else {
            throw new Error('Placeholder session ID received - payment may not have completed');
          }
        }

        console.log('Verifying payment with backend...');
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
          console.log('Payment verified successfully, redirecting to confirmation');
          localStorage.removeItem('stripe_session_id');
          navigate(`/booking-confirmation/${response.data.appointmentId}`);
        } else {
          throw new Error(response.data.message || 'Failed to verify payment');
        }
      } catch (error) {
        console.error('Payment verification error:', {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        });
        
        let errorMessage = 'Payment verification failed';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
        navigate('/doctors');
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-bold mb-4">Processing Your Payment</h2>
          <p>Please wait while we verify your payment...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}