import Web3 from "web3";

// const web3 = new Web3(
//   Web3.givenProvider ||
//     "wss://rinkeby.infura.io/v3/32f3812248ef421090b309af62918f43:8546"
// );

const web3 = new Web3("ws://localhost:8545");

export default web3;
