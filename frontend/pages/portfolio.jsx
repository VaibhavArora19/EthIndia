import { getAllData } from "@/developer-apis";
import React, { useState, useEffect, useCallback } from "react";
import Refer from "@/components/Modals/Refer";
import AssetsHeader from "@/components/Modules/AssetsHeader";
import AssetsInfo from "@/components/Modules/AssetsInfo";
import PieChart from "@/components/UI/PieChart";
import { dummyAssets, headers } from "@/data";
import Image from "next/image";
import { SERVER_URL, mainContractABI } from "@/constants";
import { useAccount } from "wagmi";
import { Skeleton } from "@mui/material";
import { ethers } from "ethers";

const Portfolio = () => {
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [totalSup, setTotalSup] = useState(null);
  const [sitBalance, setSitBalance] = useState(null);
  const [roi, setRoi] = useState(null);
  const { address } = useAccount();

  const getData = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      "0xb1FCFBaf795ad5997e83FC9816BC4BB876ae0399",
      mainContractABI,
      provider
    );

    const balancee = await contract.balanceOf(address);
    const totalSupply = await contract.totalSupply();
    console.log("ttotla", totalSupply.toString());
    setTotalSup(totalSupply.toString());

    const balanceSIT = ethers.utils.formatUnits(balancee, 18);
    // console.log("bbb", ethers.utils.formatUnits(balanceSIT, 18));

    setSitBalance(balanceSIT);

    const data = await fetch(`${SERVER_URL}/token/details/${address}`);

    const info = await data.json();
    console.log("gg", info);
    let balance = 0;
    let rateOfInterest = 0;
    for (const token of info.tokenInfo) {
      balance += token.value_usd;
      rateOfInterest += token.roi;
    }
    setRoi(rateOfInterest / 3);
    setTokenInfo(info.tokenInfo);
    setTotalBalance(
      +totalSupply.toString() > 0
        ? (balance / +totalSupply.toString()) * balanceSIT
        : balance.toString()
    );
  }, [address]);

  useEffect(() => {
    if (address) {
      console.log("add", address);
      getData();
    }
  }, [address, getData]);

  return (
    <main className="flex flex-col pt-28 min-h-screen  px-10 font-Avenir bg-black w-fit">
      <div className="w-fit">
        <div className="flex justify-between items-center mb-5">
          <p className="text-white text-2xl  font-semibold">
            {address &&
              "Welcome, " +
                address.substring(0, 8) +
                "..." +
                address.substring(36, 43)}
          </p>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-pink-700/40 text-pink-500 hover:bg-pink-800/40 py-3 px-12 text-sm rounded-md cursor-pointer font-semibold"
          >
            Refer & Earn
          </button>
        </div>

        <div className="flex gap-6">
          <div className="bg-gradient-to-tr from-[#4C0D25]  to-[#984253] text-white p-6 rounded-xl w-[350px]">
            <Image
              height={35}
              width={35}
              src="/stats_hovered.svg"
              alt="Total Earning"
              className="bg-white/40 rounded-md p-2"
            />
            <p className="text-sm mt-8 mb-1">Total Balance</p>
            <p className="text-3xl font-semibold">
              {totalBalance >= 0 ? (
                `$ ${totalBalance?.toString()?.substring(0, 8)}`
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={40}
                  sx={{
                    background: "#000/80",
                    borderRadius: "12px",
                    marginTop: "8px",
                  }}
                />
              )}
            </p>
          </div>

          <div className="bg-[#151515] text-[#707070] p-6 rounded-xl w-[350px]">
            <Image
              height={35}
              width={35}
              src="/chart.svg"
              alt="SIT Tokens"
              className="bg-[#414141] rounded-md p-2"
            />
            <p className="text-sm mt-8 mb-1">SIT Tokens</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-semibold">
                {sitBalance ? (
                  sitBalance
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={40}
                    sx={{
                      background: "#000/80",
                      borderRadius: "12px",
                      marginTop: "8px",
                    }}
                  />
                )}
              </p>
              <p className="text-sm ">~$2,322 USD Coin (POS)</p>
            </div>
          </div>

          <div className="bg-[#151515] text-[#707070] p-6 rounded-xl w-[350px]">
            <Image
              height={35}
              width={35}
              src="/icon.svg"
              alt="ROI"
              className="bg-[#414141] rounded-md p-2"
            />
            <p className="text-sm mt-8 mb-1">Rate Of Interest</p>
            <p className="text-3xl font-semibold">
              {roi ? (
                `${Math.round(roi.toString().substring(0, 4) * 100)}%`
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={40}
                  sx={{
                    background: "#1f1f1f",
                    borderRadius: "12px",
                    marginTop: "8px",
                  }}
                />
              )}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex mb-5 gap-2 mt-10">
          <p
            onClick={() => {
              setShowTable(true);
              setShowChart(false);
            }}
            className={`${
              showTable
                ? "bg-pink-700/20 text-pink-500 hover:bg-pink-700/40"
                : "text-gray-400"
            }  hover:bg-[#2A2B2E] py-1 px-12 text-sm rounded-md cursor-pointer`}
          >
            Assets
          </p>
          <p
            onClick={() => {
              setShowTable(false);
              setShowChart(true);
            }}
            className={`${
              showChart
                ? "bg-pink-700/20 text-pink-500 hover:bg-pink-700/40"
                : "text-gray-400"
            }  hover:bg-[#2A2B2E] py-1 text-sm px-12 rounded-md cursor-pointer`}
          >
            Chart
          </p>
        </div>
      </div>

      {showChart &&
        (tokenInfo ? (
          <div className="w-[800px] h-[800px]  mt-10 mx-auto">
            <PieChart tokenInfo={tokenInfo} />
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            width={500}
            height={500}
            sx={{
              background: "#1f1f1f",
              borderRadius: "500px",
              margin: "8px auto",
            }}
          />
        ))}

      {showTable && (
        <div className="w-full">
          <AssetsHeader headers={headers} />

          {tokenInfo &&
            tokenInfo.length > 0 &&
            tokenInfo.map((asset) =>
              asset.value ? (
                <AssetsInfo
                  totalSupply={totalSup}
                  sitBalance={sitBalance}
                  key={asset.name}
                  balance={asset.amount}
                  profit={asset.abs_profit_usd}
                  name={asset.name}
                  value={asset.value_usd}
                />
              ) : (
                <></>
              )
            )}
        </div>
      )}

      {showModal && (
        <Refer
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </main>
  );
};

export default Portfolio;
