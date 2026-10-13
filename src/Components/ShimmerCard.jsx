import React from "react";

const ShimmerCard = ({ variant = "rect", className = "" }) => {
  if (variant === "round") {
    return (
      <div
        className={`animate-pulse flex flex-col items-center bg-white shadow-md p-4 rounded-lg w-40 sm:w-48 ${className}`}
      >
        {/* Circle Image Placeholder */}
        <div className="bg-gray-300 h-28 w-28 sm:h-32 sm:w-32 rounded-full mb-4"></div>

        {/* Centered Heading */}
        <div className="bg-gray-300 h-4 sm:h-5 w-20 sm:w-24 rounded mb-2"></div>
      </div>
    );
  }

  // Default rectangle card
  return (
    <div
      className={`animate-pulse bg-white rounded-lg shadow-md p-4 w-64 sm:w-72 ${className}`}
    >
      {/* Image Placeholder */}
      <div className="bg-gray-300 h-32 sm:h-40 w-full rounded-md mb-4"></div>

      {/* Heading Placeholder */}
      <div className="bg-gray-300 h-4 sm:h-5 w-2/3 rounded mb-3"></div>

      {/* Paragraph Placeholder */}
      <div className="space-y-2">
        <div className="bg-gray-300 h-3 sm:h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-3 sm:h-4 w-5/6 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
