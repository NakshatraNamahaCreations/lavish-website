import React from "react";
import logo from "../assets/logo.png"; // Adjust path as needed

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen  fixed top-0 left-0 right-0 bottom-0 z-50">
      {/* Outer circle container */}
      <div className="relative flex justify-center items-center">
        <img src="/images/loader.gif" className="w-24 h-24 rounder-full " />
      </div>
    </div>
  );
};

export default Loader;
