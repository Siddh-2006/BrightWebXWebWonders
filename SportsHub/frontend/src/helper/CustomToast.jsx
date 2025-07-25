
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const bgColors = {
  success: "#d4edda",
  error: "#f8d7da",
  info: "#d1ecf1",
};

const textColors = {
  success: "#155724",
  error: "#721c24",
  info: "#0c5460",
};


const CustomToast = ({ type, message, closeToast }) => {
  return (
    <div
      style={{
        background: bgColors[type] || "#fff",
        color: textColors[type] || "#000",
        padding: "10px 15px",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      {message}
    </div>
  );
};


export const showCustomToast = (type, message) => {
  toast(<CustomToast type={type} message={message} />, {
    type,
    progress: undefined, 
  });
};

export default CustomToast;
