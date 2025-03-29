import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminDataProtect({ children }) {
    let admin = localStorage.getItem('adminData');
    let actualAdmin = JSON.parse(admin);
    console.log("Actual Admin: ", actualAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        if (actualAdmin) {
        } else {
            navigate('/admin');
        }
    }, [actualAdmin, navigate]); 
    if (actualAdmin) {
        return children;
    }
    return null;
}

export default AdminDataProtect;