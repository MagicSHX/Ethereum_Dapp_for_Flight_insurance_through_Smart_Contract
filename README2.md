# Ethereum_Dapp_for_Flight_insurance_through_Smart_Contract

    "webpack": "^4.6.0",
    "webpack-cli": "^3.1.2",
    pending: 
    - TypeError: Cannot read property 'setTestingMode' of undefined


# Ethereum_Dapp_for_Flight_insurance_through_Smart_Contract

FlightSurety is a sample application project via Blockchain Smart Contract

## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`
`ganache-cli -l 9999999999999 -g 1 -a 50 -e 10000`
`truffle develop` - not utilized here as using ganache for the project
`truffle migrate --reset`
`truffle compile`

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js`
`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate`
`npm run dapp`

To view dapp:

`http://localhost:8000`

## Develop Server
`npm i -D babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader`
`npm run server`
`truffle test ./test/oracles.js`

## Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)