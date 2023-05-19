import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsCoin } from "react-icons/bs";
const SearchList = () => {
  const [protocols, setProtocols] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchListRef = useRef(null);

  const [allData, setAllData] = useState({
    stablecoins: [],
    chains: [],
    protocols: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stablecoinResponse, chainsResponse, protocolsResponse] =
          await Promise.all([
            axios.get(
              "https://stablecoins.llama.fi/stablecoins?includePrices=false"
            ),
            axios.get("https://api.llama.fi/chains"),
            axios.get("https://api.llama.fi/protocols"),
          ]);

        const stablecoinsData = stablecoinResponse.data.peggedAssets;
        const chainsData = chainsResponse.data;
        const protocolsData = protocolsResponse.data;

        const chainsDataWithTag = chainsData.map((chain) => {
          return { ...chain, tag: "chain" };
        });

        const mergedData = [
          ...stablecoinsData,
          ...chainsDataWithTag,
          ...protocolsData,
        ];

        const sortedData = mergedData.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });

        setAllData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
    <form className="text-md md:pt-8">
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
          placeholder="Search for Defi Protocols, Chains and Stablecoins..."
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
          className="max-h-60 z-10 absolute mx-6 right-4 left-52 sm:right-0 sm:left-0 sm:mx-5 border-gray-600 border bg-gray-900 rounded-b-xl overflow-y-auto"
        >
          {allData
            .filter((val) => {
              if (searchData === "") {
                return null;
              } else if (
                val.name.toLowerCase().startsWith(searchData.toLowerCase())
              ) {
                return val;
              }
            })
            .filter((val) => val.category != "CEX" && val.category != "Chain")
            .map((val, key) => {
              return (
                <div
                  key={key}
                  className="flex h-14 px-2 w-full items-center border-t-gray-600 border-t hover:bg-gray-600"
                >
                  <Link
                    to={
                      val.pegType
                        ? `/stablecoins/${val.id}`
                        : val.tag === "chain"
                        ? `/chain/${val.name}`
                        : val.chain
                        ? `/protocol/${val.name}`
                        : null
                    }
                    className="flex-1 h-full flex items-center"
                    onClick={() => handleClickOutside()}
                  >
                    {val.logo ? (
                      <img
                        src={val.logo}
                        alt="logo"
                        className="h-8 w-8 rounded-full mr-2 bg-gray-600"
                      />
                    ) : (
                      <BsCoin className="h-8 w-8 mr-2" />
                    )}
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

export default SearchList;
