import React, { useEffect, useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { getAxios } from "../utils/api";

const MultiSelect = ({ disabled, defaulyballoonsColors, onSelectionChange }) => {
  const safeDefaultColors = Array.isArray(defaulyballoonsColors) ? defaulyballoonsColors : [];

  const [selectedOptions, setSelectedOptions] = useState([...safeDefaultColors]);
  const [openOption, setOpenOption] = useState(false);
  const [balloonColors, setBalloonColors] = useState([]);

  const maxSelectable = safeDefaultColors.length;

  // Fetch the balloon colors from the backend
  const fetchBalloons = async () => {
    try {
      const res = await getAxios().get("/balloons/");
      if (res.status !== 200) throw new Error("Something went wrong");
      setBalloonColors(res.data.data);
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchBalloons();
  }, []);

  // Check if selected options match default
  const isDefaultSelected =
    selectedOptions.length === safeDefaultColors.length &&
    safeDefaultColors.every((color) => selectedOptions.includes(color));

  const handleSelection = (value) => {
    if (value === "default") {
      // Revert to default selection
      setSelectedOptions([...safeDefaultColors]);
      if (onSelectionChange) onSelectionChange([...safeDefaultColors]);
    } else {
      if (isDefaultSelected) {
        // Switch to custom mode starting with this color
        const updated = [value];
        setSelectedOptions(updated);
        if (onSelectionChange) onSelectionChange(updated);
      } else {
        setSelectedOptions((prev) => {
          let updated;
          if (prev.includes(value)) {
            updated = prev.filter((item) => item !== value);
          } else if (prev.length < maxSelectable) {
            updated = [...prev, value];
          } else {
            alert(`You can select up to ${maxSelectable} balloon colors.`);
            return prev;
          }

          if (onSelectionChange) onSelectionChange(updated);
          return updated;
        });
      }
    }
  };

  return (
    <div className="col-span-2 md:p-4 rounded-2xl bg-transparent">
      <p className="font-bold">Choose Balloons Color</p>

      {/* Default Selection Checkbox */}
      <div className="flex items-center justify-between gap-3 border border-gray-300 p-2 rounded-2xl bg-transparent">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            value="default"
            checked={isDefaultSelected}
            onChange={() => handleSelection("default")}
            className="hidden"
            disabled={disabled}
          />
          <span className="text-primary">
            {isDefaultSelected ? (
              <FaCircle size={14} />
            ) : (
              <FaRegCircle size={14} className="text-gray-400" />
            )}
          </span>
          <span className="text-gray-700">Select same as Image (Default)</span>
        </label>
        {openOption ? <IoChevronUp /> : <IoChevronDown />}
      </div>

      <p className="text-right col-span-2 text-sm">
        Any other Color?
        <span
          className="text-primary font-bold cursor-pointer"
          onClick={() => {
            if (!disabled) {
              setOpenOption(!openOption);
            } else {
              alert("Please select the valid pincode first");
            }
          }}
        >
          {" "}
          Click here
        </span>
      </p>

      {/* Multi-Select Options */}
      {openOption && (
        <div className="mt-2 space-y-2">
          <p>Pick color as per your choice (Max {maxSelectable})</p>
          <div className="grid grid-cols-3 gap-2">
            {balloonColors.map((option) => (
              <label
                key={option._id}
                className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
                onClick={() => handleSelection(option.balloonColor)}
              >
                <input
                  type="checkbox"
                  value={option.balloonColor}
                  checked={selectedOptions.includes(option.balloonColor)}
                  onChange={() => handleSelection(option.balloonColor)}
                  className="hidden"
                  disabled={
                    !selectedOptions.includes(option.balloonColor) &&
                    selectedOptions.length >= maxSelectable &&
                    !isDefaultSelected
                  }
                />
                <span className="text-primary">
                  {selectedOptions.includes(option.balloonColor) ? (
                    <FaCircle size={14} />
                  ) : (
                    <FaRegCircle size={14} />
                  )}
                </span>
                <span>{option.balloonColor}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;




