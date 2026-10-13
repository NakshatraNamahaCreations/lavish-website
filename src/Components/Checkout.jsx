import React, { useEffect, useState } from "react";
import support from "../assets/support.png";
import phone from "../assets/phone.png";
import whatsapp from "../assets/whatsapp.png";
import phonepe from "../assets/phonepe.png";
import { IoMdTime } from "react-icons/io";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import DateTimeModal from "./DateTimeModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TbRosetteDiscount } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import BookingFAQs from "./BookingFAQs";
import { useNavigate, useParams } from "react-router-dom";

import {
  completeOrder,
  resetCurrentOrder,
  setAddress,
  setCouponDiscount,
  setPaymentType,
  setAddNote,
  setVenueAddress,
  setSource,
  setOccasion,
  setAltMobile,
  setDecorLocation,
  setOtherDecorLocation,
  setOtherOcassion,
} from "../features/orderdetails/orderSlice";
import DynamicInputField from "./DynamicInputField";
import AuthModal from "./AuthModal";
import { persistor } from "../app/store";

import { setCredentials } from "../features/auth/authSlice";

import { setProfile, resetProfile } from "../features/userdetails/profileSlice";
import {
  API_BASE_URL,
  getAuthAxios,
  getAxios,
  getUploadAxios,
} from "../utils/api";
import { store } from "../app/store";

