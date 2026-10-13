import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import ScrollToTop from "./Components/ScrollToTop";
import PaymentFailure from "./Components/PaymentFailure";
// import Login from "./Components/Login";
// import Signup from "./Components/Signup";
import LoginwithNumber from "./Components/LoginwithNumber";
import BirthdayLandingpage from "./Components/BirthdayLandingpage";
import Thankyou from "./Components/Thankyou";
import Loader from "./Components/Loader";
// Lazy load all other route components
const About = lazy(() => import("./Components/About"));
const Service = lazy(() => import("./Components/Service"));
const Wishlist = lazy(() => import("./Components/Wishlist"));
const ContactUs = lazy(() => import("./Components/ContactUs"));
const ServiceDetails = lazy(() => import("./Components/ServiceDetails"));
const Checkout = lazy(() => import("./Components/Checkout"));
const Kidsbirthday = lazy(() => import("./Components/Kidsbirthday"));
const AdultBirthday = lazy(() => import("./Components/AdultBirthday"));
const Anniversary = lazy(() => import("./Components/Anniversary"));
const WelcomeBaby = lazy(() => import("./Components/WelcomeBaby"));
const BabyShower = lazy(() => import("./Components/BabyShower"));
const NamingCeremony = lazy(() => import("./Components/NamingCeremony"));
const BridetoBe = lazy(() => import("./Components/BridetoBe"));
const RingCermony = lazy(() => import("./Components/RingCeremony"));
const GroomtoBe = lazy(() => import("./Components/GroomtoBe"));
const Entertainment = lazy(() => import("./Components/Entertainment"));
const Photograpghy = lazy(() => import("./Components/Photograpghy"));
const Profile = lazy(() => import("./Components/Profile"));
const ProtectedRoute = lazy(() => import("./Components/ProtectedRoute"));
const Themes = lazy(() => import("./Components/Themes"));
const PaymentSuccess = lazy(() => import("./Components/PaymentSuccess"));
const AllServices = lazy(() => import("./Components/AllServices"));
const OrderDetails = lazy(() => import("./Components/OrderDetails"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./Components/TermsConditions"));
const Invoice = lazy(() => import("./Components/Invoice"));
const ReturnRefund = lazy(() => import("./Components/ReturnRefund"));
const ShippingDelivery = lazy(() => import("./Components/ShippingDelivery"));
const Blog = lazy(() => import("./Components/Blog"));
const BlogDetails = lazy(() => import("./Components/BlogDetails"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        {/* <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center">
              <img
                src="/images/loader.gif"
                alt="Loading..."
                className="w-16 h-16"
              />
            </div>
          }
        > */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Wrap all routes inside Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/service/:subcatgory/:id" element={<Service />} />
              <Route
                path="/service/details/:serviceName/:serviceId"
                element={<ServiceDetails />}
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/checkout/:serviceId" element={<Checkout />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route
                path="/kidsbirthdaydecor/:subcat_id"
                element={<Kidsbirthday />}
              />
              <Route
                path="/birthdaydecoration/:subcat_id"
                element={<AdultBirthday />}
              />
              <Route
                path="/anniversarydecor/:subcat_id"
                element={<Anniversary />}
              />
              <Route
                path="/welcomebabydecor/:subcat_id"
                element={<WelcomeBaby />}
              />
              <Route
                path="/babyshowerdecor/:subcat_id"
                element={<BabyShower />}
              />
              <Route
                path="/namingceremonydecor/:subcat_id"
                element={<NamingCeremony />}
              />
              <Route
                path="/bridetobedecor/:subcat_id"
                element={<BridetoBe />}
              />
              <Route
                path="/groomtobedecor/:subcat_id"
                element={<GroomtoBe />}
              />
              <Route
                path="/ringceremonydecor/:subcat_id"
                element={<RingCermony />}
              />
              <Route
                path="/entertainmentdecor/:subcat_id"
                element={<Entertainment />}
              />
              <Route
                path="/photography-service/:subcat_id"
                element={<Photograpghy />}
              />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/login" element={<LoginwithNumber />} />
              {/* <Route path="/signup" element={<Signup />} /> */}
              <Route path="/themes/:subSubCategoryId" element={<Themes />} />
              <Route path="/all-services" element={<AllServices />} />
              <Route path="/all-services/:subcategoryId" element={<AllServices />} />
              <Route path="/orderDetails/:id" element={<OrderDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/return-refund" element={<ReturnRefund />} />
              <Route path="/shipping-delivery" element={<ShippingDelivery />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/invoice/:id" element={<Invoice />} />
              <Route path="*" element={<HomePage />} />
              <Route path="/payment/failure" element={<PaymentFailure />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/blogs/:title" element={<BlogDetails />} />
              <Route path="/thankyou" element={<Thankyou />} />
              <Route
                path="/birthday-event-planner-in-bangalore"
                element={<BirthdayLandingpage />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
