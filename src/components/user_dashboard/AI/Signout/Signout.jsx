import React from "react";
import { Link } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import './Signout.css'

const Navbar = () => {
    return (
        <div className="relative">
            <Link to="/main" className="text-center text-secondary dark:text-gray-400 bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2">
                <p
                    className="sign text-secondary dark:text-gray-400 w-5 h-5" ></p>
                DASHBOARD
            </Link>
            <Link to="/lawyer-status" className="text-center text-secondary dark:text-gray-400 bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2">
                <p
                    className="sign text-secondary dark:text-gray-400 w-5 h-5" ></p>
                APPOINTMENT
            </Link>
            <Link to="/" className="text-center text-secondary dark:text-gray-400 bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2">
                <VscSignOut
                    className="sign text-secondary dark:text-gray-400 w-5 h-5" />
                SIGN OUT
            </Link>
        </div>
    );
};

export default Navbar;
