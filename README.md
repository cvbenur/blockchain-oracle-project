# Blockchain Oracle Project

This is the repository for the code to an Ethereum-based Oracle made for a school project.
It inserts Marvel Comics character data into the blockchain.

## Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the oracle](#running-the-oracle)
- [Project structure](#project-structure)
  - [The smart-contracts and interfaces](#the-smart-contracts-and-interfaces)
  - [The web2 server](#the-web2-server)
- [Smart-contract unit tests](#smart-contract-unit-tests)

## Requirements

This poject requires that [Truffle](https://trufflesuite.com/docs/truffle/) and [Ganache](https://trufflesuite.com/docs/ganache/) be installed on your machine in order to work.

Since this project uses the [Marvel Comics public API](https://developer.marvel.com/), you will need to create an account and retrieve your public and private API keys.

Once you have these keys, you must add them to the `.env.safe` at the root of this folder to enable the project to retrieve data from the Marvel Comics API. Otherwise, the web2 server will not work.

## Installation

In order to install the application, open a terminal in this folder and run:

```shell
npm install
```

## Running the oracle

To run the oracle, please follow these steps:

1. Open up this project's `truffle-config.js` file in Ganache.

2. Build the smart-contracts by running this command:

```shell
truffle compile
```

The contracts should now appear in Ganache, in the "Contracts" tab.

3. Deploy the smart-contracts by running this command:

```shell
truffle deploy
```

The contracts should now appear in Ganache as deployed.

4. Run the oracle's web2 server by running this command:

```shell
npm run start
```

The server should now be running, and will begin processing and pushing data to the blockchain in a few seconds.

In order to check that this project works, you can check the data stored inside the `MarvelCharactersOracle` smart-contract inside of Ganache.

## Project structure

This oracle is comprised of 2 parts:

- The smart-contracts and interfaces
- The web2 server

### The smart-contracts and interfaces

The smart-contracts and Solidity interfaces for this project are located inside the `contracts` directory.

The main smart-contract for this project is the `MarvelCharactersOracle.sol` contract. It provides methods to fetch and retrieve the data stored inside of it, that are meant to be used for other contracts. It also has a method designed to push data into itself, that can be called only from the owner address.

We also provided an interface called `MarvelCharactersOracleInterface.sol`, which is designed to be used by other developers in order to build smart-contract that will interact with this oracle.

### The web2 server

The source files for the web2 server are located in the `src` directory.

The web2 server is built to retrieve data, process the retrieved data and push it to the blockchain by calling the smart-contracts.

It is a very basic application written in TypeScript, that is designed to perform one fetch-and-push cycle per day.

## Smart-contract unit tests

This project comes with unit tests for the `MarvelCharactersOracle` contract methods. These tests are located in the `tests/contracts` directory.

To run the tests, run this command:

```shell
truffle test
```
