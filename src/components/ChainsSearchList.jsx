import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ChainsSearchList = () => {
  const [protocols, setProtocols] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchListRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://api.llama.fi/chains")
      .then((res) => {
        setProtocols(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchListRef.current &&
        !searchListRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchListRef]);

  return (
    <form className="text-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center p-4 cursor-pointer">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          className="border-gray-600 border border-b-0 rounded-b-none block w-full p-4 pl-10 rounded-xl bg-gray-900"
          placeholder="Search Chains..."
          required
          onChange={(e) => {
            setSearchData(e.target.value);
            setIsOpen(true);
          }}
        />
      </div>

      {isOpen && (
        <div
          ref={searchListRef}
          className="max-h-60 z-10 absolute mx-6 right-4 left-52 border-gray-600 border bg-gray-900 rounded-b-xl overflow-y-auto"
        >
          {protocols
            .filter((val) => {
              if (searchData === "") {
                return null;
              } else if (
                val.name.toLowerCase().includes(searchData.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((val) => val.tvl > 100000000)
            .map((val, key) => {
              return (
                <div
                  key={key}
                  className="flex h-14 px-2 w-full items-center border-t-gray-600 border-t hover:bg-gray-600"
                >
                  <Link
                    to={`/chain/${val.name.toLowerCase()}`}
                    className="pl-8 flex-1 h-full flex items-center"
                    onClick={() => handleClickOutside()}
                  >
                    {val.name}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </form>
  );
};

export default ChainsSearchList;
