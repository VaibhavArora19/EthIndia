import {
  Defi_Contract,
  ERC20_ABI,
  USDC_POLYGON,
  mainContract,
} from "@/constants";
import { ethers } from "ethers/lib";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useContext } from "react";
import { StateContext } from "../store/StateContext";

const Invest = () => {
  const [amount, setAmount] = useState(null);
  const [time, setTime] = useState(null);
  const ctx = useContext(StateContext);

  const investHandler = async () => {
    //! if user is logged in using metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const user = await signer.getAddress();

    const contract = new ethers.Contract(mainContract, Defi_Contract, signer);

    //! usdc contract is of polygon mainnet
    const usdcContract = new ethers.Contract(USDC_POLYGON, ERC20_ABI, signer);

    await usdcContract.approve(mainContract, "12111111111111111231111113211");

    const timePeriod = time * 86400;

    await contract.mint(user, amount, timePeriod);
  };

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
              Balance: <span>844 USDC</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full">
            <p className="text-gray-500 text-sm font-semibold ">
              Deposit Token
            </p>
            <div className="">
              <div className="flex justify-between items-center bg-[#111111] py-3 p-3 rounded-md mt-4 w-full cursor-not-allowed">
                <div className="flex gap-2 items-center ">
                  <Image
                    src="/usdc.png"
                    height={30}
                    width={30}
                    alt="usdc"
                    className="rounded-full "
                  />
                  <p className="font-medium">USDC</p>
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
                  {" "}
                  Select time span here
                </option>
                <option value="1">1 Day</option>
                <option value="7">1 Week</option>
                <option value="30">1 Month</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={investHandler}
          type="button"
          className="bg-[#883489] w-full mt-3 text-white py-3 font-semibold text-base hover:bg-[#612562] tracking-wider   rounded-2xl "
        >
          Invest in SIT
        </button>
      </div>
    </div>
  );
};

export default Invest;
