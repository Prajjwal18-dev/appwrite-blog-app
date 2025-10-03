import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-gray-300",
    textColor = "text-black",
    className = "",
    ...props
}) {
    return (
        <button
            className={`inline-block px-5 py-2 rounded-lg font-semibold transition-all duration-300 
                       ${bgColor} ${textColor} ${className} 
                       hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-offset-black focus:ring-yellow-500`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

