import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button
            className='px-4 py-2 rounded-md text-sm font-medium border border-white/40 text-white/80
                       hover:bg-white hover:text-black transition-all duration-300'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
