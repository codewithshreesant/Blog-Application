import React, { useState, useEffect } from 'react';
import { useUpdateAdminMutation } from '../../features/users/user'; // Assuming you have these RTK Query mutations
import { useNavigate } from 'react-router-dom';

function AdminSettings() {
    const { data: adminProfile, isLoading, isError, error } = useUpdateAdminMutation();
    const [updateAdmin, { isLoading: isUpdating, isSuccess: updateSuccess, isError: updateError, error: updateErrorMessage }] = useUpdateAdminMutation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updateErrorMsg, setUpdateErrorMsg] = useState('');
    const [updateSuccessMsg, setUpdateSuccessMsg] = useState('');
    let admin = localStorage.getItem('adminData');
    let actualAdmin = JSON.parse(admin);
    console.log("Actual Admin: ", actualAdmin);

    const navigate = useNavigate();

    useEffect(() => {
        if (adminProfile) {
            setUsername(adminProfile.username);
        }
    }, [adminProfile]);

    useEffect(() => {
        if (updateSuccess) {
            setUpdateSuccessMsg('Profile updated successfully!');
            setTimeout(() => setUpdateSuccessMsg(''), 3000); // Clear after 3 seconds
            setPassword("");
            setConfirmPassword("");
        }
        if (updateError) {
            setUpdateErrorMsg(updateErrorMessage?.data?.error || 'Failed to update profile.');
            setTimeout(() => setUpdateErrorMsg(''), 3000);
        }
    }, [updateSuccess, updateError, updateErrorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateErrorMsg(''); 
        setUpdateSuccessMsg('');

        if (password && password !== confirmPassword) {
            setUpdateErrorMsg('Passwords do not match.');
            return;
        }

        try {
            await updateAdmin({
                id:actualAdmin[0]._id,
                admin:{ password, username},
            });
        } catch (err) {
            console.error('Error updating profile:', err);
            setUpdateErrorMsg('An unexpected error occurred.');
        }
    };

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center p-4">Error: {error?.data?.error || 'Failed to load profile.'}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-md mx-auto bg-white rounded shadow p-6">
                <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password (Optional)</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>

                    {updateErrorMsg && <div className="text-red-500 mb-4">{updateErrorMsg}</div>}
                    {updateSuccessMsg && <div className="text-green-500 mb-4">{updateSuccessMsg}</div>}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminSettings;