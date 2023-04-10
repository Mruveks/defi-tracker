import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
const ProtocolAddress = ({ address }) => {
  let link;

  if (address && address.includes(":")) {
    const [blockchain, addr] = address.split(":");
    switch (blockchain) {
      case "eth":
        link = `https://etherscan.io/address/${addr}`;
        break;
      case "bsc":
        link = `https://bscscan.com/address/${addr}`;
        break;
      case "polygon":
        link = `https://polygonscan.com/address/${addr}`;
        break;
      case "avax":
        link = `https://cchain.explorer.avax.network/address/${addr}`;
        break;
      case "tron":
        link = `https://tronscan.org/#/address/${addr}`;
        break;
      case "optimism":
        link = `https://optimistic.etherscan.io/address/${addr}`;
        break;
      case "cronos":
        link = `https://cronoscan.com/address/${addr}`;
        break;
      case "arbitrum":
        link = `https://arbiscan.io/address/${addr}`;
        break;
      case "fantom":
        link = `https://ftmscan.com/address/${addr}`;
        break;
      case "solana":
        link = `https://explorer.solana.com/address/${addr}`;
        break;
      case "mixin":
        if (/^0x[a-fA-F0-9]{34}$/.test(addr)) {
          link = `https://mixin.one/snapshots/${addr}`;
        }
        break;
      default:
        link = `https://etherscan.io/address/${addr}`;
        break;
    }
  } else {
    link = `https://etherscan.io/address/${address}`;
  }

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <button
      className="flex space-x-2 items-center px-4 py-2 rounded bg-gray-900 w-fit hover:bg-gray-600"
      onClick={handleClick}
    >
      <p>View on blockchain</p>
      <BsArrowUpRight />
    </button>
  );
};

export default ProtocolAddress;
