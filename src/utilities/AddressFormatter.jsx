import React from "react";

const AddressFormatter = ({ address }) => {
  let firstFour;
  let lastFour;

  if (address && address.includes(":")) {
    const [blockchain, addr] = address.split(":");
    firstFour = addr.slice(0, 4);
    lastFour = addr.slice(-4);
  } else {
    firstFour = address.slice(0, 4);
    lastFour = address.slice(-4);
  }

  return (
    <>
      <span className="font-medium @screen lg:block xl:block hidden">
        {address}
      </span>
      <span className="@screen xl:hidden lg:hidden visible">
        {firstFour}...{lastFour}
      </span>
    </>
  );
};

export default AddressFormatter;
