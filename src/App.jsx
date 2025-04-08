import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import checkUserRole from "./components/database/admin_dashboard_auth";

import Stars from './components/canvas/Stars';
import Login from "./components/registrations/Login";
import SignUp from "./components/registrations/SignUp";
import ForgotPass from "./components/registrations/ForgotPass";

import MainLayout from "./MainLayout";
import NavbarTop from "./components/user_dashboard/NavbarTop";
import Sidebar from "./components/user_dashboard/Sidebar";
import Lawyer from "./components/user_dashboard/about_lawyers/Lawyer";
import AI from "./components/user_dashboard/AI/Gemini_main";
import Message from "./components/user_dashboard/Message";
import Forms from "./components/user_dashboard/Forms";

// import Admin from "./components/admin_dashboard/Header";
import Admin_Evasco from "./components/admin_dashboard/Admin_profile/Admin_Evasco";
import Admin_Palmer from "./components/admin_dashboard/Admin_profile/Admin_Palmer";
import Admin_Magalgalit from "./components/admin_dashboard/Admin_profile/Admin_Magalgalit";
import TermsAndConditions_evasco from "./components/user_dashboard/about_lawyers/evasco_schedule/TermsAndConditions_evasco";
import TermsAndConditions_magalgalit from "./components/user_dashboard/about_lawyers/magalgalit_schedule/TermsAndConditions_magalgalit";
import TermsAndConditions_palmer from "./components/user_dashboard/about_lawyers/palmer_schedule/TermsAndConditions_palmer";

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


import RA_12066 from "./components/user_dashboard/books/laws/peoples_rights_content/RA_12066";
import Constitution from "./components/user_dashboard/books/laws/constitution_content/Constitution";
import FamilyCode from "./components/user_dashboard/books/laws/family_code/FamilyCode";
import CivilLaw from "./components/user_dashboard/books/laws/civil_law/CivilLaw";

import ConstitutionOne from "./components/user_dashboard/books/laws/constitution_content/ConstitutionOne";
import ConstitutionTwo from "./components/user_dashboard/books/laws/constitution_content/ConstitutionTwo";
import ConstitutionThree from "./components/user_dashboard/books/laws/constitution_content/ConstitutionThree";
import ConstitutionFour from "./components/user_dashboard/books/laws/constitution_content/ConstitutionFour";
import ConstitutionFive from "./components/user_dashboard/books/laws/constitution_content/ConstitutionFive";
import ConstitutionSix from "./components/user_dashboard/books/laws/constitution_content/ConstitutionSix";
import ConstitutionSeven from "./components/user_dashboard/books/laws/constitution_content/ConstitutionSeven";
import ConstitutionEight from "./components/user_dashboard/books/laws/constitution_content/ConstitutionEight";
import ConstitutionNine from "./components/user_dashboard/books/laws/constitution_content/ConstitutionNine";
import ConstitutionTen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionTen";
import ConstitutionEleven from "./components/user_dashboard/books/laws/constitution_content/ConstitutionEleven";
import ConstitutionTwelve from "./components/user_dashboard/books/laws/constitution_content/ConstitutionTwelve";
import ConstitutionThirteen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionThirteen";
import ConstitutionFourteen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionFourteen";
import ConstitutionFifteen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionFifteen";
import ConstitutionSixteen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionSixteen";
import ConstitutionSeventeen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionSeventeen";
import ConstitutionEighteen from "./components/user_dashboard/books/laws/constitution_content/ConstitutionEighteen";

import RA_8371_One from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_One";
import RA_8371_Two from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Two";
import RA_8371_Three from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Three";
import RA_8371_Four from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Four";
import RA_8371_Five from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Five";
import RA_8371_Six from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Six";
import RA_8371_Seven from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Seven";
import RA_8371_Eight from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Eight";
import RA_8371_Nine from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Nine";
import RA_8371_Ten from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Ten";
import RA_8371_Eleven from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Eleven";
import RA_8371_Twelve from "./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Twelve";

import FamilyOne from "./components/user_dashboard/books/laws/family_code/FamilyOne";
import FamilyTwo from "./components/user_dashboard/books/laws/family_code/FamilyTwo";
import FamilyThree from "./components/user_dashboard/books/laws/family_code/FamilyThree";
import FamilyFour from "./components/user_dashboard/books/laws/family_code/FamilyFour";
import FamilyFive from "./components/user_dashboard/books/laws/family_code/FamilyFive";
import FamilySix from "./components/user_dashboard/books/laws/family_code/FamilySix";
import FamilySeven from "./components/user_dashboard/books/laws/family_code/FamilySeven";
import FamilyEight from "./components/user_dashboard/books/laws/family_code/FamilyEight";
import FamilyNine from "./components/user_dashboard/books/laws/family_code/FamilyNine";
import FamilyTen from "./components/user_dashboard/books/laws/family_code/FamilyTen";
import FamilyEleven from "./components/user_dashboard/books/laws/family_code/FamilyEleven";
import FamilyTwelve from "./components/user_dashboard/books/laws/family_code/FamilyTwelve";
import FamilyThirteen from "./components/user_dashboard/books/laws/family_code/FamilyThirteen";

