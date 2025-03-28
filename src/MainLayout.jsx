// src/components/layouts/MainLayout.jsx
import React from 'react';
import { Header, Features, Testimonials, Footer } from './components/user_dashboard/index';

const MainLayout = () => {
  return (
    <> 
      {/* <NavbarTop/> */}
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Header />
      </div>
      <Features />
      <Testimonials />
      <Footer />
    </> 
  );
};

export default MainLayout;
