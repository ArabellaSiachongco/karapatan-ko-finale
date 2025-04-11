import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import { navLinks } from "../constant";
import { FiX } from "react-icons/fi"; // Close icon
import { VscListSelection } from "react-icons/vsc"; // Hamburger icon
import { auth } from "../database/firebase";
import { VscSignOut } from "react-icons/vsc";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id) => {
    if (id === "/") {
      navigate("/");
      window.scrollTo(0, 0);
    } else {
      navigate(id);
      setActive(id);
    }
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
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-primary"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo visible only on desktop */}
        <Link
          to="/main"
          className="flex items-center gap-2"
          onClick={() => handleNavigation("/")}
        >
          <img
            className="w-9 h-9 object-contain hidden sm:block"
            src="/logo2.png"
            alt="Logo"
          />
          <p className="sm:flex hidden text-white text-[18px] font-bold cursor-pointer flex">
            Karapatan &nbsp;
            <span className="sm:block hidden">Ko</span>
          </p>
        </Link>

        {/* Desktop navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => handleNavigation(nav.id)}
            >
              {nav.title}
            </li>
          ))}
          {/* Add Logout button on desktop */}
          <li>
            <button
              onClick={handleLogout}
              className="text-white hover:text-secondary text-[18px] font-medium cursor-pointer"
            >
              LOGOUT
            </button>
          </li>
        </ul>

        {/* Mobile menu icon */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-3xl"
          >
            {mobileMenuOpen ? (
              <FiX /> // Close icon (X)
            ) : (
              <VscListSelection /> // Hamburger icon (three horizontal bars)
            )}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 "
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-primary dark:bg-gray-800 transform transition-transform duration-300 ease-in-out z-20 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-5 border-b border-secondary dark:border-gray-700 flex items-center">
            <Link
              to="/main"
              className="flex items-center gap-2"
              onClick={() => handleNavigation("")}
            >
              <img className="w-9 h-9 sm:block" src="/logo2.png" alt="Logo" />
              <p className="text-white text-lg font-bold">Karapatan Ko</p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="px-4 space-y-2">
              {navLinks.map((nav) => (
                <li key={nav.id} className="group text-white">
                  <Link
                    to={nav.id}
                    className={`block p-3 rounded-lg text-lg transition-colors duration-200 ${
                      active === nav.id
                        ? "bg-secondary/20 dark:bg-gray-700/30 text-white"
                        : "text-secondary dark:text-gray-300"
                    }`}
                    onClick={() => handleNavigation(nav.id)}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Logout Button */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white p-3 bg-red-500 hover:bg-red-600 rounded-lg w-full mt-4"
              >
                <VscSignOut className="text-white w-5 h-5" />
                LOGOUT
              </button>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
