// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const crypto = require("crypto");
const anon = require("anon-aadhaar-pcd");
const fs = require("fs");
const axios = require("axios");
async function fetchKey(keyURL) {
  const keyData = await (
    await axios.get(keyURL, {
      responseType: "arraybuffer",
    })
  ).data;
  return keyData;
}

async function main() {
  const token = await hre.ethers.deployContract(
    "SystematicInvestmentToken",
    [5, 100000]
  );
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(tokenAddress);
  const verifier = await hre.ethers.deployContract("Verifier");
  await verifier.waitForDeployment();

  const _verifierAddress = await verifier.getAddress();
  console.log(_verifierAddress);
  const app_id = BigInt(
    "196700487049306364386084600156231018794323017728"
  ).toString(); // random value.
  const anonAadhaarVerifier = await ethers.deployContract(
    "AnonAadhaarVerifier",
    [_verifierAddress, app_id]
  );
  await anonAadhaarVerifier.waitForDeployment();

  const _anonAadhaarVerifierAddress = await anonAadhaarVerifier.getAddress();
  console.log(_anonAadhaarVerifierAddress);

  const ReferralPlugin = await ethers.deployContract("ReferralPlugin", [
    tokenAddress,
    _anonAadhaarVerifierAddress,
  ]);

  await ReferralPlugin.waitForDeployment();

  console.log(
    `ReferralPlugin contract deployed to ${await ReferralPlugin.getAddress()}`
  );

  // const testFile = __dirname + "/signed.pdf";
  // const pdfRaw = fs.readFileSync(testFile);
  // const pdfBuffer = Buffer.from(pdfRaw);
  // const extractedData = await anon.extractWitness(pdfBuffer, "test123");
  // let witnessInputs = {
  //   signature: anon.splitToWords(
  //     extractedData.sigBigInt,
  //     BigInt(64),
  //     BigInt(32)
  //   ),
  //   modulus: anon.splitToWords(
  //     extractedData.modulusBigInt,
  //     BigInt(64),
  //     BigInt(32)
  //   ),
  //   base_message: anon.splitToWords(
  //     extractedData.msgBigInt,
  //     BigInt(64),
  //     BigInt(32)
  //   ),
  //   app_id: app_id,
  // };

  // const { a, b, c, Input } = await anon.exportCallDataGroth16(
  //   witnessInputs,
  //   await fetchKey(anon.WASM_URL),
  //   await fetchKey(anon.ZKEY_URL)
  // );
  // console.log(a, b, c, Input);

  // console.log(await anonAadhaarVerifier.verifyProof(a, b, c, Input));

  // await ReferralPlugin.registerReferrer(a, b, c, Input);
  // console.log("registered");

  // await ReferralPlugin.verifyRefer(
  //   "0xE643CF465eDE9ad11E152BAb8d3cdC6CBC3712E1",
  //   "0xF8f812A245f9bbc083386Ec4615bC15e02b4D5ff",
  //   a,
  //   b,
  //   c,
  //   Input
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
