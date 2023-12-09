import Image from 'next/image';
import React, { useState } from 'react';
import usdc from '../../public/usdc.png';
import bnbImg from '../../public/bnb.png';
import Backdrop from './Backdrop';

const tokens = [
  {
    tokenId: '97',
    tokenImg: bnbImg,
    tokenName: 'BNB (Pos)',
  },
  {
    tokenId: '80001',
    tokenImg: usdc,
    tokenName: 'USD Coin (Pos)',
  },
];

const TokensListModal = ({ onClose, sendData }) => {
  // const [chain, setChain] = useState(null)

  const onClick = (token) => {
    const data = {
      tokenName: token.tokenName,
      tokenImg: token.tokenImg,
      tokenId: token.tokenId,
    };
    sendData(data);
    onClose();
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className='w-[450px] rounded-2xl absolute top-[50%] left-[50%] shadow-md -translate-x-[50%] -translate-y-[50%] z-40 rounded-b-2xl  overflow-hidden border border-gray-800 font-Avenir'>
        <div className='bg-[#232323] pt-6 pb-6 px-4 w-full  rounded-t-2xl'>
          <h2 className='text-gray-500 font-semibold'>Select a token</h2>
        </div>
        <div className=' bg-[#151515] p-3 text-white flex flex-col gap-2 overflow-y-scroll max-h-[350px]'>
          {tokens.map((token, i) => (
            <div
              onClick={() => onClick(token)}
              className='py-3 px-3 flex gap-4 hover:bg-[#323131] cursor-pointer rounded-xl'>
              <Image
                src={token.tokenImg}
                alt={token.tokenName}
                width={40}
                height={40}
              />
              <div className='flex items-center'>
                <h3 className='font-semibold'>{token.tokenName}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TokensListModal;
