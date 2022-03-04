const ORACLE = artifacts.require('MarvelCharactersOracle');

contract('MarvelCharactersOracle', (accounts) => {
  before(async () => {
    // Deploy instance for use in tests
    contract = await ORACLE.deployed();

    // Populate test blockchain with hard-coded data
    await contract.addTestData();
  });

  // Testing testConnection()
  describe('testConnection()', () => {
    it('should connect to the smart contract', async () => {
      
      // Testing smart contract connection
      const connection = await contract.testConnection();

      assert.equal(connection, true);
    });
  });


  // Testing getAddress()
  describe('getAddress()', () => {
    it('should return the correct contract address', async () => {

      // Retrieving the actual address of the contract via truffle
      const expected = await contract.address;

      // Retrieving the address of the contract via the contract
      const actual = await contract.getAddress();

      assert.equal(actual, expected);
    });
  });


  // Testing characterExists()
  describe('characterExists()', () => {
    it('should be true if a specific character exists from its marvelId', async () => {

      // Daredevil ID is expected to be found
      const expectedCharacterMarvelId = 1009262;

      // Check if DareDevil was found
      const doesCharacterExists = await contract.characterExists(expectedCharacterMarvelId);

      assert.equal(doesCharacterExists, true);
    });

    
    it('should be false if a character doesn\'t exist', async () => {

      // Random ID expected to not be found
      const expectedCharacterMarvelId = 69_420;

      // Check if any character was found
      const doesCharacterExists = await contract.characterExists(expectedCharacterMarvelId);

      assert.equal(doesCharacterExists, false);
    });
  });


  // Testing getAllCharacters()
  describe('getAllCharacters()', () => {
    it('should return all the characters stored in the smart contract', async () => {
    
      // Retrieving the number of characters stored in the contract
      const expected = await contract.getNumberOfCharacters();

      // Retrieving the length of the actual array of characters
      const actual = (await contract.getAllCharacters()).length;

      assert.equal(actual, expected);
    });
  });


  // Testing getCharacterById()
  describe('getCharacterById()', () => {
    it('should return a character from a valid Id', async () => {

      // Daredevil is expected to be found from this id
      const expectedCharacterId = 2;

      // Creating the expected character object (Daredevil)
      const expectedCharacter = {
        id: 2,
        marvelId: 1009262,
        name: "Daredevil",
        description: "Abandoned by his mother, Matt Murdock was raised by his father, boxer 'Battling Jack' Murdock, in Hell's Kitchen. Realizing that rules were needed to prevent people from behaving badly, young Matt decided to study law; however, when he saved a man from an oncoming truck, it spilled a radioactive cargo that rendered Matt blind while enhancing his remaining senses. Under the harsh tutelage of blind martial arts master Stick, Matt mastered his heightened senses and became a formidable fighter.",
        appearances: 1195
      };

      // Retrieve character from his Id
      const data = await contract.getCharacterById(expectedCharacterId);

      // Construct resulting character object
      const actualCharacter = {
        id: data[0].toNumber(),
        marvelId: data[1].toNumber(),
        name: data[2],
        description: data[3],
        appearances: data[4].toNumber(),
      };

      assert.deepEqual(actualCharacter, expectedCharacter);
    });


    it('should return an empty character from a non-valid Id', async () => {

      // Daredevil is expected to be found from this id
      const expectedCharacterId = 69_420;

      // Creating the expected character object (Daredevil)
      const expectedCharacter = {
        id: 0,
        marvelId: 0,
        name: "",
        description: "",
        appearances: 0,
      };

      // Retrieve character from his Id
      const data = await contract.getCharacterById(expectedCharacterId);

      // Construct resulting character object
      const actualCharacter = {
        id: data[0].toNumber(),
        marvelId: data[1].toNumber(),
        name: data[2],
        description: data[3],
        appearances: data[4].toNumber(),
      };

      assert.deepEqual(actualCharacter, expectedCharacter);
    });
  });


  // Testing getCharacterByMarvelId()
  describe('getCharacterByMarvelId()', () => {
    it('should return a specific character from its marvelId', async () => {
    
      // Daredevil is expected to be found from this marvelId
      const expectedMarvelId = 1009262;

      // Creating the expected character object (Daredevil)
      const expectedCharacter = {
        id: 2,
        marvelId: 1009262,
        name: "Daredevil",
        description: "Abandoned by his mother, Matt Murdock was raised by his father, boxer 'Battling Jack' Murdock, in Hell's Kitchen. Realizing that rules were needed to prevent people from behaving badly, young Matt decided to study law; however, when he saved a man from an oncoming truck, it spilled a radioactive cargo that rendered Matt blind while enhancing his remaining senses. Under the harsh tutelage of blind martial arts master Stick, Matt mastered his heightened senses and became a formidable fighter.",
        appearances: 1195
      };

      // Retrieve character from his marvelId
      const data = await contract.getCharacterByMarvelId(expectedMarvelId);

      // Construct resulting character object
      const actualCharacter = {
        id: data[0].toNumber(),
        marvelId: data[1].toNumber(),
        name: data[2],
        description: data[3],
        appearances: data[4].toNumber(),
      };

      assert.deepEqual(actualCharacter, expectedCharacter);
    });


    it('should return an empty character from a non-valid Id', async () => {

      // Daredevil is expected to be found from this id
      const expectedCharacterId = 14;

      // Creating the expected character object (Daredevil)
      const expectedCharacter = {
        id: 0,
        marvelId: 0,
        name: "",
        description: "",
        appearances: 0,
      };

      // Retrieve character from his Id
      const data = await contract.getCharacterById(expectedCharacterId);

      // Construct resulting character object
      const actualCharacter = {
        id: data[0].toNumber(),
        marvelId: data[1].toNumber(),
        name: data[2],
        description: data[3],
        appearances: data[4].toNumber(),
      };

      assert.deepEqual(actualCharacter, expectedCharacter);
    });
  });


  // Testing getNumberOfCharacters()
  describe('getNumberOfCharacters()', () => {
    it('should return the correct total number of characters', async () => {
    
      // Number of characters expected to be found
      const expectedNumberOfCharacters = 7;

      // Actual number of characters found 
      const actualNumberOfCharacters = await contract.getNumberOfCharacters();

      assert.equal(actualNumberOfCharacters, expectedNumberOfCharacters);
    });
  });


  // Testing addCharacter()
  describe('addCharacter()', () => {
    it('should add a character', async () => {
    
      // Get the current number of characters
      const previousNumberOfCharacters = await contract.getNumberOfCharacters(); // Number of characters expected to be found 

      // Add a new character
      await contract.addCharacter(1011334, "3-D Man", "", 12);

      // Get the number of characters after adding a new one
      const actualNumberOfCharacters = await contract.getNumberOfCharacters();

      assert.equal(actualNumberOfCharacters, (previousNumberOfCharacters.toNumber() + 1));
    });
  });
});