import CivilOne from "./components/user_dashboard/books/laws/civil_law/CivilOne";
import CivilTwo from "./components/user_dashboard/books/laws/civil_law/CivilTwo";
import CivilThree from "./components/user_dashboard/books/laws/civil_law/CivilThree";
import CivilFour from "./components/user_dashboard/books/laws/civil_law/CivilFour";
import CivilFive from "./components/user_dashboard/books/laws/civil_law/CivilFive";
import CivilSix from "./components/user_dashboard/books/laws/civil_law/CivilSix";

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const showSidebar = 
  location.pathname.startsWith("/main") ||
  location.pathname.startsWith("/RA_8371") || 
  location.pathname.startsWith("/constitution") || 
  location.pathname.startsWith("/family") ||
  location.pathname.startsWith("/civil");
  
  const showNavbarTop = 
  location.pathname.startsWith("/lawyer-status") || 
  location.pathname.startsWith("/appointment") || 
  location.pathname.startsWith("/lawyer") || 
  location.pathname.startsWith("/forms") || 
  location.pathname.startsWith("/constitution") || 
  location.pathname.startsWith("/ai");
    
  return (
    <>
      {showSidebar && <Sidebar />}
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
            <Route path="/terms-and-conditions" element={<TermsAndConditions_evasco />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions_palmer />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions_magalgalit />} />
            
            {/* User-Specific Routes & atty */}
            <Route path="/lawyer-status" element={<Lawyer />} />
            <Route path="/lawyer-appointments" element={<Message />} />
            
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
            <Route path="/forms" element={<Forms />} />
            <Route path="/civil" element={<CivilLaw />} />
            <Route path="/RA_8371" element={<RA_12066 />} />
            <Route path="/family" element={<FamilyCode />} />
            <Route path="/constitution" element={<Constitution />} />
            
            {/* Article Routes */}
            <Route path="/constitutionOne" element={<ConstitutionOne />} />
            <Route path="/constitutionTwo" element={<ConstitutionTwo />} />
            <Route path="/constitutionThree" element={<ConstitutionThree />} />
            <Route path="/constitutionFour" element={<ConstitutionFour />} />
            <Route path="/constitutionFive" element={<ConstitutionFive />} />
            <Route path="/constitutionSix" element={<ConstitutionSix />} />
            <Route path="/constitutionSeven" element={<ConstitutionSeven />} />
            <Route path="/constitutionEight" element={<ConstitutionEight />} />
            <Route path="/constitutionNine" element={<ConstitutionNine />} />
            <Route path="/constitutionTen" element={<ConstitutionTen />} />
            <Route path="/constitutionEleven" element={<ConstitutionEleven />} />
            <Route path="/constitutionTwelve" element={<ConstitutionTwelve />} />
            <Route path="/constitutionThirteen" element={<ConstitutionThirteen />} />
            <Route path="/constitutionFourteen" element={<ConstitutionFourteen />} />
            <Route path="/constitutionFifteen" element={<ConstitutionFifteen />} />
            <Route path="/constitutionSixteen" element={<ConstitutionSixteen />} />
            <Route path="/constitutionSeventeen" element={<ConstitutionSeventeen />} />
            <Route path="/constitutionEighteen" element={<ConstitutionEighteen />} />

            {/* Chapter Routes */}
            <Route path="/RA_8371_One" element={<RA_8371_One />} />
            <Route path="/RA_8371_Two" element={<RA_8371_Two />} />
            <Route path="/RA_8371_Three" element={<RA_8371_Three />} />
            <Route path="/RA_8371_Four" element={<RA_8371_Four />} />
            <Route path="/RA_8371_Five" element={<RA_8371_Five />} />
            <Route path="/RA_8371_Six" element={<RA_8371_Six />} />
            <Route path="/RA_8371_Seven" element={<RA_8371_Seven />} />
            <Route path="/RA_8371_Eight" element={<RA_8371_Eight />} />
            <Route path="/RA_8371_Nine" element={<RA_8371_Nine />} />
            <Route path="/RA_8371_Ten" element={<RA_8371_Ten />} />
            <Route path="/RA_8371_Eleven" element={<RA_8371_Eleven />} />
            <Route path="/RA_8371_Twelve" element={<RA_8371_Twelve />} />
            
            {/* family code  */}
            <Route path="/familyOne" element={<FamilyOne />} />
            <Route path="/familyTwo" element={<FamilyTwo />} />
            <Route path="/familyThree" element={<FamilyThree />} />
            <Route path="/familyFour" element={<FamilyFour />} />
            <Route path="/familyFive" element={<FamilyFive />} />
            <Route path="/familySix" element={<FamilySix />} />
            <Route path="/familySeven" element={<FamilySeven />} />
            <Route path="/familyEight" element={<FamilyEight />} />
            <Route path="/familyNine" element={<FamilyNine />} />
            <Route path="/familyTen" element={<FamilyTen />} />
            <Route path="/familyEleven" element={<FamilyEleven />} />
            <Route path="/familyTwelve" element={<FamilyTwelve />} />
            <Route path="/familyThirteen" element={<FamilyThirteen />} />
            
            <Route path="/civilOne" element={<CivilOne /> } />
            <Route path="/civilTwo" element={<CivilTwo /> } />
            <Route path="/civilThree" element={<CivilThree /> } />
            <Route path="/civilFour" element={<CivilFour /> } />
            <Route path="/civilFive" element={<CivilFive /> } />
            <Route path="/civilSix" element={<CivilSix /> } />
            
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