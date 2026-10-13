import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RaiseTicketModal from "./RaiseTicket";
import { getAxios } from "../utils/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [hasTicket, setHasTicket] = useState(false);
  const [checkingTicket, setCheckingTicket] = useState(false);

  // Modal open state
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAxios().get(`/orders/orderDetails/${id}`);
        setOrder(res.data.data);
        console.log("orderdetails", res.data.data);

        // Check ticket status for this order
        await checkTicketStatus(res.data.data.orderId);
      } catch (err) {
        console.error("Failed to fetch order:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const checkTicketStatus = async (orderId) => {
    try {
      setCheckingTicket(true);
      const response = await getAxios().get(`/tickets/check-status/${orderId}`);
      if (response.data.success) {
        setHasTicket(response.data.data.hasTicket);
        setTicketStatus(response.data.data.ticketStatus);
      }
    } catch (error) {
      console.error("Error checking ticket status:", error);
    } finally {
      setCheckingTicket(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-medium">Loading...</div>
    );
  if (!order)
    return (
      <div className="p-10 text-center text-red-600 text-xl font-semibold">
        Order not found.
      </div>
    );

  const statusColors = {
    created: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:py-8 py-20 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h1>
      <Link to={`/invoice/${order._id}`}>
        <div className="text-end mt-10">
          <button className="bg-primary text-white px-4 py-2 rounded-md">
            Generate Invoice
          </button>
        </div>
      </Link>

      {/* Order Summary Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-100 border border-gray-200 rounded-md">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Order ID: {order.orderId}
          </h2>
          <p className="text-sm text-gray-500">
            Created on{" "}
            {order.createdAt &&
              new Date(order.createdAt)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}
          </p>
        </div>
        <div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[order.orderStatus] || "bg-gray-200 text-gray-800"
            }`}
          >
            {order.orderStatus}
          </div>
          {order.orderStatus === "completed" && (
            <div className="mt-2">
              {checkingTicket ? (
                <div className="text-sm text-gray-500">
                  Checking ticket status...
                </div>
              ) : hasTicket ? (
                <div className="flex flex-col gap-1">
                  <button
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-400 text-white cursor-not-allowed"
                    disabled
                  >
                    Already Raised
                  </button>
                  <div className="text-xs text-gray-600">
                    Status: {ticketStatus || "Unknown"}
                  </div>
                </div>
              ) : (
                <button
                  className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                  onClick={() => setShowTicketModal(true)}
                >
                  Raise Ticket
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Customer & Event Info */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="font-semibold text-lg mb-2">Customer & Event Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Customer Name:</strong> {order.customerName}
          </div>
          <div>
            <strong>Email:</strong> {order.customerId?.email || "N/A"}
          </div>
          <div>
            <strong>Alter Mobile:</strong>{" "}
            {order.customerId?.alternateMobile || "N/A"}
          </div>
          <div>
            <strong>Mobile:</strong> {order.customerId?.mobile || "N/A"}
          </div>

          <div>
            <strong>Occasion:</strong> {order.occasion}
            {order.occasion === "others" && order.otherOccasion
              ? ` (${order.otherOccasion})`
              : ""}
          </div>
          <div>
            <strong>Decoration Location:</strong> {order.decorLocation}
            {order.decorLocation === "others" && order.otherDecorLocation
              ? ` (${order.otherDecorLocation})`
              : ""}
          </div>
          <div>
            <strong>Event Date:</strong> {order.eventDate}
          </div>
          <div>
            <strong>Event Time:</strong> {order.eventTime}
          </div>
          <div>
            <strong>Venue Address:</strong> {order.address}
          </div>
          <div>
            <strong>Pincode:</strong> {order.pincode}
          </div>
          <div>
            <strong>Order Status:</strong>{" "}
            <span className="capitalize">{order.orderStatus}</span>
          </div>
          <div>
            <strong>Source:</strong> {order.source}
          </div>
          {order.addNote && (
            <p className="mt-4 text-gray-600">
              <strong>Note:</strong> {order.addNote}
            </p>
          )}
        </div>
      </div>

      {/* Balloon Colors */}
      {order.balloonsColor && order.balloonsColor.length > 0 && (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Balloon Colors</h2>
          <div className="flex flex-wrap gap-2">
            {order.balloonsColor.map((color, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Items Details - Services & Addons */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Items in Order
        </h2>
        <div className="space-y-6">
          {order.items.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-4 border-b pb-4 last:border-0"
            >
              <img
                loading="lazy"
                decoding="async"
                src={`${item.image}`}
                alt={item.serviceName}
                className="w-full md:w-48 md:h-38 w-auto rounded-lg shadow-sm"
              />
              <div className="flex-1 space-y-2 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold text-gray-800">
                    {item.serviceName}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.categoryType === "Service"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.categoryType}
                  </span>
                </div>
                <p>
                  <strong>Price:</strong> ₹{item.price}
                </p>
                <p>
                  <strong>Original Price:</strong> ₹{item.originalPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>

                {item.customizedInputs.length > 0 && (
                  <div>
                    <strong>Customized Inputs:</strong>
                    <ul className="list-disc pl-6 mt-1">
                      {item.customizedInputs.map((input) => (
                        <li key={input._id}>
                          <span className="font-medium">{input.label}:</span>{" "}
                          {Array.isArray(input.value)
                            ? input.value.join(", ")
                            : input.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Info */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        {/* HEADER */}

        {/* HEADER */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          Order Summary
        </h2>

        {/* SUMMARY LIST */}
        <div className="space-y-3 text-sm text-gray-800">
          {/* Subtotal */}
          <div className="flex justify-between bg-gray-50 p-3 rounded-md">
            <strong>Subtotal:</strong>
            <span className="text-xl font-bold">₹{order.subTotal}</span>
          </div>

          {/* Delivery Charges */}
          <div className="flex justify-between bg-gray-50 p-3 rounded-md">
            <strong>Delivery Charges:</strong>
            <span className="text-xl font-bold">₹{order.deliveryCharges ? order.deliveryCharges :0}</span>
          </div>

          {/* Discount */}
          <div className="flex justify-between bg-gray-50 p-3 rounded-md">
            <strong>Coupon Discount:</strong>
            <span className="text-xl font-bold">- ₹{order.couponDiscount}</span>
          </div>

          {/* Paid Amount */}
          <div className="flex justify-between bg-gray-50 p-3 rounded-md">
            <strong>Paid Amount:</strong>
            <span className="text-xl font-bold">₹{order.paidAmount}</span>
          </div>

          {/* Due Amount (highlight if > 0) */}
          <div
            className={`flex justify-between p-3 rounded-md border 
        ${
          order.dueAmount > 0
            ? "bg-red-50 border-red-400 text-red-700 font-semibold"
            : "bg-green-50 border-green-300 text-green-700"
        }`}
          >
            <strong>Due Amount:</strong>
            <span className="text-xl font-bold">₹{order.dueAmount > 0 ? order.dueAmount : 0}</span>
          </div>

          {/* Slot Extra Charges */}
          {order.slotExtraCharge > 0 && (
            <div className="flex justify-between bg-gray-50 p-3 rounded-md">
              <strong>Slot Extra Charge:</strong>
              <span className="text-xl font-bold">₹{order.slotExtraCharge}</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex justify-between bg-gray-100 p-3 rounded-md font-semibold text-gray-900 border border-gray-300">
            <strong>Grand Total:</strong>
            <span className="text-xl font-bold">₹{order.grandTotal}</span>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-gray-800  border-b pb-2 mt-8">
          T&C
        </h2>
        <div className="bg-white rounded-lg px-4 overflow-y-auto relative text-sm ">
          {/* <h2 className="text-xl font-bold mb-4">FAQ</h2> */}
          <div className="space-y-4  px-4 mt-2">
            <h1 className="font-bold  text-black">Cancellation Policy:</h1>
            <ul className="list-disc">
              <li>
                {" "}
                More than 48 hours before paty time slot: Cancellation with 90%
                refund.{" "}
              </li>
              <li>
                {" "}
                48 hours to 24 hours before paty time slot: Cancellation with
                50% refund.{" "}
              </li>
              <li>
                {" "}
                12 hours to 24 hours before paty time slot: Cancellation with
                25% refund.{" "}
              </li>
              <li> Less than 24 hours: No refund on cancellation. </li>
            </ul>
            <h1 className="font-bold  text-black">Refund Policy:</h1>
            <ul className="list-disc">
              <li>
                {" "}
                If the vendor did not show up after the booking amount is paid,
                on those unfortunate occasions we do refund the full amount paid
                by the customer.
              </li>
              <li>
                {" "}
                If the refund is approved, it will get credited in the
                respective payment source within 7-10 days.{" "}
              </li>
              <li>
                {" "}
                Please carefully review the Cancellation and Refund policies
                before making a purchase, as you will be held accountable to
                these policies. To cancel or reschedule, please email us at
                support@lavisheventzz.com or reach out to us via call or
                WhatsApp number at +91 9620558000.{" "}
              </li>
            </ul>
            <h1 className="font-bold text-black">Reschedule Policy:</h1>
            <ul className="list-disc">
              <li> Less than 24 Hours: Not possible. </li>
              <li> More than 24 Hours: Rescheduling is possible. </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Raise Ticket Modal */}
      <RaiseTicketModal
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
        orderId={order.orderId}
        onTicketCreated={() => {
          setHasTicket(true);
          setTicketStatus("raised");
          setShowTicketModal(false);
        }}
      />
    </div>
  );
};

export default OrderDetails;
