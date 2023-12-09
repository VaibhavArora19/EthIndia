import Layout from "@/components/UI/Layout";
import "@/styles/globals.css";
import { Web3Modal } from "@/context/Web3Modal";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function App({ Component, pageProps }) {
  return (
    <Web3Modal>
      <Layout>
        <AnonAadhaarProvider _appId="196700487049306364386084600156231018794323017728">
          <Component {...pageProps} />
        </AnonAadhaarProvider>
      </Layout>
    </Web3Modal>
  );
}
