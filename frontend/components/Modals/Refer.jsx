import React, { useState } from 'react';
import Backdrop from '../UI/Backdrop';
import { FaLink } from 'react-icons/fa6';
import { useAccount } from 'wagmi';
import { exportCallDataGroth16FromPCD } from 'anon-aadhaar-pcd';
import { writeContract, waitForTransaction } from '@wagmi/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { referralAbi, referralContract } from '@/constants';

import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from 'anon-aadhaar-react';
const Refer = ({ onClose }) => {
  const { address } = useAccount();
  const [anonAadhaar] = useAnonAadhaar();
  const [register, setRegister] = useState(false);

  const registerReferrer = async () => {
    try {
      const { a, b, c, Input } = await exportCallDataGroth16FromPCD(
        anonAadhaar.pcd
      );
      const { hash } = await writeContract({
        address: referralContract,
        abi: referralAbi,
        functionName: 'registerReferrer',
        args: [a, b, c, Input],
      });
      await waitForTransaction({ hash });
      console.log('xxx', hash);
      setRegister(true);
      toast.success('Registered Successfully');
    } catch (e) {
      console.log(e);
    }
  };
  console.log(anonAadhaar.status);
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className='bg-[#0F0F0F] w-[500px] fixed top-[50%] left-[50%] text-white -translate-x-[50%] -translate-y-[50%] z-30 p-6 rounded-md'>
        <p className='text-2xl font-semibold mb-1'>Refer & Earn</p>
        <p className='mb-5'>
          Only people with the aadhar card can use this Referal system signing
          up with ANON Aadhar.
        </p>

        <p className='text-sm font-semibold text-left mb-5'>Note: 10 rSIT = 1 SIT</p>
        {/** Hide once logged in */}
        {anonAadhaar.status != 'logged-in' ? (
          <LogInWithAnonAadhaar />
        ) : register ? (
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/claim/${address}`
              );
              toast.success('copied');
            }}
            className='w-full flex items-center gap-2 justify-center text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40'>
            <FaLink size={20} />
            <p>Copy Link</p>
          </button>
        ) : (
          <div>
            {/* Show After login with Aadhar */}
            <button
              className='w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40'
              onClick={registerReferrer}>
              Register
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Refer;
