import React from 'react';
import { useDeleteContactMutation, useGetAllContactsQuery, useUpdateContactMutation } from '../../features/contacts/contactApi';
import { Link } from 'react-router-dom';

function AdminContact() {
  const { data, refetch, error, isLoading } = useGetAllContactsQuery();
  const [deleteContact, { isSuccess }] = useDeleteContactMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  const handleDelete = async (id) => {
    console.log(`Update contact with ID: ${id}`);
    const response = await deleteContact(id);
    console.log('delete contact response ', response);
    if(
      response.data.statusCode === 200
    ){
      await refetch();
    }
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        <Link to="/admin/dashboard/create-contact" className="text-white">
          Create Contact
        </Link>
      </button>
      <div>
        {data && data.data && data.data.length > 0 ? (
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Full Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{contact.fullname}</td>
                  <td className="py-2 px-4 border-b">{contact.email}</td>
                  <td className="py-2 px-4 border-b">{contact.message || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      <Link to={`/admin/dashboard/update-contact/${contact._id}`}>Update</Link>
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        ) : (
          <div>No contacts found.</div>
        )}
      </div>
      {
        isSuccess && <p className="mt-4 text-green-600 text-center"> Contact deleted Successfully </p>
      }
    </div>
  );
}

export default AdminContact;