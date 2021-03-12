
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
    console.log('config.flightSuretyApp.address: ', config.flightSuretyApp.address);
    //await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
  });

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`(multiparty) has correct initial isOperational() value`, async function () {

    // Get operating status
    let status = await config.flightSuretyData.isOperational.call();
    assert.equal(status, true, "Incorrect initial operating status value");

  });

  it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {

      // Ensure that access is denied for non-Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false, { from: config.testAddresses[2] });
      }
      catch(e) {
          //console.log(e);
          accessDenied = true;
      }
      assert.equal(accessDenied, true, "Access not restricted to Contract Owner");
            
  });

  it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {

      // Ensure that access is allowed for Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false);
      }
      catch(e) {
          accessDenied = true;
      }
      //HX_20210304: error is wrong, should be "Contract Owner can't access setOperatingStatus()"
      //assert.equal(accessDenied, false, "Access not restricted to Contract Owner");
      assert.equal(accessDenied, false, "Contract Owner can't access setOperatingStatus()");
  });

  it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {

      await config.flightSuretyData.setOperatingStatus(false);

      let reverted = false;
      try 
      {
          //await config.flightSurety.setTestingMode(true);
          await config.flightSuretyData.func_with_requireIsOperational();
      }
      catch(e) {
          //console.log(e);
          reverted = true;
      }
      assert.equal(reverted, true, "Access not blocked for requireIsOperational");      

      // Set it back for other tests to work
      await config.flightSuretyData.setOperatingStatus(true);

  });

  it('(airline) cannot register an Airline using registerAirline() if it is not funded', async () => {
    
    // ARRANGE
    let newAirline = accounts[2];

    // ACT
    try {
        await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
    }
    catch(e) {
        console.log(e);
    }
    let result = await config.flightSuretyData.isAirline.call(newAirline); 
    console.log("account 1 is Airline? : ", await config.flightSuretyData.isAirline.call(accounts[1]));
    // ASSERT
    assert.equal(result, false, "Airline should not be able to register another airline if it hasn't provided funding");

  });
 
  it('(airline) can register an Airline using registerAirline() if it is funded', async () => {
    
    // ARRANGE
    let newAirline = accounts[2];
    let ExpectedFundPrice = web3.utils.toWei("10", "ether");
    // ACT
    try {
        await config.flightSuretyApp.fund({from: config.firstAirline, value: ExpectedFundPrice});
        await config.flightSuretyApp.registerAirline(newAirline, {from: config.firstAirline});
    }
    catch(e) {
        console.log(e);
    }
    let result = await config.flightSuretyData.isAirline.call(newAirline); 
    console.log("account 1 is Airline? : ", await config.flightSuretyData.isAirline.call(accounts[1]));
    // ASSERT
    assert.equal(result, true, "Airline should be able to register another airline if it has provided funding");

  });

  it('(airline) can register an Airline with at least 50% voted from registrated Airline', async () => {
    
    // ARRANGE
    let newAirline_2 = accounts[2];
    let newAirline_3 = accounts[3];
    let newAirline_4 = accounts[4];
    let newAirline_5 = accounts[5];
    let ExpectedFundPrice = web3.utils.toWei("10", "ether");
    // ACT
    try {
        await config.flightSuretyApp.fund({from: config.firstAirline, value: ExpectedFundPrice});
        await config.flightSuretyApp.registerAirline(newAirline_3, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(newAirline_4, {from: config.firstAirline});
        await config.flightSuretyApp.registerAirline(newAirline_5, {from: config.firstAirline});
        await config.flightSuretyApp.fund({from: newAirline_2, value: ExpectedFundPrice});
        await config.flightSuretyApp.fund({from: newAirline_3, value: ExpectedFundPrice});
        await config.flightSuretyApp.fund({from: newAirline_4, value: ExpectedFundPrice});
        await config.flightSuretyApp.Airline_vote(newAirline_5, {from: config.firstAirline});
        await config.flightSuretyApp.Airline_vote(newAirline_5, {from: newAirline_3});
        await config.flightSuretyApp.fund({from: newAirline_5, value: ExpectedFundPrice});
    }
    catch(e) {
        console.log(e);
    }
    let result = await config.flightSuretyData.isAirline.call(newAirline_5); 
    //console.log("account 1 is Airline? : ", await config.flightSuretyData.isAirline.call(accounts[1]));
    // ASSERT
    assert.equal(result, true, "Existitng Airlines should be able to register another airline with 50% votes or above");

  });


  it('It can register a flight using registerFlight()', async () => {
    
    // ARRANGE
    let first_Flight_name = "SGFL001";
    let first_Flight_timestamp = 12345678;
    //Math.floor(Date.now() / 1000)
    let first_Airline_address = config.firstAirline;
    // ACT
    try {
        await config.flightSuretyApp.registerFlight(
            first_Flight_name, 
            first_Flight_timestamp,
            first_Airline_address,
            {from: config.firstAirline}
        );
    }
    catch(e) {
        console.log(e);
    }
    let result = await config.flightSuretyApp.FlightIsRegistered.call(first_Airline_address, first_Flight_name, first_Flight_timestamp); 
    //console.log("account 1 is Airline? : ", await config.flightSuretyData.isAirline.call(accounts[1]));
    // ASSERT
    assert.equal(result, true, "Register flight function is not working");

  });


  it('Passenger is allowed to by insurance for a registered flight', async () => {
    
    // ARRANGE
    let first_Flight_name = "SGFL001";
    let first_Flight_timestamp = 12345678;
    //Math.floor(Date.now() / 1000)
    let first_Airline_address = config.firstAirline;
    // ACT
    try {

        
    }
    catch(e) {
        console.log(e);
    }
    //let result = await config.flightSuretyApp.FlightIsRegistered.call(first_Airline_address, first_Flight_name, first_Flight_timestamp); 
    //console.log("account 1 is Airline? : ", await config.flightSuretyData.isAirline.call(accounts[1]));
    // ASSERT
    //assert.equal(result, true, "Register flight function is not working");





  });



});
