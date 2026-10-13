import React from "react";

const ServiceDetailsShimmer = () => {
  return (
    <div className="lg:py-10 lg:px-10 p-4 pt-32 mx-auto animate-pulse">
   

      {/* Main Content Grid */}
      <div className="relative grid md:grid-cols-2 grid-cols-1 lg:gap-10 gap-4">
        {/* Left Side */}
        <div>
          {/* Carousel Placeholder */}
          <div className="w-full h-80 bg-gray-200 rounded mb-6"></div>

          {/* Required Section */}
          <div className="rounded-md border border-gray-300 lg:my-20 p-4">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>

          {/* Price Section */}
          <div className="flex gap-3 items-center py-2">
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>

          {/* Pincode Input */}
          <div className="rounded-md border border-gray-300 p-4 mt-3 space-y-3">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>

          {/* Highlights (No hidden charges, Trusted, Secure) */}
          <div className="grid grid-cols-3 gap-4 py-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="text-center flex flex-col items-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="rounded-md border border-gray-300 p-4 mt-4">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 w-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Addons Section */}
      <div className="mt-10">
        <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-48 h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="hidden md:flex justify-between items-center gap-2 border border-gray-300 px-2 py-4 my-8 rounded-2xl">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-32 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Recently Purchased */}
      <div className="mt-10">
        <div className="h-6 w-52 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-48 h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-10">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Caption Section */}
      <div className="mt-10">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-11/12 bg-gray-200 rounded"></div>
          <div className="h-4 w-10/12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsShimmer;
