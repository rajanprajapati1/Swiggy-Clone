import React, { useEffect, useState } from 'react';
import Axios from '../config/Axios'; 

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [status, setStatus] = useState('pending'); 

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await Axios.get('/api/verify-email', { params: { token } });
        setMessage(response.data.message || 'Verification complete!');
        setStatus('success');
      } catch (error) {
        setMessage('Verification failed. Please try again.');
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('No verification token found.');
      setStatus('error');
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Email Verification</h1>
        <p className={`text-lg text-center ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
        <div className="mt-6 text-center">
          {status === 'success' && (
            <a
              href="/login"
              className="inline-block px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Go to Login
            </a>
          )}
          {status === 'error' && (
            <a
              href="/"
              className="inline-block px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Go Home
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
