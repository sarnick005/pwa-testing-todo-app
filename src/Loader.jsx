import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="relative w-12 h-12 animate-spin">
        <div className="absolute top-0 left-0 w-3 h-3 bg-gray-800 rounded-full"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-gray-800 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
