import React from "react";

const AssetsInfo = ({ name, value, profit, balance }) => {
  return (
    <div className="flex w-full text-gray-400  py-3 bg-[#161616] mb-2">
      <p className="flex-1 pl-4">{name}</p>
      <p className="flex-1 pl-4">{balance.toString().substring(0, 8)}</p>
      <p className="flex-1 pl-4">${value.toString().substring(0, 8)}</p>
      <p className="flex-1 pl-4 text-green-700">
        ${profit.toString().substring(0, 8)}
      </p>
    </div>
  );
};

export default AssetsInfo;
