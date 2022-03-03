const ORACLE = artifacts.require('MarvelCharactersOracle');

contract('MarvelCharactersOracle', (accounts) => {
  beforeEach(async () => {
    contract = await ORACLE.deployed();
  });

  // Testing testConnection()
  it('should connect to the smart contract', async () => {
    const connection = await contract.testConnection();

    assert.equal(connection, true);
  });


  // Testing getAddress()
  it('should return the correct contract address', async () => {
    const expected = await contract.address;

    const actual = await contract.getAddress();

    assert.equal(actual, expected);
  });


  // Testing characterExists()
  it('should check if a specific character exists from its marvelId', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Daredevil ID is expected to be found 
    const expectedCharacterMarvelId = 1009262;

    // Check if DareDevil was found
    const doesCharacterExists = await contract.characterExists(expectedCharacterMarvelId);

    assert.equal(doesCharacterExists, true);
  });

  // Testing getAllCharacters()
  it('should return an array of the marvelId of all characters', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Creating an expected array with the marvelId of the characters added from the addTestData() method
    let expectedArray = [1009610,1009262,1011339,1009452,1009399,1009191,1009577];

    // Retrieving the actual array of marvelId of all characters
    let actualArray = await contract.getAllCharacters();

    assert.equal(actualArray, expectedArray);
  });

  // Testing getCharacterById()
  it('should return a character from its Id', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Daredevil is expected to be found from his Id
    const expectedCharacterId = 2;

    // Creating the expected struct of the DareDevil character
    const expectedCharacter ={
        id: 2,
        marvelId: 1009262,
        name: "Daredevil",
        description: "Abandoned by his mother, Matt Murdock was raised by his father, boxer 'Battling Jack' Murdock, in Hell's Kitchen. Realizing that rules were needed to prevent people from behaving badly, young Matt decided to study law; however, when he saved a man from an oncoming truck, it spilled a radioactive cargo that rendered Matt blind while enhancing his remaining senses. Under the harsh tutelage of blind martial arts master Stick, Matt mastered his heightened senses and became a formidable fighter.",
        appearances: 1195
    };

    // Retrieve character from his Id
    const actualCharacter = await contract.getCharacterById(expectedCharacterId);

    assert.equal(actualCharacter, expectedCharacter);
  });

  // Testing getCharacterByMarvelId()
  it('should return a specific character from its marvelId', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Daredevil is expected to be found from his marvelId
    const expectedMarvelId = 1009262; 

    // Creating the expected struct of the DareDevil character
    const expectedCharacter ={
        id: 2,
        marvelId: 1009262,
        name: "Daredevil",
        description: "Abandoned by his mother, Matt Murdock was raised by his father, boxer 'Battling Jack' Murdock, in Hell's Kitchen. Realizing that rules were needed to prevent people from behaving badly, young Matt decided to study law; however, when he saved a man from an oncoming truck, it spilled a radioactive cargo that rendered Matt blind while enhancing his remaining senses. Under the harsh tutelage of blind martial arts master Stick, Matt mastered his heightened senses and became a formidable fighter.",
        appearances: 1195
    };

    // Retrieve character from his Id
    const actualCharacter = await contract.getCharacterByMarvelId(expectedMarvelId);

    assert.equal(actualCharacter, expectedCharacter);
  });

  // Testing getNumberOfCharacters()
  it('should return the correct total number of characters', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Number of characters expected to be found 
    const expectedNumberOfCharacters = 7;

    // Actual number of characters found 
    const actualNumberOfCharacters = await contract.getNumberOfCharacters();

    assert.equal(actualNumberOfCharacters, expectedNumberOfCharacters);
  });

  // Testing addCharacter()
  it('should add a character', async () => {
    // Adding test data
    await contract.addTestData();
    
    // Get the number of characters before adding a new one
    const previousNumberOfCharacters = await contract.getNumberOfCharacters(); // Number of characters expected to be found 
    
    // Call of the addCharacter() method
    await contract.addCharacter(1011334,"3-D Man", "",12)

    // Get the number of characters after adding a new one
    const actualNumberOfCharacters = await contract.getNumberOfCharacters();

    // Check if the actual number of characters is equal to the number of characters before calling the addCharacter() method + 1
    assert.equal(actualNumberOfCharacters, previousNumberOfCharacters+1);
  });

});