import { ERC20_ABI, mainContract, mainContractABI } from "@/constants";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";

export const getTokenAmount = async () => {
  const contractAddress = mainContract;

  const url = `https://api.1inch.dev/balance/v1.2/137/balances/${contractAddress}`;

  const data = await fetch(url, {
    headers: {
      Authorization: "Bearer CTMFKZSuNPsU5bBotvflkkiBxFqoEQAB",
    },
  });

  console.log(data.status);

  const response = await data.json();

  console.log("rr", response);
};

export const getTokenDetails = async (walletAddress, contractAddress) => {
  const url =
    "https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details";

  // const addresses = "0x5362fffC85632301293E78512063837c145c13F9";
  // const contract_address = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  const range = "1year";
  const chain_id = "137";

  const data = await fetch(
    `${url}?addresses=${walletAddress}&contract_address=${contractAddress}&timerange=${range}&chain_id=${chain_id}`,
    {
      headers: {
        Authorization: "Bearer CTMFKZSuNPsU5bBotvflkkiBxFqoEQAB",
      },
    }
  );
  const response = await data.json();

  console.log("rr", response);
};

export const getTokenPrices = async (addresses) => {
  const tokenAddresses = document.write(addresses.toString());

  const url = `https://api.1inch.dev/price/v1.1/137/${tokenAddresses}?currency=USD`;

  const data = await fetch(url, {
    headers: {
      Authorization: "Bearer CTMFKZSuNPsU5bBotvflkkiBxFqoEQAB",
    },
  });

  const response = await data.json();

  console.log("rr", response);
};

export const getSitTokenBalance = async (userAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(mainContract, mainContractABI, signer);

  const sitBalance = await contract.balanceOf(userAddress);

  return sitBalance;
};

export const getTokenBalanceWithPrices = async () => {
  const tokenAmount = await getTokenAmount();
  const tokenBalance = await getTokenPrices();
};

export const getTokensAllInfo = async (tokenAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/pBqgId5698tBoNxlWJdzCmYPc07ewNuY"
  );

  const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();

  return { name, symbol };
};

export const getAllData = async () => {
  const balance = await getSitTokenBalance();

  return balance;
};

export const getTokensInfo = async (walletAddress) => {
  const tokens = await getTokenAmount();

  let tokensWithBalance;

  for (let key in tokens) {
    if (tokens.hasOwnProperty(key)) {
      value = tokens[key];

      if (value !== "0") {
        tokensWithBalance.push({ address: key, value: value });
      }
    }
  }

  for (let i = 0; i < tokensWithBalance.length; i++) {
    const data = await getTokenDetails(
      walletAddress,
      tokensWithBalance[i].address
    );

    const { name, symbol } = await getTokensAllInfo(
      tokensWithBalance[i].address
    );

    tokensWithBalance[i] = {
      ...tokensWithBalance[i],
      ...data,
      name,
      symbol,
    };
  }

  return tokensWithBalance;
};
