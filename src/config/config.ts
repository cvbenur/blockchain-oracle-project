import * as dotenv from 'dotenv';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const contractJson = require('../../build/contracts/MarvelCharactersOracle.json');

dotenv.config();

/* ======== API VARIBALES ======== */
const API_BASE_URL = process.env.BASE_URL || 'http://gateway.marvel.com/v1/public/';

const API_PUBLIC_KEY = process.env.API_PUBLIC_KEY || '85b15fdbe6a336829bafac929272a08c';
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY;

const API_KEYS = {
  publicKey: API_PUBLIC_KEY,
  privateKey: API_PRIVATE_KEY,
};

const MARVEL = {
  apiKeys: API_KEYS,
  baseUrl: API_BASE_URL,
};
/* ======== API VARIBALES ======== */


/* ======== PROVIDER ======== */
const PROVIDER_NETWORK_HOST = process.env.PROVIDER_NETWORK_HOST || '127.0.0.1';
const PROVIDER_NETWORK_PORT = process.env.PROVIDER_NETWORK_PORT || 7545;
const NETWORK_URL = `http://${PROVIDER_NETWORK_HOST}:${PROVIDER_NETWORK_PORT}`;

const PROVIDER = new Web3.providers.HttpProvider(NETWORK_URL);
const WEB3 = new Web3(PROVIDER);
/* ======== PROVIDER ======== */


/* ======== CONTRACT ======== */
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || contractJson.networks[5777].address;
const CONTRACT_ABI = contractJson.abi as AbiItem[];
const CONTRACT_GAS_LIMIT = process.env.CONTRACT_GAS_LIMIT || 3_000_000;
const CONTRACT = new WEB3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const CONTRACT_OWNER_ADDRESS = async (): Promise<string> => {
  return await CONTRACT.methods
    .owner()
    .call();
}
/* ======== CONTRACT ======== */

export const config = {
  marvel: MARVEL,
  contract: {
    getContract: () => CONTRACT,
    gasLimit: CONTRACT_GAS_LIMIT,
    getOwner: CONTRACT_OWNER_ADDRESS
  },
};
