import Layout from "@/components/UI/Layout";
import "@/styles/globals.css";
import { Web3Modal } from "@/context/Web3Modal";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { createConfig, configureChains } from "@wagmi/core";
import { alchemyProvider } from "wagmi/providers/alchemy";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "447f07b599262f049ffcd2e6435d1856";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [alchemyProvider({ apiKey: "dykRbudzIvk8Zxb-P_Keuzyr8zHYvJd2" })]
);

const config = createConfig({
  chains,
  publicClient,
  webSocketPublicClient,
});
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <AnonAadhaarProvider
          _appId="196700487049306364386084600156231018794323017728"
          _isWeb={false}
        >
          <Component {...pageProps} />
        </AnonAadhaarProvider>
      </Layout>
    </WagmiConfig>
  );
}
