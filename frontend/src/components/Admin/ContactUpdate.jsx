import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateContactMutation, useGetSingleContactQuery } from '../../features/contacts/contactApi';

function ContactUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: contactData, isLoading, isError, error } = useGetSingleContactQuery(id);
  const [updateContact, { isLoading: isUpdating, isSuccess: updateSuccess, isError: updateError, error: updateErrorData }] = useUpdateContactMutation();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (contactData && contactData.data) {
      setFullname(contactData.data.fullname);
      setEmail(contactData.data.email);
      setMessage(contactData.data.message);
    }
  }, [contactData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateContact({ id, contact: { fullname, email, message } });
      if (response?.data?.statusCode) {
        alert('Contact updated successfully');
        navigate('/admin/dashboard/contacts');
      }
    } catch (err) {
      console.error('Error updating contact:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!contactData || !contactData.data) {
    return <div>Contact not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={isUpdating}
            className={`w-full p-2 rounded-md text-white ${
              isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isUpdating ? 'Updating...' : 'Update Contact'}
          </button>
        </form>

        {updateSuccess && <p className="mt-4 text-green-600 text-center">Contact updated successfully!</p>}
        {updateError && (
          <p className="mt-4 text-red-600 text-center">
            Error updating contact: {updateErrorData?.data?.message || 'Unknown error'}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactUpdate;