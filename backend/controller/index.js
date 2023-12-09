const express = require("express");
const { getTokensInfo } = require("../1inch-dev-api");
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

module.exports = router;
