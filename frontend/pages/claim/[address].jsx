import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { referralAbi, referralContract } from "@/constants";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";

const Claim = () => {
  const router = useRouter();
  const [anonAadhaar] = useAnonAadhaar();
  const [claimed, setClaimed] = useState(false);
  const { address } = router.query;

  const verifyReferrer = async () => {
    try {
      const { a, b, c, Input } = await exportCallDataGroth16FromPCD(
        anonAadhaar.pcd
      );
      const { hash } = await writeContract({
        address: referralContract,
        abi: referralAbi,
        functionName: "verifyRefer",
        args: [address, a, b, c, Input],
      });
      await waitForTransaction({ hash });
      setClaimed(true);
      toast.success("Claimed Successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="min-h-screen w-screen text-white pt-20 px-10 flex justify-center items-center">
      <div>
        <div className="bg-[#151515] w-[600px] p-6 rounded-md">
          <div>
            {!claimed ? (
              <div>
                <p className="text-2xl font-semibold">Claim your rSIT</p>
                <p className="text-sm text-gray-400 mt-1">
                  Note: Referall system is only available for Indian citizens
                  and the people who have Aadhar card.
                </p>

                <p className="text-left my-4 font-semibold">
                  10,000 rSITs = 1 SIT
                </p>
                {anonAadhaar.status != "logged-in" ? (
                  <LogInWithAnonAadhaar />
                ) : (
                  <button
                    onClick={verifyReferrer}
                    className="w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40"
                  >
                    Claim
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-[0.5] relative min-h-[700px] ">
                <Image className=" object-cover " src="/nft" fill />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Claim;
