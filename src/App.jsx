import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import checkUserRole from "./components/database/admin_dashboard_auth";

import Stars from './components/canvas/Stars';
import Login from "./components/registrations/Login";
import SignUp from "./components/registrations/SignUp";
import ForgotPass from "./components/registrations/ForgotPass";

import MainLayout from "./MainLayout";
import TermsAndConditions_evasco from "./components/user_dashboard/about_lawyers/evasco_schedule/TermsAndConditions_evasco";
import TermsAndConditions_magalgalit from "./components/user_dashboard/about_lawyers/magalgalit_schedule/TermsAndConditions_magalgalit";
import TermsAndConditions_palmer from "./components/user_dashboard/about_lawyers/palmer_schedule/TermsAndConditions_palmer";

// import Admin from "./components/admin_dashboard/Header";
import Admin_Evasco from "./components/admin_dashboard/Admin_profile/Admin_Evasco";
import Admin_Palmer from "./components/admin_dashboard/Admin_profile/Admin_Palmer";
import Admin_Magalgalit from "./components/admin_dashboard/Admin_profile/Admin_Magalgalit";

import Navbar from "./components/user_dashboard/Navbar";
import Lawyer from "./components/user_dashboard/about_lawyers/Lawyer";
import AI from "./components/user_dashboard/AI/Gemini_main";
import NavbarTop from "./components/user_dashboard/NavbarTop";
import Message from "./components/user_dashboard/Message";
import Forms from "./components/user_dashboard/Forms";
// palmer 
import AppointmentLawyer1 from "./components/user_dashboard/about_lawyers/palmer_schedule/PalmerAppointment";
import AppointmentTableLawyer1 from "./components/user_dashboard/about_lawyers/palmer_schedule/PalmerAppointmentTable";
import AppointmentResultLawyer1 from "./components/user_dashboard/about_lawyers/palmer_schedule/PalmerAppointmentResult";

// noel
import AppointmentLawyer2 from "./components/user_dashboard/about_lawyers/magalgalit_schedule/MagalgalitAppointment";
import AppointmentTableLawyer2 from "./components/user_dashboard/about_lawyers/magalgalit_schedule/MagalgalitAppoinmentTable";
import AppointmentResultLawyer2 from "./components/user_dashboard/about_lawyers/magalgalit_schedule/MagalgalitAppointmentResult";

//evasco
import AppointmentLawyer3 from "./components/user_dashboard/about_lawyers/evasco_schedule/EvascoAppointment";
import AppointmentTableLawyer3 from "./components/user_dashboard/about_lawyers/evasco_schedule/EvascoAppoinmentTable";
import AppointmentResultLawyer3 from "./components/user_dashboard/about_lawyers/evasco_schedule/EvascoAppointmentResult";

import Layout from "./components/user_dashboard/Layout"; //layout for all the navbars, ANG GULO KO

import RA_12066 from "./components/user_dashboard/books/RA_12066";
import Constitution from "./components/user_dashboard/books/Constitution";
import FamilyCode from "./components/user_dashboard/books/FamilyCode";

import ArticleOne from "./components/pages/constitution_content/ArticleOne";
import ArticleTwo from "./components/pages/constitution_content/ArticleTwo";
import ArticleThree from "./components/pages/constitution_content/ArticleThree";
import ArticleFour from "./components/pages/constitution_content/ArticleFour";
import ArticleFive from "./components/pages/constitution_content/ArticleFive";
import ArticleSix from "./components/pages/constitution_content/ArticleSix";
import ArticleSeven from "./components/pages/constitution_content/ArticleSeven";
import ArticleEight from "./components/pages/constitution_content/ArticleEight";
import ArticleNine from "./components/pages/constitution_content/ArticleNine";
import ArticleTen from "./components/pages/constitution_content/ArticleTen";
import ArticleEleven from "./components/pages/constitution_content/ArticleEleven";
import ArticleTwelve from "./components/pages/constitution_content/ArticleTwelve";
import ArticleThirteen from "./components/pages/constitution_content/ArticleThirteen";
import ArticleFourteen from "./components/pages/constitution_content/ArticleFourteen";
import ArticleFifteen from "./components/pages/constitution_content/ArticleFifteen";
import ArticleSixteen from "./components/pages/constitution_content/ArticleSixteen";
import ArticleSeventeen from "./components/pages/constitution_content/ArticleSeventeen";
import ArticleEighteen from "./components/pages/constitution_content/ArticleEighteen";

