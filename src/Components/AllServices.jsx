import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { getAxios } from "../utils/api";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow p-4">
    <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("latest");
  const { subcategoryId } = useParams();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(12);

  // ✅ fetch all services with pagination
  const fetchAllServices = async (page, limit) => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services?page=${page}&limit=${limit}&sort=${sortOption}`
      );
      const { data, totalPages: tp } = response.data;
      console.log("fetchAllServices", data);
      setServices(data || []);
      setTotalPages(tp || 1);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetch services by subcategory
  const fetchServicesBySubCatId = async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services/filter/${subcategoryId}?page=${page}&limit=${limit}`
      );

      const { data, totalPages, page: currentPage } = response.data;
      console.log("fetchServicesBySubCatId", data);
      setServices(data || []);
      setTotalPages(totalPages || 1);
      setCurrentPage(currentPage || 1);
    } catch (error) {
      console.error("Error fetching services by subcategory:", error.message);
      setError("Failed to fetch services. Please try again later.");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ choose which API to call
  useEffect(() => {
    if (subcategoryId) {
      fetchServicesBySubCatId(currentPage, limit);
    } else {
      fetchAllServices(currentPage, limit);
    }
  }, [subcategoryId, currentPage, sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="relative md:pt-28 pt-36 md:px-10 px-2">
      <div className="flex justify-between items-center mb-5 md:px-10">
        <h1 className="text-2xl font-bold">
          {subcategoryId
            ? services[0]?.subCategoryId?.subCategory || ""
            : "All Services"}
        </h1>

        {services.length > 0 && (
          <select
            name="filter"
            className="border-b p-2 rounded-2xl w-[200px] outline-none"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="high to low">High to Low</option>
            <option value="low to high">Low to High</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4 mt-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)
        ) : error ? (
          <div className="col-span-3 text-center text-red-500">{error}</div>
        ) : services.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No services found.
          </div>
        ) : (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        )}
      </div>

      {/* ✅ Show Pagination for both all services and subcategory services */}
      {!loading && services.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

export default AllServices;
