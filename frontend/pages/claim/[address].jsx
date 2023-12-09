import { LogInWithAnonAadhaar } from 'anon-aadhaar-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Claim = () => {
  const router = useRouter();

  const { address } = router.query;

  const claimButtonHandler = () => {};

  return (
    <section className='min-h-screen w-screen text-white pt-20 px-10 flex justify-center items-center'>
      <div>
        <div className='bg-[#151515] w-[600px] p-6 rounded-md'>
          <p className='text-2xl font-semibold'>Claim your rSIT</p>
          <p className='text-sm text-gray-400 mt-1'>
            Note: Referall system is only available for Indian citizens and the
            people who have Aadhar card.
          </p>

          <p className='text-left my-4 font-semibold'>10,000 rSITs = 1 SIT</p>

          <LogInWithAnonAadhaar />

          {/* Show After login with Aadhar */}
          {/* <button
            onClick={claimButtonHandler}
            className='w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40'>
            Claim
          </button> */}
        </div>
        {/* <div className='flex-[0.5] relative min-h-[700px] '>
          <Image
            className=' object-cover '
            src='/nft'
            fill
          />
        </div> */}
      </div>
    </section>
  );
};

export default Claim;
