import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const CancellationPolicy = ({ isOpen, toggleModal }) => {


    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="bg-white rounded-lg w-96 md:w-[600px] p-6 max-h-[80vh] overflow-y-auto relative ">
                            {/* <h2 className="text-xl font-bold mb-4">FAQ</h2> */}
                            <div className="space-y-4 p-4">
                                <h1 className="font-bold text-lg text-black">
                                    Cancellation Policy:
                                </h1>
                                <ul className="list-disc">
                                    <li> Less than 24 Hours: No refund. </li>
                                    <li> 24 to 72 hours: 1000 or 50% cancellation fee,whichever is lower. </li>
                                    <li> 3 to 7 days: Rs.500 cancellation charge. </li>
                                    <li> More than 7 days No charge.<br /> Weather or unavoidable circumstances? Reschedule only.<br /> Special days and perishable items have special rules.<br />Cancellation Policy Highlights: </li>
                                    <li> Valentine's Day, New Year's Eve, and select dates have no cancellations. </li>
                                    <li> Special Packages incur 100% forfeiture </li>
                                </ul>
                                <h1 className="font-bold text-lg text-black">
                                    Reschedule Policy:
                                </h1>
                                <ul className="list-disc">
                                    <li> Less than 24 Hours: Generally not permitted. </li>
                                    <li> 24 hours to 3 days: Free rescheduling. </li>
                                    <li> More than 3 days: Free rescheduling . </li>

                                    <li> No rescheduling on Valentine's Day, Christmas, and other special dates.</li>
                                    <li> Special Packages incur 100% forfeiture </li>
                                </ul>
                                <h1 className="font-bold text-lg text-black">
                                    Other Info:
                                </h1>
                                <ul className="list-disc">
                                    <li> No Same-day cancellations for cakes and bouquets.</li>

                                </ul>
                            </div>
                            <div className="flex justify-center mt-4" onClick={toggleModal}>
                                <button className="mx-auto py-2 text-white font-bold rounded-md bg-primary px-5">
                                    Done
                                </button>
                            </div>
                            <button
                                className="absolute top-2 right-2 text-xl text-gray-500"
                                onClick={toggleModal}
                            >
                                <MdClose />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CancellationPolicy;

