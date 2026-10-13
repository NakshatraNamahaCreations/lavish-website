import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IoChevronDown,
  IoChevronUp,
  IoMenu,
  IoClose,
  IoLocationSharp,
  IoSearch,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import Logo from "../assets/logo.png";
import heart from "../assets/icons/Heart.png";
import User from "../assets/icons/profile.png";
import menuData from "../json/menu.json";

import { getAuthAxios, getAxios } from "../utils/api";

const Navbar = () => {
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const userId = userData?.id;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [searchbartoggle, setSearchbartoggle] = useState(false);
  const [filterCatData, setfilterCatData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesCache, setSubCategoriesCache] = useState({}); // Cache for subcategories
  const [wishlistCount, setWishlistCount] = useState(0);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const whatsappSubCategories = [
    "Shop Opening Decoration",
    "Office Balloon Decoration",
  ];

  // Fetch categories from backend
  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAxios().get("/categories/");
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      setCategories(res.data.data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories for the selected category
  const fetchSubcategoriesByCategory = async (categoryId) => {
    if (!categoryId) return;

    // Check if subcategories are already cached
    if (subCategoriesCache[categoryId]) {
      setSubCategories(subCategoriesCache[categoryId]);
      return;
    }

    try {
      const res = await getAxios().get(`/subcategories/category/${categoryId}`);
      const subcategoriesData = res.data.data;

      // Update cache with new subcategories
      setSubCategoriesCache((prevCache) => ({
        ...prevCache,
        [categoryId]: subcategoriesData,
      }));

      setSubCategories(subcategoriesData);
    } catch (err) {
      setError("Failed to load subcategories");
    }
  };

  const fetchWishlistcount = async () => {
    try {
      const res = await getAxios().get(`wishlist/count/${userId}`);
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      setWishlistCount(res.data.count);
    } catch (error) {
      setError(error.message || "Error in fetching Whislist count");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchWishlistcount();
  }, []);

  // When categories load, set default openCategory if none selected yet
  useEffect(() => {
    if (categories.length > 0 && !openCategory) {
      const firstCategoryId = categories[0]._id;
      setOpenCategory(firstCategoryId);
      fetchSubcategoriesByCategory(firstCategoryId);
    }
  }, [categories, openCategory]);

  // Load subcategories when category changes
  useEffect(() => {
    if (openCategory) {
      fetchSubcategoriesByCategory(openCategory);
    }
  }, [openCategory]);

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  // Toggle category open/close
  // const handleCategory = (catId) => {
  //   setOpenCategory(openCategory === catId ? null : catId);
  // };

  const handleCategory = (catId) => {
    setOpenCategory(catId);
  };

  // Reset dropdown, category, and mobile menu
  const handleReset = () => {
    setOpenDropdown(false);
    if (categories.length > 0) {
      setOpenCategory(categories[0]._id);
    } else {
      setOpenCategory(null);
    }
    setMobileMenu(false);
  };

  const handleSearchBarClose = () => {
    handleReset();
    setSearchbartoggle(true);
  };

  const handleMobilemenuOpen = () => {
    if (!openDropdown) {
      setMobileMenu(!mobileMenu);
    }
  };

  // Lock body scroll when mobile dropdown/menu is open
  useEffect(() => {
    if (openDropdown || mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDropdown, mobileMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClose = () => {
    setOpenDropdown(false);
    setMobileMenu(false);
  };

  return (
    <header className="w-screen px-5 lg:px-20 shadow-lg bg-white fixed z-40 md:py-4 pt-4  ">
      <div className="relative flex justify-between items-center text-[#000] z-10">
        <div className="flex gap-3 items-center ">
          <Link to="/" onClick={() => handleMenuItemClose()}>
            <img src={Logo} alt="Logo" className="w-24 lg:w-32 outline-none" />
          </Link>

          <div
            className="hidden w-full border border-gray-400 px-2 py-1 md:flex gap-3 rounded-sm"
            onClick={handleSearchBarClose}
          >
            <div className="outline-none w-full text-sm cursor-pointer text-gray-500">
              Search by event, birthday, party...
            </div>
            <IoSearch className="text-primary" size={20} />
          </div>
          <div className="hidden text-primary  md:flex items-center gap-1 font-semibold">
            <IoLocationSharp />
            <p>Bangalore</p>
          </div>
        </div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 text-[#675740] text-lg">
          <ul className="flex gap-8 cursor-pointer">
            {menuData.menuItems.map((item) => (
              <li key={item.name} className="linkColorGray">
                {item.dropdown ? (
                  <span onClick={handleDropdown}>{item.name}</span>
                ) : (
                  <Link
                    to={item.link}
                    className="linkColorGray"
                    onClick={handleMenuItemClose}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Icons */}
          <div
            className="hidden lg:flex items-center gap-5 cursor-pointer"
            onClick={handleMenuItemClose}
          >
            {/* Wishlist Link with Badge */}
            <Link to="/wishlist" onClick={handleMenuItemClose}>
              <div className="relative">
                <img src={heart} alt="Wishlist" className="w-8 h-8" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>
            <Link to="/profile" onClick={handleMenuItemClose}>
              <img src={User} alt="User" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="md:hidden text-primary  flex items-center gap-1 font-semibold">
            <IoLocationSharp />
            <p>Bangalore</p>
          </div>
          <div className="lg:hidden cursor-pointer">
            {mobileMenu || openDropdown ? (
              <IoClose size={28} onClick={handleMenuItemClose} />
            ) : (
              <IoMenu size={28} onClick={handleMobilemenuOpen} />
            )}
          </div>
        </div>
      </div>

      <div
        className="md:hidden w-full border border-gray-400 px-2 py-1 my-2 flex gap-3 rounded-lg"
        onClick={handleSearchBarClose}
      >
        <div className="outline-none w-full text-sm cursor-pointer text-gray-500">
          Search by event, birthday, party...
        </div>
        <IoSearch className="text-primary" size={20} />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-md p-5 flex flex-col z-20"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu</h2>
              <IoClose
                size={28}
                onClick={() => setMobileMenu(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="mt-5 flex  justify-end gap-4">
              <Link to="/wishlist" onClick={handleMenuItemClose}>
                <div className="relative">
                  <img src={heart} alt="Wishlist" className="w-8 h-8" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
              <Link to="/profile" onClick={handleMenuItemClose}>
                <img src={User} alt="User" className="w-8 h-8" />
              </Link>
            </div>

            <ul className="mt-4">
              {menuData.menuItems.map((item) => (
                <li key={item.name} className="py-2">
                  {item.dropdown ? (
                    <span
                      onClick={() => {
                        setOpenDropdown(!openDropdown);
                        setMobileMenu(false);
                        if (categories.length > 0) {
                          setOpenCategory(categories[0]._id);
                        } else {
                          setOpenCategory(null);
                        }
                      }}
                      className="flex justify-between items-center linkColorGray"
                    >
                      {item.name}{" "}
                      {openDropdown ? <IoChevronUp /> : <IoChevronDown />}
                    </span>
                  ) : (
                    <Link
                      to={item.link}
                      className="linkColorGray"
                      onClick={handleMenuItemClose}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown for Desktop */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[80px] left-0 text-base px-5 lg:px-10 pt-10 cursor-pointer bg-white shadow-md z-40 w-full"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-10 gap-2">
              {categories.map((category) => (
                <p
                  key={category._id}
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => handleCategory(category._id)}
                >
                  {category.category}{" "}
                  {openCategory === category._id ? (
                    <IoChevronDown />
                  ) : (
                    <IoChevronUp />
                  )}
                </p>
              ))}
            </div>

            <motion.div
              key={openCategory}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-between md:px-5 lg:px-10 py-5 z-20"
            >
              <div className="text-gray-500 lg:flex w-full gap-10 justify-between">
                <div>
                  <p className="font-medium text-[#504B53]">Sub Categories</p>
                  <ul className="flex flex-col gap-x-4 gap-y-2 md:h-[200px] flex-wrap my-4">
                    {subCategories.map((item) => {
                      // let linkPath = `/service/${item.subCategory.replace(/\s+/g, "-")}/${item._id}`;
                      let linkPath = `/service/${item.subCategory
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toLowerCase() + word.slice(1)
                        )
                        .join("-")}/${item._id}`;

                      let isWhatsAppLink = false;

                      // WhatsApp subcategories on desktop
                      // if (whatsappSubCategories.includes(item.subCategory)) {
                      //   const message = encodeURIComponent(
                      //     `Hi, I'm interested in ${item.subCategory}. Please provide more details.`
                      //   );
                      //   linkPath = `https://wa.me/919620558000?text=${message}`;
                      //   isWhatsAppLink = true;
                      // } else

                      if (item.subCategory.includes("Ring Ceremony")) {
                        linkPath = `/ringceremonydecor/${item._id}`;
                      } else if (item.subCategory.includes("Bride To Be")) {
                        linkPath = `/bridetobedecor/${item._id}`;
                      } else if (item.subCategory.includes("Groom To Be")) {
                        linkPath = `/groomtobedecor/${item._id}`;
                      } else if (
                        item.subCategory.includes("Anniversary Decorations")
                      ) {
                        linkPath = `/anniversarydecor/${item._id}`;
                      } else if (item.subCategory.includes("Kids Birthday")) {
                        linkPath = `/kidsbirthdaydecor/${item._id}`;
                      } else if (item.subCategory.includes("Adult Birthday")) {
                        linkPath = `/birthdaydecoration/${item._id}`;
                      } else if (item.subCategory.includes("Baby Shower")) {
                        linkPath = `/babyshowerdecor/${item._id}`;
                      } else if (
                        item.subCategory.includes("Welcome Baby Decoration")
                      ) {
                        linkPath = `/welcomebabydecor/${item._id}`;
                      } else if (
                        item.subCategory.includes("Entertainment Decoration")
                      ) {
                        linkPath = `/entertainmentdecor/${item._id}`;
                      } else if (item.subCategory.includes("Naming Ceremony")) {
                        linkPath = `/namingceremonydecor/${item._id}`;
                      } else if (item.subCategory.includes("Photography")) {
                        linkPath = `/photography-service/${item._id}`;
                      }

                      return (
                        <Link
                          to={linkPath}
                          key={item._id}
                          onClick={handleMenuItemClose}
                          target={isWhatsAppLink ? "_blank" : undefined}
                          rel={
                            isWhatsAppLink ? "noopener noreferrer" : undefined
                          }
                          className="linkColorGray"
                        >
                          <li className="py-1 text-gray-500">
                            {item.subCategory}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>

                <div className=" lg:flex flex-wrap gap-2 hidden items-center ">
                  {[
                    "https://lavisheventzz-bangalore.b-cdn.net/Mermaid%20Theme%20shimmery%20stylish%20Silver%20Decor.jpg",
                    "https://lavisheventzz-bangalore.b-cdn.net/Rice%20Ceremony%20Theme%20Charming%20Decor.jpeg",
                    "https://lavisheventzz-bangalore.b-cdn.net/Better%20Together%20Theme%20Terrece%20Decor.jpeg",
                  ].map((i) => (
                    <img
                      key={i}
                      src={i}
                      className="max-w-44 h-32 rounded-lg"
                      alt="Service"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown for mobile and tablet */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            ref={mobileDropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-[90px] left-0 text-base cursor-pointer z-40 w-full h-screen bg-black/40"
          >
            {/* White dropdown panel */}
            <div className="flex flex-col items-start gap-2 bg-white p-5 overflow-y-auto max-h-[90vh] w-full">
              {categories.map((category) => (
                <div key={category._id} className="w-full">
                  <p
                    className="cursor-pointer flex items-center gap-2 justify-between border-b pb-2"
                    onClick={() => handleCategory(category._id)}
                  >
                    {category.category}
                    {openCategory === category._id ? (
                      <IoChevronUp />
                    ) : (
                      <IoChevronDown />
                    )}
                  </p>

                  <AnimatePresence>
                    {openCategory === category._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-y-auto max-h-[50vh] pr-2"
                      >
                        <ul className="py-4 pl-4 text-[#504B53]">
                          {subCategories.map((item) => {
                            let linkPath = `/service/${item.subCategory
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toLowerCase() + word.slice(1)
                              )
                              .join("-")}/${item._id}`;

                            const isWhatsappLinkMobile =
                              whatsappSubCategories.includes(item.subCategory);

                            if (item.subCategory.includes("Ring Ceremony")) {
                              linkPath = `/ringceremonydecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Bride To Be")
                            ) {
                              linkPath = `/bridetobedecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Groom To Be")
                            ) {
                              linkPath = `/groomtobedecor/${item._id}`;
                            } else if (
                              item.subCategory.includes(
                                "Anniversary Decorations"
                              )
                            ) {
                              linkPath = `/anniversarydecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Kids Birthday")
                            ) {
                              linkPath = `/kidsbirthdaydecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Adult Birthday")
                            ) {
                              linkPath = `/birthdaydecoration/${item._id}`;
                            } else if (
                              item.subCategory.includes("Baby Shower")
                            ) {
                              linkPath = `/babyshowerdecor/${item._id}`;
                            } else if (
                              item.subCategory.includes(
                                "Welcome Baby Decoration"
                              )
                            ) {
                              linkPath = `/welcomebabydecor/${item._id}`;
                            } else if (
                              item.subCategory.includes(
                                "Entertainment Decoration"
                              )
                            ) {
                              linkPath = `/entertainmentdecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Naming Ceremony")
                            ) {
                              linkPath = `/namingceremonydecor/${item._id}`;
                            } else if (
                              item.subCategory.includes("Photography")
                            ) {
                              linkPath = `/photography-service/${item._id}`;
                            }

                            return (
                              <Link
                                to={linkPath}
                                key={item._id}
                                onClick={handleMenuItemClose}
                                target={
                                  isWhatsappLinkMobile ? "_blank" : undefined
                                }
                                rel={
                                  isWhatsappLinkMobile
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="linkColorGray"
                              >
                                <li className="py-1">{item.subCategory}</li>
                              </Link>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {/* Images section */}
            <motion.div
              key={openCategory}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-5 px-5 py-5 overflow-x-auto bg-white"
            >
              {[
                "https://lavisheventzz-bangalore.b-cdn.net/Mermaid%20Theme%20shimmery%20stylish%20Silver%20Decor.jpg",
                "https://lavisheventzz-bangalore.b-cdn.net/Rice%20Ceremony%20Theme%20Charming%20Decor.jpeg",
                "https://lavisheventzz-bangalore.b-cdn.net/Better%20Together%20Theme%20Terrece%20Decor.jpeg",
              ].map((i) => (
                <img
                  key={i}
                  src={i}
                  className="md:w-40 md:h-40 w-20 h-20 rounded-lg object-cover"
                  alt="Service"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {searchbartoggle && <SearchBar setSearchbartoggle={setSearchbartoggle} />}
    </header>
  );
};

export default Navbar;
