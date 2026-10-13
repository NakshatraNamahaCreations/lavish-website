import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { getAxios } from "../utils/api";
import logo from "../assets/logo.png";

const Invoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getAxios().get(`/orders/orderDetails/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error("Error fetching invoice:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0.5,
      filename: `Invoice_${order.orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  const printInvoice = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="p-10 text-center text-xl font-medium">
        Loading invoice...
      </div>
    );
  if (!order)
    return (
      <div className="p-10 text-center text-red-600 text-xl font-semibold">
        Invoice not found.
      </div>
    );

  const items = order.items || [];
  const services = items.filter((item) => item.categoryType === "Service");
  const addons = items.filter((item) => item.categoryType === "Addon");
  const subtotal = order.subTotal || 0;
  const deliveryCharges = order.deliveryCharges || 0;
  const couponDiscount = order.couponDiscount || 0;
  const grandTotal = order.grandTotal || 0;

  return (
    <div className="lg:mt-24 mt-32 p-4 max-w-4xl mx-auto">
      {/* Buttons */}
      <div className="mb-4 flex justify-end space-x-4 no-print">
        <button
          onClick={downloadPDF}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={printInvoice}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Print Invoice
        </button>
      </div>

      {/* Invoice Content */}
      <div
        id="invoice-content"
        ref={invoiceRef}
        className="p-6 bg-white text-gray-800 border rounded shadow"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Lavish Eventzz Logo" className="h-16 w-auto" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
            <p className="text-sm text-gray-600">
              Date:{" "}
              {order.createdAt &&
                new Date(order.createdAt)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-semibold text-lg">Lavish Eventzz</h2>
            <p className="text-sm text-gray-600">Phone: +919620558000</p>
            <p className="text-sm text-gray-600">support@lavisheventzz.com</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6">
          <p className="font-semibold">Bill To:</p>
          <p>{order.customerName}</p>
          {order.customerPhone && <p>Phone: {order.customerPhone}</p>}
          <p>Venue: {order.address}</p>
          <p>Pincode: {order.pincode}</p>
        </div>

        {/* Services */}
        {(services.length > 0 || addons.length > 0) && (
          <>
            <h3 className="font-semibold text-lg mt-6 mb-2">Items</h3>
            <table className="w-full mb-4 text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {[...services, ...addons].map((item, idx) => (
                  <tr key={item._id}>
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">
                      {item.serviceName}
                      {/* {item.customizedInputs.length > 0 && (
                                                <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                                                    {item.customizedInputs.map(input => (
                                                        <li key={input._id}><strong>{input.label}:</strong> {input.value}</li>
                                                    ))}
                                                </ul>
                                            )} */}
                    </td>
                    <td className="p-2 border text-center">{item.quantity}</td>
                    <td className="p-2 border">₹{item.price}</td>
                    <td className="p-2 border">
                      ₹{item.quantity * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Summary */}
        <div className="text-sm text-right space-y-2">
          <div>
            <strong>Subtotal:</strong> ₹{subtotal}
          </div>
          <div>
            <strong>Delivery Charges:</strong> ₹{deliveryCharges}
          </div>
          <div>
            <strong>Coupon Discount:</strong> -₹{couponDiscount}
          </div>
          {order.slotExtraCharge > 0 && (
            <div>
              <strong>Slot Extra Charge:</strong> ₹{order.slotExtraCharge}
            </div>
          )}
          <div className="border-t pt-2 font-semibold">
            <span className="mr-2">Grand Total:</span> ₹{grandTotal}
          </div>
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">
          Thank you for your business!
        </p>
      </div>
    </div>
  );
};

export default Invoice;

// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import { getAxios } from '../utils/api';
// import logo from "../assets/logo.png"
// const Invoice = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const invoiceRef = useRef();

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const res = await getAxios().get(`/orders/orderDetails/${id}`);
//                 setOrder(res.data.data);
//             } catch (err) {
//                 console.error('Error fetching invoice:', err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     const downloadPDF = () => {
//         const element = invoiceRef.current;
//         const options = {
//             margin: 0.5,
//             filename: `Invoice_${order.orderId}.pdf`,
//             image: { type: 'jpeg', quality: 0.98 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
//         };
//         html2pdf().set(options).from(element).save();
//     };

//     const printInvoice = () => {
//         window.print();
//     };

//     if (loading) return <div className="p-10 text-center text-xl font-medium">Loading invoice...</div>;
//     if (!order) return <div className="p-10 text-center text-red-600 text-xl font-semibold">Invoice not found.</div>;

//     const items = order.items || [];
//     const services = items.filter(item => item.categoryType === 'Service');
//     const addons = items.filter(item => item.categoryType === 'Addon');
//     const subtotal = order.subTotal || 0;
//     const deliveryCharges = order.deliveryCharges || 0;
//     const couponDiscount = order.couponDiscount || 0;
//     const grandTotal = order.grandTotal || 0;

//     return (
//         <div className="lg:mt-24 mt-32 p-4 max-w-4xl mx-auto">
//             {/* Buttons */}
//             <div className="mb-4 flex justify-end space-x-4">
//                 <button
//                     onClick={downloadPDF}
//                     className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
//                 >
//                     Download PDF
//                 </button>
//                 <button
//                     onClick={printInvoice}
//                     className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
//                 >
//                     Print Invoice
//                 </button>
//             </div>

//             {/* Invoice Content */}
//             <div
//                 id="invoice-content"
//                 ref={invoiceRef}
//                 className="p-6 bg-white text-gray-800 border rounded shadow"
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-8">
//                     <div>
//                         <h1 className="text-2xl font-bold">INVOICE</h1>
//                         <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
//                         <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <div className="text-right">
//                         <h2 className="font-semibold text-lg">Lavish Eventzz</h2>
//                         <p className="text-sm text-gray-600">#55 17th main road JC Nagar Kurubharahalli </p>
//                         <p className="text-sm text-gray-600">Bangalore, Karnataka 560086</p>
//                         <p className="text-sm text-gray-600">lavisheventzz@gmail.com</p>
//                     </div>
//                 </div>

//                 {/* Bill To */}
//                 <div className="mb-6">
//                     <p className="font-semibold">Bill To:</p>
//                     <p>{order.customerName}</p>
//                     <p>Venue: {order.address}</p>
//                     <p>Pincode: {order.pincode}</p>
//                 </div>

//                 {/* Services */}
//                 {(services.length > 0 || addons.length > 0) && (
//                     <>
//                         <h3 className="font-semibold text-lg mt-6 mb-2">Items</h3>
//                         <table className="w-full mb-4 text-sm border border-gray-300">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-2 border">#</th>
//                                     <th className="p-2 border">Item</th>
//                                     <th className="p-2 border">Qty</th>
//                                     <th className="p-2 border">Price</th>
//                                     <th className="p-2 border">Total</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {[...services, ...addons].map((item, idx) => (
//                                     <tr key={item._id}>
//                                         <td className="p-2 border">{idx + 1}</td>
//                                         <td className="p-2 border">
//                                             {item.serviceName}
//                                             {/* {item.customizedInputs.length > 0 && (
//                                                 <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
//                                                     {item.customizedInputs.map(input => (
//                                                         <li key={input._id}><strong>{input.label}:</strong> {input.value}</li>
//                                                     ))}
//                                                 </ul>
//                                             )} */}
//                                         </td>
//                                         <td className="p-2 border text-center">{item.quantity}</td>
//                                         <td className="p-2 border">₹{item.price}</td>
//                                         <td className="p-2 border">₹{item.quantity * item.price}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </>
//                 )}

//                 {/* Summary */}
//                 <div className="text-sm text-right space-y-2">
//                     <div><strong>Subtotal:</strong> ₹{subtotal}</div>
//                     <div><strong>Delivery Charges:</strong> ₹{deliveryCharges}</div>
//                     <div><strong>Coupon Discount:</strong> -₹{couponDiscount}</div>
//                     {order.slotExtraCharge > 0 && (
//                       <div><strong>Slot Extra Charge:</strong> ₹{order.slotExtraCharge}</div>
//                     )}
//                     <div className="border-t pt-2 font-semibold">
//                         <span className="mr-2">Grand Total:</span> ₹{grandTotal}
//                     </div>
//                 </div>

//                 <p className="mt-6 text-xs text-center text-gray-500">
//                     Thank you for your business!
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Invoice;
