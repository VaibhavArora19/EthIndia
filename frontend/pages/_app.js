import Layout from "@/components/UI/Layout";
import "@/styles/globals.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <AnonAadhaarProvider _appId="196700487049306364386084600156231018794323017728">
        <Component {...pageProps} />
      </AnonAadhaarProvider>
    </Layout>
  );
}
