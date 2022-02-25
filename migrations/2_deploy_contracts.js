const MarvelCharactersOracle = artifacts.require("MarvelCharactersOracle");

module.exports = function (deployer) {
  deployer.deploy(MarvelCharactersOracle);
};
