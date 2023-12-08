"use client";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";

import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useEffect } from "react";
import { referralAbi, referralContract } from "@/constants";
const AnonAadhaar = () => {
  const [anonAadhaar] = useAnonAadhaar();

  const registerReferrer = async () => {
    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(
      anonAadhaar.pcd
    );
    const { hash } = await writeContract({
      address: referralContract,
      abi: referralAbi,
      functionName: "registerReferrer",
      args: [a, b, c, Input],
    });
  };
  const verifyReferrer = async () => {
    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(
      anonAadhaar.pcd
    );
    const { hash } = await writeContract({
      address: referralContract,
      abi: referralAbi,
      functionName: "registerReferrer",
      args: [a, b, c, Input],
    });
  };

  useEffect(() => {
    console.log("Anon aadhar status", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div>
      <LogInWithAnonAadhaar />
      <p>{anonAadhaar?.status}</p>
      <div>
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
      <div>
        <button onClick={registerReferrer}>Register referrer</button>
        <button onClick={verifyReferrer}>verify referrer</button>
      </div>
    </div>
  );
};

export default AnonAadhaar;
