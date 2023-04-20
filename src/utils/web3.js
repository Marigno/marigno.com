// src/utils/web3.js
import Web3 from "web3";

const getWeb3 = () => {
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;
  const alchemyApiUrl = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;
  const web3 = new Web3(new Web3.providers.HttpProvider(alchemyApiUrl));

  return web3;
};

export default getWeb3;