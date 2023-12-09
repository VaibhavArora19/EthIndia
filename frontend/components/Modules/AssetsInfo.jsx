import React from 'react';

const AssetsInfo = ({ name, value, profit, balance }) => {
  return (
    <div className='flex w-full text-gray-400  py-3 bg-[#161616] mb-2'>
      <p className='flex-1 pl-4'>{name}</p>
      <p className='flex-1 pl-4'>{balance}</p>
      <p className='flex-1 pl-4'>${value}</p>
      <p className='flex-1 pl-4 text-green-700'>${profit}</p>
    </div>
  );
};

export default AssetsInfo;
