import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange, visiblePageCount = 4 }) => {
  // Calculate the visible page numbers
  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

    // Adjust startPage if we're near the end
    const adjustedStartPage = Math.max(1, endPage - visiblePageCount + 1);

    return Array.from(
      { length: Math.min(visiblePageCount, totalPages) },
      (_, index) => adjustedStartPage + index
    );
  };

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 flex items-center justify-center"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {getVisiblePages().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 rounded-full ${
            currentPage === pageNumber
              ? "bg-gray-600 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50 flex items-center justify-center"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