const ProfileForm = ({ setIsProfileSaved }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [hasRequiredFields, setHasRequiredFields] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "alternateMobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "pincode") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 6) return;
    }

    if (
      (name === "firstName" || name === "lastName") &&
      !/^[a-zA-Z]*$/.test(value)
    ) {
      return;
    }

    dispatch(setProfile({ [name]: value }));
  };

  // Check if required profile fields are filled
  const checkRequiredFields = (profileData) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "mobile",
      "addressLine1",
      "city",
      "pincode",
    ];

    return requiredFields.every(
      (field) =>
        profileData[field] && profileData[field].toString().trim() !== ""
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await getAxios().get("/admin/users/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const {
          firstName,
          lastName,
          mobile,
          alternateMobile,
          addressLine1,
          addressLine2,
          city,
          pincode,
        } = response.data.user;

        const profileData = {
          firstName,
          lastName,
          mobile,
          alternateMobile,
          addressLine1,
          addressLine2,
          city,
          pincode,
        };

        dispatch(setProfile(profileData));

        // Check if all required fields exist and are non-empty
        const hasAllFields = checkRequiredFields(profileData);
        setHasRequiredFields(hasAllFields);
        setIsProfileSaved(hasAllFields);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setHasRequiredFields(false);
        setIsProfileSaved(false);
      }
    };

    if (localStorage.getItem("accessToken")) {
      fetchProfile();
    } else {
      setHasRequiredFields(false);
      setIsProfileSaved(false);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const response = await getAuthAxios().put(
        "/admin/users/user/profile",
        profile,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("user")),
          ...profile,
        };

        // 🟢 Save updated user in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 🟢 Update redux auth (optional but recommended)
        dispatch(
          setCredentials({
            user: updatedUser,
            accessToken: localStorage.getItem("accessToken"),
          })
        );
        // After saving, check if all required fields are filled
        const hasAllFields = checkRequiredFields(profile);
        setHasRequiredFields(hasAllFields);
        setIsProfileSaved(hasAllFields);
      } else {
        setError("Unable to update profile");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  // If required fields are already filled, show a success message instead of form
  if (hasRequiredFields) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800">
            Profile Complete
          </h3>
        </div>
        <p className="text-green-700 mb-3">
          Your profile details are saved and ready for checkout.
        </p>

        {/* Optionally show the profile details in read-only mode */}
        <div className="mt-4 p-3 bg-white border rounded-md">
          <p className="font-medium">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-sm text-gray-600">Mobile: {profile.mobile}</p>
          <p className="text-sm text-gray-600">
            Address: {profile.addressLine1}, {profile.city} - {profile.pincode}
          </p>
          <button
            type="button"
            onClick={() => setHasRequiredFields(false)}
            className="mt-3 text-primary text-sm font-medium hover:underline"
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto scrollbar-hide">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-2">
          <label>
            <p>
              First Name <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>

          <label>
            <p>
              Last Name <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>

          <label>
            <p>
              Mobile Number <span className="text-red-500">*</span>
            </p>
            <input
              disabled
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
            />
          </label>

          <label>
            <p>
              Alternate Number <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="alternateMobile"
              value={profile.alternateMobile}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
            />
          </label>
        </div>

        <h1 className="font-bold poppins my-6">Address Details</h1>

        <div className="grid grid-cols-2">
          <label>
            <p>
              Address Line 1 <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="addressLine1"
              value={profile.addressLine1}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>

          <label>
            <p>Address Line 2</p>
            <input
              type="text"
              name="addressLine2"
              value={profile.addressLine2}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
            />
          </label>

          <label>
            <p>
              City <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>

          <label>
            <p>
              Pincode <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              name="pincode"
              value={profile.pincode}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-4 py-2 rounded mt-5 flex items-center gap-2 justify-center"
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Saving…
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const orderState = useSelector((state) => state.order);

  const { currentOrder, selectedTimeSlot } = orderState;

  const {
    eventDate,
    grandTotal,
    subTotal,
    deliveryCharges,
    couponDiscount,
    address,
    pincode,
    balloonsColor,
    items,
    gstAmount,
    addNote,
  } = currentOrder;

  const timeSlotsBasic = [
    "06:00 AM - 11:00 AM",
    "10:00 AM - 01:00 PM",
    "01:00 PM - 04:00 PM",
    "04:00 PM - 07:00 PM",
    "07:00 PM - 10:00 PM",
    "09:00 PM - 12:00 PM (15%)",
  ];
  const timeSlotsPremium = [
    "08:00 AM - 12:00 PM (10%)",
    "10:00 AM - 02:00 PM",
    "02:00 PM - 06:00 PM",
    "06:00 PM - 10:00 PM",
  ];
  const [amount, setAmount] = useState("100");
  const [paymentUrl, setPaymentUrl] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customizedValues, setCustomizedValues] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [addonDetails, setAddonDetails] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [selectedCouponData, setSelectedCouponData] = useState(null);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  const options = [
    "Google",
    "Facebook",
    "Instagram",
    "Youtube",
    "Recommended",
    "Used Before",
  ];

  const city = "Bangalore";
  const price = grandTotal || 0;
  const currentPageUrl = window.location.href;
  const message = `${currentPageUrl}\nCity: ${city},\nPrice: ${price}\nCan I get more details?`;
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  // console.log("Customer ID", customerId);

  const checkRequiredProfileFields = (profileData) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "mobile",
      "addressLine1",
      "city",
      "pincode",
    ];

    return requiredFields.every(
      (field) =>
        profileData[field] && profileData[field].toString().trim() !== ""
    );
  };

  useEffect(() => {
    if (!customerId) {
      setShowLoginModal(true);
      setIsProfileSaved(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await getAxios().get("/admin/users/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProfile = response.data.user;

        // ✅ Save profile to redux
        dispatch(setProfile(userProfile));

        // ✅ Validate required fields immediately
        const isComplete = checkRequiredProfileFields(userProfile);
        setIsProfileSaved(isComplete);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setIsProfileSaved(false);
      }
    };

    fetchProfile();
  }, [customerId, dispatch]);

  // ⭐ SET DEFAULT PAYMENT TYPE HERE
  useEffect(() => {
    if (!orderState.currentOrder.paymentType) {
      dispatch(setPaymentType("FULL"));
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        // Fetch service details
        const serviceResponse = await getAxios().get(`/services/${serviceId}`);
        const serviceData = serviceResponse.data.data;
        setServiceDetails(serviceData);

        // Fetch all addons
        const allAddonsResponse = await getAxios().get("/addons/");
        const allAddons = allAddonsResponse.data.data;
        // console.log("All addons from API:", allAddons);

        // Filter addons that are in the cart
        const cartAddons = items.filter(
          (item) => item.categoryType === "addon"
        );
        // console.log("Cart addons:", cartAddons);

        // Create a map of addon details using the _id from cart addons
        const addonDetailsMap = {};
        cartAddons.forEach((cartAddon) => {
          // Find the complete addon details by matching the _id
          const addonDetail = allAddons.find(
            (addon) => addon._id === cartAddon._id
          );
          // console.log(
          //   "Matching addon by ID:",
          //   cartAddon._id,
          //   "Found:",
          //   addonDetail
          // );

          if (addonDetail) {
            addonDetailsMap[addonDetail._id] = {
              ...addonDetail,
              serviceName: cartAddon.serviceName,
              price: cartAddon.price,
              quantity: cartAddon.quantity,
            };
            // console.log("Added to map:", addonDetailsMap[addonDetail._id]);
          } else {
            console.log("No matching addon found for ID:", cartAddon._id);
          }
        });

        // console.log("Final addon details map:", addonDetailsMap);
        setAddonDetails(addonDetailsMap);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchDetails();
    }
  }, [serviceId, items]);

  // console.log("Service", serviceDetails);

  const handleInputChange = (
    label,
    value,
    itemId = null,
    type = "text",
    checked = false
  ) => {
    let finalValue = value;

    if (type === "checkbox") {
      // For checkboxes, we'll store an array of selected values
      if (itemId) {
        const currentValues = customizedValues[`${itemId}_${label}`] || [];
        if (checked) {
          // Add value if checked
          finalValue = [...currentValues, value];
        } else {
          // Remove value if unchecked
          finalValue = currentValues.filter((v) => v !== value);
        }
      } else {
        const currentValues = customizedValues[label] || [];
        if (checked) {
          finalValue = [...currentValues, value];
        } else {
          finalValue = currentValues.filter((v) => v !== value);
        }
      }
    }

    if (itemId) {
      setCustomizedValues((prev) => ({
        ...prev,
        [`${itemId}_${label}`]: finalValue,
      }));
    } else {
      setCustomizedValues((prev) => ({
        ...prev,
        [label]: finalValue,
      }));
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  // Format date for display

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleEditPincode = () => {
    dispatch(resetCurrentOrder());
    navigate(`/service/details/${serviceId}`);
  };

  const applyCoupon = (couponCode) => {
    if (couponCode) {
      // Find the coupon data from the coupons array
      const couponData = coupons.find(
        (coupon) => coupon.couponCode === couponCode
      );
      if (couponData) {
        setSelectedCoupon(couponCode);
        setSelectedCouponData(couponData);
        // Calculate discount based on the coupon's discount percentage
        const discount = Math.round(subTotal * (couponData.discount / 100));
        dispatch(setCouponDiscount(discount));
      }
    } else {
      setSelectedCoupon("");
      setSelectedCouponData(null);
      dispatch(setCouponDiscount(0));
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setSelectedCoupon("");
    setSelectedCouponData(null);
    dispatch(setCouponDiscount(0));
  };

  useEffect(() => {
    if (selectedCoupon && selectedCouponData) {
      // Recalculate discount when subtotal changes
      const discount = Math.round(
        subTotal * (selectedCouponData.discount / 100)
      );
      dispatch(setCouponDiscount(discount));
    } else if (!selectedCoupon) {
      dispatch(setCouponDiscount(0));
    }
  }, [selectedCoupon, subTotal, selectedCouponData]);

  //fetch coupoun
  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAxios().get("/coupons/getcoupons");
        setCoupons(response.data.coupons);
        // console.log("Coupons", response.data.coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError("Failed to fetch coupons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // Calculate extra charge for special time slots
  let extraSlotCharge = 0;
  let extraSlotLabel = "";
  const mainService = items.find((item) => item.categoryType === "service");
  if (mainService && selectedTimeSlot) {
    if (selectedTimeSlot === "09:00 PM - 12:00 PM (15%)") {
      extraSlotCharge = Math.round(mainService.price * 0.15);
      extraSlotLabel = "Night Slot Extra (15%)";
    } else if (selectedTimeSlot === "08:00 AM - 12:00 PM (10%)") {
      extraSlotCharge = Math.round(mainService.price * 0.1);
      extraSlotLabel = "Morning Slot Extra (10%)";
    }
  }

  const displaySubTotal = Number(subTotal || 0) + extraSlotCharge;
  const displayGrandTotal = Number(grandTotal || 0) + extraSlotCharge;

  const payNowAmount =
    orderState.currentOrder.paymentType === "HALF"
      ? Math.round(displayGrandTotal / 2)
      : displayGrandTotal;

  const canProceed =
    isProfileSaved &&
    address?.trim() &&
    pincode &&
    currentOrder.source &&
    currentOrder.occasion &&
    (currentOrder.occasion !== "others" ||
      currentOrder.otherOccasion?.trim()) &&
    currentOrder.decorLocation &&
    (currentOrder.decorLocation !== "others" ||
      currentOrder.otherDecorLocation?.trim()) &&
    eventDate &&
    selectedTimeSlot;

  const handleProceedToPay = async () => {
    setLoading(true);
    setError(null);
    setPaymentUrl(null);

    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (!storedUser || !storedToken) {
        setShowLoginModal(true);
        return;
      }

      const userData = JSON.parse(storedUser);

      if (!isProfileSaved) {
        alert("Please complete and save your profile details before booking.");
        return;
      }

      // VALIDATION
      if (!address.trim()) return alert("Please enter venue address");
      if (!currentOrder.source)
        return alert("Please select how you came to know about us");
      if (!currentOrder.occasion) return alert("Please select an occasion");
      if (!eventDate) return alert("Please select a date");
      if (!selectedTimeSlot) return alert("Please select a time slot");

      // PAYMENT TYPE
      const paymentType = currentOrder.paymentType || "FULL";
      const totalAmount = displayGrandTotal;

      const paidAmount =
        paymentType === "HALF" ? Math.round(totalAmount / 2) : totalAmount;

      const dueAmount = totalAmount - paidAmount;

      // PROCESS ITEMS (service + addons)
      const processedItems = items.map((item) => {
        const categoryType =
          item.categoryType === "service"
            ? "Service"
            : item.categoryType === "addon"
            ? "Addon"
            : item.categoryType;

        let refId;
        if (item.categoryType === "service") {
          refId = serviceDetails?._id;
        } else {
          const addonDetail = addonDetails[item._id || item.id];
          refId = addonDetail ? addonDetail._id : item._id || item.id;
        }

        const customizedInputs =
          item.customizedInputs?.map((input) => ({
            label: input.label,
            value:
              customizedValues[`${item.id || item._id}_${input.label}`] || "",
          })) || [];

        return {
          refId,
          serviceName: item.serviceName,
          price: Number(item.price) || 0,
          originalPrice: Number(item.originalPrice || item.price) || 0,
          quantity: Number(item.quantity || 1),
          image: item.image,
          categoryType,
          customizedInputs,
        };
      });

      // FINAL ORDER DATA (🔥 NO merchantOrderId)
      const orderData = {
        eventDate: formatDate(new Date(eventDate)),
        eventTime: selectedTimeSlot,
        pincode: pincode,
        balloonsColor: balloonsColor || [],
        subTotal: displaySubTotal,
        grandTotal: totalAmount,

        paidAmount,
        dueAmount,
        paymentType, // FULL / HALF

        couponDiscount:
          paymentType === "HALF" ? 0 : Number(couponDiscount || 0),

        gstAmount: Number(gstAmount || 0),

        venueAddress: address.trim(),
        address: address.trim(),

        items: processedItems,

        customerName:
          userData?.firstName && userData?.lastName
            ? `${userData.firstName} ${userData.lastName}`
            : "Guest",

        customerId: userData.id,

        occasion: currentOrder.occasion,
        decorLocation: currentOrder.decorLocation,
        altMobile: currentOrder.altMobile || "",
        addNote: currentOrder.addNote || "",
        source: currentOrder.source,
        orderStatus: "created",

        slotExtraCharge: extraSlotCharge,

        ...(currentOrder.occasion === "others" && {
          otherOccasion: currentOrder.otherOccasion,
        }),

        ...(currentOrder.decorLocation === "others" && {
          otherDecorLocation: currentOrder.otherDecorLocation,
        }),
      };

      console.log("FINAL ORDER SENT:", orderData);

      // CALL BACKEND PAYMENT API
      const response = await axios.post(
        `${API_BASE_URL}/payment/initiate-payment`,
        orderData
      );

      const { success, data } = response.data;

      if (success && data?.paymentUrl) {
        setPaymentUrl(data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        setError("Payment initiation failed. Try again.");
      }

      // RESET ORDER
      dispatch(resetCurrentOrder());
      setSelectedCoupon("");
      dispatch(completeOrder());
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Error connecting to server";

      console.error("Payment error:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const hanlderesetCurrentOrder = async () => {
    // Purge redux-persist storage if used
    if (persistor && persistor.purge) {
      await persistor.purge();
    }

    dispatch(resetCurrentOrder());

    navigate("/");
  };

  const selctedServiceImage = items.find(
    (item) => item.categoryType === "service"
  )?.image;
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Login Modal */}
      {showLoginModal && (
        <AuthModal
          setIsModalOpen={setShowLoginModal}
          onLoginSuccess={() => {
            setShowLoginModal(false);
          }}
        />
      )}

      <div className="lg:p-24 p-2 pt-36  mx-auto">
        <div className="lg:grid grid-cols-5 gap-10 ">
          <div className="col-span-3">
            <h1 className="text-2xl font-bold poppins pb-5">Checkout</h1>
            <div className="hidden lg:w-9/12 md:flex items-center justify-between gap-2 border border-gray-300  px-2 py-4 my-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <img src={support} className="w-10" />
                <p className="">Need assistance?</p>
              </div>
              <div className="flex gap-2 items-center ">
                <button
                  className="flex gap-2 items-center border border-green-500 text-green-500 rounded-full px-4 py-1 hover:bg-green-500 hover:text-white"
                  onClick={() => window.open(WhatsAppLink, "_blank")}
                >
                  <img src={whatsapp} className="w-6" alt="whatsapp" />
                  Whatsapp
                </button>
                <a
                  href="tel:+919620558000"
                  className="flex gap-2 items-center border border-blue-500 text-blue-500 rounded-full px-6 py-1 hover:bg-blue-500 hover:text-white"
                >
                  <img src={phone} className="w-6" alt="phone" />
                  Call us
                </a>
              </div>
            </div>
            <div className=" bg-white border border-gray-300  p-4 my-4 rounded-2xl shadow-xl">
              <h2 className="text-xl font-medium ">Customer Details</h2>
              <ProfileForm setIsProfileSaved={setIsProfileSaved} />

              <form className="mt-2 py-3 ">
                <label>
                  Venue Address <span className="text-red-500">*</span>
                  <input
                    placeholder="Add the venue address"
                    className="w-full border p-2 my-2 text-sm border-gray-300   rounded-md"
                    value={address}
                    onChange={(e) => {
                      dispatch(setVenueAddress(e.target.value));
                      dispatch(setAddress(e.target.value));
                    }}
                    name="venueAddress"
                  />
                </label>

                <div>
                  <p>
                    Selected Pincode <span className="text-red-500">*</span>
                  </p>
                  <div className="my-2 flex items-center gap-2 border border-gray-300 p-2 rounded-md">
                    <p className="w-full text-sm">{pincode}</p>
                    <button
                      className="text-primary"
                      onClick={handleEditPincode}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="bg-transparent">
                  <p className="">
                    How did you come to know about Lavisheventzz?{" "}
                    <span className="text-red-500">*</span>
                  </p>
                  <div
                    className="flex items-center justify-between gap-3 border border-gray-300 p-1 px-2 my-3 bg-transparent cursor-pointer"
                    onClick={() => setOpenOption(!openOption)}
                  >
                    <label className="flex items-center space-x-2">
                      <p className="text-gray-400 text-sm">
                        {currentOrder.source || "Select the option"}
                      </p>
                    </label>
                    <button>
                      {openOption ? <IoChevronUp /> : <IoChevronDown />}
                    </button>
                  </div>

                  {openOption && (
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-2 md:w-1/2">
                        {options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="source"
                              value={option}
                              checked={currentOrder.source === option}
                              onChange={(e) =>
                                dispatch(setSource(e.target.value))
                              }
                              className="hidden"
                            />
                            <span className="text-primary">
                              {currentOrder.source === option ? (
                                <FaCircle size={14} />
                              ) : (
                                <FaRegCircle size={14} />
                              )}
                            </span>

                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="pb-2">
                      What is the occasion?{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <select
                      name="occasion"
                      className={`border p-1 mb-3 w-full text-sm`}
                      value={currentOrder.occasion}
                      onChange={(e) => dispatch(setOccasion(e.target.value))}
                    >
                      <option value="" className="text-gray-400">
                        Occasion
                      </option>
                      <option value="birthday" className="text-black">
                        Birthday
                      </option>
                      <option value="anniversary" className="text-black">
                        Anniversary
                      </option>
                      <option value="babyShower" className="text-black">
                        Baby Shower
                      </option>
                      <option value="welcome" className="text-black">
                        Welcome
                      </option>
                      <option value="bacheloretteparty" className="text-black">
                        Bachelorette Party
                      </option>
                      <option value="weddingnight" className="text-black">
                        Wedding Night
                      </option>
                      <option value="others" className="text-black">
                        Others
                      </option>
                    </select>
                    {currentOrder.occasion === "others" && (
                      <input
                        type="text"
                        onChange={(e) =>
                          dispatch(setOtherOcassion(e.target.value))
                        }
                        placeholder="Enter the occasion"
                        value={currentOrder.otherOccasion}
                        className="w-full border p-2 my-2 text-sm border-gray-300   rounded-md"
                      />
                    )}
                  </div>

                  <div>
                    <p className="pb-2">
                      Choose Decoration Location?{" "}
                      <span className="text-red-500">*</span>{" "}
                    </p>
                    <select
                      name="decorLocation"
                      className={`border p-1 mb-3 w-full text-sm`}
                      value={currentOrder.decorLocation}
                      onChange={(e) =>
                        dispatch(setDecorLocation(e.target.value))
                      }
                      required
                    >
                      <option value="" className="text-gray-400">
                        Select Location
                      </option>
                      <option value="home" className="text-black">
                        Home
                      </option>
                      <option value="building" className="text-black">
                        Building
                      </option>
                      <option value="banquetHall" className="text-black">
                        Banquet Hall
                      </option>
                      <option value="outdoorGarden" className="text-black">
                        Outdoor Garden
                      </option>
                      <option value="terrace" className="text-black">
                        Terrace
                      </option>
                      <option value="hotelRoom" className="text-black">
                        Hotel Room
                      </option>
                      <option value="others" className="text-black">
                        Others
                      </option>
                    </select>
                    {currentOrder.decorLocation === "others" && (
                      <input
                        type="text"
                        onChange={(e) =>
                          dispatch(setOtherDecorLocation(e.target.value))
                        } // ✅ Correct for location
                        placeholder="Enter the location"
                        className="w-full border p-2 my-2 text-sm border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                </div>

                {items.some((item) => item.customizedInputs?.length > 0) && (
                  <div className="mt-4">
                    <h3 className="font-medium text-lg mb-4">
                      Customized Inputs
                    </h3>
                    {items
                      .filter((item) => item.customizedInputs?.length > 0)
                      .map((item) => (
                        <div key={item.id || item._id} className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{item.serviceName}</h4>
                            <span className="text-gray-600">
                              Rs. {item.price} x {item.quantity}
                            </span>
                          </div>

                          {item.customizedInputs.map((input, index) => (
                            <DynamicInputField
                              key={`${item.id || item._id}_${index}`}
                              item={input}
                              index={index}
                              onChange={(label, value, type, checked) =>
                                handleInputChange(
                                  label,
                                  value,
                                  item.id || item._id,
                                  type,
                                  checked
                                )
                              }
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </form>
            </div>
          </div>
          {/* right side */}
          <div className="col-span-2">
            <div className="border border-gray-300 md:p-6 p-3 my-6 rounded-2xl shadow-lg bg-white">
              <div className="flex justify-between items-center  mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order Details
                </h2>
                <button
                  className="text-primary bg-red-500 text-white px-4 py-1 rounded-md"
                  onClick={hanlderesetCurrentOrder}
                >
                  Cancel Order
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start rounded-2xl gap-6">
                {/* Left Section - Product Image & Details */}
                <div className="flex gap-4 w-full">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={selctedServiceImage}
                    className="w-32 h-32 rounded-xl object-cover shadow-sm"
                    alt="Product"
                  />
                  <div className="space-y-2 w-full">
                    <p className="text-lg md:text-xl font-semibold text-gray-900">
                      {
                        items.find((item) => item.categoryType === "service")
                          ?.serviceName
                      }
                    </p>

                    {/* Date & Time Selection */}
                    <div className="space-y-1">
                      <p
                        className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => setShowModal(true)}
                      >
                        <HiOutlineCalendarDateRange className="text-lg" />
                        {eventDate
                          ? formatDate(new Date(eventDate))
                          : "Select a date"}
                      </p>
                      <p
                        className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => setShowModal(true)}
                      >
                        <IoMdTime className="text-lg" />
                        {selectedTimeSlot || "Select a time slot"}
                      </p>
                      <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                        <CiMoneyCheck1 className="text-lg" />
                        <span className="font-semibold text-gray-900">
                          Package Amount:
                        </span>{" "}
                        Rs.{" "}
                        {
                          items.find((item) => item.categoryType === "service")
                            ?.price
                        }
                      </p>
                    </div>

                    {/* Add-ons Section */}
                    {items.filter((item) => item.categoryType === "addon")
                      .length > 0 && (
                      <div className="mt-2 border border-gray-200 p-2 rounded-lg bg-gray-50">
                        <h3 className="text-sm font-semibold text-gray-800">
                          Add-ons:
                        </h3>
                        {items
                          .filter((item) => item.categoryType === "addon")
                          .map((addon, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm text-gray-700"
                            >
                              <span>{addon.serviceName}</span>
                              <span>
                                {addon.price} x {addon.quantity}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Section - Pricing & Actions */}
                <div className="flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-6 md:gap-4 pt-4 md:pt-0">
                  <h1 className="font-semibold text-xl text-gray-900">
                    Rs. {displayGrandTotal}
                  </h1>
                </div>
              </div>

              {/* Note Section */}
              <div className="p-2 px-3 mt-4 rounded-md border border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Note:</span>
                  <input
                    className="w-full p-2"
                    placeholder="If you have any note type here"
                    value={currentOrder.addNote || ""}
                    onChange={(e) => dispatch(setAddNote(e.target.value))}
                  />
                </p>
              </div>
            </div>

            <div
              className="flex justify-between border border-gray-300  md:p-4 p-2 my-4 rounded-2xl shadow-xl cursor-pointer"
              onClick={toggleModal}
            >
              <p className="flex gap-2 items-center">
                <span className="bg-green-600 p-1 text-white rounded-full">
                  <FaQuestion size={10} />
                </span>{" "}
                Read Before Booking
              </p>
              <IoChevronForward />
            </div>

            <BookingFAQs isOpen={isOpen} toggleModal={toggleModal} />

            <div className=" border border-gray-300  p-4 my-2 rounded-2xl shadow-xl">
              <h2 className="text-xl font-medium ">Product Details</h2>
              <div className=" rounded-b-lg bg-purple-800 shadow-xl   ">
                <div className="border-b-2 border-dashed border-gray-500 text-gray-500  bg-white poppins p-3 space-y-2">
                  {/* Base Service */}
                  <div className="flex justify-between items-center">
                    <p className="">Base Service</p>
                    <p className="text-right">Rs. {mainService?.price || 0}</p>
                  </div>

                  {/* Add-ons Total */}
                  {items.filter((item) => item.categoryType === "addon")
                    .length > 0 && (
                    <div className="flex justify-between items-center">
                      <p className="">Add-ons Total</p>
                      <p className="text-right">
                        Rs.{" "}
                        {items
                          .filter((item) => item.categoryType === "addon")
                          .reduce(
                            (total, addon) =>
                              total + addon.price * addon.quantity,
                            0
                          )}
                      </p>
                    </div>
                  )}

                  {/* Extra Slot Charge */}
                  {extraSlotCharge > 0 && (
                    <div className="flex justify-between items-center text-orange-600 font-semibold">
                      <p>{extraSlotLabel}</p>
                      <p>+ Rs. {extraSlotCharge}</p>
                    </div>
                  )}

                  {/* Delivery Charges */}
                  <div className="flex justify-between items-center">
                    <p className="">Delivery Charges</p>
                    <p className="text-right">Rs. {deliveryCharges}</p>
                  </div>

                  {/* Subtotal before GST */}
                  <div className="flex justify-between items-center font-medium">
                    <p className="">Subtotal </p>
                    <p className="text-right">Rs. {displaySubTotal}</p>
                  </div>

                  {/* Coupon Discount */}
                  {selectedCoupon && (
                    <div className="flex justify-between items-center text-red-500">
                      <p>Coupon Discount</p>
                      <p>- Rs. {couponDiscount}</p>
                    </div>
                  )}

                  {/* Coupon Section - always visible */}
                  <div>
                    {selectedCoupon !== "" ? (
                      <div className="flex gap-4 text-lg text-black">
                        <div className="w-full">
                          <div className="w-full flex items-center">
                            <p className="text-sm">
                              Coupon {selectedCoupon} (
                              {selectedCouponData?.discount}% OFF)
                            </p>
                            <button onClick={handleRemoveCoupon}>
                              <MdDelete className="cursor-pointer" size={20} />
                            </button>
                          </div>
                        </div>
                        <p className="text-red-400">-{couponDiscount}</p>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="flex items-center gap-4 md:mx-4 md:px-4 px-2 py-2 rounded-md text-black bg-purple-400 cursor-pointer"
                          onClick={() => setShowCoupon(!showCoupon)}
                        >
                          <div className="w-full flex items-center gap-2">
                            <TbRosetteDiscount /> Coupon
                          </div>
                          <button className="underline">View</button>
                        </div>
                        {showCoupon &&
                          (coupons.length > 0 ? (
                            <div className="max-h-[240px] overflow-y-scroll my-2 md:w-[90%] mx-auto scrollbar-hide">
                              {coupons.map((coupon, idx) => (
                                <div
                                  key={idx}
                                  className="flex border border-primary rounded-md h-auto mt-2 cursor-pointer hover:shadow-sm transition text-xs"
                                  onClick={() => {
                                    applyCoupon(coupon.couponCode);
                                    setShowCoupon(false);
                                  }}
                                >
                                  {/* Left - Discount */}
                                  <div className="flex items-center justify-center bg-primary text-white px-2 py-1 w-[60px]">
                                    <h1 className="-rotate-90 font-bold whitespace-nowrap text-[10px]">
                                      {coupon.discount}% OFF
                                    </h1>
                                  </div>
                                  {/* Right - Coupon Details */}
                                  <div className="flex flex-col justify-center px-3 py-0">
                                    <h1 className="font-semibold text-sm text-primary">
                                      {coupon.couponName}
                                    </h1>
                                    <p className="text-gray-700 mt-1">
                                      {coupon.couponDetails}
                                    </p>
                                    <small className="text-gray-500 mt-1">
                                      Use code{" "}
                                      <span className="font-medium text-black">
                                        {coupon.couponCode}
                                      </span>{" "}
                                      and save {coupon.discount}%!
                                    </small>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 mt-2">
                              No coupons available
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Final Payment Display */}
                <div className="text-lg text-black poppins rounded-b-2xl bg-white p-3 shadow-2xl pt-4">
                  <div className="flex justify-between items-center">
                    <p className="">Grand Total</p>
                    <p className="flex items-center font-semibold text-right text-black">
                      <BiRupee size={24} />
                      {displayGrandTotal}
                    </p>
                  </div>
                  {orderState.currentOrder.paymentType === "HALF" && (
                    <div className="mt-3 0">
                      <div className="flex justify-between items-center">
                        <p className=""> Due Amount: </p>
                        <p className="flex items-center font-semibold text-right text-black">
                          <BiRupee size={24} />
                          {displayGrandTotal -
                            Math.round(displayGrandTotal / 2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="py-3 text-center text-white font-semibold">
                  Bangalore's #1 Balloon Decoration Service
                </div>
              </div>
            </div>

            <div className="bg-white border p-5 rounded-2xl shadow-md mt-5">
              <h3 className="font-semibold text-lg mb-4">
                Choose Payment Option
              </h3>

              {/* FULL PAYMENT CARD */}
              <div
                onClick={() => dispatch(setPaymentType("FULL"))}
                className={`flex items-center justify-between p-4 mb-3 border rounded-xl cursor-pointer transition ${
                  orderState.currentOrder.paymentType === "FULL"
                    ? "border-primary bg-purple-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      orderState.currentOrder.paymentType === "FULL"
                        ? "border-primary bg-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {orderState.currentOrder.paymentType === "FULL" && (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </div>
                  <p className="font-medium">Pay 100% Now</p>
                </div>

                <p className="font-semibold">₹ {displayGrandTotal}</p>
              </div>

              {/* HALF PAYMENT CARD */}
              <div
                onClick={() => dispatch(setPaymentType("HALF"))}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${
                  orderState.currentOrder.paymentType === "HALF"
                    ? "border-primary bg-purple-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      orderState.currentOrder.paymentType === "HALF"
                        ? "border-primary bg-primary"
                        : "border-gray-400"
                    }`}
                  >
                    {orderState.currentOrder.paymentType === "HALF" && (
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </div>
                  <p className="font-medium">Pay 50% Now</p>
                </div>

                <p className="font-semibold">
                  ₹ {Math.round(displayGrandTotal / 2)}
                </p>
              </div>
            </div>

            <button
              disabled={loading || !canProceed}
              onClick={handleProceedToPay}
              className={`w-full py-4 rounded-xl font-semibold text-white ${
                loading || !canProceed
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Processing…
                </>
              ) : !isProfileSaved ? (
                "Complete Profile to Proceed"
              ) : loading ? (
                "Processing…"
              ) : (
                `PROCEED TO PAY | Rs. ${payNowAmount}`
              )}
            </button>
          </div>

          {showModal && (
            <DateTimeModal
              setShowModal={setShowModal}
              timeSlots={
                items.find((item) => item.categoryType === "service")?.price >
                4000
                  ? timeSlotsPremium
                  : timeSlotsBasic
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

// import React, { useEffect, useState } from "react";
// import support from "../assets/support.png";
// import phone from "../assets/phone.png";
// import whatsapp from "../assets/whatsapp.png";
// import phonepe from "../assets/phonepe.png";
// import { IoMdTime } from "react-icons/io";
// import { CiMoneyCheck1 } from "react-icons/ci";
// import { HiOutlineCalendarDateRange } from "react-icons/hi2";
// import DateTimeModal from "./DateTimeModal";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { TbRosetteDiscount } from "react-icons/tb";
// import { MdDelete } from "react-icons/md";
// import { BiRupee } from "react-icons/bi";
// import { FaQuestion } from "react-icons/fa";
// import { IoChevronForward } from "react-icons/io5";
// import { IoChevronDown, IoChevronUp } from "react-icons/io5";
// import { FaRegCircle, FaCircle } from "react-icons/fa";
// import BookingFAQs from "./BookingFAQs";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   completeOrder,
//   resetCurrentOrder,
//   setAddress,
//   setCouponDiscount,
//   setPaymentType,
//   setAddNote,
//   setVenueAddress,
//   setSource,
//   setOccasion,
//   setAltMobile,
//   setDecorLocation,
//   setOtherDecorLocation,
//   setOtherOcassion,
// } from "../features/orderdetails/orderSlice";
// import DynamicInputField from "./DynamicInputField";
// import AuthModal from "./AuthModal";
// import { persistor } from "../app/store";

// import { setProfile, resetProfile } from "../features/userdetails/profileSlice";
// import {
//   API_BASE_URL,
//   getAuthAxios,
//   getAxios,
//   getUploadAxios,
// } from "../utils/api";
// import { store } from "../app/store";

// const ProfileForm = () => {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile);
//   const [error, setError] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Validate alternateMobile: digits only, max 10 digits
//     if (name === "alternateMobile") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 10) return;
//     }

//     // Validate pincode: digits only, exactly 6 digits max
//     if (name === "pincode") {
//       if (!/^\d*$/.test(value)) return;
//       if (value.length > 6) return;
//     }

//     // Validate names: letters only
//     if (
//       (name === "firstName" || name === "lastName") &&
//       !/^[a-zA-Z]*$/.test(value)
//     ) {
//       return;
//     }

//     dispatch(setProfile({ [name]: value }));
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("accessToken");
//       const response = await getAxios().get("/admin/users/user/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const {
//         firstName,
//         lastName,
//         mobile,
//         alternateMobile,
//         addressLine1,
//         addressLine2,
//         city,
//         state,
//         pincode,
//         landmark,
//       } = response.data.user;
//       dispatch(
//         setProfile({
//           firstName,
//           lastName,
//           mobile,
//           alternateMobile,
//           addressLine1,
//           addressLine2,
//           city,
//           state,
//           pincode,
//           landmark,
//         })
//       );
//     };
//     fetchProfile();
//   }, [dispatch]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await getAuthAxios().put(
//         "/admin/users/user/profile",
//         profile,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Profile updated successfully");
//         // Update localStorage user object with new profile data
//         const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//         const updatedUser = {
//           ...storedUser,
//           firstName: profile.firstName,
//           lastName: profile.lastName,
//           mobile: profile.mobile,
//           email: storedUser.email,
//           id: storedUser.id,
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       } else {
//         setError(response.data.message || "Error updating profile");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Error updating profile");
//     }
//   };

//   return (
//     <div className=" overflow-y-auto scrollbar-hide">
//       <form onSubmit={handleSubmit}>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="grid grid-cols-2">
//           <label>
//             <p>First Name</p>
//             <input
//               type="text"
//               name="firstName"
//               value={profile.firstName}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           <label>
//             <p>Last Name</p>
//             <input
//               type="text"
//               name="lastName"
//               value={profile.lastName}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           <label>
//             <p>Mobile Number</p>
//             <input
//               type="text"
//               name="mobile"
//               value={profile.mobile}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//               disabled
//             />
//           </label>
//           <label>
//             <p>Alternate Number</p>
//             <input
//               type="text"
//               name="alternateMobile"
//               value={profile.alternateMobile}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//         </div>

//         <h1 className="font-bold poppins my-6">Address Details</h1>
//         <div className="grid grid-cols-2">
//           <label>
//             <p>Address Line 1</p>
//             <input
//               type="text"
//               name="addressLine1"
//               value={profile.addressLine1}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           <label>
//             <p>Address Line 2</p>
//             <input
//               type="text"
//               name="addressLine2"
//               value={profile.addressLine2}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           <label>
//             <p>City</p>
//             <input
//               type="text"
//               name="city"
//               value={profile.city}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           {/* <label>
//                         <p>State</p>
//                         <input
//                             type="text"
//                             name="state"
//                             value={profile.state}
//                             onChange={handleChange}
//                             className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
//                         />
//                     </label> */}
//           <label>
//             <p>Pincode</p>
//             <input
//               type="text"
//               name="pincode"
//               value={profile.pincode}
//               onChange={handleChange}
//               className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
//               required
//             />
//           </label>
//           {/* <label>
//                         <p>Landmark (Optional)</p>
//                         <input
//                             type="text"
//                             name="landmark"
//                             value={profile.landmark}
//                             onChange={handleChange}
//                             className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
//                         />
//                     </label> */}
//         </div>
//         <div className="text-end">
//           <input
//             type="submit"
//             value="Save"
//             className="bg-primary text-white px-4 py-2 rounded mt-5 "
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { serviceId } = useParams();
//   const orderState = useSelector((state) => state.order);

//   const { currentOrder, selectedTimeSlot } = orderState;

//   const {
//     eventDate,
//     grandTotal,
//     subTotal,
//     deliveryCharges,
//     couponDiscount,
//     address,
//     pincode,
//     balloonsColor,
//     items,
//     gstAmount,
//     addNote,
//   } = currentOrder;

//   const timeSlotsBasic = [
//     "06:00 AM - 11:00 AM",
//     "10:00 AM - 01:00 PM",
//     "01:00 PM - 04:00 PM",
//     "04:00 PM - 07:00 PM",
//     "07:00 PM - 10:00 PM",
//     "09:00 PM - 12:00 PM (15%)",
//   ];
//   const timeSlotsPremium = [
//     "08:00 AM - 12:00 PM (10%)",
//     "10:00 AM - 02:00 PM",
//     "02:00 PM - 06:00 PM",
//     "06:00 PM - 10:00 PM",
//   ];
//   const [amount, setAmount] = useState("100");
//   const [paymentUrl, setPaymentUrl] = useState(null);

//   const [showModal, setShowModal] = useState(false);
//   const [showCoupon, setShowCoupon] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [selectedCoupon, setSelectedCoupon] = useState("");
//   const [selectedNotification, setSelectedNotification] = useState(false);
//   const [openOption, setOpenOption] = useState(false);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [customizedValues, setCustomizedValues] = useState({});
//   const [isOpen, setIsOpen] = useState(false);
//   const [addonDetails, setAddonDetails] = useState({});
//   const [coupons, setCoupons] = useState([]);
//   const [selectedCouponData, setSelectedCouponData] = useState(null);
//   const options = [
//     "Google",
//     "Facebook",
//     "Instagram",
//     "Youtube",
//     "Recommended",
//     "Used Before",
//   ];

//   const city = "Bangalore";
//   const price = grandTotal || 0;
//   const currentPageUrl = window.location.href;
//   const message = `${currentPageUrl}\nCity: ${city},\nPrice: ${price}\nCan I get more details?`;
//   const encodedMessage = encodeURIComponent(message);
//   const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

//   const storedUser = localStorage.getItem("user");
//   const userData = JSON.parse(storedUser);
//   const customerId = userData?.id;
//   // console.log("Customer ID", customerId);

//   useEffect(() => {
//     if (!customerId) {
//       setShowLoginModal(true);
//     } else {
//       const fetchProfile = async () => {
//         const token = localStorage.getItem("accessToken");
//         const response = await getAxios().get("/admin/users/user/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const {
//           firstName,
//           lastName,
//           mobile,
//           alternateMobile,
//           addressLine1,
//           addressLine2,
//           city,
//           state,
//           pincode,
//           landmark,
//         } = response.data.user;
//         dispatch(
//           setProfile({
//             firstName,
//             lastName,
//             mobile,
//             alternateMobile,
//             addressLine1,
//             addressLine2,
//             city,
//             state,
//             pincode,
//             landmark,
//           })
//         );
//       };
//       fetchProfile();
//     }
//   }, [customerId]);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         // Fetch service details
//         const serviceResponse = await getAxios().get(`/services/${serviceId}`);
//         const serviceData = serviceResponse.data.data;
//         setServiceDetails(serviceData);

//         // Fetch all addons
//         const allAddonsResponse = await getAxios().get("/addons/");
//         const allAddons = allAddonsResponse.data.data;
//         // console.log("All addons from API:", allAddons);

//         // Filter addons that are in the cart
//         const cartAddons = items.filter(
//           (item) => item.categoryType === "addon"
//         );
//         // console.log("Cart addons:", cartAddons);

//         // Create a map of addon details using the _id from cart addons
//         const addonDetailsMap = {};
//         cartAddons.forEach((cartAddon) => {
//           // Find the complete addon details by matching the _id
//           const addonDetail = allAddons.find(
//             (addon) => addon._id === cartAddon._id
//           );
//           // console.log(
//           //   "Matching addon by ID:",
//           //   cartAddon._id,
//           //   "Found:",
//           //   addonDetail
//           // );

//           if (addonDetail) {
//             addonDetailsMap[addonDetail._id] = {
//               ...addonDetail,
//               serviceName: cartAddon.serviceName,
//               price: cartAddon.price,
//               quantity: cartAddon.quantity,
//             };
//             // console.log("Added to map:", addonDetailsMap[addonDetail._id]);
//           } else {
//             console.log("No matching addon found for ID:", cartAddon._id);
//           }
//         });

//         // console.log("Final addon details map:", addonDetailsMap);
//         setAddonDetails(addonDetailsMap);
//       } catch (err) {
//         console.error("Error fetching details:", err);
//         setError("Failed to fetch details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (serviceId) {
//       fetchDetails();
//     }
//   }, [serviceId, items]);

//   // console.log("Service", serviceDetails);

//   const handleInputChange = (
//     label,
//     value,
//     itemId = null,
//     type = "text",
//     checked = false
//   ) => {
//     let finalValue = value;

//     if (type === "checkbox") {
//       // For checkboxes, we'll store an array of selected values
//       if (itemId) {
//         const currentValues = customizedValues[`${itemId}_${label}`] || [];
//         if (checked) {
//           // Add value if checked
//           finalValue = [...currentValues, value];
//         } else {
//           // Remove value if unchecked
//           finalValue = currentValues.filter((v) => v !== value);
//         }
//       } else {
//         const currentValues = customizedValues[label] || [];
//         if (checked) {
//           finalValue = [...currentValues, value];
//         } else {
//           finalValue = currentValues.filter((v) => v !== value);
//         }
//       }
//     }

//     if (itemId) {
//       setCustomizedValues((prev) => ({
//         ...prev,
//         [`${itemId}_${label}`]: finalValue,
//       }));
//     } else {
//       setCustomizedValues((prev) => ({
//         ...prev,
//         [label]: finalValue,
//       }));
//     }
//   };

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = showModal ? "hidden" : "unset";

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [showModal]);

//   // Format date for display

//   const formatDate = (date) => {
//     if (!date) return "";
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const handleEditPincode = () => {
//     dispatch(resetCurrentOrder());
//     navigate(`/service/details/${serviceId}`);
//   };

//   const applyCoupon = (couponCode) => {
//     if (couponCode) {
//       // Find the coupon data from the coupons array
//       const couponData = coupons.find(
//         (coupon) => coupon.couponCode === couponCode
//       );
//       if (couponData) {
//         setSelectedCoupon(couponCode);
//         setSelectedCouponData(couponData);
//         // Calculate discount based on the coupon's discount percentage
//         const discount = Math.round(subTotal * (couponData.discount / 100));
//         dispatch(setCouponDiscount(discount));
//       }
//     } else {
//       setSelectedCoupon("");
//       setSelectedCouponData(null);
//       dispatch(setCouponDiscount(0));
//     }
//   };

//   // Handle coupon removal
//   const handleRemoveCoupon = () => {
//     setSelectedCoupon("");
//     setSelectedCouponData(null);
//     dispatch(setCouponDiscount(0));
//   };

//   useEffect(() => {
//     if (selectedCoupon && selectedCouponData) {
//       // Recalculate discount when subtotal changes
//       const discount = Math.round(
//         subTotal * (selectedCouponData.discount / 100)
//       );
//       dispatch(setCouponDiscount(discount));
//     } else if (!selectedCoupon) {
//       dispatch(setCouponDiscount(0));
//     }
//   }, [selectedCoupon, subTotal, selectedCouponData]);

//   //fetch coupoun
//   useEffect(() => {
//     const fetchCoupons = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const response = await getAxios().get("/coupons/getcoupons");
//         setCoupons(response.data.coupons);
//         // console.log("Coupons", response.data.coupons);
//       } catch (error) {
//         console.error("Error fetching coupons:", error);
//         setError("Failed to fetch coupons. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, []);

//   // Calculate extra charge for special time slots
//   let extraSlotCharge = 0;
//   let extraSlotLabel = "";
//   const mainService = items.find((item) => item.categoryType === "service");
//   if (mainService && selectedTimeSlot) {
//     if (selectedTimeSlot === "09:00 PM - 12:00 PM (15%)") {
//       extraSlotCharge = Math.round(mainService.price * 0.15);
//       extraSlotLabel = "Night Slot Extra (15%)";
//     } else if (selectedTimeSlot === "08:00 AM - 12:00 PM (10%)") {
//       extraSlotCharge = Math.round(mainService.price * 0.1);
//       extraSlotLabel = "Morning Slot Extra (10%)";
//     }
//   }

//   // When calculating grandTotal and subTotal, add extraSlotCharge
//   // We'll override the values for display and for orderData
//   const displaySubTotal = Number(subTotal || 0) + extraSlotCharge;
//   const displayGrandTotal = Number(grandTotal || 0) + extraSlotCharge;

//   // Helper to get and increment order number in localStorage
//   // function getNextOrderId() {
//   //   const lastOrderNum = parseInt(
//   //     localStorage.getItem("lastOrderNum") || "0",
//   //     10
//   //   );
//   //   const nextOrderNum = lastOrderNum + 1;
//   //   localStorage.setItem("lastOrderNum", nextOrderNum);
//   //   // Pad with zeros to 4 digits
//   //   return `ORD${nextOrderNum.toString().padStart(4, "0")}`;
//   // }

//   const handleProceedToPay = async () => {
//     setLoading(true);
//     setError(null);
//     setPaymentUrl(null);

//     // const merchantOrderId = `TX${Date.now()}`;

//     try {
//       // Check if user is logged in
//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("accessToken");

//       // console.log('Stored User Data:', storedUser);
//       // console.log('Stored Token:', storedToken);

//       if (!storedUser || !storedToken) {
//         setShowLoginModal(true);
//         return;
//       }

//       // Parse stored user data
//       const userData = JSON.parse(storedUser);
//       // console.log("Parsed User Data:", userData);

//       // Form validation
//       if (!address.trim()) {
//         alert("Please enter venue address");
//         return;
//       }
//       if (!currentOrder.source) {
//         alert("Please select how you came to know about us");
//         return;
//       }
//       if (!currentOrder.occasion) {
//         alert("Please select an occasion");
//         return;
//       }
//       if (!eventDate) {
//         alert("Please select a date");
//         return;
//       }
//       if (!selectedTimeSlot) {
//         alert("Please select a time slot");
//         return;
//       }

//       // Process items to match schema requirements
//       const processedItems = items.map((item) => {
//         // Ensure categoryType is properly capitalized
//         const categoryType =
//           item.categoryType === "service"
//             ? "Service"
//             : item.categoryType === "addon"
//             ? "Addon"
//             : item.categoryType;

//         // Get the refId based on item type
//         let refId;
//         if (item.categoryType === "service") {
//           refId = serviceDetails?._id;
//           if (!refId) {
//             throw new Error(`Service ID not found for ${item.serviceName}`);
//           }
//         } else if (item.categoryType === "addon") {
//           // Try to get from addonDetails, fallback to item.id/_id
//           const addonDetail = addonDetails[item._id || item.id];
//           refId = addonDetail ? addonDetail._id : item._id || item.id;
//           // No error thrown if not found!
//         }

//         // Build customizedInputs for this item
//         let customizedInputs = [];
//         if (item.customizedInputs && item.customizedInputs.length > 0) {
//           customizedInputs = item.customizedInputs.map((input) => ({
//             label: input.label,
//             value:
//               customizedValues[`${item.id || item._id}_${input.label}`] || "",
//           }));
//         }

//         return {
//           refId: refId,
//           serviceName: item.serviceName,
//           price: Number(item.price) || 0,
//           originalPrice: Number(item.originalPrice || item.price) || 0,
//           quantity: Number(item.quantity || 1),
//           image: item.image || "",
//           categoryType: categoryType,
//           customizedInputs,
//           id: item.id,
//           _id: item._id,
//         };
//       });

//       // Create order data
//       const orderData = {
//         // orderId: `ORD${Date.now()}`,
//         // orderId: getNextOrderId(),
//         eventDate: formatDate(new Date(eventDate)),
//         eventTime: selectedTimeSlot,
//         pincode: pincode,
//         balloonsColor: balloonsColor || [],
//         subTotal: displaySubTotal,
//         grandTotal: displayGrandTotal,
//         paidAmount: displayGrandTotal,
//         couponDiscount: Number(couponDiscount || 0),
//         gstAmount: Number(gstAmount || 0),
//         paymentType: "full",
//         address: address.trim(),
//         items: processedItems,
//         customerName:
//           userData?.firstName && userData?.lastName
//             ? userData.firstName + " " + userData.lastName
//             : "Guest",
//         customerId: userData.id,
//         occasion: currentOrder.occasion,
//         decorLocation: currentOrder.decorLocation,
//         source: currentOrder.source,
//         altMobile: currentOrder.altMobile || "",
//         addNote: currentOrder.addNote || "",
//         orderStatus: "created",
//         venueAddress: address.trim(),
//         slotExtraCharge: extraSlotCharge,
//         ...(currentOrder.occasion === "others" && {
//           otherOccasion: currentOrder.otherOccasion,
//         }),
//         ...(currentOrder.decorLocation === "others" && {
//           otherDecorLocation: currentOrder.otherDecorLocation,
//         }),
//         merchantOrderId: `TX${Date.now()}`,
//       };

//       // console.log("Order Data being sent:", orderData);

//       // Create order with authentication token
//       // const response = await axios.post("https://api.lavisheventzz.com/api/payment/initiate-payment", orderData);
//       const response = await axios.post(
//         `${API_BASE_URL}/payment/initiate-payment`,
//         orderData
//       );

//       // alert("Order created successfully");

//       // Clear form and state
//       dispatch(resetCurrentOrder());
//       setSelectedCoupon("");
//       setSelectedNotification(false);
//       dispatch(completeOrder());

//       // console.log("Backend response:", response.data);

//       const { success, data } = response.data;

//       if (success && data?.paymentUrl) {
//         // console.log("data.paymentUrl", data.paymentUrl);
//         setPaymentUrl(data.paymentUrl);
//         window.location.href = data.paymentUrl;
//       } else {
//         setError("Payment initiation failed: Invalid response from server");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error ||
//         error.message ||
//         "Error connecting to server";
//       setError(errorMessage);
//       console.error(
//         "Payment error:",
//         errorMessage,
//         error.response?.data || error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hanlderesetCurrentOrder = async () => {
//     // Purge redux-persist storage if used
//     if (persistor && persistor.purge) {
//       await persistor.purge();
//     }

//     dispatch(resetCurrentOrder());

//     navigate("/");
//   };

//   const selctedServiceImage = items.find(
//     (item) => item.categoryType === "service"
//   )?.image;
//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       {/* Login Modal */}
//       {showLoginModal && (
//         <AuthModal
//           setIsModalOpen={setShowLoginModal}
//           onLoginSuccess={() => {
//             setShowLoginModal(false);
//           }}
//         />
//       )}

//       <div className="lg:p-24 p-2 pt-36  mx-auto">
//         <div className="lg:grid grid-cols-5 gap-10 ">
//           <div className="col-span-3">
//             <h1 className="text-2xl font-bold poppins pb-5">Checkout</h1>
//             <div className="hidden lg:w-9/12 md:flex items-center justify-between gap-2 border border-gray-300  px-2 py-4 my-4 rounded-2xl">
//               <div className="flex items-center gap-2">
//                 <img src={support} className="w-10" />
//                 <p className="">Need assistance?</p>
//               </div>
//               <div className="flex gap-2 items-center ">
//                 <button
//                   className="flex gap-2 items-center border border-green-500 text-green-500 rounded-full px-4 py-1 hover:bg-green-500 hover:text-white"
//                   onClick={() => window.open(WhatsAppLink, "_blank")}
//                 >
//                   <img src={whatsapp} className="w-6" alt="whatsapp" />
//                   Whatsapp
//                 </button>
//                 <a
//                   href="tel:+919620558000"
//                   className="flex gap-2 items-center border border-blue-500 text-blue-500 rounded-full px-6 py-1 hover:bg-blue-500 hover:text-white"
//                 >
//                   <img src={phone} className="w-6" alt="phone" />
//                   Call us
//                 </a>
//               </div>
//             </div>
//             <div className=" bg-white border border-gray-300  p-4 my-4 rounded-2xl shadow-xl">
//               <h2 className="text-xl font-medium ">Customer Details</h2>
//               <ProfileForm />
//               <form className="mt-2 py-3 ">
//                 <label>
//                   Venue Address
//                   <input
//                     placeholder="Add the venue address"
//                     className="w-full border p-2 my-2 text-sm border-gray-300   rounded-md"
//                     value={address}
//                     onChange={(e) => {
//                       dispatch(setVenueAddress(e.target.value));
//                       dispatch(setAddress(e.target.value));
//                     }}
//                     name="venueAddress"
//                   />
//                 </label>

//                 <div>
//                   <p>Selected Pincode</p>
//                   <div className="my-2 flex items-center gap-2 border border-gray-300 p-2 rounded-md">
//                     <p className="w-full text-sm">{pincode}</p>
//                     <button
//                       className="text-primary"
//                       onClick={handleEditPincode}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </div>

//                 <div className="bg-transparent">
//                   <p className="">
//                     How did you come to know about Lavisheventzz?
//                   </p>
//                   <div
//                     className="flex items-center justify-between gap-3 border border-gray-300 p-1 px-2 my-3 bg-transparent cursor-pointer"
//                     onClick={() => setOpenOption(!openOption)}
//                   >
//                     <label className="flex items-center space-x-2">
//                       <p className="text-gray-400 text-sm">
//                         {currentOrder.source || "Select the option"}
//                       </p>
//                     </label>
//                     <button>
//                       {openOption ? <IoChevronUp /> : <IoChevronDown />}
//                     </button>
//                   </div>

//                   {openOption && (
//                     <div className="mt-2 space-y-2">
//                       <div className="grid grid-cols-2 md:w-1/2">
//                         {options.map((option) => (
//                           <label
//                             key={option}
//                             className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
//                           >
//                             <input
//                               type="radio"
//                               name="source"
//                               value={option}
//                               checked={currentOrder.source === option}
//                               onChange={(e) =>
//                                 dispatch(setSource(e.target.value))
//                               }
//                               className="hidden"
//                             />
//                             <span className="text-primary">
//                               {currentOrder.source === option ? (
//                                 <FaCircle size={14} />
//                               ) : (
//                                 <FaRegCircle size={14} />
//                               )}
//                             </span>
//                             <span>{option}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="pb-2">What is the occasion? </p>
//                     <select
//                       name="occasion"
//                       className={`border p-1 mb-3 w-full text-sm`}
//                       value={currentOrder.occasion}
//                       onChange={(e) => dispatch(setOccasion(e.target.value))}
//                     >
//                       <option value="" className="text-gray-400">
//                         Occasion
//                       </option>
//                       <option value="birthday" className="text-black">
//                         Birthday
//                       </option>
//                       <option value="anniversary" className="text-black">
//                         Anniversary
//                       </option>
//                       <option value="babyShower" className="text-black">
//                         Baby Shower
//                       </option>
//                       <option value="welcome" className="text-black">
//                         Welcome
//                       </option>
//                       <option value="bacheloretteparty" className="text-black">
//                         Bachelorette Party
//                       </option>
//                       <option value="weddingnight" className="text-black">
//                         Wedding Night
//                       </option>
//                       <option value="others" className="text-black">
//                         Others
//                       </option>
//                     </select>
//                     {currentOrder.occasion === "others" && (
//                       <input
//                         type="text"
//                         onChange={(e) =>
//                           dispatch(setOtherOcassion(e.target.value))
//                         }
//                         placeholder="Enter the occasion"
//                         value={currentOrder.otherOccasion}
//                         className="w-full border p-2 my-2 text-sm border-gray-300   rounded-md"
//                       />
//                     )}
//                   </div>

//                   <div>
//                     <p className="pb-2">Choose Decoration Location? </p>
//                     <select
//                       name="decorLocation"
//                       className={`border p-1 mb-3 w-full text-sm`}
//                       value={currentOrder.decorLocation}
//                       onChange={(e) =>
//                         dispatch(setDecorLocation(e.target.value))
//                       }
//                     >
//                       <option value="" className="text-gray-400">
//                         Select Location
//                       </option>
//                       <option value="home" className="text-black">
//                         Home
//                       </option>
//                       <option value="building" className="text-black">
//                         Building
//                       </option>
//                       <option value="banquetHall" className="text-black">
//                         Banquet Hall
//                       </option>
//                       <option value="outdoorGarden" className="text-black">
//                         Outdoor Garden
//                       </option>
//                       <option value="terrace" className="text-black">
//                         Terrace
//                       </option>
//                       <option value="hotelRoom" className="text-black">
//                         Hotel Room
//                       </option>
//                       <option value="others" className="text-black">
//                         Others
//                       </option>
//                     </select>
//                     {currentOrder.decorLocation === "others" && (
//                       <input
//                         type="text"
//                         onChange={(e) =>
//                           dispatch(setOtherDecorLocation(e.target.value))
//                         } // ✅ Correct for location
//                         placeholder="Enter the location"
//                         className="w-full border p-2 my-2 text-sm border-gray-300 rounded-md"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 {items.some((item) => item.customizedInputs?.length > 0) && (
//                   <div className="mt-4">
//                     <h3 className="font-medium text-lg mb-4">
//                       Customized Inputs
//                     </h3>
//                     {items
//                       .filter((item) => item.customizedInputs?.length > 0)
//                       .map((item) => (
//                         <div key={item.id || item._id} className="mt-4">
//                           <div className="flex justify-between items-center mb-2">
//                             <h4 className="font-medium">{item.serviceName}</h4>
//                             <span className="text-gray-600">
//                               Rs. {item.price} x {item.quantity}
//                             </span>
//                           </div>

//                           {item.customizedInputs.map((input, index) => (
//                             <DynamicInputField
//                               key={`${item.id || item._id}_${index}`}
//                               item={input}
//                               index={index}
//                               onChange={(label, value, type, checked) =>
//                                 handleInputChange(
//                                   label,
//                                   value,
//                                   item.id || item._id,
//                                   type,
//                                   checked
//                                 )
//                               }
//                             />
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//           {/* right side */}
//           <div className="col-span-2">
//             <div className="border border-gray-300 md:p-6 p-3 my-6 rounded-2xl shadow-lg bg-white">
//               <div className="flex justify-between items-center  mb-4">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                   Order Details
//                 </h2>
//                 <button
//                   className="text-primary bg-red-500 text-white px-4 py-1 rounded-md"
//                   onClick={hanlderesetCurrentOrder}
//                 >
//                   Cancel Order
//                 </button>
//               </div>

//               <div className="flex flex-col md:flex-row justify-between items-start rounded-2xl gap-6">
//                 {/* Left Section - Product Image & Details */}
//                 <div className="flex gap-4 w-full">
//                   <img
//                     loading="lazy"
//                     decoding="async"
//                     src={selctedServiceImage}
//                     className="w-32 h-32 rounded-xl object-cover shadow-sm"
//                     alt="Product"
//                   />
//                   <div className="space-y-2 w-full">
//                     <p className="text-lg md:text-xl font-semibold text-gray-900">
//                       {
//                         items.find((item) => item.categoryType === "service")
//                           ?.serviceName
//                       }
//                     </p>

//                     {/* Date & Time Selection */}
//                     <div className="space-y-1">
//                       <p
//                         className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
//                         onClick={() => setShowModal(true)}
//                       >
//                         <HiOutlineCalendarDateRange className="text-lg" />
//                         {eventDate
//                           ? formatDate(new Date(eventDate))
//                           : "Select a date"}
//                       </p>
//                       <p
//                         className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
//                         onClick={() => setShowModal(true)}
//                       >
//                         <IoMdTime className="text-lg" />
//                         {selectedTimeSlot || "Select a time slot"}
//                       </p>
//                       <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
//                         <CiMoneyCheck1 className="text-lg" />
//                         <span className="font-semibold text-gray-900">
//                           Package Amount:
//                         </span>{" "}
//                         Rs.{" "}
//                         {
//                           items.find((item) => item.categoryType === "service")
//                             ?.price
//                         }
//                       </p>
//                     </div>

//                     {/* Add-ons Section */}
//                     {items.filter((item) => item.categoryType === "addon")
//                       .length > 0 && (
//                       <div className="mt-2 border border-gray-200 p-2 rounded-lg bg-gray-50">
//                         <h3 className="text-sm font-semibold text-gray-800">
//                           Add-ons:
//                         </h3>
//                         {items
//                           .filter((item) => item.categoryType === "addon")
//                           .map((addon, index) => (
//                             <div
//                               key={index}
//                               className="flex justify-between items-center text-sm text-gray-700"
//                             >
//                               <span>{addon.serviceName}</span>
//                               <span>
//                                 {addon.price} x {addon.quantity}
//                               </span>
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Section - Pricing & Actions */}
//                 <div className="flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-6 md:gap-4 pt-4 md:pt-0">
//                   <h1 className="font-semibold text-xl text-gray-900">
//                     Rs. {displayGrandTotal}
//                   </h1>
//                 </div>
//               </div>

//               {/* Note Section */}
//               <div className="p-2 px-3 mt-4 rounded-md border border-gray-300 bg-gray-50">
//                 <p className="text-sm text-gray-700">
//                   <span className="font-bold">Note:</span>
//                   <input
//                     className="w-full p-2"
//                     placeholder="If you have any note type here"
//                     value={currentOrder.addNote || ""}
//                     onChange={(e) => dispatch(setAddNote(e.target.value))}
//                   />
//                 </p>
//               </div>
//             </div>

//             <div
//               className="flex justify-between border border-gray-300  md:p-4 p-2 my-4 rounded-2xl shadow-xl cursor-pointer"
//               onClick={toggleModal}
//             >
//               <p className="flex gap-2 items-center">
//                 <span className="bg-green-600 p-1 text-white rounded-full">
//                   <FaQuestion size={10} />
//                 </span>{" "}
//                 Read Before Booking
//               </p>
//               <IoChevronForward />
//             </div>

//             <BookingFAQs isOpen={isOpen} toggleModal={toggleModal} />

//             <div className=" border border-gray-300  p-4 my-2 rounded-2xl shadow-xl">
//               <h2 className="text-xl font-medium ">Product Details</h2>
//               <div className=" rounded-b-lg bg-purple-800 shadow-xl   ">
//                 <div className="border-b-2 border-dashed border-gray-500 text-gray-500  bg-white poppins p-3 space-y-2">
//                   {/* Base Service */}
//                   <div className="flex justify-between items-center">
//                     <p className="">Base Service</p>
//                     <p className="text-right">Rs. {mainService?.price || 0}</p>
//                   </div>

//                   {/* Add-ons Total */}
//                   {items.filter((item) => item.categoryType === "addon")
//                     .length > 0 && (
//                     <div className="flex justify-between items-center">
//                       <p className="">Add-ons Total</p>
//                       <p className="text-right">
//                         Rs.{" "}
//                         {items
//                           .filter((item) => item.categoryType === "addon")
//                           .reduce(
//                             (total, addon) =>
//                               total + addon.price * addon.quantity,
//                             0
//                           )}
//                       </p>
//                     </div>
//                   )}

//                   {/* Extra Slot Charge */}
//                   {extraSlotCharge > 0 && (
//                     <div className="flex justify-between items-center text-orange-600 font-semibold">
//                       <p>{extraSlotLabel}</p>
//                       <p>+ Rs. {extraSlotCharge}</p>
//                     </div>
//                   )}

//                   {/* Delivery Charges */}
//                   <div className="flex justify-between items-center">
//                     <p className="">Delivery Charges</p>
//                     <p className="text-right">Rs. {deliveryCharges}</p>
//                   </div>

//                   {/* Subtotal before GST */}
//                   <div className="flex justify-between items-center font-medium">
//                     <p className="">Subtotal </p>
//                     <p className="text-right">Rs. {displaySubTotal}</p>
//                   </div>

//                   {/* Coupon Discount */}
//                   {selectedCoupon && (
//                     <div className="flex justify-between items-center text-red-500">
//                       <p>Coupon Discount</p>
//                       <p>- Rs. {couponDiscount}</p>
//                     </div>
//                   )}

//                   {/* Coupon Section - always visible */}
//                   <div>
//                     {selectedCoupon !== "" ? (
//                       <div className="flex gap-4 text-lg text-black">
//                         <div className="w-full">
//                           <div className="w-full flex items-center">
//                             <p className="text-sm">
//                               Coupon {selectedCoupon} (
//                               {selectedCouponData?.discount}% OFF)
//                             </p>
//                             <button onClick={handleRemoveCoupon}>
//                               <MdDelete className="cursor-pointer" size={20} />
//                             </button>
//                           </div>
//                         </div>
//                         <p className="text-red-400">-{couponDiscount}</p>
//                       </div>
//                     ) : (
//                       <div>
//                         <div
//                           className="flex items-center gap-4 md:mx-4 md:px-4 px-2 py-2 rounded-md text-black bg-purple-400 cursor-pointer"
//                           onClick={() => setShowCoupon(!showCoupon)}
//                         >
//                           <div className="w-full flex items-center gap-2">
//                             <TbRosetteDiscount /> Coupon
//                           </div>
//                           <button className="underline">View</button>
//                         </div>
//                         {showCoupon &&
//                           (coupons.length > 0 ? (
//                             <div className="max-h-[240px] overflow-y-scroll my-2 md:w-[90%] mx-auto scrollbar-hide">
//                               {coupons.map((coupon, idx) => (
//                                 <div
//                                   key={idx}
//                                   className="flex border border-primary rounded-md h-auto mt-2 cursor-pointer hover:shadow-sm transition text-xs"
//                                   onClick={() => {
//                                     applyCoupon(coupon.couponCode);
//                                     setShowCoupon(false);
//                                   }}
//                                 >
//                                   {/* Left - Discount */}
//                                   <div className="flex items-center justify-center bg-primary text-white px-2 py-1 w-[60px]">
//                                     <h1 className="-rotate-90 font-bold whitespace-nowrap text-[10px]">
//                                       {coupon.discount}% OFF
//                                     </h1>
//                                   </div>
//                                   {/* Right - Coupon Details */}
//                                   <div className="flex flex-col justify-center px-3 py-0">
//                                     <h1 className="font-semibold text-sm text-primary">
//                                       {coupon.couponName}
//                                     </h1>
//                                     <p className="text-gray-700 mt-1">
//                                       {coupon.couponDetails}
//                                     </p>
//                                     <small className="text-gray-500 mt-1">
//                                       Use code{" "}
//                                       <span className="font-medium text-black">
//                                         {coupon.couponCode}
//                                       </span>{" "}
//                                       and save {coupon.discount}%!
//                                     </small>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="text-center text-gray-500 mt-2">
//                               No coupons available
//                             </div>
//                           ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Final Payment Display */}
//                 <div className="text-lg text-black poppins rounded-b-2xl bg-white p-3 shadow-2xl pt-4">
//                   <div className="flex justify-between items-center">
//                     <p className="">Grand Total</p>
//                     <p className="flex items-center font-semibold text-right text-black">
//                       <BiRupee size={24} />
//                       {displayGrandTotal}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="py-3 text-center text-white font-semibold">
//                   Bangalore's #1 Balloon Decoration Service
//                 </div>
//               </div>
//             </div>

//             <div className="my-10">
//               <button
//                 onClick={handleProceedToPay}
//                 className="bg-primary text-center py-3 mt-5 w-full text-white rounded-xl font-semibold text-xl"
//               >
//                 PROCEED TO PAY | Rs. {displayGrandTotal}
//               </button>
//               {/* <p className="text-gray-500 py-3 text-center">
//                 100% Safe & Secure Payment!
//               </p> */}
//               <img src={phonepe} className="w-100 h-100" />
//             </div>
//           </div>

//           {showModal && (
//             <DateTimeModal
//               setShowModal={setShowModal}
//               timeSlots={
//                 items.find((item) => item.categoryType === "service")?.price >
//                 4000
//                   ? timeSlotsPremium
//                   : timeSlotsBasic
//               }
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
