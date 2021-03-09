
var Test = require('../config/testConfig.js');
//var BigNumber = require('bignumber.js');

contract('Oracles', async (accounts) => {

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

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);


  });


  it('can register oracles', async () => {
    
    // ARRANGE
    let fee = await config.flightSuretyApp.REGISTRATION_FEE.call();
    console.log(accounts);
    // ACT
    for(let a = 1; a < TEST_ORACLES_COUNT; a++) {      
      await config.flightSuretyApp.registerOracle({ from: accounts[a], value: fee });
      
      let result = await config.flightSuretyApp.getMyIndexes.call({from: accounts[a]});

      console.log(`Oracle Registered: ${result[0]}, ${result[1]}, ${result[2]}`);
    }
  });

  it('can request flight status', async () => {
    
    // ARRANGE
    let flight = 'ND1309'; // Course number
    let timestamp = Math.floor(Date.now() / 1000);
    let first_Airline_address = accounts[1];
    let random_number = Math.floor(Math.random() * 6);

    console.log(STATUS_CODE_LIST[random_number]);

    await config.flightSuretyApp.registerFlight(
      flight, 
      timestamp,
      first_Airline_address,
      {from: config.firstAirline}
    );
    // Submit a request for oracles to get status information for a flight
    await config.flightSuretyApp.fetchFlightStatus(config.firstAirline, flight, timestamp);

    // ACT

    // Since the Index assigned to each test account is opaque by design
    // loop through all the accounts and for each account, all its Indexes (indices?)
    // and submit a response. The contract will reject a submission if it was
    // not requested so while sub-optimal, it's a good test of that feature
    for(let a = 1; a < TEST_ORACLES_COUNT; a++) {

      // Get oracle information
      let oracleIndexes = await config.flightSuretyApp.getMyIndexes({ from: accounts[a]});
      for(let idx = 0; idx < 3; idx++) {

        try {
          // Submit a response...it will only be accepted if there is an Index match
          
          //await config.flightSuretyApp.submitOracleResponse(oracleIndexes[idx], config.firstAirline, flight, timestamp, STATUS_CODE_ON_TIME, { from: accounts[a] });
          await config.flightSuretyApp.submitOracleResponse(oracleIndexes[idx], config.firstAirline, flight, timestamp, STATUS_CODE_LIST[random_number], { from: accounts[a] });
          

          console.log(a, idx);
        }
        catch(e) {
          // Enable this when debugging
          //console.log(e);
          //console.log('\nError', a, idx, oracleIndexes[idx].toNumber(), flight, timestamp);
        }

      }
    }
    let Flight_Status_Code = await config.flightSuretyApp.FlightStatusCode.call(config.firstAirline, flight, timestamp);
    console.log("Flight Status Code: ", Flight_Status_Code);

  });



});
