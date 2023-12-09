const express = require("express");
const { getTokensInfo } = require("../1inch-dev-api");
const swapUsingFusion = require("../1inch-fusion");
const router = express.Router();

router.get("/token/details/:walletAddress", async (req, res, next) => {
  try {
    const { walletAddress } = req.params;

    const tokenInfo = await getTokensInfo(walletAddress);

    console.log("gg", tokenInfo);
    return res.status(200).json({ tokenInfo });
  } catch (error) {
    console.log("err", error);
  }
});

router.get("/place/order", async (req, res, next) => {
  try {
    const { fromTokenAddress, toTokenAddress, walletAddress, amount } =
      req.query;

    await swapUsingFusion(
      fromTokenAddress,
      toTokenAddress,
      amount,
      walletAddress
    );

    return res.status(200).json({ message: "Succesfully swapped" });
  } catch (error) {
    console.log("err", error);
  }
});

module.exports = router;
