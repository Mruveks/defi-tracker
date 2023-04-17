import React from "react";

const AddressFormatter = ({ address }) => {
  let firstFour;
  let lastFour;

  if (address && address.includes(":")) {
    const [blockchain, addr] = address.split(":");
    firstFour = addr.slice(0, 6);
    lastFour = addr.slice(-6);
  } else {
    firstFour = address.slice(0, 6);
    lastFour = address.slice(-6);
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
