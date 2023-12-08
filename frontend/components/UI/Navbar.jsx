import HomeButton from './HomeButton';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='w-full py-3 justify-between flex px-10 text-white fixed font-Avenir items-center bg-inherit  z-10'>
      <p>SIT</p>

      <div className='flex gap-4 items-center '>
        <p
          className='cursor-pointer'
          onClick={() => {
            router.push('/portfolio');
          }}>
          Portfolio
        </p>
        <HomeButton />
      </div>
    </nav>
  );
};

export default Navbar;
