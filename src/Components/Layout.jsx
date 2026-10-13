import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navabar from "./Navabar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";


const Layout = () => {
  const location = useLocation();

  return (
    <div className="w-full overflow-hidden">
      <ScrollToTop />
      <Navabar />

      <Outlet />

      {location.pathname !== "/profile" && <Footer />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FD4186',
            color: '#fff',
            borderRadius: '10px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            duration: 1000,
            iconTheme: {
              primary: '#fff',
              secondary: '#FD4186',
            },
            style: {
              background: '#FD4186',
              color: '#fff',
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: '#fff',
              secondary: '#FD4186',
            },
            style: {
              background: '#FD4186',
              color: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
