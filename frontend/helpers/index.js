"use client";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";

import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "anon-aadhaar-react";
import { useEffect } from "react";

const AnonAadhaar = () => {
  const [anonAadhaar] = useAnonAadhaar();

  const sendVote = async (_pcd) => {
    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(_pcd);
    write({
      args: [rating, a, b, c, Input],
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
    </div>
  );
};

export default AnonAadhaar;
