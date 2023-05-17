import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import axios from "axios";
import Charts from "../../components/charts/Chart";
import BackButton from "../../components/BackButton";
import ProtocolAddress from "../../utilities/ProtocolAddress";
import AddressFormatter from "../../utilities/AddressFormatter";
import StablecoinsSearchList from "../../components/StablecoinsSearchList";
import moment from "moment";
import numeral from "numeral";
import Loader from "../../components/Loader";
import { BsArrowUpRight } from "react-icons/bs";

const StablecoinPage = () => {
  const { stableId } = useParams();
  const [stables, setStables] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const [currentCirculating, setCurrentCirculating] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);

  useEffect(() => {
    axios
      .get(`https://stablecoins.llama.fi/stablecoin/${stableId}`)
      .then((res) => {
        const data = res.data;
        setStables(data);

        const tokens = data.tokens;
        const datesAndValues = tokens.map((token) => ({
          date: moment.unix(token.date).toDate(),
          value: Number(token.circulating.peggedUSD),
        }));
        setExtractedData(datesAndValues);
        const today = datesAndValues.slice(
          datesAndValues.length - 1,
          datesAndValues.length
        );
        const todayValue = Object.values(today);
        const value = todayValue[0].value;
        setCurrentCirculating(numeral(value).format("$0.00a"));

        const current = Object.values(data)[17];
        const values = Object.entries(current).map(([chain, value], key) => ({
          key,
          chain,
          value: value.peggedUSD,
        }));
        setValuesArray(values);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stableId]);

  return (
    <main className="mx-10 sm:mx-5">
      {stables ? (
        <Helmet>
          <title>{stables.name} | DefiTracker</title>
          <meta
            name="description"
            content={`Learn more about ${stables.name} features and how it works on our website.`}
          />
        </Helmet>
      ) : null}

      <BackButton />
      <StablecoinsSearchList />
      {stables ? (
        <div className="grid grid-cols-2 mb-5 rounded-xl">
          <div className="col-span-2 my-8 flex items-center text-center text-6xl sm:space-x-0 justify-center space-x-10 font-serif italic capitalize">
            <header>{stables.name}</header>
          </div>

          <div className="col-span-2 mb-8 grid sm:grid-cols-1 grid-cols-[25%_75%] border border-gray-600 rounded-xl">
            <div className="space-y-8 h-fit text-white sm:w-full p-4 italic capitalize">
              <div>
                <h1>Current Circulating</h1>
                {stables.price ? (
                  <div className="font-mono">{currentCirculating}</div>
                ) : (
                  "-"
                )}
              </div>
              <div>
                <h1>Price</h1>
                {stables.price ? (
                  <div className="font-mono">
                    {numeral(stables.price).format("$0.00a")}
                  </div>
                ) : (
                  "-"
                )}
              </div>
              <h1>Peg Mechanism</h1>
              {stables.pegMechanism}
            </div>

            <div className="flex">
              <Charts data={extractedData} />
            </div>
          </div>

          <div className="col-span-2  grid grid-cols-2 sm:grid-cols-1 rounded-xl border border-gray-600">
            <div className="space-y-4 p-4 border-r  border-gray-600">
              <header className="text-4xl sm:text-2xl">
                Protocol Information
              </header>
              <p className="text-justify">{stables.description}</p>
              <p className="text-justify">{stables.mintRedeemDescription}</p>
              {stables.auditLinks ? (
                <div>
                  <h2>Audits:</h2>
                  {stables.auditLinks.map((audits) => (
                    <a
                      href={audits}
                      target="__blank"
                      className="hover:underline italic flex overflow-x-clip"
                    >
                      {audits}
                    </a>
                  ))}
                </div>
              ) : null}
              <div className="flex space-x-2">
                <a href={stables.url} target="_blank">
                  <button className="px-4 space-x-2 flex items-center py-2 rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
                    <p>Website</p>
                    <BsArrowUpRight />
                  </button>
                </a>
                <a href={stables.twitter} target="_blank">
                  <button className="px-4 space-x-2 h-full flex items-center rounded bg-gray-900 w-fit hover:bg-gray-600 transition duration-300">
                    <p>Twitter</p>
                    <BsArrowUpRight />
                  </button>
                </a>
              </div>
            </div>

            <div className="space-y-4 sm:border-t border-gray-600">
              <header className="text-4xl pt-4 px-4 sm:text-2xl">
                Token Information
              </header>
              <div className="flex space-x-2 px-4 overflow-hidden">
                <p>Address: </p>
                {stables.address ? (
                  <AddressFormatter address={stables.address} />
                ) : (
                  <p className="text-gray-600">No address available</p>
                )}
              </div>
              {stables.address !== null ? (
                <div className="items-center pb-4 px-4">
                  <p>
                    <ProtocolAddress address={stables.address} />
                  </p>
                </div>
              ) : (
                stables.address
              )}

              <div className="border-t border-gray-600">
                <header className="text-4xl py-4 px-4 sm:text-2xl">
                  Token Cirrculation
                </header>
                <div className="grid grid-cols-4">
                  {valuesArray.sort((a, b) => b.value - a.value).map((item, index) => (
                    <div
                      className={`grid border-b-2 border-gray-700 py-2 px-4 ${
                        index % 2 === 0 ? "bg-[#222f3e]" : ""
                      }`}
                      key={index}
                    >
                      <h3 className="italic">{item.chain}: </h3>
                      <p className="font-mono">
                        {numeral(item.value).format("$0.00a")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default StablecoinPage;
