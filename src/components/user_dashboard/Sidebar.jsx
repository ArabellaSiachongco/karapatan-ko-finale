import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VscListSelection } from "react-icons/vsc";
import { FiX } from "react-icons/fi";
import {
  table_of_content_constitution,
  table_of_content_RA12066,
  table_of_content_family_code,
  table_of_content_civil_law,
} from "../user_dashboard/books/pages/table_of_content.json";
import { VscSignOut } from "react-icons/vsc";
import { auth } from "../database/firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const table_of_content = (() => {
    if (location.pathname.startsWith("/constitution")) {
      return table_of_content_constitution;
    } else if (location.pathname.startsWith("/RA_8371")) {
      return table_of_content_RA12066;
    } else if (location.pathname.startsWith("/family")) {
      return table_of_content_family_code;
    } else if (location.pathname.startsWith("/civil")) {
      return table_of_content_civil_law;
    } else {
      return [];
    }
  })();
  const navigate = useNavigate();

  // Handle navigation click
  const handleNavClick = (title) => {
    setActive(title);
    setIsNavbarVisible(false);
  };
  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      navigate("/login", { replace: true }); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error); // Handle logout errors
    }
  };

  return (
    <div className="relative">
      {/* Burger Icon */}
      <button
        id="navbar-toggle"
        onClick={() => setIsNavbarVisible((prev) => !prev)}
        className="fixed top-4 left-4 z-30 bg-primary dark:bg-gray-800 p-2 rounded"
        aria-label={isNavbarVisible ? "Close Navigation" : "Open Navigation"}
      >
        {isNavbarVisible ? (
          <FiX className="text-white w-6 h-6" />
        ) : (
          <VscListSelection className="text-white w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isNavbarVisible && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsNavbarVisible(false)}
          aria-hidden="true"
        />
      )}

      {/* Navbar */}
      <div
        id="navbar"
        className={`fixed top-0 left-0 h-full w-64 bg-primary dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-20 ${
          isNavbarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-5 border-b border-secondary dark:border-gray-700 flex items-center">
            <Link
              to="/main"
              className="flex items-center gap-2"
              onClick={() => handleNavClick("")}
            >
              <div className="w-8 h-8 object-contain"></div>
              <p className="text-white dark:text-gray-200 text-lg font-bold highlight-border">
                Karapatan Ko
              </p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="px-4 space-y-2">
              {table_of_content.length > 0 ? (
                table_of_content.map((nav) => (
                  <li key={nav.href} className="group text-white">
                    <Link
                      to={nav.href}
                      className={`block p-3 rounded-lg text-lg transition-colors duration-200 ${
                        active === nav.topic
                          ? "bg-secondary/20 dark:bg-gray-700/30 text-white"
                          : "text-secondary dark:text-gray-300"
                      }`}
                      onClick={() => handleNavClick(nav.topic)}
                    >
                      {nav.topic}
                    </Link>
                  </li>
                ))
              ) : (
                <Link
                  to="/"
                  className="text-center text-secondary dark:text-gray-400 bg-transparent border-0 p-0 cursor-pointer flex items-center gap-2"
                >
                  <VscSignOut className="text-secondary dark:text-gray-400 w-5 h-5" />
                  SIGN OUT
                </Link>
              )}
            </ul>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white p-3 bg-red-500 hover:bg-red-600 rounded-lg w-full mt-4"
            >
              <VscSignOut className="text-white w-5 h-5" />
              LOGOUT
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
