import React, { useState, useEffect } from "react";
import ProductSlideCarousel from "./ProductSlideCarousel";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  setSelectedTimeSlot,
  setEventDate,
  addServiceItem,
  setPincode,
  setIsPincodeValid,
  setDeliveryMessage,
  setDeliveryCharges,
  setBalloonsColor,
  recalculateTotals,
} from "../features/orderdetails/orderSlice";
import { Helmet } from "react-helmet-async";

import { GrLocation } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import ServiceDetailsShimmer from "./ServiceDetailsShimmer";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import support from "../assets/support.png";
import phone from "../assets/phone.png";
import whatsapp from "../assets/whatsapp.png";

import TimeSlotsModel from "./TimeSlotsModel";
import RecommenedAddon from "./RecommenedAddon";
import { GoHeartFill, GoHeart } from "react-icons/go";
import ExpandableContent from "./ExpandableContent";

import FAQ from "./FAQ";
import RecommenedAddonSlider from "./RecommenedAddonSlider";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TbCurrencyRupee } from "react-icons/tb";
import { LuHandHeart } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";

import MultiSelect from "./MultiSelect";
import ServiceBottomButtons from "./ServiceBottomButtons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Review from "./Review";
import CardCarousel from "./CardCarousel";
import { getAuthAxios, getAxios } from "../utils/api";
import DynamicFaqs from "./DynamicFaqs";
import Breadcrumb from "./Breadcrumb";

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

// Pincode lists for delivery charge calculation
const zerocharges_pin_bangalore = [
  ...new Set([
    "560001",
    "560002",
    "560003",
    "560004",
    "560005",
    "560006",
    "560007",
    "560008",
    "560009",
    "560010",
    "560011",
    "560012",
    "560013",
    "560014",
    "560015",
    "560016",
    "560017",
    "560018",
    "560019",
    "560020",
    "560021",
    "560022",
    "560023",
    "560024",
    "560025",
    "560026",
    "560027",
    "560028",
    "560029",
    "560030",
    "560031",
    "560032",
    "560033",
    "560034",
    "560035",
    "560036",
    "560037",
    "560038",
    "560039",
    "560040",
    "560041",
    "560042",
    "560043",
    "560044",
    "560045",
    "560046",
    "560047",
    "560048",
    "560049",
    "560050",
    "560051",
    "560052",
    "560053",
    "560054",
    "560055",
    "560056",
    "560057",
    "560058",
    "560059",
    "560060",
    "560061",
    "560062",
    "560063",
    "560064",
    "560065",
    "560066",
    "560067",
    "560068",
    "560069",
    "560070",
    "560071",
    "560072",
    "560073",
    "560074",
    "560075",
    "560076",
    "560077",
    "560078",
    "560079",
    "560080",
    "560081",
    "560082",
    "560083",
    "560084",
    "560085",
    "560086",
    "560087",
    "560088",
    "560089",
    "560090",
    "560091",
    "560092",
    "560093",
    "560094",
    "560095",
    "560096",
    "560097",
    "560098",
    "560099",
    "560100",
    "560101",
    "560102",
    "560103",
    "560104",
    "560106",
    "560107",
    "560108",
    "560109",
    "560110",
    "560111",
    "560113",
    "560114",
    "560116",
    "560117",
    "562125",
    "560105",
  ]),
];

const notAvailablePincodes = ["562107", "562110", "561203", "561205", "562109"];
const specialPincodes = ["562125", "560099", "560105", "560067"];

const deliveryDetails = [
  "You will need to provide a stool to reach the ceiling.",
  "In case of a complaint, notice must be given within 2 hours of the delivery time of the experience.",
  "No rescheduling or cancellation is possible after the decoration has been attempted.",
  "The LavishEventzz team will not clean the party place after the completion of the decoration.",
  "Kindly ensure that the balance payment is settled after the completion of the decoration, as the decorator will not wait until the party starts. Your prompt payment is appreciated and helps us ensure a seamless experience for your event.",
  "The balloons will be hung using tape, as we don't use helium due to its asphyxiation properties.",
  "Remove the tape immediately after the event is over.",
  "A consistent power supply is essential for timely service completion, and LavishEventzz is not responsible for delays caused by power interruptions.",
  "The decorator will not wait more than 30 minutes. After waiting, charges will apply.",
  "If the decoration is in an open place, please inform us early so we can check if it's possible.",
  "We regret to inform you that NEFT, RTGS, and cheques cannot be accepted as payment on the day of the event. Only immediate payment methods such as cash, PhonePe, and Google Pay are accepted.",
  "LavishEventzz will not be responsible for delays in service delivery caused by natural calamities like rain, heavy wind, etc. However, we try our best to deliver on time.",
  "We use tape on walls to do decorations.",
];

