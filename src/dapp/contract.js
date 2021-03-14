import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import Config from './config.json';
import Web3 from 'web3';
import Web3Utils from 'web3-utils';

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
        this.initialize(callback);
        this.owner = null;
        this.airlines = [];
        this.passengers = [];
    }

    initialize(callback) {
        this.web3.eth.getAccounts((error, accts) => {
           
            this.owner = accts[0];
            console.log("Owner's address: ", this.owner);
            let counter = 1;
            
            while(this.airlines.length < 5) {
                this.airlines.push(accts[counter++]);
            }

            while(this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            console.log("first Airline address: ", this.airlines[0]);

            this.flightSuretyApp.methods
                .registerFlight("SG001", 12345678, this.airlines[0])
                .send({ from: this.owner,
                    //"value": fee,
                    gas: 6666666,
                    gasPrice: 100000000000
                });
            
            
            this.flightSuretyApp.methods
                .registerFlight("SG002", 12345678, this.airlines[0])
                .send({ from: this.owner,
                    //"value": fee,
                    gas: 6666666,
                    gasPrice: 100000000000
                });
            
            callback();
        });
    }

    isOperational(callback) {
       let self = this;
       self.flightSuretyApp.methods
            .isOperational()
            .call({ from: self.owner}, callback);
    }

    fetchFlightStatus(flight, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            //timestamp: Math.floor(Date.now() / 1000)
            timestamp: 12345678
        } 
        let flight_status_code = self.flightSuretyApp.methods
            .FlightStatusCode(payload.airline, payload.flight, payload.timestamp)
            .call({ from: self.owner}, (error, result) => {
                callback(error, payload);
            });

        console.log("recent flight status code (before this Oracle call):", flight_status_code);

        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({ from: self.owner}, (error, result) => {
                callback(error, payload);
            });

    }






    buy(flight, flight_timestamp, customer_address, premium, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            //timestamp: Math.floor(Date.now() / 1000)
            timestamp: 12345678,
            passenger: customer_address,
            Premium: Web3Utils.toWei(premium, "ether")
        } 
        self.flightSuretyApp.methods
            .buy(payload.airline, payload.flight, payload.timestamp)
            .send({ 
                from: payload.passenger, 
                value: payload.Premium, 
                gas: 6666666,
                gasPrice: 100000000000}, (error, result) => {
                callback(error, payload);
            });
        let premium_checked = self.flightSuretyApp.methods
            .check_passenger_Premium(payload.airline, payload.flight, payload.timestamp)
            .call({ 
                from: payload.passenger, 
                //value: payload.Premium, 
                gas: 6666666,
                gasPrice: 100000000000}, (error, result) => {
                callback(error);
            });
        callback(premium_checked);
        console.log("Premium: ", premium_checked);


        let Credit_balance_checked = self.flightSuretyApp.methods
        .check_passenger_Credit(payload.airline, payload.flight, payload.timestamp)
        .call({ 
            from: payload.passenger, 
            //value: payload.Premium, 
            gas: 6666666,
            gasPrice: 100000000000}, (error, result) => {
            callback(error);
        });
        callback(Credit_balance_checked);
        console.log("Credit Balance: ", Credit_balance_checked);


        
    }








    pay(flight, flight_timestamp, customer_address, claim_payout, callback) {
        let self = this;
        let payload = {
            airline: self.airlines[0],
            flight: flight,
            //timestamp: Math.floor(Date.now() / 1000)
            timestamp: 12345678,
            passenger: customer_address,
            Claim_payout: Web3Utils.toWei(claim_payout, "ether")
        } 
        self.flightSuretyApp.methods
            .pay(payload.airline, payload.flight, payload.timestamp, payload.Claim_payout)
            .send({ 
                from: payload.passenger, 
                gas: 6666666,
                gasPrice: 100000000000}, (error, result) => {
                callback(error, payload);
            });
        let premium_checked = self.flightSuretyApp.methods
            .check_passenger_Premium(payload.airline, payload.flight, payload.timestamp)
            .call({ 
                from: payload.passenger, 
                //value: payload.Premium, 
                gas: 6666666,
                gasPrice: 100000000000}, (error, result) => {
                callback(error);
            });
        callback(premium_checked);
        console.log("Premium: ", premium_checked);


        let Credit_balance_checked = self.flightSuretyApp.methods
        .check_passenger_Credit(payload.airline, payload.flight, payload.timestamp)
        .call({ 
            from: payload.passenger, 
            //value: payload.Premium, 
            gas: 6666666,
            gasPrice: 100000000000}, (error, result) => {
            callback(error);
        });
        callback(Credit_balance_checked);
        console.log("Credit Balance: ", Credit_balance_checked);


        
    }

}