const Navbar = () => {
  return (
    <nav className='w-full py-3 justify-between flex px-10 text-white fixed font-Avenir items-center bg-inherit  z-10'>
      <p>SIT</p>
      <button className='bg-[#292929] hover:bg-[#333333] text-sm py-2 px-6 rounded-md'>
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
