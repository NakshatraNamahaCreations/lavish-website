import React, { useEffect, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { TfiAlignLeft } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, resetProfile } from "../features/userdetails/profileSlice";
import ReasonModal from "./ReasonModal";
import RescheduleDateModal from "./RescheduleDateModal";
import dayjs from "dayjs";
import { getAuthAxios, getAxios } from "../utils/api";
import { logout, reset } from "../features/auth/authSlice";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const PastBookings = () => {
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const userId = userData?.id;
  const navigate = useNavigate();

  const [pastOrders, setPastOrders] = useState([]);

  const fetchPastOrders = async () => {
    try {
      const res = await getAxios().get(`/orders/past/${userId}`);
      console.log("Past Orders:", res.data.data);
      setPastOrders(res.data.data);
    } catch (error) {
      console.error("Failed to fetch past orders:", error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchPastOrders();
  }, [userId]);

  const handleCardClick = (id) => {
    navigate(`/orderDetails/${id}`);
  };

  return (
    <div className="h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5 scrollbar-hide">
      <Helmet>
        {/* ✅ Meta Title & Description */}
        <title>My Profile | Lavish Eventzz</title>
        <meta
          name="description"
          content="Explore my Profile at Lavish Eventzz. We specialize in curating exceptional weddings, corporate events and private celebrations across India."
        />
        <meta
          name="keywords"
          content="My Profile, Lavish Eventzz, Our Profile & Lavish Eventzz, Event Planner Account, Wedding Planning Profile"
        />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://www.lavisheventzz.com/profile" />
      </Helmet>

      <div className="lg:w-[60%]">
        <h1 className="font-bold poppins lg:my-6">Past Bookings</h1>

        {pastOrders.length === 0 ? (
          <p className="text-gray-500">No past bookings found.</p>
        ) : (
          pastOrders.map((order, index) => {
            const mainService =
              order.items.find((item) => item.categoryType === "Service") ||
              order.items[0];
            const serviceName = mainService?.serviceName || "No Service Name";
            const serviceImage = mainService?.image
              ? `${mainService.image}`
              : "";

            return (
              <div
                key={order._id}
                className="border border-gray-300 lg:p-4 p-2 rounded my-4 cursor-pointer"
                onClick={() => handleCardClick(order._id)}
              >
                <div className="flex lg:gap-4 gap-2 lg:items-center">
                  <img
                    src={serviceImage}
                    alt="Service"
                    className="w-24 h-28 rounded-2xl object-cover"
                  />
                  <div className="space-y-1">
                    <p className="font-normal poppins">{serviceName}</p>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <HiOutlineCalendarDateRange />
                      {order?.eventDate || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <IoMdTime />
                      {order?.eventTime || "N/A"}
                    </p>
                    {/* <p className='text-sm text-gray-600 font-medium flex items-center gap-2'>
                                            <CiMoneyCheck1 />
                                            Package Amount: ₹{order?.grandTotal || 'N/A'}
                                        </p> */}
                  </div>
                </div>
                <div className="flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0">
                  <h1 className="font-medium text-md text-gray-800">
                    Total: Rs. {order?.grandTotal || "N/A"}
                  </h1>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const UpcomingBookings = () => {
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const userId = userData?.id;
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/orderDetails/${id}`);
  };
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

  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [error, setError] = useState("");

  const fetchUpcomingOrders = async () => {
    try {
      const res = await getAxios().get(`/orders/upcoming/${userId}`);
      setUpcomingOrders(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Failed to fetch upcoming orders:", error.message);
    }
  };

  useEffect(() => {
    if (userId) fetchUpcomingOrders();
  }, [userId]);

  // Parse event start datetime from date and time slot string
  const parseEventStartDateTime = (dateStr, timeSlotStr) => {
    const [startTime] = timeSlotStr?.split(" - ") || [];
    const fullDateTimeStr = `${dateStr} ${startTime}`;
    return dayjs(fullDateTimeStr, "MMM D, YYYY hh:mm A");
  };

  const handleRescheduleClick = (order) => {
    setSelectedOrder(order);
    setNewDate(order.eventDate);
    setNewTime(order.eventTime);
    setShowDateModal(true);
    setError("");
    setIsCancelling(false);
  };

  const handleDateConfirm = () => {
    const originalDate = selectedOrder?.eventDate;
    const originalTime = selectedOrder?.eventTime;

    if (!newDate && newTime) {
      alert("Please select a date if you are changing the time.");
      return;
    }

    if (newDate === originalDate && newTime === originalTime) {
      alert("No changes detected. Please select a new date or time.");
      return;
    }

    setShowDateModal(false);
    setShowReasonModal(true);
    setIsCancelling(false);
  };

  return (
    <div className="h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5 scrollbar-hide ">
      <div className="lg:w-[60%]">
        <h1 className="font-bold poppins lg:my-6">Upcoming Bookings</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {upcomingOrders.length === 0 ? (
          <p className="text-gray-500">No upcoming bookings found.</p>
        ) : (
          upcomingOrders.map((order, index) => {
            const mainService =
              order.items.find(
                (item) => item.categoryType.toLowerCase() === "service"
              ) || order.items[0];

            const serviceName = mainService?.serviceName || "No Service Name";
            const serviceImage = mainService?.image
              ? `${mainService.image}`
              : "";

            const isRescheduled = !!order.rescheduledEventDate;
            const displayDate = isRescheduled
              ? order.rescheduledEventDate
              : order.eventDate;
            const displayTime = order.rescheduledEventSlot || order.eventTime;
            const packageAmount = mainService?.price;

            // Calculate difference in hours from now to event start
            const eventStart = parseEventStartDateTime(
              order.eventDate,
              order.eventTime
            );
            const now = dayjs();
            const hoursLeft = eventStart.diff(now, "hour");

            const canReschedule =
              hoursLeft >= 24 &&
              !isRescheduled &&
              order.orderStatus === "created";
            const canCancel =
              hoursLeft >= 24 &&
              (order.orderStatus === "created" ||
                order.orderStatus === "rescheduled");

            return (
              <div
                key={order._id}
                className="border border-gray-300 lg:p-4 p-2 rounded my-4 cursor-pointer"
              >
                <div className="flex lg:gap-4 gap-2 lg:items-center">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={serviceImage}
                    alt="Service"
                    className="w-24 h-28 rounded-2xl object-cover"
                  />
                  <div className="space-y-1">
                    <p className="font-normal poppins">{serviceName}</p>

                    {isRescheduled && order.orderStatus === "rescheduled" && (
                      <p className=" text-purple-600 font-medium">
                        Rescheduled
                      </p>
                    )}

                    {order.orderStatus === "cancelled" && (
                      <p className=" text-red-600 font-medium">Cancelled</p>
                    )}

                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <HiOutlineCalendarDateRange />
                      {displayDate || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <IoMdTime />
                      {displayTime || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <CiMoneyCheck1 />
                      Package Amount: ₹{packageAmount || "N/A"}
                    </p>

                    {/* <div className="flex gap-2">
                      {canReschedule && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRescheduleClick(order);
                          }}
                          className="mt-2 px-4 py-1 text-sm bg-purple-800 text-white rounded hover:bg-purple-600"
                        >
                          Reschedule
                        </button>
                      )}
                      {canCancel && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                            setIsCancelling(true);
                            setShowReasonModal(true);
                          }}
                          className="mt-2 px-4 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      )}
                    </div> */}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(order._id);
                        }}
                        className="mt-2 px-4 py-1 text-sm bg-purple-800 text-white rounded hover:bg-purple-600"
                      >
                        Order Details
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Use the first item's refId as the service id
                          const serviceId = order.items[0]?.refId;
                          if (serviceId) {
                            navigate(`/service/details/${serviceId}`);
                          } else {
                            alert("Service not found in this order.");
                          }
                        }}
                        className="mt-2 px-4 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Re-order
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0">
                  <h1 className="font-medium text-md text-gray-800">
                    Total: Rs. {order?.grandTotal || "N/A"}
                  </h1>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showDateModal && (
        <RescheduleDateModal
          timeSlots={
            selectedOrder?.items.find(
              (item) => item.categoryType?.toLowerCase() === "service"
            )?.price > 4000
              ? timeSlotsPremium
              : timeSlotsBasic
          }
          setShowModal={setShowDateModal}
          selectedOrder={selectedOrder}
          newDate={newDate}
          setNewDate={setNewDate}
          newTime={newTime}
          setNewTime={setNewTime}
          onContinue={handleDateConfirm}
        />
      )}

      {/* Reason Modal (Cancel / Reschedule) */}
      {showReasonModal && (
        <ReasonModal
          setShowModal={setShowReasonModal}
          selectedOrder={selectedOrder}
          newDate={newDate}
          newTime={newTime}
          fetchUpcomingOrders={fetchUpcomingOrders}
          isCancelling={isCancelling}
        />
      )}
    </div>
  );
};

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate alternateMobile: digits only, max 10 digits
    if (name === "alternateMobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    // Validate pincode: digits only, exactly 6 digits max
    if (name === "pincode") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 6) return;
    }

    // Validate names: letters only
    if (
      (name === "firstName" || name === "lastName") &&
      !/^[a-zA-Z]*$/.test(value)
    ) {
      return;
    }

    dispatch(setProfile({ [name]: value }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await getAxios().get("/admin/users/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      dispatch(
        setProfile({
          firstName,
          lastName,
          mobile,
          alternateMobile,
          addressLine1,
          addressLine2,
          city,
          // state,
          pincode,
          // landmark,
        })
      );
    };
    fetchProfile();
  }, [dispatch]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await getAuthAxios().put(
        "/admin/users/user/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        navigate("/");
      } else {
        setError(response.data.message || "Error updating profile");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold poppins lg:my-6 my-2">Profile Details</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-2">
          <label>
            <p>First Name</p>
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
            <p>Last Name</p>
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
            <p>Mobile Number</p>
            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
              disabled
            />
          </label>
          <label>
            <p>Alternate Number</p>
            <input
              type="text"
              name="alternateMobile"
              value={profile.alternateMobile}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>
        </div>

        <h1 className="font-bold poppins my-6">Address Details</h1>
        <div className="grid grid-cols-2">
          <label>
            <p>Address Line 1</p>
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
              required
            />
          </label>
          <label>
            <p>City</p>
            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>
          {/* <label>
                        <p>State</p>
                        <input
                            type="text"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                        />
                    </label> */}
          <label>
            <p>Pincode</p>
            <input
              type="text"
              name="pincode"
              value={profile.pincode}
              onChange={handleChange}
              className="border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]"
              required
            />
          </label>
          {/* <label>
                        <p>Landmark (Optional)</p>
                        <input
                            type="text"
                            name="landmark"
                            value={profile.landmark}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                        />
                    </label> */}
        </div>
        <input
          type="submit"
          value="Save"
          className="bg-[#AA6300] text-white px-4 py-2 rounded mt-5"
        />
      </form>
    </div>
  );
};

const sideBarlinks = [
  {
    icon: <FaUserLarge />,
    title: "Profile",
    link: "/profile",
    component: <ProfileForm />,
  },
  {
    icon: <IoTicketSharp />,
    title: "Upcoming Bookings",
    link: "/upcomingbookings",
    component: <UpcomingBookings />,
  },
  {
    icon: <FaHistory />,
    title: "Past Bookings",
    link: "/pastbookings",
    component: <PastBookings />,
  },
  // { icon: <FaHistory />, title: "Raise Ticket", link: "/raiseticket", component: <RaiseTicket /> },
];

const Profile = () => {
  const [currentRoute, setCurrentRoute] = useState("/profile");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Detect if mobile screen

  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Effect to update the screen size on window resize
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     // Get the access token from localStorage or wherever it is stored
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       alert("You are not logged in.");
  //       return;
  //     }

  //     // Send logout request to backend
  //     const response = await getAuthAxios().post("/auth/logout");

  //     // Check if logout was successful
  //     if (response.status === 200) {
  //       localStorage.clear();
  //       dispatch(resetProfile());
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     // console.error("Logout failed:", error);
  //     alert("Logout failed. Please try again.");
  //   }
  // };

  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (!confirmLogout) return; // User cancelled

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await getAxios().post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(logout());
        dispatch(reset());
        dispatch(resetProfile());
        navigate("/login");
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex lg:mt-24 mt-32 lg:px-4 overflow-y-hidden h-[86vh]">
      <div
        className={`lg:w-[25%] border  bg-white mr-4 border-gray-300 lg:rounded-xl rounded-e-lg p-4 pt-6 lg:shadow-md fixed h-[86vh] ${
          isMobile ? "hidden" : "block"
        }`}
      >
        <div className="text-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
            className="w-20 h-20 mx-auto rounded-full shadow-md"
            alt="User"
          />
          <p className="text-2xl py-3 font-medium">
            {profile.firstName} {profile.lastName}
          </p>
        </div>
        <div className="mt-5">
          <ul className="flex flex-col gap-4 px-5">
            {sideBarlinks.map((item, index) => (
              <li
                key={index}
                className={`flex gap-4 items-center text-lg cursor-pointer ${
                  currentRoute === item.link ? "text-primary font-semibold" : ""
                }`}
                onClick={() => setCurrentRoute(item.link)}
              >
                {item.icon}
                {item.title}
              </li>
            ))}
            <li
              className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium"
              onClick={handleLogout}
            >
              <BiLogOut />
              Logout
            </li>
          </ul>
        </div>
      </div>
      {/* Sidebar for mobile */}
      {isMobile && showSidebar && (
        <AnimatePresence>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className={`lg:w-[25%] border bg-white mr-4 border-gray-300 lg:rounded-xl rounded-e-lg p-4 pt-6 lg:shadow-md fixed h-[86vh] `}
          >
            <button
              onClick={() => setShowSidebar(false)}
              className="absolute top-2 right-3 text-black text-lg"
            >
              <IoMdClose size={20} />
            </button>

            <div className="text-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
                className="w-20 h-20 mx-auto rounded-full shadow-md"
                alt="User"
              />
              <p className="text-2xl py-3 font-medium">
                {profile.firstName} {profile.lastName}
              </p>
            </div>
            <div className="mt-5">
              <ul className="flex flex-col gap-4 px-5">
                {sideBarlinks.map((item, index) => (
                  <li
                    key={index}
                    className={`flex gap-4 items-center text-lg cursor-pointer ${
                      currentRoute === item.link
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      setCurrentRoute(item.link);
                      setShowSidebar(false);
                    }}
                  >
                    {item.icon}
                    {item.title}
                  </li>
                ))}
                <li
                  className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium"
                  onClick={handleLogout}
                >
                  <BiLogOut />
                  Logout
                </li>
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* Hamburger menu for mobile view */}
      {isMobile && !showSidebar && (
        <div className="lg:hidden fixed top-[134px] left-0 z-20 w-[15%] h-[86vh] bg-white border border-gray-300 lg:rounded-xl rounded-e-xl p-4 shadow-md">
          <TfiAlignLeft
            size={25}
            className="text-blue-800 mx-auto "
            onClick={() => setShowSidebar(true)}
          />
          <ul className="flex flex-col gap-10 pt-5">
            {sideBarlinks.map((item, index) => (
              <li
                key={index}
                className={`flex gap-4 items-center cursor-pointer text-2xl ${
                  currentRoute === item.link ? "text-primary font-semibold" : ""
                }`}
                onClick={() => setCurrentRoute(item.link)}
              >
                {item.icon}
                {/* {item.title} */}
              </li>
            ))}
            <li
              className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium"
              onClick={handleLogout}
            >
              <BiLogOut />
              {/* Logout */}
            </li>
          </ul>
        </div>
      )}

      {/* Right Content - Takes Remaining Width & Scrollable */}
      <div
        className={`w-full border border-gray-300 rounded-xl shadow-md lg:ml-[27%] ml-[16%] m-2 lg:m-0`}
      >
        {sideBarlinks.find((item) => item.link === currentRoute)?.component}
      </div>
    </div>
  );
};

export default Profile;
