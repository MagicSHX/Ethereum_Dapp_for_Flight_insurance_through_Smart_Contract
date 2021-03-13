import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
import "babel-polyfill";

console.log("start!!!");

let config = Config['localhost'];
let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));

web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);


const TEST_ORACLES_COUNT = 20;
// Watch contract events
const STATUS_CODE_UNKNOWN = 0;
const STATUS_CODE_ON_TIME = 10;
const STATUS_CODE_LATE_AIRLINE = 20;
const STATUS_CODE_LATE_WEATHER = 30;
const STATUS_CODE_LATE_TECHNICAL = 40;
const STATUS_CODE_LATE_OTHER = 50;
//console.log(STATUS_CODE_ON_TIME);

var STATUS_CODE_LIST = [STATUS_CODE_UNKNOWN, STATUS_CODE_ON_TIME, STATUS_CODE_LATE_AIRLINE, STATUS_CODE_LATE_WEATHER, STATUS_CODE_LATE_TECHNICAL, STATUS_CODE_LATE_OTHER];

let getAccounts = async () => {
  let accounts = await web3.eth.getAccounts();
  console.log("start!");
  console.log("accounts: ", accounts);
  // ARRANGE
  let fee = await flightSuretyApp.methods.REGISTRATION_FEE().call();
  console.log(fee);
  // ACT
  for(let a = 1; a < TEST_ORACLES_COUNT; a++) {      
    await flightSuretyApp.methods.registerOracle().send({
      "from": accounts[a],
      "value": fee,
      "gas": 4712388,
      "gasPrice": 100000000000
    });
    let result = await flightSuretyApp.methods.getMyIndexes().call({from: accounts[a]});

    console.log(`Oracle Registered: ${result[0]}, ${result[1]}, ${result[2]}`);
  }
  return accounts;
}

let accounts = getAccounts();
console.log("accounts: ", accounts);
console.log("1st check point");


flightSuretyApp.events.OracleRequest({
    fromBlock: 0
  }, function (error, event) {
    if (error) console.log(error)
    console.log("OracleRequest")
    console.log(event)
});



flightSuretyApp.events.FlightStatusInfo({
  fromBlock: 0
}, function (error, event) {
  if (error) console.log(error)
  console.log("FlightStatusInfo")
  console.log(event)
});



flightSuretyApp.events.OracleReport({
  fromBlock: 0
}, function (error, event) {
  if (error) console.log(error)
  console.log("OracleReport")
  console.log(event)
});



const app = express();
app.get('/api', (req, res) => {
    res.send({
      message: 'An API for use with your Dapp!'
    })
})

export default app;