const careInstructions = [
  "Avoid Direct Sunlight: Keep the balloons away from direct sunlight or excessive heat, as it may prevent the theme from popping or cause deflation.",
  "Indoor Placement Preferred: For long-lasting decoration, place the balloons indoors in a cool and dry environment.",
  "Children Care: Balloons can be a choking hazard. Keep an eye on kids around the decoration.",
  "Please Check Decoration Place Climate (Outdoor): Before starting the decoration, check the climate of the decoration area (if outdoors).",
];

const ServiceDetails = () => {
  const { serviceId } = useParams(); // Get the serviceId from URL params
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [recentPurchaseServiceDetails, setRecentPurchaseServiceDetails] =
    useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const previousUrl = location.state?.from;
  const previousPagetitle = location.state?.title;

  // Get data from redux
  const selectedTimeSlot = useSelector((state) => state.order.selectedTimeSlot);
  const isPincodeValid = useSelector((state) => state.order.isPincodeValid);
  const deliveryMessage = useSelector((state) => state.order.deliveryMessage);
  const { deliveryCharges } = useSelector((state) => state.order.currentOrder);
  const addonTotal = useSelector((state) =>
    state.order.currentOrder.items
      ?.filter((item) => item.categoryType === "addon")
      .reduce((sum, item) => sum + (item.price || 0), 0)
  );
  const limit = 6;
  const page = 1;

  // Local state variables
  const [pincode, setPincodeLocal] = useState("");
  const [deliveryCharge, setDeliveryChargeLocal] = useState(0);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showAddonsModal, setShowAddonsModal] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [togglelike, setToggleLike] = useState(false);
  const [currentDetailsTab, setCurrentDetailsTab] = useState("Inclusion");

  const [selectedDate, setSelectedDate] = useState(null);
  const [addonsData, setAddonsData] = useState([]);
  const [hasAddons, setHasAddons] = useState(false);
  const [loadingAddons, setLoadingAddons] = useState(true);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [seoMeta, setSeoMeta] = useState(null);

  const selectedOptions = useSelector(
    (state) => state.order.currentOrder.balloonsColor
  );

  const reduxOrderState = useSelector((state) => state.order);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const authAxios = getAuthAxios();

  useEffect(() => {
    console.log("Redux Order State:", reduxOrderState);
  }, [reduxOrderState]);

  const fetchRecentPurchase = async () => {
    try {
      const response = await getAxios().get(
        `/orders/recent-orders/${customerId}`
      );
      const data = await response.data;
      setRecentPurchase(data.services);
    } catch (error) {
      console.error("Error fetching recent purchase:", error);
    }
  };

  useEffect(() => {
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setRecentPurchaseServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // ✅ Pick ID in priority order
        const id =
          serviceDetails?.themeId?._id ||
          serviceDetails?.subSubCategoryId?._id ||
          serviceDetails?.subCategoryId?._id;

        if (!id) {
          console.error("No valid ID found in service object");
          return;
        }

        const res = await getAxios().get(`/services/similar-services/${id}`, {
          params: {
            limit,
            page,
          },
        });
        console.log("Service Details", res.data.data);
        const filter = res.data.data.filter((item) => {
          return item._id !== serviceId;
        });
        console.log("filtered ", res.data.data);
        setRecommendedServices(res.data.data);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [serviceDetails, limit, page]);

  // Attempt to fetch service details
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        const response = await getAxios().get(`/services/${serviceId}`);
        const details = response.data.data;
        setServiceDetails(details);
        console.log("Service Details:", details);

        // ✅ Step 1: Save the service in the order
        if (details) {
          dispatch(
            addServiceItem({
              serviceName: details.serviceName,
              price: details.offerPrice,
              originalPrice: details.originalPrice,
              image: details.images[0] || "",
              id: details._id,
              customizedInputs: details.customizedInputs,
            })
          );

          // ✅ Step 2: Save the default balloon colors to Redux
          if (
            Array.isArray(details.balloonColors) &&
            details.balloonColors.length > 0
          ) {
            dispatch(setBalloonsColor(details.balloonColors));
          }

          // ✅ Trigger subtotal + GST calculation after item is added
          dispatch(recalculateTotals());

          setSeoMeta({
            title: details.metaTitle,
            description: details.metaDescription,
            keywords: details.keywords,
            faqs: details.faqs,
            createdAt: details.createdAt,
          });
        }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to fetch service details");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchServiceDetails();
    }
  }, [serviceId, dispatch]);

  console.log("seo", seoMeta);

  // Fetch addons for this service
  useEffect(() => {
    const fetchAddons = async () => {
      if (!serviceDetails?.subCategoryId?._id) return;

      try {
        setLoadingAddons(true);
        const response = await getAxios().get(
          `/addons/subcategory/${serviceDetails.subCategoryId._id}`
        );
        const result = response.data?.data.addons;

        if (Array.isArray(result) && result.length > 0) {
          setAddonsData(result);
          // console.log("Addons Data:", result);
          setHasAddons(true);
        } else {
          setAddonsData([]);
          setHasAddons(false);
        }
      } catch (error) {
        console.error("Error fetching addons:", error.response.data.message);
        setAddonsData([]);
        setHasAddons(false);
      } finally {
        setLoadingAddons(false);
      }
    };

    fetchAddons();
  }, [serviceDetails]);

  // Handle pincode validation
  useEffect(() => {
    if (pincode.length === 6 && (serviceDetails?.offerPrice || 4999)) {
      const deliveryInfo = getDeliveryCharge(
        pincode,
        serviceDetails?.offerPrice || 4999
      );
      dispatch(setDeliveryMessage(deliveryInfo.message));
      dispatch(setIsPincodeValid(deliveryInfo.isValid));
      setDeliveryChargeLocal(deliveryInfo.price);
      dispatch(setDeliveryCharges(deliveryInfo.price));
      dispatch(setPincode(pincode));
    } else {
      dispatch(setDeliveryMessage(""));
      dispatch(setIsPincodeValid(false));
      setDeliveryChargeLocal(0);
      dispatch(setDeliveryCharges(0));
    }
  }, [pincode, serviceDetails, dispatch]);

  // For handling scrolling when modals are open
  useEffect(() => {
    if (showTimeSlots || showAddonsModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showTimeSlots, showAddonsModal]);

  // Get delivery charge based on pincode
  const getDeliveryCharge = (pincode, price) => {
    // 1. Blocked pincodes
    if (notAvailablePincodes.includes(pincode)) {
      return {
        message: "Service not available for this pincode",
        price: 0,
        isValid: false,
      };
    }

    // 2. Special pincodes with tiered charges
    if (specialPincodes.includes(pincode)) {
      if (price <= 4000) {
        return {
          message: "For this service ₹500 delivery charges applicable",
          price: 500,
          isValid: true,
        };
      } else {
        return {
          message: "For this service ₹1500 delivery charges applicable",
          price: 1500,
          isValid: true,
        };
      }
    }

    // 3. Free delivery pincodes
    if (zerocharges_pin_bangalore.includes(pincode)) {
      return {
        message: "₹0 delivery charges for this pincode",
        price: 0,
        isValid: true,
      };
    }

    // 4. Unknown/invalid pincode
    return {
      message: "Invalid Pincode",
      price: 0,
      isValid: false,
    };
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch(setEventDate(date));
    setOpenCalendar(false);
    setTimeout(() => {
      setShowTimeSlots(true);
    }, 300);
  };

  const handleDivClick = () => {
    if (!isPincodeValid) {
      alert("Please enter a valid pincode first");
      return;
    }
    if (!selectedOptions || selectedOptions.length === 0) {
      alert("Please select balloons color before selecting date");
      return;
    }

    setOpenCalendar(!openCalendar);
  };

  // For WhatsApp contact
  const city = "Bangalore";
  const price = serviceDetails?.offerPrice;
  const serviceName = serviceDetails?.serviceName;
  const currentPageUrl = window.location.href;
  const message = `URL: ${currentPageUrl}\nService: ${serviceName}\nCity: ${city},\nPrice: ${price}\nCan I get more details?`;
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("₹", "Rs. ");
  };

  // Add this useEffect to check wishlist status
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!customerId || !serviceId) return;

      try {
        const response = await getAxios().get(`/wishlist/${customerId}`);
        const wishlistItems = response.data.wishlist;
        const isServiceInWishlist = wishlistItems.some(
          (item) => item.serviceId._id === serviceId
        );
        setIsInWishlist(isServiceInWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [customerId, serviceId]);

  // Add this function to handle wishlist operations
  const handleWishlist = async () => {
    if (!customerId) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setIsWishlistLoading(true);
    const loadingToast = toast.loading(
      isInWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
    );

    try {
      if (isInWishlist) {
        // Remove from wishlist
        console.log("Removing from wishlist:", { customerId, serviceId });
        await authAxios.delete(
          `/wishlist/remove-item/${customerId}/${serviceId}`
        );
        setIsInWishlist(false);
        toast.success("Item removed from wishlist", { id: loadingToast });
      } else {
        // Add to wishlist
        console.log("Adding to wishlist:", {
          serviceId,
          serviceName: serviceDetails?.serviceName,
          customerId,
        });
        await authAxios.post(`/wishlist/create/`, {
          serviceId: serviceId,
          serviceName: serviceDetails?.serviceName,
          customerId,
          servicePrice:
            serviceDetails?.offerPrice || serviceDetails?.price || 0,
          serviceImages: serviceDetails?.images || [],
        });
        setIsInWishlist(true);
        toast.success("Item added to wishlist", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error(error.response?.data?.message || "Error updating wishlist", {
        id: loadingToast,
      });
    } finally {
      setIsWishlistLoading(false);
    }
  };

  // Calculate extra charge for special time slots
  let extraSlotCharge = 0;
  let extraSlotLabel = "";
  if (serviceDetails && selectedTimeSlot) {
    if (selectedTimeSlot === "09:00 PM - 12:00 PM (15%)") {
      extraSlotCharge = Math.round((serviceDetails.offerPrice || 0) * 0.15);
      extraSlotLabel = "Night Slot Extra (15%)";
    } else if (selectedTimeSlot === "08:00 AM - 12:00 PM (10%)") {
      extraSlotCharge = Math.round((serviceDetails.offerPrice || 0) * 0.1);
      extraSlotLabel = "Morning Slot Extra (10%)";
    }
  }

  const subcat = serviceDetails?.subCategoryId;
  const subSubCat = serviceDetails?.subSubCategoryId;
  const themeCat = serviceDetails?.themeId;

  const subCategoryUrlMap = {
    "681b10abddb6b3f4663e78d1": "/groomtobedecor/681b10abddb6b3f4663e78d1",
    "681b10a5ddb6b3f4663e78cc": "/bridetobedecor/681b10a5ddb6b3f4663e78cc",
    "681b1095ddb6b3f4663e78c2": "/ringceremonydecor/681b1095ddb6b3f4663e78c2",
    "681b1109ddb6b3f4663e78e5": "/anniversarydecor/681b1109ddb6b3f4663e78e5",
    "681b1136ddb6b3f4663e78f4": "/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4",
    "681b113eddb6b3f4663e78f9": "/birthdaydecoration/681b113eddb6b3f4663e78f9",
    "681b1146ddb6b3f4663e78fe": "/babyshowerdecor/681b1146ddb6b3f4663e78fe",
    "681b1240ddb6b3f4663e794c": "/welcomebabydecor/681b1240ddb6b3f4663e794c",
    "681b1255ddb6b3f4663e7956": "/photography-service/681b1255ddb6b3f4663e7956",
    "681b124bddb6b3f4663e7951": "/namingceremonydecor/681b124bddb6b3f4663e7951",
    "681b1238ddb6b3f4663e7947": "/entertainmentdecor/681b1238ddb6b3f4663e7947",
  };

  const breadcrumbPaths = [{ name: "Home", link: "/" }];

  if (subcat) {
    const subCatId = subcat._id;
    const subCatSlug = subcat.subCategory.toLowerCase().replace(/\s+/g, "-");
    breadcrumbPaths.push({
      name: subcat.subCategory,
      link: subCategoryUrlMap[subCatId] || `/service/${subCatSlug}/${subCatId}`,
    });
  }
  if (subSubCat) {
    const subCatId = subcat._id;
    const subCatSlug = subcat.subCategory.toLowerCase().replace(/\s+/g, "-");
    breadcrumbPaths.push({
      name: subSubCat.subSubCategory,
      link: subCategoryUrlMap[subCatId] || `/service/${subCatSlug}/${subCatId}`,
    });
  }

  if (themeCat) {
    const subCatSlug = subcat.subCategory.toLowerCase().replace(/\s+/g, "-");
    breadcrumbPaths.push({
      name: themeCat.theme,
      link: `/service/${subCatSlug}/${themeCat._id}`,
    });
  }

  if (serviceDetails?.serviceName) {
    breadcrumbPaths.push({
      name: serviceDetails?.serviceName,
      link: `/service/details/${serviceDetails.serviceName
        .toLowerCase()
        .replace(/\s+/g, "-")}/${serviceDetails._id}`,
    });
  }

  return (
    <>
      {/* SEO Metadata using Helmet */}
      {seoMeta && (
        <Helmet>
          {/* Basic SEO */}
          <title>
            {seoMeta?.title ||
              `${serviceDetails?.serviceName} | Lavish Eventzz`}
          </title>
          <meta
            name="description"
            content={
              seoMeta?.description ||
              `Explore ${serviceDetails?.serviceName} services designed to make your events unforgettable. Add elegance, creativity, and style to every celebration. Book Now!`
            }
          />
          <meta
            name="keywords"
            content={seoMeta?.keywords || serviceDetails?.serviceName}
          />
          <link rel="canonical" href={window.location.href} />

          {/* ✅ Open Graph Meta Tags */}
          <meta property="og:type" content="product" />
          <meta
            property="og:title"
            content={seoMeta?.title || serviceDetails?.serviceName}
          />
          <meta
            property="og:description"
            content={seoMeta?.description || serviceDetails?.metaDescription}
          />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:site_name" content="Lavish Eventzz" />
          <meta
            property="og:image"
            content={
              serviceDetails?.images?.[0] ||
              "https://www.lavisheventzz.com/default-image.jpg"
            }
          />
          <meta
            property="og:image:alt"
            content={
              serviceDetails?.serviceName
                ? `${serviceDetails.serviceName} - Lavish Eventzz`
                : "Service Image"
            }
          />
          <meta property="og:locale" content="en_IN" />

          {/* ✅ Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={seoMeta?.title || serviceDetails?.serviceName}
          />
          <meta
            name="twitter:description"
            content={seoMeta?.description || serviceDetails?.metaDescription}
          />
          <meta
            name="twitter:image"
            content={
              serviceDetails?.images?.[0] ||
              "https://www.lavisheventzz.com/default-image.jpg"
            }
          />
          <meta
            name="twitter:image:alt"
            content={
              serviceDetails?.serviceName
                ? `${serviceDetails.serviceName} - Lavish Eventzz`
                : "Service Image"
            }
          />
          <meta name="twitter:site" content="@lavisheventzz" />

          {/* ✅ FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: seoMeta?.faqs?.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
              dateCreated: new Date(
                seoMeta?.createdAt || new Date()
              ).toISOString(),
            })}
          </script>

          {/* ✅ Product Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: seoMeta?.title || serviceDetails?.serviceName,
              image:
                serviceDetails?.images?.[0] ||
                "https://www.lavisheventzz.com/default-image.jpg",
              description:
                seoMeta?.description || serviceDetails?.metaDescription || "",
              brand: {
                "@type": "Brand",
                name: "Lavish Eventzz",
              },
              sku: serviceId,
              category:
                serviceDetails?.subCategoryId?.subCategory || "Decoration",
              offers: {
                "@type": "Offer",
                url: window.location.href,
                priceCurrency: "INR",
                price: serviceDetails?.offerPrice || 0,
                priceValidUntil: "2026-12-31",
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
                seller: {
                  "@type": "Organization",
                  name: "Lavish Eventzz",
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "56",
              },
            })}
          </script>

          {/* ✅ Dynamic Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbPaths.map((path, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: path.name,
                item: `https://www.lavisheventzz.com${path.link}`,
              })),
            })}
          </script>
        </Helmet>
      )}

      {console.log("serviceDetails", serviceDetails)}

      <div className="lg:py-28 lg:px-10 p-4 pt-32 mx-auto">
        {loading ? (
          <ServiceDetailsShimmer />
        ) : error ? (
          <div className="text-center pt-10 text-red-500">{error}</div>
        ) : (
          <>
            <Breadcrumb paths={breadcrumbPaths} />
            <ServiceBottomButtons
              serviceName={serviceDetails?.serviceName}
              price={serviceDetails?.offerPrice}
              city="Bangalore"
            />

            <div className="relative grid md:grid-cols-2 grid-cols-1 lg:gap-10 gap-4">
              <div>
                <ProductSlideCarousel images={serviceDetails?.images} />
                <div className="rounded-md border border-gray-300 lg:my-20 p-4">
                  <div>
                    <h5 className="font-semibold py-3">Required</h5>
                    <p>
                      <div
                        className=" text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: serviceDetails?.requiredDetails,
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="md:relative mt-5 lg:mt-0">
                  <div
                    className="absolute lg:top-0 md:-top-8 top-5 md:right-0 right-1 rounded-full border border-gray-300 bg-white p-2 text-black text-2xl cursor-pointer"
                    onClick={handleWishlist}
                    style={{
                      pointerEvents: isWishlistLoading ? "none" : "auto",
                    }}
                  >
                    {isInWishlist ? (
                      <GoHeartFill className="text-red-600" />
                    ) : (
                      <GoHeart className="text-gray-600" />
                    )}
                  </div>
                  <div id="booking">
                    <h1 className="text-3xl font-bold max-w-lg">
                      {serviceDetails?.serviceName || "N/A"}
                    </h1>
                    <div>
                      <div className="flex gap-3 items-center py-2">
                        <p className="poppins text-2xl text-primary font-bold flex items-center">
                          <MdOutlineCurrencyRupee />{" "}
                          {serviceDetails?.offerPrice || "N/A"}
                        </p>
                        <p className="poppins text-gray-500 font-medium flex items-center line-through">
                          <MdOutlineCurrencyRupee />{" "}
                          {serviceDetails?.originalPrice || "N/A"}
                        </p>
                        <p className="py-1 px-2 text-xs bg-green-600 text-white rounded-3xl">
                          {Math.round(
                            (((serviceDetails?.originalPrice || "N/A") -
                              (serviceDetails?.offerPrice || "N/A")) /
                              (serviceDetails?.originalPrice || "N/A")) *
                              100
                          )}
                          % OFF
                        </p>
                      </div>
                      <p className="text-gray-500 p-1">
                        Inclusive of all charges
                      </p>
                    </div>
                    <div className="rounded-md border border-gray-300 p-4 mt-3">
                      <div className="flex justify-between flex-col gap-2">
                        <div className="flex gap-2 items-center px-3 py-2 rounded-md border border-gray-300">
                          <GrLocation size={20} />
                          <input
                            placeholder="Enter Pincode"
                            className="outline-none"
                            value={pincode}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only digits and limit to 6 characters
                              if (/^\d{0,6}$/.test(value)) {
                                setPincodeLocal(value);
                              }
                            }}
                            maxLength={6}
                          />
                        </div>
                        <small>Don't know PINCODE?</small>
                        {deliveryMessage && (
                          <p
                            className={`${
                              deliveryMessage ===
                                "Service not available for this pincode" ||
                              deliveryMessage === "Invalid Pincode"
                                ? "text-red-500"
                                : "text-green-500"
                            } font-medium`}
                          >
                            {deliveryMessage}
                          </p>
                        )}

                        <MultiSelect
                          disabled={!isPincodeValid}
                          defaulyballoonsColors={serviceDetails.balloonColors}
                          onSelectionChange={(colors) =>
                            dispatch(setBalloonsColor(colors))
                          }
                        />
                        <div className="relative">
                          <div
                            onClick={handleDivClick}
                            className={`flex items-center justify-between border border-gray-300 p-2 px-4 ${
                              isPincodeValid
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-60"
                            } rounded-md`}
                          >
                            <p
                              className={`${
                                selectedDate ? "text-black" : "text-gray-400"
                              }`}
                            >
                              {selectedDate
                                ? selectedDate
                                    .toLocaleDateString("en-GB")
                                    .replace(/\//g, "-")
                                : "Select Date"}
                            </p>
                            <SlCalender />
                          </div>
                          {openCalendar && isPincodeValid && (
                            <div className="absolute top-10 left-4 z-50">
                              <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                minDate={new Date()}
                                className="w-[300px] outline-none text-xl"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-8 mb-2 flex gap-2 justify-between items-center text-gray-600">
                        <p>Delivery Charges</p>
                        <p>{formatCurrency(deliveryCharge)}</p>
                      </div>
                      <div className="flex justify-end items-end flex-col">
                        <p>Total Price</p>
                        <p className="font-bold">
                          {formatCurrency(
                            (serviceDetails?.offerPrice || 0) +
                              addonTotal +
                              (deliveryCharges || 0) +
                              extraSlotCharge
                          )}
                        </p>
                        {extraSlotCharge > 0 && (
                          <div className="text-sm text-orange-600 mt-1">
                            <p>
                              + {extraSlotLabel}:{" "}
                              {formatCurrency(extraSlotCharge)}
                            </p>
                          </div>
                        )}
                        {deliveryCharges > 0 && (
                          <div className="text-sm text-gray-500 mt-1">
                            <p>(Including delivery Chareges)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 justify-between items-center py-10 border rounded-lg border-gray-400 bg-gradient-to-t from-purple-400 to-white">
                    <div className="text-lg">
                      <div className="mx-auto border-2 border-primary w-12 h-12 place-items-center place-content-center rounded-full">
                        <TbCurrencyRupee className="text-primary" size={30} />
                      </div>
                      <p className="text-center pt-3">No Hidden Charges</p>
                    </div>
                    <div className="text-lg">
                      <div className="mx-auto border-2 border-primary w-12 h-12 place-items-center place-content-center rounded-full">
                        <LuHandHeart className="text-primary" size={30} />
                      </div>
                      <p className="text-center pt-3">10k+ Trusted Clients</p>
                    </div>
                    <div className="text-lg">
                      <div className="mx-auto border-2 border-primary w-12 h-12 place-items-center place-content-center rounded-full">
                        <GoShieldCheck className="text-primary" size={30} />
                      </div>
                      <p className="text-center pt-3">100% Secure Payments</p>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-300 p-4 mt-4">
                    <div className="flex justify-between">
                      {[
                        "Inclusion",
                        "FAQs",
                        "Delivery details",
                        "Care Info",
                      ].map((item) => (
                        <p
                          key={item}
                          onClick={() => setCurrentDetailsTab(item)}
                          className={`${
                            currentDetailsTab === item
                              ? "text-primary border-b-2 border-primary"
                              : "text-black"
                          } cursor-pointer font-bold`}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                    <div className="mt-2 max-h-56 overflow-y-scroll scrollbar-thin">
                      {currentDetailsTab === "Inclusion" && (
                        <div
                          className="mt-2"
                          dangerouslySetInnerHTML={{
                            __html: serviceDetails?.packageDetails,
                          }}
                        />
                      )}
                    </div>
                    <div className="mt-2 max-h-56 overflow-y-scroll scrollbar-thin">
                      {currentDetailsTab === "Delivery details" && (
                        <div>
                          {deliveryDetails.map((item, idx) => (
                            <p key={idx}>
                              {idx + 1}) {item}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 max-h-56 overflow-y-scroll scrollbar-thin">
                      {currentDetailsTab === "Care Info" && (
                        <div>
                          {careInstructions.map((item, idx) => (
                            <p key={idx}>
                              {idx + 1}) {item}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>{currentDetailsTab === "FAQs" && <FAQ />}</div>
                  </div>
                </div>
              </div>
            </div>

            {hasAddons && (
              <>
                <h2 className="font-bold md:text-3xl text-xl py-4">
                  Make It Extra Special
                </h2>
                <RecommenedAddonSlider
                  subCat={serviceDetails?.subCategoryId}
                  addons={addonsData}
                />
              </>
            )}

            <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between gap-2 border border-gray-300 px-2 py-4 my-4 rounded-2xl">
              <div className="flex gap-2 items-center">
                <img
                  loading="lazy"
                  decoding="async"
                  src={support}
                  className="w-10"
                  alt="support"
                />
                <div>
                  <p className="text-primary text-2xl">
                    Want to <span>customize</span> this decoration?
                  </p>
                  <p className="text-xl">Need assistance?</p>
                </div>
              </div>
              <div className="flex gap-2 items-center text-2xl">
                <button
                  className="flex gap-2 items-center border border-green-500 text-green-500 rounded-full px-4 py-1 hover:bg-green-500 hover:text-white"
                  onClick={() => window.open(WhatsAppLink, "_blank")}
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={whatsapp}
                    className="w-6"
                    alt="whatsapp"
                  />
                  Whatsapp
                </button>
                <a
                  href="tel:+919620558000"
                  className="linkColorBlack flex gap-2 items-center border border-blue-500 text-blue-500 rounded-full px-6 py-1 hover:bg-blue-500 hover:text-white"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={phone}
                    className="w-6"
                    alt="phone"
                  />
                  Call us
                </a>
              </div>
            </div>

            <Review
              serviceId={serviceId}
              customerId={customerId}
              serviceRating={serviceDetails?.rating}
            />

            {customerId && recentPurchaseServiceDetails.length > 0 && (
              <div className="md:pt-10 pt-7">
                <p className="font-bold poppins md:text-2xl">
                  Recently Purchased
                </p>
                <CardCarousel centercardData={recentPurchaseServiceDetails} />
              </div>
            )}

            {/* {recommendedServices.length > 0 && ( */}
            <div className="md:pt-10 pt-7">
              <p className="font-bold poppins md:text-2xl">Similar Services</p>
              <CardCarousel centercardData={recommendedServices} />
            </div>
            {/* )} */}

            <div className="mt-5 p-5">
              {serviceDetails?.caption && (
                <ExpandableContent htmlContent={serviceDetails.caption} />
              )}
            </div>

            {serviceDetails?.faqs.length > 0 && (
              <div className="max-w-3xl p-4 mx-auto">
                <h4 className="text-center font-bold poppins text-2xl">FAQs</h4>
                <p className="text-center font-bold poppins text-sm pb-5">
                  Need help? Contact us for any queries related to us
                </p>
                <DynamicFaqs faqs={serviceDetails.faqs} />
              </div>
            )}

            {(showTimeSlots || showAddonsModal) && (
              <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center z-50">
                <div className="relative">
                  {/* Header */}
                  <div className="bg-gray-200 p-3 text-black flex items-center justify-between">
                    <div className="md:flex gap-4">
                      {showAddonsModal && (
                        <button
                          className="flex gap-1 items-center"
                          onClick={() => {
                            setShowAddonsModal(false);
                            setShowTimeSlots(true);
                          }}
                        >
                          <IoMdArrowRoundBack /> Go back
                        </button>
                      )}
                      <p>{showAddonsModal ? "Add-ons" : "Time Slots"}</p>
                    </div>
                    <IoCloseSharp
                      onClick={() => {
                        setShowTimeSlots(false);
                        setShowAddonsModal(false);
                      }}
                      className="cursor-pointer"
                      size={30}
                    />
                  </div>

                  {/* Body */}
                  {showTimeSlots && (
                    <TimeSlotsModel
                      setShowAddonsModal={setShowAddonsModal}
                      setShowTimeSlots={setShowTimeSlots}
                      hasAddons={hasAddons}
                      timeSlots={
                        serviceDetails?.offerPrice > 4000
                          ? timeSlotsPremium
                          : timeSlotsBasic
                      }
                    />
                  )}

                  {showAddonsModal && hasAddons && (
                    <RecommenedAddon
                      subCat={serviceDetails?.subCategoryId}
                      addons={addonsData}
                    />
                  )}

                  {/* Footer */}
                  <div className="bg-white px-2 flex justify-between items-center py-2">
                    <div>
                      <p>Total Price</p>
                      <p className="font-bold">
                        {formatCurrency(
                          (serviceDetails?.offerPrice || 0) +
                            addonTotal +
                            (deliveryCharges || 0) +
                            extraSlotCharge
                        )}
                      </p>
                      {extraSlotCharge > 0 && (
                        <div className="text-sm text-orange-600 mt-1">
                          <p>
                            + {extraSlotLabel}:{" "}
                            {formatCurrency(extraSlotCharge)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    {showTimeSlots && selectedTimeSlot && (
                      <button
                        className="flex gap-1 items-center bg-primary p-2 text-white rounded"
                        onClick={() => {
                          if (hasAddons) {
                            setShowAddonsModal(true);
                            setShowTimeSlots(false);
                          } else {
                            navigate(`/checkout/${serviceId}`);
                          }
                        }}
                      >
                        {hasAddons ? "Next" : "Book Now"}
                      </button>
                    )}

                    {showAddonsModal && (
                      <button
                        className="flex gap-1 items-center bg-primary p-2 text-white rounded"
                        onClick={() => navigate(`/checkout/${serviceId}`)}
                      >
                        Book now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ServiceDetails;
