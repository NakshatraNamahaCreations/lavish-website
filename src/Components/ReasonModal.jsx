
import  { useState } from "react";
import { getAuthAxios } from "../utils/api";

const ReasonModal = ({
  setShowModal,
  selectedOrder,
  newDate,
  newTime,
  fetchUpcomingOrders,
  isCancelling = false,
}) => {
  const [reason, setReason] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!reason.trim()) {
      alert("Please provide a reason.");
      return;
    }

    if (!isCancelling) {
      // For reschedule, at least one of venue, newDate or newTime must be provided
      if (!venue.trim() && !newDate && !newTime) {
        alert("Please provide at least one of new date, time, or venue address.");
        return;
      }
    }

    // Prepare payload with correct key names for backend
    const payload = isCancelling
      ? { reason }
      : {
        rescheduledDate: newDate || null,
        rescheduledTime: newTime || null,
        rescheduledAddress: venue.trim() || null,
        reason,
      };

    const endpoint = isCancelling
      ? `/orders/cancelOrder/${selectedOrder._id}`
      : `/orders/rescheduleOrder/${selectedOrder._id}`;

    try {
      const response = await getAuthAxios().put(endpoint, payload);

      alert(isCancelling ? "Booking cancelled successfully!" : "Booking rescheduled successfully!");
      setShowModal(false);
      fetchUpcomingOrders();
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx
        const errorMessage = error.response.data?.message || "Something went wrong. Please try again.";
        alert(errorMessage);
      } else {
        // Network or other unexpected errors
        console.error("Operation failed:", error);
        alert("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isCancelling ? "Cancel Booking" : "Reason & Venue"}
        </h2>

        <textarea
          rows={4}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {!isCancelling && (
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter new venue address"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;
