import React, { useState } from 'react';
import { useCreateContactMutation } from '../../features/contacts/contactApi';

function CreateContact() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [createContact, { isLoading, isError, isSuccess, error }] = useCreateContactMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createContact({ fullname, email, message });
            console.log("create contact respose ", response);
            if (
                response?.data.statusCode === 200
            ) {
                
                setFullname('');
                setEmail('');
                setMessage('');
            }

        } catch (err) {
            console.error('Error creating contact:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create Contact</h2>
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
                        disabled={isLoading}
                        className={`w-full p-2 rounded-md text-white ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {isLoading ? 'Creating...' : 'Create Contact'}
                    </button>
                </form>

                {isSuccess && <p className="mt-4 text-green-600 text-center">Contact created successfully!</p>}
                {isError && (
                    <p className="mt-4 text-red-600 text-center">
                        Error creating contact: {error?.data?.message || 'Unknown error'}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CreateContact;