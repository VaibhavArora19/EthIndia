require("@nomicfoundation/hardhat-toolbox");
require("hardhat-dependency-compiler");
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.19",
      },
    ],
  },
  dependencyCompiler: {
    paths: ["anon-aadhaar-contracts/contracts/Verifier.sol"],
  },

  networks: {
    zkevm: {
      // If not set, you can get your own Alchemy API key at https://dashboard.alchemyapi.io or https://infura.io
      url: "https://rpc.public.zkevm-test.net	",
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    mumbai: {
      // If not set, you can get your own Alchemy API key at https://dashboard.alchemyapi.io or https://infura.io
      url: "https://polygon-testnet.public.blastapi.io",
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonZkEVMTestnet: "DGGT1IJ7YX5CJ39I2U3KRGW1T45A4BYWW2",
      polygonMumbai: "USK8S3HV5D9GMWA14TF9WKI4KRBW4Z27C7",
    },
  },
};
