import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsPercent,
  BsCoin,
  BsBank,
  BsCodeSlash,
  BsBarChart,
} from "react-icons/bs";
import {
  eth,
  bsc,
  avax,
  polygon,
  optimism,
  solana,
  tron,
  arbitrum,
} from "../assets/AssetsIndex.js";
import { GiRialtoBridge } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("/");

  const elementStyle =
    "flex items-center capitalize rounded-lg hover:bg-gray-700";

  const link = (chainId, img) => {
    return (
      <NavLink
        key={chainId}
        to={`/chain/${chainId}`}
        onClick={() => setActiveNav(`/${chainId}`)}
        className={`${
          activeNav === `/${chainId}` ? "bg-gray-700" : ""
        } ${elementStyle} `}
      >
        <img src={img} alt="" className="rounded-full mr-2" />
        {chainId}
      </NavLink>
    );
  };

  return (
    <div className="sm:flex md:flex hidden h-46 mx-5 md:mx-10 p-4">
      <div className="w-full">
        <header className="flex items-center pb-4 text-3xl text-gray-400 ">
          Dashboards
        </header>
        <ul className="grid gap-2 grid-cols-3">
          <li>
            <NavLink
              to="/"
              onClick={() => setActiveNav("/defi")}
              className={`${
                activeNav === "/defi" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <BsBarChart size={24} className="mr-2" />
              Defi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stables"
              onClick={() => setActiveNav("/stables")}
              className={`${
                activeNav === "/stables" ? "bg-gray-700" : ""
              } ${elementStyle} `}
            >
              <BsCoin size={24} className="mr-2" />
              Stablecoins
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dex"
              onClick={() => setActiveNav("/dex")}
              className={`${
                activeNav === "/dex" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <BsCodeSlash size={24} className="mr-2" />
              Dex
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cex"
              onClick={() => setActiveNav("/cex")}
              className={`${
                activeNav === "/cex" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <BsBank size={24} className="mr-2" />
              Cex
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/yields"
              onClick={() => setActiveNav("/yields")}
              className={`${
                activeNav === "/yields" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <BsPercent size={24} className="mr-2" />
              Yields
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bridges"
              onClick={() => setActiveNav("/bridges")}
              className={`${
                activeNav === "/bridges" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <GiRialtoBridge size={24} className="mr-2" />
              Bridges
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lending"
              onClick={() => setActiveNav("/lending")}
              className={`${
                activeNav === "/lending" ? "bg-gray-700" : ""
              } ${elementStyle}`}
            >
              <RiHandCoinLine size={24} className="mr-2" />
              Lending
            </NavLink>
          </li>
        </ul>

        <header className="flex items-center py-4 text-3xl text-gray-400 ">
          Top Chains
        </header>
        <ul className="grid gap-2 grid-cols-3">
          <li>{link("ethereum", eth)}</li>
          <li>{link("binance", bsc)}</li>
          <li>{link("avalanche", avax)}</li>
          <li>{link("polygon", polygon)}</li>
          <li>{link("arbitrum", arbitrum)}</li>
          <li>{link("optimism", optimism)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
