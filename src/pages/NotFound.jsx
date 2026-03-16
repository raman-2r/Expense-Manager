import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="text-center ">
        <p className="text-7xl font-bold text-red-400 mb-4">404</p>
        <p className="text-2xl text-gray-500 mb-4">Oops! Page Not Found</p>
        <Link to={"/"} className="text-blue-500 underline hover:text-blue-800 transition">Return to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
