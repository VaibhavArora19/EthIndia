import PieChart from '@/components/UI/PieChart';
import Image from 'next/image';
import React, { useState } from 'react';

const Portfolio = () => {
  const [showTable, setShowTable] = useState(true);
  const [showChart, setShowChart] = useState(false);

  return (
    <main className='flex flex-col pt-28 min-h-screen mx-auto px-10 font-Avenir bg-black'>
      <div>
        <p className='text-white text-2xl mb-5 font-semibold'>Welcome, Aman!</p>

        <div className='flex gap-6'>
          <div className='bg-gradient-to-tr from-[#883389] via-[#8056A4] to-[#4054EC] text-white p-6 rounded-xl w-[350px]'>
            <Image
              height={35}
              width={35}
              src='/stats_hovered.svg'
              alt='Total Earning'
              className='bg-white/40 rounded-md p-2'
            />
            <p className='text-sm mt-8 mb-1'>Total Balance</p>
            <p className='text-3xl font-semibold'>$98,231</p>
          </div>

          <div className='bg-[#151515] text-[#707070] p-6 rounded-xl w-[350px]'>
            <Image
              height={35}
              width={35}
              src='/stats_hovered.svg'
              alt='Total Earning'
              className='bg-[#414141] rounded-md p-2'
            />
            <p className='text-sm mt-8 mb-1'>SIT Tokens</p>
            <div className='flex items-center justify-between'>
              <p className='text-3xl font-semibold'>34</p>
              <p className='text-sm '>~$2,322 USD Coin (POS)</p>
            </div>
          </div>

          <div className='bg-[#151515] text-[#707070] p-6 rounded-xl w-[350px]'>
            <Image
              height={35}
              width={35}
              src='/stats_hovered.svg'
              alt='Total Earning'
              className='bg-[#414141] rounded-md p-2'
            />
            <p className='text-sm mt-8 mb-1'>Return Of Interest</p>
            <p className='text-3xl font-semibold'>120%</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex mb-5 gap-2 mt-10'>
          <p
            onClick={() => {
              setShowTable(true);
              setShowChart(false);
            }}
            className={`${
              showTable
                ? 'bg-pink-700/20 text-pink-500 hover:bg-pink-700/40'
                : 'text-gray-400'
            }  hover:bg-[#2A2B2E] py-1 px-12 text-sm rounded-md cursor-pointer`}>
            Assets
          </p>
          <p
            onClick={() => {
              setShowTable(false);
              setShowChart(true);
            }}
            className={`${
              showChart
                ? 'bg-pink-700/20 text-pink-500 hover:bg-pink-700/40'
                : 'text-gray-400'
            }  hover:bg-[#2A2B2E] py-1 text-sm px-12 rounded-md cursor-pointer`}>
            Chart
          </p>
        </div>
      </div>

      {showChart && (
        <div className='w-[800px] h-[800px]  mt-10 mx-auto'>
          <PieChart />
        </div>
      )}
    </main>
  );
};

export default Portfolio;