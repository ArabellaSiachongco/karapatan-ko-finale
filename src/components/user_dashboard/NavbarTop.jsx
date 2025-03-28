import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import navigation hooks
import { styles } from "../../styles";
import { navLinks } from "../constant";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 
        ${scrolled ? "bg-primary" : "bg-primary"}`}
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
              className={`${active === nav.id ? "text-white" : "text-secondary"
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
            src={toggle ? "/close.png" : "/menu.png"} alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile navigation dropdown */}
          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.id ? "text-white" : "text-secondary"
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
