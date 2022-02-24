import * as dotenv from 'dotenv';

dotenv.config();

const API_PUBLIC_KEY = process.env.API_PUBLIC_KEY || '85b15fdbe6a336829bafac929272a08c';
const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY;

const API_KEYS = {
  publicKey: API_PUBLIC_KEY,
  privateKey: API_PRIVATE_KEY,
};

const BASE_URL = process.env.BASE_URL || 'http://gateway.marvel.com/v1/public/';

const MARVEL = {
  apiKeys: API_KEYS,
  baseUrl: BASE_URL,
};

export const config = {
  marvel: MARVEL,
};
