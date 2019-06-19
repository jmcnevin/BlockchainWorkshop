# Agenda

## Introduction

- What is Ethereum
- What is Rinkeby
- What is Infura
- What is a Smart Contract
- Solidity
- Truffle

## Setup

- Install Truffle: `npm install -g truffle`
- Checkout BlockchainWorkshop:
  `git clone https://github.optum.com/Blockchain-Platform/BlockchainWorkshop`
- Copy pass phrase into `.secret` file inside repo, single line, spaces between
  words
- Look at `truffle-config.js`
- Start up Truffle console: `truffle console --network rinkeby`

## Working with Accounts

- See balance of account (see snippets.md)
- Generate account: `npm run generate`
- Transfer ether to new account (see snippets.md)
- Get balance of new account
- Reconfigure truffle to use new account `mv .secret > .secret.bak`, create new
  `.secret`

## Simple Storage

- Open example contract
- Deploy new contract
  - `truffle create migration SimpleStorage`
  - `truffle migrate --network rinkeby`
- Interact with contract in truffle
  - `truffle console --network rinkeby`
  - `var s = await SimpleStorage.deployed()`
  - `s.storedData()`
  - `s.owner()`
  - `s.setStoredData("testing")`
  - `s.storedData()`
  - `var other = await SimpleStorage.at("0x6F985136F30C08143CAEd8E93A9B60922AEA4CBf")`
  - `other.storedData()`
  - `other.setStoredData("hacked")`

## Opioid Token

- Open example contract
- Deploy new contract
  - `truffle create migration OpioidToken`
  - `truffle migrate --network rinkeby`
- Interact with contract in truffle
  - `truffle console --network rinkeby`
  - `var token = await OpioidToken.deployed()`

## Hot Potato