import ChapterOne from "./components/pages/peoples_rights_content/ChapterOne";
import ChapterTwo from "./components/pages/peoples_rights_content/ChapterTwo";
import ChapterThree from "./components/pages/peoples_rights_content/ChapterThree";
import ChapterFour from "./components/pages/peoples_rights_content/ChapterFour";
import ChapterFive from "./components/pages/peoples_rights_content/ChapterFive";
import ChapterSix from "./components/pages/peoples_rights_content/ChapterSix";
import ChapterSeven from "./components/pages/peoples_rights_content/ChapterSeven";
import ChapterEight from "./components/pages/peoples_rights_content/ChapterEight";
import ChapterNine from "./components/pages/peoples_rights_content/ChapterNine";
import ChapterTen from "./components/pages/peoples_rights_content/ChapterTen";
import ChapterEleven from "./components/pages/peoples_rights_content/ChapterEleven";
import ChapterTwelve from "./components/pages/peoples_rights_content/ChapterTwelve";

import FamilyOne from "./components/pages/family_code/FamilyOne";
import FamilyTwo from "./components/pages/family_code/FamilyTwo";
import FamilyThree from "./components/pages/family_code/FamilyThree";
import FamilyFour from "./components/pages/family_code/FamilyFour";
import FamilyFive from "./components/pages/family_code/FamilyFive";
import FamilySix from "./components/pages/family_code/FamilySix";
import FamilySeven from "./components/pages/family_code/FamilySeven";
import FamilyEight from "./components/pages/family_code/FamilyEight";

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const showNavbar = 
  location.pathname.startsWith("/articleOne") || 
  location.pathname.startsWith("/chapterOne") || 
  location.pathname.startsWith("/main") || 
  location.pathname.startsWith("/familyOne")
  // location.pathname.startsWith("/family");  
  
  const showNavbarTop = location.pathname.startsWith("/lawyer-status") || location.pathname.startsWith("/appointment") || location.pathname.startsWith("/lawyer-appoinments") || location.pathname.startsWith("/forms") || location.pathname.startsWith("/ai");
  return (
    <>
      {showNavbar && <Navbar />}
      {showNavbarTop && <NavbarTop />}
      {children}
    </>
  );
};

