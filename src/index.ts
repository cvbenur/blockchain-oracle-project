import { config } from './config/config';
import { fetchCharactersData } from "./functions/characters.functions";

const MarvelCharactersOracle = config.getContract();

// Example
//
// fetchCharactersData({ name: 'Daredevil' }).then(console.log).catch(console.error);
//

// Example
//
// MarvelCharactersOracle.methods.testConnection()
//   .call()
//   .then(console.log)
//   .catch(console.error);
//

const MILISECONDS_IN_A_DAY = 3600 * 24 * 1000;

setTimeout(() => {
  // TODO

  // 1. Get the number of characters in the blockchain

  // 2. Fetch the next 200 characters from the Marvel API

  // 3. Push the new characters into the blockchain
}, MILISECONDS_IN_A_DAY);

export default {};
