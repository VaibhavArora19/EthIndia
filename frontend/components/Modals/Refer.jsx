import React from 'react';
import Backdrop from '../UI/Backdrop';
import { LogInWithAnonAadhaar } from 'anon-aadhaar-react';
import { FaLink } from 'react-icons/fa6';
import { useAccount } from 'wagmi';

const Refer = ({ onClose }) => {
  const { address } = useAccount();
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className='bg-[#0F0F0F] w-[500px] fixed top-[50%] left-[50%] text-white -translate-x-[50%] -translate-y-[50%] z-30 p-6 rounded-md'>
        <p className='text-2xl font-semibold mb-1'>Refer & Earn</p>
        <p className='mb-10'>
          Only people with the aadhar card can use this Referal system signing
          up with ANON Aadhar.
        </p>

        {/** Hide once logged in */}
        <LogInWithAnonAadhaar />

        {/* Show After login with Aadhar */}
        <button className='w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40'>
          Register
        </button>

        {/* Show After register */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.origin}/claim/${address}`
            );
          }}
          className='w-full flex items-center gap-2 justify-center text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40'>
          <FaLink size={20} />
          <p>Copy Link</p>
        </button>
      </div>
    </>
  );
};

export default Refer;
