# Snippets

Useful web3 snippets to be run from the Truffle console

## Get Balance of Account

https://web3js.readthedocs.io/en/1.0/web3-eth.html#eth-getbalance

```bash
web3.eth.getBalance(ACCOUNT_0);
```

Example:

```bash
truffle(rinkeby) > web3.eth.getBalance("0x22092ce344c7b9d196830f4ca3c4930700182443");
"944986840000000000"
```

## Send Ether to Account

https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendtransaction

```bash
web3.eth.sendTransaction({ from: ACCOUNT_0, to: ACCOUNT_1, value: web3.toWei(1, "ether") });
```

Example:

```bash
truffle(rinkeby)> web3.eth.sendTransaction({ from: "0x22092ce344c7b9d196830f4ca3c4930700182443", to: "0x8fbfbb10d81ff42ce5306b7b26bc7057f31a7216", value: 1 });
{ blockHash:
   '0xe890d114e31f1415cbe4f8f4be31f550a02a272e468b41bc49f2fc60fcbe7bd2',
  blockNumber: 4588494,
  contractAddress: null,
  cumulativeGasUsed: 992733,
  from: '0x22092ce344c7b9d196830f4ca3c4930700182443',
  gasUsed: 21000,
  logs: [],
  logsBloom:
   '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x8fbfbb10d81ff42ce5306b7b26bc7057f31a7216',
  transactionHash:
   '0x40300ae3a22bc5c822d3613ef605bdc603924aa208ee247cdf3c25b76b3772a2',
  transactionIndex: 6 }
```

## Conversions

https://web3js.readthedocs.io/en/1.0/web3-utils.html#fromwei

```bash
truffle(rinkeby)> web3.utils.fromWei('944965839999999999', "ether");
'0.944965839999999999'
```

https://web3js.readthedocs.io/en/1.0/web3-utils.html#towei

```bash
truffle(rinkeby)> web3.utils.toWei('1', 'ether')
'1000000000000000000'
```
