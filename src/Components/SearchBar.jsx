import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import { getAxios } from "../utils/api";

const SearchBar = ({ setSearchbartoggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [inpVal, setInpVal] = useState("")
    const [filteredData, setfilteredData] = useState([])

    const handleClose = () => {
        setIsOpen(false);
        setSearchbartoggle(false);
        setInpVal("")

    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAxios().get(`/services/search/${inpVal}`);
                const data = await response.data;
                setfilteredData(data.data);
                console.log("filteredData", data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [inpVal]);


    return (
        <div className={`search-bar-container ${isOpen ? "open" : "close"}`}>
            <div className={`search-bar ${isOpen ? "open" : "close"}`}>
                <div className="flex lg:px-20 md:px-8 px-2 items-center justify-between py-4">
                    <div className="flex gap-2 items-center border border-gray-400 px-3 rounded-lg py-2">
                        <IoSearchSharp size={25} className="text-gray-600" />
                        <input
                            type="text"
                            autofocus
                            placeholder="Search by event, birthday, party..."
                            className="outline-none text-gray-600 py-1 md:w-[500px] w-[260px] "
                            onChange={(e) => setInpVal(e.target.value)}
                        />
                    </div>
                    <IoCloseSharp size={30} onClick={handleClose} className="cursor-pointer" />
                </div>

                <div className="lg:px-20 md:px-10 px-4 py-5">
                    <p className="text-lg  pb-5"> Top Categories based on your search </p>
                    <ul className="flex gap-2 flex-wrap">
                        {inpVal.length > 2 ? (
                            filteredData.length > 0 ? (
                                filteredData.map(item => (
                                    // <Link to={`/service/details/${item._id}`} onClick={handleClose} key={item._id}>
                                    <Link  to={`/service/details/${item.serviceName.toLowerCase().replace(/\s+/g, "-")}/${item._id}`} onClick={handleClose} key={item._id} className="linkColorWhite">
                                        <li className="p-2 bg-primary text-white rounded-md text-center md:text-lg text-sm cursor-pointer">
                                            {item.serviceName}
                                        </li>
                                    </Link>
                                ))
                            ) : (
                                <p>No matching services found. Try something else.</p>
                            )
                        ) : null}
                    </ul>

                </div>
                <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 md:px-20">
                    {filteredData.length > 0 && inpVal.length > 2 ? (
                        filteredData.map((item, index) => (
                            <div key={index} onClick={handleClose}>
                                <ServiceCard  service={item}  />
                            </div>
                        ))
                    ) : null}   
                </div>

            </div>
        </div>
    );
};

export default SearchBar;
