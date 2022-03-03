import { config } from "./config/config";
import { fetchCharactersData } from "./functions/characters.functions";
import { MarvelCharacter } from "./models/marvel-character.model";

const MILISECONDS_IN_A_DAY = 3600 * 24 * 1000;

// Retrieve the Oracle instance
const MarvelCharactersOracle = config.contract.getContract();

// Pushes character data from the Marvel Comics API into the MarvelCharactersOracle contract
async function performFetchAndPushCycle(cycle: number) {
  try {
    console.log(`Starting cycle ${cycle} (${new Date().toLocaleString()}):`);



    // Retrieve the contract's owner address
    const OWNER_ADDRESS = await config.contract.getOwner();



    // 1. Get the current number of characters already in the blockchain
    const length: number = await MarvelCharactersOracle.methods
      .getNumberOfCharacters()
      .call();
    
    console.log(`Characters already present in storage: ${length}.`);



    // 2. Fetch the next 100 characters from the Marvel API
    const characters: MarvelCharacter[] = await fetchCharactersData({ offset: length, limit: 10 });

    console.log(`Next ${characters.length} characters fetched successfully.`);
    


    // 3. Push the new characters into the blockchain
    console.log(`Starting push cycle...`);

    for (let i = 0; i < characters.length; i++) {

      console.log(`- Character ${i+1} of ${characters.length}:`);

      // Push the current character data into the blockchain
      const receipt = await MarvelCharactersOracle.methods
        .addCharacter(
          characters[i].marvelId,
          characters[i].name,
          characters[i].description,
          characters[i].appearances
        )
        .send({
          from: OWNER_ADDRESS,
          gas: config.contract.gasLimit,
        });
      
      // Log TX hash into the console
      console.log('\tSuccess.\n\tTX hash: ' + receipt.transactionHash);
    }

    console.log(`End of cycle ${cycle}.\n`);
  } catch (error) {
    console.error(error);
  }
}


// Run the cycle once on server start
let CYCLE_COUNTER = 0;

performFetchAndPushCycle(++CYCLE_COUNTER);

// Run the cycle once a day after the first time
setInterval(async () => {

  // Perform one cycle
  await performFetchAndPushCycle(++CYCLE_COUNTER);

}, MILISECONDS_IN_A_DAY); // Wait one day to repeat

export default {};
