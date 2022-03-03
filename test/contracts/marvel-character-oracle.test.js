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

  // Write tests here
});