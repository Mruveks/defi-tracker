import React from "react";
import { LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-row justify-center items-center w-full h-96">
      <LineWave color="white" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
