import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../css/animations.css'
import {
  BsPercent,
  BsCoin,
  BsBank,
  BsCodeSlash,
  BsBarChart,
} from "react-icons/bs";
import { GiRialtoBridge } from "react-icons/gi";
import { RiHandCoinLine } from "react-icons/ri";

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

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("/");

  const elementStyle =
    "flex px-2 py-1 group w-full items-center capitalize rounded-lg hover:bg-gray-600 rounded-full transition duration-100 group";

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
        <img src={img} alt="" className="rounded-full mr-2 wiggle" />
        {chainId}
      </NavLink>
    );
  };

  return (
    <div className="sm:hidden md:hidden block h-full w-48 px-2 fixed left-0 top-0 ">
      <aside>
        <div className="px-4 py-4 h-full overflow-auto">
          <ul className="space-y-4 text-base ">
            <li>
              <header className="flex items-center text-xl text-gray-400 ">
                Dashboards
              </header>
            </li>
            <li className="group">
              <NavLink
                to="/"
                onClick={() => setActiveNav("/defi")}
                className={`${
                  activeNav === "/defi" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <BsBarChart size={24} className="mr-2 wiggle" />
                Defi
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/stables"
                onClick={() => setActiveNav("/stables")}
                className={`${
                  activeNav === "/stables" ? "bg-gray-700" : ""
                } ${elementStyle} `}
              >
                <BsCoin size={24} className="mr-2 wiggle" />
                Stablecoins
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/dex"
                onClick={() => setActiveNav("/dex")}
                className={`${
                  activeNav === "/dex" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <BsCodeSlash size={24} className="mr-2 wiggle" />
                Dex
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/cex"
                onClick={() => setActiveNav("/cex")}
                className={`${
                  activeNav === "/cex" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <BsBank size={24} className="mr-2 wiggle" />
                Cex
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/yields"
                onClick={() => setActiveNav("/yields")}
                className={`${
                  activeNav === "/yields" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <BsPercent size={24} className="mr-2 wiggle" />
                Yields
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/bridges"
                onClick={() => setActiveNav("/bridges")}
                className={`${
                  activeNav === "/bridges" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <GiRialtoBridge size={24} className="mr-2 wiggle" />
                Bridges
              </NavLink>
            </li>
            <li className="group">
              <NavLink
                to="/lending"
                onClick={() => setActiveNav("/lending")}
                className={`${
                  activeNav === "/lending" ? "bg-gray-700" : ""
                } ${elementStyle}`}
              >
                <RiHandCoinLine size={24} className="mr-2 wiggle" />
                Lending
              </NavLink>
            </li>
          </ul>

          <div className="border-b-2 border-gray-600 my-4"></div>

          <ul className="space-y-4 text-base ">
            <li>
              <header className="flex items-center text-xl text-gray-400">
                Top Chains
              </header>
            </li>
            <li>{link("ethereum", eth)}</li>
            <li>{link("binance", bsc)}</li>
            <li>{link("avalanche", avax)}</li>
            <li>{link("polygon", polygon)}</li>
            <li>{link("arbitrum", arbitrum)}</li>
            <li>{link("optimism", optimism)}</li>
            <li>{link("solana", solana)}</li>
            <li>{link("tron", tron)}</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
