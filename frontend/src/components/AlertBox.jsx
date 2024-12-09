import React from "react";

const AlertBox = ({ message }) => {
    const styles = {
        success: "bg-green-100 border-green-400 text-green-700",
        error: "bg-red-100 border-red-400 text-red-700",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    };

    return (
        <div className={`border-l-4 p-4 ${styles[type]} rounded mb-4`}>
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button className="text-lg font-bold">X</button>
            </div>
        </div>
    );
};

export default AlertBox;
