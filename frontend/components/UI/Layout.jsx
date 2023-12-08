import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='bg-[url("/bg.png")] h-screen w-screen  font-Avenir'>
      <Navbar />
      <div className='flex justify-center pt-36 h-full'>{children}</div>
    </div>
  );
};

export default Layout;
