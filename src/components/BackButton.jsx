import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

function BackButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <button className="flex w-fit items-center space-x-2 text-lg rounded-xl hover:bg-gray-600 transition duration-100 py-2 px-4 border-gray-600 border" onClick={handleClick}>
      <BsArrowLeft />
      <p>Go back</p>
    </button>
  );
}

export default BackButton;
