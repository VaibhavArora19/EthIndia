import Image from 'next/image';
import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const Invest = () => {
  return (
    <div>
      <div className='bg-[#161616] p-2 w-[550px] rounded-xl text-white text-sm'>
        <div className='bg-[#000000] py-8 px-6 rounded-xl'>
          <div>
            <p className='text-gray-500 text-sm font-semibold  '>Amount</p>
          </div>
          <div className='flex justify-between items-end'>
            <input
              placeholder='0.0'
              autoFocus
              className='text-3xl  bg-inherit focus:outline-none outline-none mt-8'
              type='number'
            />
            <p className='text-gray-400'>
              Balance: <span>844 USDC</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between items-center gap-2'>
          <div className='bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full'>
            <p className='text-gray-500 text-sm font-semibold '>
              Deposit Token
            </p>
            <div className=''>
              <div className='flex justify-between items-center bg-[#111111] py-3 p-3 rounded-md mt-4 w-full cursor-not-allowed'>
                <div className='flex gap-2 items-center '>
                  <Image
                    src='/usdc.png'
                    height={30}
                    width={30}
                    alt='usdc'
                    className='rounded-full '
                  />
                  <p className='font-medium'>USDC</p>
                </div>
                <IoChevronDown />
              </div>
            </div>
          </div>

          <div className='bg-[#000000] py-8 px-6 rounded-xl mt-2 w-full '>
            <p className='text-gray-500 text-sm font-semibold '>Time Span</p>
            <div className=''>
              <select className='bg-[#111111] outline-none border border-gray-900   py-4 px-2 text-white text-sm rounded-lg mt-4 w-full'>
                <option
                  selected
                  disabled>
                  {' '}
                  Select time span here
                </option>
                <option>1 Day</option>
                <option>1 Week</option>
                <option>1 Month</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type='button'
          className='bg-[#883489] w-full mt-3 text-white py-3 font-semibold text-base hover:bg-[#612562] tracking-wider   rounded-2xl '>
          Invest in SIT
        </button>
      </div>
    </div>
  );
};

export default Invest;
