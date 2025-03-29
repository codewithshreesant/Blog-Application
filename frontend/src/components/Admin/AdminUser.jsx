import React from 'react';
import { useGetUsersQuery, useLogoutUserMutation } from '../../features/users/user';
import { useNavigate } from 'react-router-dom';

function AdminUser() {
  const { data, error, isLoading } = useGetUsersQuery();
  const [logoutUser, { isLoading: isLogoutLoading }] = useLogoutUserMutation();
  const actualData = data?.data;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('user');
      navigate('/login'); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
            isLogoutLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLogoutLoading ? 'Logging Out...' : 'Logout'}
        </button>
      </div>

      {actualData && actualData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Password</th>
              </tr>
            </thead>
            <tbody>
              {actualData.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default AdminUser;