const StarsWrapper = ({ children }) => {
  return (
    <div className="relative">
      <Stars />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const App = () => {
  const [role, setRole] = useState(null); // Track the user's role
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Call the function to check the user's role
    checkUserRole((userRole) => {
      setRole(userRole);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }
  
  return (
    <NavbarWrapper>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<StarsWrapper><Login /></StarsWrapper>} />
        
        {/* Public Routes with StarsCanvas wrapper */}
        <Route path="/login" element={<StarsWrapper><Login /></StarsWrapper>} />
        <Route path="/signup" element={<StarsWrapper><SignUp /></StarsWrapper>} />
        <Route path="/forgotPass" element={<StarsWrapper><ForgotPass /></StarsWrapper>} />

        {/* User Routes */}
        {role === "user" && (
          <>
            <Route path="/main" element={<MainLayout />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions_evasco/>} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions_magalgalit/>} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions_palmer/>} />
            
            {/* User-Specific Routes & atty */}
            <Route path="/lawyer-status" element={<Lawyer />} />
            <Route path="/lawyer-appoinments" element={<Message />} />
            <Route path="/appointmentLawyer1" element={<AppointmentLawyer1 />} />
            <Route path="/appointmentTableLawyer1" element={<AppointmentTableLawyer1 />} />
            <Route path="/appointmentResultLawyer1" element={<AppointmentResultLawyer1 />} />

            <Route path="/appointmentLawyer2" element={<AppointmentLawyer2 />} />
            <Route path="/appointmentTableLawyer2" element={<AppointmentTableLawyer2 />} />
            <Route path="/appointmentResultLawyer2" element={<AppointmentResultLawyer2 />} />

            <Route path="/appointmentLawyer3" element={<AppointmentLawyer3 />} />
            <Route path="/appointmentTableLawyer3" element={<AppointmentTableLawyer3 />} />
            <Route path="/appointmentResultLawyer3" element={<AppointmentResultLawyer3 />} />

            <Route path="/ai" element={<AI />} />
            <Route path="/constitution" element={<Constitution />} />
            <Route path="/RA_8371" element={<RA_12066 />} />
            <Route path="/family" element={<FamilyCode />} />
            <Route path="/forms" element={<Forms/>} />
            
            {/* Article Routes */}
            <Route path="/articleOne" element={<Layout><ArticleOne /></Layout>} />
            <Route path="/articleTwo" element={<Layout><ArticleTwo /></Layout>} />
            <Route path="/articleThree" element={<Layout><ArticleThree /></Layout>} />
            <Route path="/articleFour" element={<Layout><ArticleFour /></Layout>} />
            <Route path="/articleFive" element={<Layout><ArticleFive /> </Layout>} />
            <Route path="/articleSix" element={<Layout><ArticleSix /> </Layout>} />
            <Route path="/articleSeven" element={<Layout><ArticleSeven /> </Layout>} />
            <Route path="/articleEight" element={<Layout><ArticleEight /> </Layout>} />
            <Route path="/articleNine" element={<Layout><ArticleNine /> </Layout>} />
            <Route path="/articleTen" element={<Layout><ArticleTen /> </Layout>} />
            <Route path="/articleEleven" element={<Layout><ArticleEleven /> </Layout>} />
            <Route path="/articleTwelve" element={<Layout><ArticleTwelve /> </Layout>} />
            <Route path="/articleThirteen" element={<Layout><ArticleThirteen /> </Layout>} />
            <Route path="/articleFourteen" element={<Layout><ArticleFourteen /> </Layout>} />
            <Route path="/articleFifteen" element={<Layout><ArticleFifteen /> </Layout>} />
            <Route path="/articleSixteen" element={<Layout><ArticleSixteen /> </Layout>} />
            <Route path="/articleSeventeen" element={<Layout><ArticleSeventeen /> </Layout>} />
            <Route path="/articleEighteen" element={<Layout><ArticleEighteen /> </Layout>} />

            {/* Chapter Routes */}
            <Route path="/chapterOne" element={<Layout><ChapterOne /></Layout>} />
            <Route path="/chapterTwo" element={<Layout> <ChapterTwo /></Layout>} />
            <Route path="/chapterThree" element={<Layout> <ChapterThree /></Layout>} />
            <Route path="/chapterFour" element={<Layout> <ChapterFour /></Layout>} />
            <Route path="/chapterFive" element={<Layout> <ChapterFive /></Layout>} />
            <Route path="/chapterSix" element={<Layout> <ChapterSix /></Layout>} />
            <Route path="/chapterSeven" element={<Layout> <ChapterSeven /></Layout>} />
            <Route path="/chapterEight" element={<Layout> <ChapterEight /></Layout>} />
            <Route path="/chapterNine" element={<Layout> <ChapterNine /></Layout>} />
            <Route path="/chapterTen" element={<Layout> <ChapterTen /></Layout>} />
            <Route path="/chapterEleven" element={<Layout> <ChapterEleven /></Layout>} />
            <Route path="/chapterTwelve" element={<Layout> <ChapterTwelve /></Layout>} />
            
            {/* family code  */}
            <Route path="/familyOne" element={<Layout> <FamilyOne /></Layout>} />
            <Route path="/familyTwo" element={<Layout> <FamilyTwo /></Layout>} />
            <Route path="/familyThree" element={<Layout> <FamilyThree /></Layout>} />
            <Route path="/familyFour" element={<Layout> <FamilyFour /></Layout>} />
            <Route path="/familyFive" element={<Layout> <FamilyFive /></Layout>} />
            <Route path="/familySix" element={<Layout> <FamilySix /></Layout>} />
            <Route path="/familySeven" element={<Layout> <FamilySeven /></Layout>} />
            <Route path="/familyEight" element={<Layout> <FamilyEight /></Layout>} />
            
            
          </>
        )}
      {/* Admin Routes */}
      {role === "admin" && (
            <>
              <Route path="/admin_palmer" element={<Admin_Palmer />} />
              <Route path="/admin_evasco" element={<Admin_Evasco />} />
              <Route path="/admin_magalgalit" element={<Admin_Magalgalit />} />
            </>
          )}
        {/* 404 Fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </NavbarWrapper>
  );
};

export default App;