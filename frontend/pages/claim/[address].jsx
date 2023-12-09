import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { referralAbi, referralContract } from "@/constants";
import { writeContract, waitForTransaction, readContract } from "@wagmi/core";
import { exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";
import { useAccount } from "wagmi";

const Claim = () => {
  const { address: referred } = useAccount();

  const router = useRouter();
  const [anonAadhaar] = useAnonAadhaar();
  const [claimed, setClaimed] = useState(false);
  const { address } = router.query;

  const getRefered = async () => {
    try {
      const data = await readContract({
        address: referralContract,
        abi: referralAbi,
        functionName: "referred",
        args: [referred],
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  getRefered();

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
        <div className="bg-[#151515] w-[500px] p-6 rounded-md">
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
              <div className="">
                <p className="text-center text-xl font-semibold mb-4">
                  Successfully Claimed!
                </p>
                <p className="text-sm text-gray-300 mb-5">
                  Hurray! You have successfully applied for the rSIT claim. Do
                  the first transaction on platform to claim rSIT.
                </p>
                <Image
                  src="/done.png"
                  height={200}
                  width={200}
                  className="mx-auto"
                />

                <button
                  className="w-full text-center py-3 bg-pink-700/40 text-white rounded-md hover:bg-pink-800/40 mt-6"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Start Investing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Claim;
