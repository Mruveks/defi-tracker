import React from "react";

const AddressFormatter = ({ address }) => {
  let firstFour;
  let lastFour;

  if (address && address.includes(":")) {
    const [blockchain, addr] = address.split(":");
    firstFour = addr.slice(0, 8);
    lastFour = addr.slice(-8);
  } else {
    firstFour = address.slice(0, 8);
    lastFour = address.slice(-8);
  }

  return (
    <>
      <span className="font-medium italic lg:block xl:block hidden">
        {address}
      </span>
      <span className=" italic xl:hidden lg:hidden visible">
        {firstFour}...{lastFour}
      </span>
    </>
  );
};

export default AddressFormatter;
