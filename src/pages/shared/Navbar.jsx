import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import { useState } from "react";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/addbooks'>Add Books</NavLink></li>
        <li><NavLink to='/allbooks'>All Books</NavLink></li>
        <li><NavLink to='/myaddedbooks'>My Added Books</NavLink></li>
        <li><NavLink to='/borrowedbooks'>Borrowed Books</NavLink></li>

    </>

    return (
        <div>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">
                        <img className="w-[40px] h-[40px]" src="https://i.ibb.co/2tFwrnr/icon.jpg" alt="" />
                        BookNest</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <Link to='/login' className="btn btn-primary">Login</Link> */}
                    {user ? (
                        <button onClick={logOut} className="btn bg-purple-600">Logout</button>
                    ) : (
                        <Link to='/login' className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;