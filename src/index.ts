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
  try {
    const len = await MarvelCharactersOracle.methods
      .getNumberOfCharacters()
      .call();

    const characters = fetchCharactersData({ offset: len, limit: 2 });

    for (let character of await characters) {
      await MarvelCharactersOracle.methods
        .addCharacter(
          character.marvelId,
          character.name,
          character.description,
          character.appearances
        )
        .call({
          marvelId: character.marvelId,
          name: character.name,
          description: character.description,
          appearances: character.appearances,
        })
        .catch(console.error);
    }
    console.log(`OK ${length}`);
  } catch (e) {
    console.error(e);
  }
}, 1000);

// 2. Fetch the next 200 characters from the Marvel API

// 3. Push the new characters into the blockchain

export default {};
