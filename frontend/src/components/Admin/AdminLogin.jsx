import React, { useState, useEffect } from 'react';
import { useAdminLoginMutation } from '../../features/users/user';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await adminLogin({
        username,
        password,
      });
      console.log("admin login response ", response)
      if (response?.error) {
        if (response.error.data && response.error.data.error) {
          setError(response.error.data.error);
        } else {
          setError('An unexpected error occurred.');
        }
      } else if (response?.data?.statusCode === 200) {
        alert('Admin Login Successfully');
        localStorage.setItem('adminData', JSON.stringify(response.data.data));
        const expirationTime = Date.now() + 60 * 60 * 1000; 
        localStorage.setItem('adminDataExpiration', expirationTime.toString());

        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Error occurred during Admin Login:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem('adminDataExpiration');
      if (expirationTime && Date.now() > parseInt(expirationTime)) {
        localStorage.removeItem('adminData');
        localStorage.removeItem('adminDataExpiration');
      }
    };

    checkExpiration();

    const intervalId = setInterval(checkExpiration, 60000);

    return () => clearInterval(intervalId); 
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;