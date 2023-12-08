import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='bg-[url("/bg.png")] h-screen w-screen  '>
      <Navbar />
      <div className='flex justify-center items-center h-full'>{children}</div>
    </div>
  );
};

export default Layout;
