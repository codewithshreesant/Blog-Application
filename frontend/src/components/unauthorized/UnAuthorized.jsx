import React from 'react';
import { Link } from 'react-router-dom';

function UnAuthorized() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorized;