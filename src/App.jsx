import React, { useState, useEffect, lazy, Suspense } from "react";
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

const ConstitutionOne = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionOne"));
const ConstitutionTwo = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionTwo"));
const ConstitutionThree = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionThree"));
const ConstitutionFour = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionFour"));
const ConstitutionFive = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionFive"));
const ConstitutionSix = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionSix"));
const ConstitutionSeven = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionSeven"));
const ConstitutionEight = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionEight"));
const ConstitutionNine = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionNine"));
const ConstitutionTen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionTen"));
const ConstitutionEleven = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionEleven"));
const ConstitutionTwelve = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionTwelve"));
const ConstitutionThirteen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionThirteen"));
const ConstitutionFourteen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionFourteen"));
const ConstitutionFifteen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionFifteen"));
const ConstitutionSixteen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionSixteen"));
const ConstitutionSeventeen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionSeventeen"));
const ConstitutionEighteen = lazy(() => import("./components/user_dashboard/books/laws/constitution_content/ConstitutionEighteen"));

const RA_8371_One = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_One"));
const RA_8371_Two = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Two"));
const RA_8371_Three = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Three"));
const RA_8371_Four = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Four"));
const RA_8371_Five = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Five"));
const RA_8371_Six = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Six"));
const RA_8371_Seven = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Seven"));
const RA_8371_Eight = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Eight"));
const RA_8371_Nine = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Nine"));
const RA_8371_Ten = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Ten"));
const RA_8371_Eleven = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Eleven"));
const RA_8371_Twelve = lazy(() => import("./components/user_dashboard/books/laws/peoples_rights_content/RA_8371_Twelve"));

const FamilyOne = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyOne"));
const FamilyTwo = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyTwo"));
const FamilyThree = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyThree"));
const FamilyFour = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyFour"));
const FamilyFive = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyFive"));
const FamilySix = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilySix"));
const FamilySeven = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilySeven"));
const FamilyEight = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyEight"));
const FamilyNine = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyNine"));
const FamilyTen = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyTen"));
const FamilyEleven = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyEleven"));
const FamilyTwelve = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyTwelve"));
const FamilyThirteen = lazy(() => import("./components/user_dashboard/books/laws/family_code/FamilyThirteen"));

const CivilOne = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilOne"));
const CivilTwo = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilTwo"));
const CivilThree = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilThree"));
const CivilFour = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilFour"));
const CivilFive = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilFive"));
const CivilSix = lazy(() => import("./components/user_dashboard/books/laws/civil_law/CivilSix"));

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const showSidebar = 
  // location.pathname.startsWith("/main") ||
  location.pathname.startsWith("/RA_8371") || 
  location.pathname.startsWith("/constitution") || 
  location.pathname.startsWith("/family") ||
  location.pathname.startsWith("/civil");
  
  const showNavbarTop = 
  location.pathname.startsWith("/lawyer-status") || 
  location.pathname.startsWith("/appointment") || 
  location.pathname.startsWith("/lawyer") || 
  location.pathname.startsWith("/forms") || 
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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </NavbarWrapper>
  );
};

export default App;