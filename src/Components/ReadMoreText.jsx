import React, { useState } from 'react';

const ReadMoreText = ({ title = "Show Content", children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHandler = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="my-4">
            <div className="flex justify-center">
                <button
                    onClick={toggleHandler}
                    style={{ backgroundColor: '#F05386' }}
                    className="px-6 py-3 text-white text-lg font-semibold rounded-lg hover:opacity-90 transition"
                >
                    {isOpen ? 'Hide Content' : title}
                </button>
            </div>

            {isOpen && (
                <div
                    className="mt-3 p-4 bg-gray-100 rounded-md shadow text-gray-800 mx-auto "
                    style={{ width: "100%" }}
                >
                    {children}
                </div>

            )}
        </div>
    );
};

export default ReadMoreText;
