import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import navigation hooks
import { styles } from "../../styles";
import { navLinks } from "../constant";

const Navbar = () => {
  const [isNavbarTopVisible, setIsNavbarTopVisible] = useState(false);
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    console.log("Scroll position:", scrollTop);
    
    // Show navbar with scroll effect only on the /main page
    if (location.pathname === "/") {
      setIsNavbarTopVisible(scrollTop > 100); // Show navbar when scrolled down more than 100 pixels
    } else {
      setIsNavbarTopVisible(true); // Always show navbar on other pages
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]); // Re-run effect when the pathname changes

  const handleNavigation = (id) => {
    // hash-based navigation
    if (id === "/") {
      navigate("/");
      window.scrollTo(0, 0); // Scroll to top of the page
    } else {
      // For section-based navigation
      navigate(id); // Navigate to the section via hash (e.g., #helena)
      setActive(id); // Update the active section
    }
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 transition-transform duration-300 ease-in-out ${
        isNavbarTopVisible ? "bg-primary" : "bg-primary"
      }`}
      style={{ opacity: isNavbarTopVisible ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }} // Smooth transition
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/main"
          className="flex items-center gap-2"
          onClick={() => handleNavigation("/")}
        >
          <img className="w-9 h-9 object-contain" src="/logo2.png" alt="Logo" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
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
        </ul>

        {/* Mobile menu icon */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? "/close.png" : "/menu.png"}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile navigation dropdown */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    handleNavigation(nav.id);
                  }}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
