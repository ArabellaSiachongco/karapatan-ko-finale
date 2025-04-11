import React, { useEffect, useRef, useState } from "react";
import "../layouts/admin_navbar.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const navLinksRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbarRef.current?.classList.add("scrolled");
      } else {
        navbarRef.current?.classList.remove("scrolled");
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // sign out from Firebase
      navigate("/login", { replace: true }); // redirect & remove history
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <nav className="admin_navbar" ref={navbarRef}>
        <div className="admin_navbar-container">
          <div className="text-white dark:text-gray-200 text-lg font-bold admin_logo highlight-border">
            KARAPATAN KO
          </div>
          <button
            className={`admin-mobile-nav-toggle ${isMenuOpen ? "active" : ""}`}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul
            className={`admin-nav-links ${isMenuOpen ? "active" : ""}`}
            ref={navLinksRef}
          >
            <li>
              {/* <a href="/" onClick={toggleMenu} >HOME</a> */}
              <button onClick={handleLogout} className="logout-btn">
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={`admin-overlay ${isMenuOpen ? "active" : ""}`}
        ref={overlayRef}
        onClick={toggleMenu}
      ></div>
    </>
  );
};

export default Navbar;
