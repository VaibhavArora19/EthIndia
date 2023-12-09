import Image from 'next/image';
import React from 'react';
import Backdrop from '../UI/Backdrop';

const SuccessModal = ({onClose}) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className='bg-[#0F0F0F] w-[500px] fixed top-[50%] left-[50%] text-white -translate-x-[50%] -translate-y-[50%] z-30 p-6 rounded-md'>
        <p className='text-center text-xl font-semibold mb-4'>
          Successfully Invested!
        </p>
        <p className='text-sm text-gray-300 mb-5'>
          Hurray! You have successfully invested in SIT. Professionals need some
          time to invest your funds in good tokens and pools, have patience.
        </p>
        <Image
          src='/done.png'
          height={200}
          width={200}
          className='mx-auto'
        />

        <button
          className='w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40 mt-6'
          onClick={() => {
            router.push('/');
          }}>
          Check Portfolio
        </button>
      </div>
    </>
  );
};

export default SuccessModal;
