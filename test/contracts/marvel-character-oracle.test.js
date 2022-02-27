const ORACLE = artifacts.require('MarvelCharactersOracle');

contract('MarvelCharactersOracle', (accounts) => {
  beforeEach(async () => {
    contract = await ORACLE.deployed();
  });

  it('should connect to the smart contract', async () => {
    const connection = await contract.testConnection();

    assert.equal(connection, true);
  });

  // Write tests here
});