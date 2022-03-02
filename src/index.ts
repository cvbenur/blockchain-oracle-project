import { config } from "./config/config";
import { fetchCharactersData } from "./functions/characters.functions";
import { MarvelCharacter } from "./models/marvel-character.model";

const MarvelCharactersOracle = config.getContract();

// Example
//
// fetchCharactersData({ name: 'Daredevil' }).then(console.log).catch(console.error);
//

// Example
//
// Reference: https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#methods-mymethod-call
//
// Contract method with no parameters:
//
// MarvelCharactersOracle.methods
//   .testConnection()
//   .call()
//   .then(console.log)
//   .catch(console.error);
//
//
// Contract method with parameters:
//
// MarvelCharactersOracle.methods
//   .characterExists(1234)
//   .call({ _marvelId: 1234 })
//   .then(console.log)
//   .catch(console.error)
//

const MILISECONDS_IN_A_DAY = 3600 * 24 * 1000;

setTimeout(async () => {
  // TODO
  // 1. Get the number of characters in the blockchain

  const length = MarvelCharactersOracle.methods
    .getAllCharacters()
    .call()
    .then(console.log)
    .catch(console.error).length;

  // 2. Fetch the next 200 characters from the Marvel API

  const characters = fetchCharactersData({ offset: length, limit: 200 });

  // 3. Push the new characters into the blockchain

  for (let character of await characters) {
    MarvelCharactersOracle.methods
      .addCharacter(
        character.marvelId,
        character.name,
        character.description,
        character.appearances
      )
      .call()
      .then(console.log)
      .catch(console.error);
  }
}, MILISECONDS_IN_A_DAY);

export default {};
