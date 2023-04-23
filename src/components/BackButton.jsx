import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button
      className="flex w-fit sm:invisible md:invisible items-center space-x-2 mb-4 bg-gray-700 rounded-xl backdrop-blur-2xl sm:bg-gray-900 md:bg-gray-900 bg-transparent border transition duration-100 border-gray-600  hover:bg-gray-600 text-gray-400 font-bold py-2 px-4 "
      onClick={handleClick}
    >
      <BsArrowLeft />
      <p>Go Back</p>
    </button>
  );
}

export default BackButton;
