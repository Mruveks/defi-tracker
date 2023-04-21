import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button className="flex w-fit sm:invisible md:invisible items-center space-x-2 mb-4 px-4 bg-gray-700 rounded-lg text-lg hover:bg-gray-600 transition duration-100" onClick={handleClick}>
      <BsArrowLeft />
      <p>Go back</p>
    </button>
  );
}

export default BackButton;
