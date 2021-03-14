import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import FlightSuretyData from '../../build/contracts/FlightSuretyData.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';
import "babel-polyfill";

console.log("start!!!");
let Oracle_list = [];
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

//(async () => {

//});




let getAccounts = async () => {
  let accounts = await web3.eth.getAccounts();
  console.log("start!");
  console.log("accounts: ", accounts);
  // ARRANGE
  let fee = await flightSuretyApp.methods.REGISTRATION_FEE().call();
  console.log(fee);
  // ACT
  for(let a = 2; a < TEST_ORACLES_COUNT + 1; a++) {      
    await flightSuretyApp.methods.registerOracle().send({
      "from": accounts[a],
      "value": fee,
      "gas": 4712388,
      "gasPrice": 100000000000
    });
    let result = await flightSuretyApp.methods.getMyIndexes().call({from: accounts[a]});
    Oracle_list.push(result);
    console.log(`Oracle Registered: ${result[0]}, ${result[1]}, ${result[2]}`);
  }
  console.log(Oracle_list);















  let GetFlightStatus = async (Airline, flight, timestamp) => {
    
    // ARRANGE
  
    let random_number = Math.floor(Math.random() * 6);
  
    random_number = 2;


    console.log(STATUS_CODE_LIST[random_number]);
  
    try{
      let register_flight = await flightSuretyApp.methods.registerFlight(flight, timestamp, Airline).call({
        "from": accounts[1],
        //"value": fee,
        "gas": 4712388,
        "gasPrice": 100000000000
      });

      let flight_register_status = await flightSuretyApp.methods.FlightIsRegistered(Airline, flight, timestamp).call({
        "from": accounts[1],
        //"value": fee,
        "gas": 4712388,
        "gasPrice": 100000000000
      });
      console.log(flight_register_status);
      // Submit a request for oracles to get status information for a flight
      let key_1 = await flightSuretyApp.methods.fetchFlightStatus(Airline, flight, timestamp).call({
        "from": accounts[1],
        //"value": fee,
        "gas": 4712388,
        "gasPrice": 100000000000
      });
      console.log("key_1: ", key_1);
    }
    catch(e) {
      // Enable this when debugging
      console.log(e);
      //console.log('\nError', a, idx, oracleIndexes[idx].toNumber(), flight, timestamp);
    }


    // ACT
  
    // Since the Index assigned to each test account is opaque by design
    // loop through all the accounts and for each account, all its Indexes (indices?)
    // and submit a response. The contract will reject a submission if it was
    // not requested so while sub-optimal, it's a good test of that feature
    for(let a = 2; a < TEST_ORACLES_COUNT + 1; a++) {
  
      // Get oracle information
      //let oracleIndexes = Oracle_list[a - 2];
      let oracleIndexes = await flightSuretyApp.methods.getMyIndexes().send({
        "from": accounts[a],
        //"value": fee,
        "gas": 4712388,
        "gasPrice": 100000000000
      });
      console.log(oracleIndexes);
      for(let idx = 0; idx < 3; idx++) {
  
        //try {
          // Submit a response...it will only be accepted if there is an Index match
          
          //await config.flightSuretyApp.submitOracleResponse(oracleIndexes[idx], config.firstAirline, flight, timestamp, STATUS_CODE_ON_TIME, { from: accounts[a] });
          let key_2 = await flightSuretyApp.methods.submitOracleResponse(oracleIndexes[idx], Airline, flight, timestamp, STATUS_CODE_LIST[random_number]).call({
            "from": accounts[a],
            //"value": fee,
            "gas": 4712388,
            "gasPrice": 100000000000
          });
          
          console.log(key_2);
          console.log(a, idx);
        //}
        //catch(e) {
          // Enable this when debugging
          //console.log(e);
          //console.log('\nError', a, idx, oracleIndexes[idx].toNumber(), flight, timestamp);
        //}
  
      }
    }
    let Flight_Status_Code = await flightSuretyApp.methods.FlightStatusCode(Airline, flight, timestamp).call();
    console.log("Flight Status Code: ", Flight_Status_Code);
  
  }
  
  let flight = 'ND1309'; // Course number
  //let timestamp = Math.floor(Date.now() / 1000);
  let timestamp = 12345678;
  let Airline = accounts[1];
  await GetFlightStatus(Airline, flight, timestamp);
  
  

















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


