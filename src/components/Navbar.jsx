import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to=''>About</Link></li>
        <li><Link to=''>Contact</Link></li>

    </>


    return (
        <>
            <div className="bg-base-200">
                <div className="navbar max-w-7xl mx-auto px-5">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="lg:hidden">
                                <FaBars className='text-xl mr-4' />
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to='/' className="text-xl md:text-2xl font-bold">XYZ Engine</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-lg">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <button className="inline-flex items-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-base  text-white">Login</button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;