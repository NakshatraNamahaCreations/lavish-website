import React, { useState } from 'react'
import img from "../assets/img/grid6.jpg"
import { GoHeartFill, GoHeart } from "react-icons/go";

import { CiBookmark  } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

const SpecialOfferCard = () => {
    const [togglelike, setToggleLike] = useState(true)
    return (
        // <div className=' group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid p-3 py-4 md:w-[300px] w-[170px] border border-gray-300 ' >
        <div className='group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:p-3 md:py-4  md:w-[300px] w-[170px] border border-gray-300 ' >
            <div>
                <img src={img} className=' object-cover ' />
            </div>
            <div className='rounded-full bg-white p-2  absolute top-6 right-6 text-2xl cursor-pointer' onClick={() => setToggleLike(!togglelike)}>
               {togglelike ? <GoHeartFill className='text-red-600' /> : <GoHeart className='text-gray-600' />}
            </div>
            <div className='px-1 py-4'>
                <p className='font-bold'>Marry me <br /> Decoration</p>
                {/* <p className='font-bold'>Decoration</p> */}
                <p className='py-2'>At your location</p>
                <div className='flex justify-between items-end text-sm md:text-base'>
                    <p className='font-bold'>Rs. 1499</p>
                    <button className='md:px-3 p-2 md:py-2 bg-[#AA6300]   rounded-md text-white font-semibold'>30% off</button>
                </div>

            </div>


        </div>
    )
}

export default SpecialOfferCard