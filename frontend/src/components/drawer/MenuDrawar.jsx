

import React from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation, useLogoutUserMutation } from '../../features/users/user';
import { removeUser } from '../../slice/user/UserSlice';
import { FiMenu } from "react-icons/fi";


const sections = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'About',
        path: '/about'
    },
    {
        name: 'Blogs',
        path: '/blogs'
    },
    {
        name: 'Contact',
        path: '/contact'
    },
]

function MenuDrawer() {
    const [logoutUser, { error, isLoading }] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const isUser = user?.user;
    console.log("user ", user)
    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            console.log("logout response ", response);
            if (response?.data.statusCode === 200) {
                alert(" User Logout Successfully ");
                dispatch(removeUser());
            }
        } catch (error) {
            console.log("Error while logour ", error.message);
        }
    }
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className='md:hidden lg:hidden block'>
            <Button onClick={toggleDrawer(true)}>
            <FiMenu style={{ fontSize: '2em' }} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <ul className='flex flex-col gap-[2rem] w-[30vw] items-center my-[2rem]'>
                    {
                        sections && sections.map((element, index) => {
                            return <Link to={element.path}>
                                <li className='list-none font-bold text-purple-800'>{element.name}</li>
                            </Link>
                        })
                    }

                    {!isUser &&
                        <div className='h-[4vh] flex gap-[0.8rem] items-center'>
                            <Button className="px-6 py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:via-purple-500 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                <Link to='/login'>Login</Link>
                            </Button>
                            <Button className="px-6 py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:via-purple-500 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                                <Link to='/signup'>Signup</Link>
                            </Button>
                        </div>
                    }

                    {isUser &&
                        <button 
                            onClick={handleLogout}
                            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                        >
                            Logout
                        </button>
                    }

                </ul>
            </Drawer>
        </div>
    )
}

export default MenuDrawer   