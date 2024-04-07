import React, { useContext, useState } from 'react';
import logo from '../imgs/logo.png';
import { Link, Outlet } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { LuFileEdit } from "react-icons/lu";
import { UserContext } from '../App';
import { FaBell } from "react-icons/fa";
import UserNavigationPanel from './user-navigation.component';

const Navbar = () => {
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
    const [userNavPanel, setUserNavPanel] = useState(false);
    const { userAuth, userAuth: { access_token, profile_img }, setUserAuth } = useContext(UserContext)
    const handleUserNavPanel = () => {
        setUserNavPanel(!userNavPanel);
    }
    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200)
    }
    return (
        <>
            <nav className='navbar'>
                <Link to="/" className='flex-none w-10'>
                    <img src={logo} alt='---' className='w-full' />
                </Link>

                <div className={'absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ' + (searchBoxVisibility ? 'show' : 'hide')}>
                    <input type='text' placeholder='search' className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12' /><FaSearch className='absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey' />
                </div>
                <div className='flex items-center gap-3 md:gap-6 ml-auto'>
                    <button className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'
                        onClick={() => setSearchBoxVisibility(currVal => !currVal)}>
                        <FaSearch className='text-xl' />
                    </button>
                    <Link to="/editor" className='hidden md:flex gap-2 link'>
                        <LuFileEdit />
                        <p>Write</p>
                    </Link>
                    {
                        access_token ?
                            <>
                                <Link to='/dashboard/notification'>
                                    <button className='w-12 h-12 rounded-full bg-grey relative hover:bg-black/10 flex justify-center items-center'>
                                        <FaBell className='text-2xl' />
                                    </button>
                                </Link>
                                <div className='relative' onClick={handleUserNavPanel} onBlur={handleBlur}>
                                    <button className='w-12 h-12 mt-1'>
                                        <img src={profile_img} className='w-full h-full object-cover rounded-full' />
                                    </button>
                                    {
                                        userNavPanel ?
                                            <UserNavigationPanel />
                                            : ''
                                    }
                                </div>
                            </>
                            :
                            <>
                                <Link className='btn-dark py-2' to="/signin">
                                    Sign In
                                </Link>
                                <Link className='btn-light py-2 hidden md:block' to="/signup">
                                    Sign Up
                                </Link>
                            </>
                    }

                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar