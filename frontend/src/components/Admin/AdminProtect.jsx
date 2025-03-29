import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminProtect({ children }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log('user in Admin Protect ', user);

  useEffect(() => {
    if (user?.user?.isAdmin) {
    } else {
      if (user?.user) {
        navigate('/unauthorized');
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate]); 
  console.log("is Admin ",user?.user?.isAdmin)
  if (user?.user?.isAdmin) {
    return children;
  }
  return null;
}

export default AdminProtect;