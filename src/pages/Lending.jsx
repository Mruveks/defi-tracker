import React from "react";
import { Helmet } from "react-helmet";
import BackButton from "../components/BackButton";
import Ranking from "../components/rankings/Ranking";
import SearchList from "../components/SearchList";

const Lending = () => {
  return (
    <div className="grid grid-cols-1 mx-10 sm:mx-5 text-md">
      <Helmet>
        <title>Lending | DeFi</title>
        <meta
          name="description"
          content="Find the best decentralized finance (DeFi) lending projects"
        />
      </Helmet>

      <BackButton />
      <SearchList />

      <header className="flex justify-center text-center items-center capitalize text-white my-10 text-6xl italic">
        Top Lending Protocols
      </header>

      <Ranking chain="Lending" />
    </div>
  );
};

export default Lending;
