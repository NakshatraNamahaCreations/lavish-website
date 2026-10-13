import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAxios } from "../utils/api";

const DynamicInputField = ({ item, index, onChange }) => {
  const [balloonColors, setBalloonColors] = useState([]);

  // Fetch balloon colors from backend
  const fetchBalloons = async () => {
    try {
      const res = await getAxios().get("/balloons/");
      if (res.status !== 200) throw new Error("Something went wrong");

      const balloonColorList = res.data.data.map((item) => item.balloonColor);
      setBalloonColors(balloonColorList);
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchBalloons();
  }, []);

  // Add null check for item
  if (!item || !item.label) {
    console.warn('DynamicInputField received invalid item prop:', item);
    return null;
  }

  const getOptions = (label, inputType) => {
    if (!label) return [];
    
    const normalized = label.toLowerCase();

    const foilOptions = ["Silver", "Golden"];
    const digitOptions = Array.from({ length: 10 }, (_, i) => `${i}`);
    const letterOptions = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    );
    const cakeFlavours = [
      "Chocolate", "Vanilla", "Butterscotch", "Pineapple", "Red Velvet", "Black Forest", "Strawberry", "Mango"
    ];
    const eggOptions = ["Eggless", "With Egg"];

    if (normalized.includes("flavour") || normalized.includes("flavor")) return cakeFlavours;
    if (normalized.includes("eggless") || normalized.includes("egg")) return eggOptions;
    if (normalized.includes("balloon color")) return balloonColors;
    if (normalized.includes("foil color") || normalized.includes("star foil") || normalized.includes("frill color")) return foilOptions;
    if (normalized.includes("digit")) return digitOptions;
    if (normalized.includes("letter")) return letterOptions;
    if (normalized.includes("name")) return letterOptions;
    if (normalized.includes("message")) return letterOptions;

    return [];
  };

  const options = getOptions(item.label, item.inputType);

  const renderInput = () => {
    const commonProps = {
      name: item.label,
      className: "form-control",
    };

    switch (item.inputType) {
      case "text":
        return (
          <input
            type="text"
            {...commonProps}
            maxLength={item.maxValue}
            placeholder={`Max ${item.maxValue} characters`}
            className="w-full border-none outline-none"
            onChange={(e) => onChange(item.label, e.target.value, "text")}
          />
        );

      case "number":
        return (
          <input
            type="text"
            {...commonProps}
            inputMode="numeric"
            pattern={`\\d{1,${item.maxValue}}`}
            maxLength={item.maxValue}
            title={`Enter up to ${item.maxValue} digit${item.maxValue > 1 ? "s" : ""}`}
            placeholder={`Enter ${item.maxValue} digit${item.maxValue > 1 ? "s" : ""}`}
            className="w-full border-none outline-none"
            onChange={(e) => onChange(item.label, e.target.value, "number")}
          />
        );

      case "radio":
        return options.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-2 ">
            {options.map((opt, i) => (
              <label key={i} className="bg-white flex items-center gap-2 bg-gray-100 px-3 py-1 rounded cursor-pointer">
                <input
                  type="radio"
                  name={item.label}
                  value={opt}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange(item.label, opt, "radio");
                    }
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: "italic", color: "gray" }}>No options found</p>
        );

      case "checkbox":
        return options.length > 0 ? (
          <div className="grid grid-cols-4 ">
            {options.map((opt, i) => (
              <label key={i} className="bg-white flex items-center gap-2 bg-gray-100 px-3 py-1 rounded cursor-pointer">
                <input
                  type="checkbox"
                  name={item.label}
                  value={opt}
                  onChange={(e) => {
                    // Pass the option value and checked state
                    onChange(item.label, opt, "checkbox", e.target.checked);
                  }}
                />
                {opt}
              </label>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: "italic", color: "gray" }}>No options found</p>
        );

      default:
        return (
          <input
            type="text"
            {...commonProps}
            maxLength={item.maxValue || 100}
            onChange={(e) => onChange(item.label, e.target.value, "text")}
          />
        );
    }
  };

  return (
    <div key={index} style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>
        {item.label}
        <span className="text-red-500">*</span>
        {item.maxValue && (
          <span className="text-gray-500 ml-2">(Max {item.maxValue})</span>
        )}
      </label>

      <div className="border border-2 p-2 rounded">{renderInput()}</div>
    </div>
  );
};

export default DynamicInputField;
