import React from "react";

export default function Input({
                                  label,
                                  name,
                                  type = "text",
                                  value,
                                  onChange,
                                  placeholder,
                                  required = false,
                              }) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
}
