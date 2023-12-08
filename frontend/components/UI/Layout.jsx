import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className='bg-[url("/bg.png")] h-screen w-screen  font-Avenir'>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
