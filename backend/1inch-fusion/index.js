require("dotenv").config();
const {
  FusionSDK,
  PrivateKeyProviderConnector,
  NetworkEnum,
} = require("@1inch/fusion-sdk");
const { Web3 } = require("web3");

async function swapUsingFusion(
  fromTokenAddress,
  toTokenAddress,
  amount,
  walletAddress
) {
  const provider = new Web3(process.env.POLYGON_KEY);

  const blockchainProvider = new PrivateKeyProviderConnector(
    process.env.PRIVATE_KEY,
    provider
  );

  const sdk = new FusionSDK({
    url: "http://fusion.1inch.io",
    network: NetworkEnum.POLYGON,
    blockchainProvider,
  });

  const orderInfo = await sdk.placeOrder({
    fromTokenAddress,
    toTokenAddress,
    amount,
    walletAddress,
  });

  console.log("order", orderInfo);
}

module.exports = swapUsingFusion;
