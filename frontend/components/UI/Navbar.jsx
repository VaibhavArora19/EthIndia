import HomeButton from "./HomeButton";
import { useRouter } from "next/router";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const Navbar = () => {
  const router = useRouter();
  const { open } = useWeb3Modal();

  return (
    <nav className="w-full py-3 justify-between flex px-10 text-white fixed font-Avenir items-center bg-inherit  z-10">
      <p>SIT</p>

      <div className="flex gap-4 items-center ">
        <p
          className="cursor-pointer"
          onClick={() => {
            router.push("/portfolio");
          }}
        >
          Portfolio
        </p>
        <button
          className="bg-[#292929] hover:bg-[#333333] text-sm py-2 px-6 rounded-md"
          onClick={() => {
            open();
          }}
        >
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
