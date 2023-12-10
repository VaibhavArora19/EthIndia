import React from "react";

const AssetsInfo = ({
  totalSupply,
  sitBalance,
  name,
  value,
  profit,
  balance,
}) => {
  const val = totalSupply != 0 ? (+value / totalSupply) * sitBalance : value;
  const bal =
    totalSupply != 0 ? (+balance / totalSupply) * sitBalance : balance;
  const prof = totalSupply != 0 ? (+profit / totalSupply) * sitBalance : profit;

  // console.log("sadasd", val, bal, prof);

  return (
    <div className="flex w-full text-gray-400  py-3 bg-[#161616] mb-2">
      <p className="flex-1 pl-4">{name}</p>
      <p className="flex-1 pl-4">{bal?.toString()?.substring(0, 8)}</p>
      <p className="flex-1 pl-4">${val?.toString()?.substring(0, 8)}</p>
      <p
        className={`flex-1 pl-4  ${
          prof < 0 ? "text-red-700" : "text-green-700"
        }`}
      >
        {prof?.toString().substring(0, 8)}$
      </p>
    </div>
  );
};

export default AssetsInfo;
