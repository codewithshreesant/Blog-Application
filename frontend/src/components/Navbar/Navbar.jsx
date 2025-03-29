import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation, useLogoutUserMutation } from '../../features/users/user';
import { removeUser } from '../../slice/user/UserSlice';
import MenuDrawar from '../drawer/MenuDrawar';

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

function Navbar() {
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

    return (
        <nav className='h-[10vh] flex justify-around items-center'>
            <MenuDrawar />
            <div>
                <img src="/images/shrisant_academy/shrisant_academy.png" alt="not found" style={{
                    width: '130px', 
                    height: 'auto', 

                }} />
            </div>
            <div className='md:block lg:block hidden'>
                <ul className='flex gap-[2rem]'>
                    {
                        sections && sections.map((element, index) => {
                            return <Link to={element.path}>
                                <li className='list-none font-bold text-purple-800'>{element.name}</li>
                            </Link>
                        })
                    }
                    {!isUser &&
                        <div className='h-[4vh] flex gap-[0.8rem] items-center'>
                            <Button name='Login' path='/login' />
                            <Button name='Signup' path='/signup' />
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
            </div>
        </nav>
    )
}

export default Navbar