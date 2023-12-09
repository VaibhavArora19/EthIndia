// import { ERC20_ABI, mainContract, mainContractABI } from "./constants";
// import { ethers } from "ethers";
const { ERC20_ABI, mainContract, mainContractABI } = require('../constants');
const { ethers } = require('ethers');

const getTokenAmount = async () => {
  const contractAddress = mainContract; //!change this to main contract
  //   console.log("first");

  const url = `https://api.1inch.dev/balance/v1.2/137/balances/${contractAddress}`;

  const data = await fetch(url, {
    headers: {
      Authorization: 'Bearer CTMFKZSuNPsU5bBotvflkkiBxFqoEQAB',
    },
  });

  //   console.log(data.status);

  const response = await data.json();

  //   console.log("rr", response);

  return response;
};

const getTokenDetails = async (walletAddress, contractAddress) => {
  //   console.log("ss", walletAddress, contractAddress);
  const url =
    'https://api.1inch.dev/portfolio/v3/portfolio/additional/erc20/details';

  // const addresses = "0x5362fffC85632301293E78512063837c145c13F9";
  // const contract_address = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
  const range = '1year';
  const chain_id = '137';

  const data = await fetch(
    `${url}?addresses=${walletAddress}&contract_address=${contractAddress}&timerange=${range}&chain_id=${chain_id}`,
    {
      headers: {
        Authorization: 'Bearer 6dU0Zm776uOQV6sNuZtXgGkElhBAUUXc',
      },
    }
  );
  //   console.log("status", data.status);
  const response = await data.json();

  return response;

  //   console.log("rr", response);
};

const getTokenPrices = async (addresses) => {
  const tokenAddresses = document.write(addresses.toString());

  const url = `https://api.1inch.dev/price/v1.1/137/${tokenAddresses}?currency=USD`;

  const data = await fetch(url, {
    headers: {
      Authorization: 'Bearer CTMFKZSuNPsU5bBotvflkkiBxFqoEQAB',
    },
  });

  const response = await data.json();

  //   console.log("rr", response);
};

const getSitTokenBalance = async (userAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(mainContract, mainContractABI, signer);

  const sitBalance = await contract.balanceOf(userAddress);

  return sitBalance;
};

const getTokenBalanceWithPrices = async () => {
  const tokenAmount = await getTokenAmount();
  const tokenBalance = await getTokenPrices();
};

const getTokensAllInfo = async (tokenAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://polygon-mainnet.g.alchemy.com/v2/pBqgId5698tBoNxlWJdzCmYPc07ewNuY'
  );

  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();

  return { name, symbol };
};

const getAllData = async () => {
  const balance = await getSitTokenBalance();

  return balance;
};

const getTokensInfo = async (walletAddress) => {
  const tokens = await getTokenAmount();
  //   return;

  let tokenss = [];

  for (let key in tokens) {
    // console.log("key", key, tokens[key]);
    if (tokens.hasOwnProperty(key)) {
      let value = tokens[key];

      if (value != 0 && key !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
        tokenss.push({ address: key, value: value });
      }
    }
  }

  let tokensWithBalance = tokenss.slice(0, 3);
  console.log('first,', tokensWithBalance);

  let finalTokens = [];

  for (let i = 0; i < tokensWithBalance.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // console.log("first", walletAddress, tokensWithBalance[i].address);
    const data = await getTokenDetails(
      mainContract,
      tokensWithBalance[i].address
    );

    console.log('dd', data);

    const { name, symbol } = await getTokensAllInfo(
      tokensWithBalance[i].address
    );

    finalTokens.push({
      ...tokensWithBalance[i],
      ...data,
      name,
      symbol,
    });
  }

  //do it for every erc 20 token and total balance
  //(total balance / total sit in supply) * total sit token user hold
  return finalTokens;
};

module.exports = { getTokensInfo };
