import Invest from '@/components/Modules/Invest';
import Onramper from '@/components/Modules/Onramper';
import { useState } from 'react';

export default function Home() {
  const [fiat, setFiat] = useState(false);
  const [crypto, setCrypto] = useState(true);

  return (
    <main >
      <div className='flex mb-5 gap-2 w-[550px]'>
        <p
          onClick={() => {
            setCrypto(true);
            setFiat(false);
          }}
          className={`${
            crypto
              ? 'bg-pink-700/20 text-pink-500 hover:bg-pink-700/40'
              : 'text-gray-400'
          }  hover:bg-[#2A2B2E] py-1 px-6 text-sm rounded-md cursor-pointer`}>
          Crypto
        </p>
        <p
          onClick={() => {
            setCrypto(false);
            setFiat(true);
          }}
          className={`${
            fiat
              ? 'bg-pink-700/20 text-pink-500 hover:bg-pink-700/40'
              : 'text-gray-400'
          }  hover:bg-[#2A2B2E] py-1 text-sm px-6 rounded-md cursor-pointer`}>
          Fiat
        </p>
      </div>

      {crypto ? <Invest /> : <Onramper />}
    </main>
  );
}
