import { useState, useEffect } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 0);
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`fixed flex items-center space-x-4 bottom-4 left-4 sm:left-5 sm:bottom-2 backdrop-blur-2xl sm:bg-gray-900 bg-transparent border transition duration-100 border-gray-600  hover:bg-gray-600 text-gray-400 font-bold py-2 px-4 rounded ${
        showButton ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <h2>Scroll to Top</h2>
      <BsArrowUpSquareFill />
    </button>
  );
}

export default ScrollToTopButton;
