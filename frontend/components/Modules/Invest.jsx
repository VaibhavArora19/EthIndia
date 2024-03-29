"use client";

import {
  Defi_Contract,
  ERC20_ABI,
  USDC_POLYGON,
  mainContract,
  mainContractABI,
} from "@/constants";
import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useContext } from "react";
import { StateContext } from "../store/StateContext";
import TokensListModal from "../UI/TokensListModal";
import { erc20ABI } from "wagmi";
import { useAccount } from "wagmi";
import { ethers } from "ethers/lib";
import Image from "next/image";
import Loader from "../UI/Loader";
import SuccessModal from "../Modals/SuccessModal";

const Invest = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState(null);
  const [time, setTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(true);
  const [token, setToken] = useState({
    tokenName: "USD Coin (POS)",
    tokenImg: "/usdc.png",
    tokenAddress: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    tokenDecimal: 6,
  });
  const [balance, setBalance] = useState(null);

  const ctx = useContext(StateContext);

  const getBalance = async (t) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(t.tokenAddress, erc20ABI, provider);
    const tBalance = await contract.balanceOf(address);

    setBalance(ethers.utils.formatUnits(tBalance, t.tokenDecimal));
  };

  useEffect(() => {
    if (address) getBalance(token);
  }, [address]);

  const investHandler = async () => {
    //! if user is logged in using metamask

    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const user = await signer.getAddress();
      const contract = new ethers.Contract(
        mainContract,
        mainContractABI,
        signer
      );
      //! usdc contract is of polygon mainnet
      const usdcContract = new ethers.Contract(USDC_POLYGON, ERC20_ABI, signer);
      const tx = await usdcContract.approve(
        mainContract,
        "12111111111111111231111113211"
      );

      await tx.wait();

      // console.log(ethers.utils.parseUnits(amount, 6).toSt);
      const timePeriod = time * 86400;
      await contract.mint(
        user,
        ethers.utils.parseUnits(amount, 6),
        timePeriod,
        { gasLimit: "500000" }
      );

      setIsSuccessfull(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const sendToken = (t) => {
    getBalance(t);
    setToken(t);
  };

  console.log("xxx", token);

  return (
    <div>
      <div className="bg-[#161616] p-2 w-[550px] rounded-xl text-white text-sm">
        <div className="bg-[#000000] py-8 px-6 rounded-xl">
          <div>
            <p className="text-gray-500 text-sm font-semibold  ">Amount</p>
          </div>
          <div className="flex justify-between items-end">
            <input
              placeholder="0.0"
              autoFocus
              className="text-3xl  bg-inherit focus:outline-none outline-none mt-8"
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <p className="text-gray-400">
              Balance:{" "}
              <span>
                {balance && balance.substring(0, 4) + " " + token.tokenName}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className="bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full"
          >
            <p className="text-gray-500 text-sm font-semibold ">
              Deposit Token
            </p>
            <div className="">
              <div className="flex justify-between items-center bg-[#111111] py-3 p-3 rounded-md mt-4 w-full cursor-pointer">
                <div className="flex gap-2 items-center ">
                  {token.tokenImg != "" && (
                    <Image
                      src={!token.length ? token.tokenImg : "/usdc.png"}
                      alt={!token.length ? token.tokenName : "Token"}
                      width={30}
                      height={30}
                    />
                  )}
                  {token.tokenName != "" ? token.tokenName : "Select Token"}
                </div>
                <IoChevronDown />
              </div>
            </div>
          </div>

          <div className="bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full ">
            <p className="text-gray-500 text-sm font-semibold ">Time Span</p>
            <div className="">
              <select
                className="bg-[#111111] outline-none border border-gray-900   py-4 px-2 text-white text-sm rounded-lg mt-4 w-full"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                <option selected disabled>
                  Select time span here
                </option>
                <option value="7">7 Days</option>
                <option value="30">1 Month</option>
                <option value="90">3 Month</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={investHandler}
          type="button"
          className="bg-[#58162D] w-full mt-3 text-white py-3 font-semibold text-base hover:bg-[#421021] tracking-wider   rounded-2xl "
        >
          {loading ? <Loader inComp={true} /> : "Invest in SIT"}
        </button>
      </div>

      {showModal && (
        <TokensListModal
          sendData={sendToken}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}

      {!isSuccessfull && (
        <SuccessModal
          onClose={() => {
            setIsSuccessfull(false);
          }}
        />
      )}
    </div>
  );
};

export default Invest;
