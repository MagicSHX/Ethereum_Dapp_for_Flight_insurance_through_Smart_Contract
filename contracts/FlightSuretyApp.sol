pragma solidity ^0.4.25;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)
    //address[] passenger_address = new address[](500);
    address[] passenger_address;
    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    // Flight status codees
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address private contractOwner;          // Account used to deploy contract
    FlightSuretyData flightSuretyData;


    struct Passenger {
        bool isInsured;
        uint InsuredAmount;
        uint CreditAmount;

    }
   




    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;
        address airline;
        mapping(address => Passenger) passengers;
        address[] passenger_address;
    }
    mapping(bytes32 => Flight) private flights;

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
         // Modify to call data contract's status
        require(true, "Contract is currently not operational");  
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
    * @dev Contract constructor
    *
    */
    constructor
                                (
                                    address dataContract,
                                    address first_Airline_address
                                ) 
                                public 
    {
        contractOwner = msg.sender;
        flightSuretyData = FlightSuretyData(dataContract);
        //votes = RegisterAirline(first_Airline_address);
        flightSuretyData.registerAirline(first_Airline_address, msg.sender, msg.value);
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function isOperational() 
                            public 
                            pure 
                            returns(bool) 
    {
        return true;  // Modify to call data contract's status
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

  



   /**
    * @dev Register a future flight for insuring.
    *
    */  
    function registerFlight
                                (
                                    string flight,
                                    uint256 timestamp,
                                    address airline
                                )
                                external
                                
    {
        //pend: check name duplication
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        //address[] passenger_address = new address[](500);
        flights[flight_key] = Flight({
            isRegistered: true,
            statusCode: STATUS_CODE_UNKNOWN,
            //STATUS_CODE_UNKNOWN
            //pending: needs current timestamp instead
            updatedTimestamp: timestamp,
            airline: airline,
            passenger_address: passenger_address
        });
    }
    
    function FlightIsRegistered
                                (
                                    address airline,
                                    string flight,
                                    uint256 timestamp
                                )
                                external
                                returns (bool)
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        require(flights[flight_key].isRegistered, "No Registered flight found!");
        return flights[flight_key].isRegistered;
    }
    
    function FlightStatusCode
                                (
                                    address airline,
                                    string flight,
                                    uint256 timestamp
                                )
                                external
                                returns (uint8)
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        require(flights[flight_key].isRegistered, "No Registered flight found!");
        return flights[flight_key].statusCode;
    }


   /**
    * @dev Called after oracle has updated flight status
    *
    */  
    function processFlightStatus
                                (
                                    address airline,
                                    string flight,
                                    uint256 timestamp,
                                    uint8 statusCode
                                )
                                internal
                                //pure
    {
        //require(false, statusCode);
        //flight = bytes32(flight);

        bytes32 flight_key = getFlightKey(airline, flight, timestamp);

        flights[flight_key].statusCode = statusCode;
        //should be current timestamp
        //flights[flight_key].updatedTimestamp = timestamp;

        if (statusCode == STATUS_CODE_LATE_AIRLINE || statusCode == STATUS_CODE_LATE_TECHNICAL)
        {
            for (uint i = 0; i < flights[flight_key].passenger_address.length; i++)
            {
                creditInsurees(airline, flight, timestamp, flights[flight_key].passenger_address[i]);
            }
        }
        
    }


    // Generate a request for oracles to fetch flight information
    function fetchFlightStatus
                        (
                            address airline,
                            string flight,
                            uint256 timestamp                            
                        )
                        external
                        //returns(uint8, bytes32, bool)
    {
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        oracleResponses[key] = ResponseInfo({
                                                requester: msg.sender,
                                                isOpen: true
                                            });

        emit OracleRequest(index, airline, flight, timestamp);
        //return (index, key, oracleResponses[key].isOpen);
        
    } 


// region ORACLE MANAGEMENT

    // Incremented to add pseudo-randomness at various points
    uint8 private nonce = 0;    

    // Fee to be paid when registering oracle
    uint256 public constant REGISTRATION_FEE = 1 ether;

    // Number of oracles that must respond for valid status
    uint256 private constant MIN_RESPONSES = 3;


    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;        
    }

    // Track all registered oracles
    mapping(address => Oracle) private oracles;

    // Model for responses from oracles
    struct ResponseInfo {
        address requester;                              // Account that requested status
        bool isOpen;                                    // If open, oracle responses are accepted
        mapping(uint8 => address[]) responses;          // Mapping key is the status code reported
                                                        // This lets us group responses and identify
                                                        // the response that majority of the oracles
    }

    // Track all oracle responses
    // Key = hash(index, flight, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event FlightStatusInfo(address airline, string flight, uint256 timestamp, uint8 status);

    event OracleReport(address airline, string flight, uint256 timestamp, uint8 status);

    // Event fired when flight status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(uint8 index, address airline, string flight, uint256 timestamp);


    //event RegisterAirline(address airline);
    
    // Register an oracle with the contract
    function registerOracle
                            (
                            )
                            external
                            payable
    {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({
                                        isRegistered: true,
                                        indexes: indexes
                                    });
    }

    function getMyIndexes
                            (
                            )
                            view
                            external
                            returns(uint8[3])
    {
        require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

        return oracles[msg.sender].indexes;
    }




    // Called by oracle when a response is available to an outstanding request
    // For the response to be accepted, there must be a pending request that is open
    // and matches one of the three Indexes randomly assigned to the oracle at the
    // time of registration (i.e. uninvited oracles are not welcome)
    function submitOracleResponse
                        (
                            uint8 index,
                            address airline,
                            string flight,
                            uint256 timestamp,
                            uint8 statusCode
                        )
                        external
                        //returns (bytes32, bool)
    {
        require((oracles[msg.sender].indexes[0] == index) || (oracles[msg.sender].indexes[1] == index) || (oracles[msg.sender].indexes[2] == index), "Index does not match oracle request");


        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        //return (key, oracleResponses[key].isOpen);
        require(oracleResponses[key].isOpen, "oracleResponses key is not found or Open~");

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

            emit FlightStatusInfo(airline, flight, timestamp, statusCode);
            oracleResponses[key].isOpen = false;
            // Handle flight status as appropriate
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }


    function getFlightKey
                        (
                            address airline,
                            string flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    // Returns array of three non-duplicating integers from 0-9
    function generateIndexes
                            (                       
                                address account         
                            )
                            internal
                            returns(uint8[3])
    {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);
        
        indexes[1] = indexes[0];
        while(indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex
                            (
                                address account
                            )
                            internal
                            returns (uint8)
    {
        uint8 maxValue = 10;

        // Pseudo random number...the incrementing nonce adds variation
        uint8 random = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - nonce++), account))) % maxValue);

        if (nonce > 250) {
            nonce = 0;  // Can only fetch blockhashes for last 256 blocks so we adapt
        }

        return random;
    }


   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (
                                address airline,
                                string flight,
                                uint256 timestamp
                            )
                            external
                            payable
                            requireIsOperational
                            
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        require(flights[flight_key].isRegistered, "No Registered flight found!");
        

        if (msg.value > 1 ether)
        {
            msg.sender.transfer(msg.value - 1);
            flights[flight_key].passengers[msg.sender].InsuredAmount = 1 ether;
        }
        else if (msg.value > 0 ether)
        {

            flights[flight_key].passengers[msg.sender].InsuredAmount = msg.value;
            
        }

        if (msg.value > 0 ether)
        {
            flights[flight_key].passengers[msg.sender].isInsured = true;
            flights[flight_key].passengers[msg.sender].CreditAmount = 0;
            flights[flight_key].passenger_address.push(msg.sender);
        }
    }

    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                    address airline,
                                    string flight,
                                    uint256 timestamp,
                                    address insured
                                )
                                //external
                                
                                
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        uint premium = flights[flight_key].passengers[insured].InsuredAmount;
        flights[flight_key].passengers[insured].InsuredAmount = 0;
        flights[flight_key].passengers[insured].CreditAmount += premium.mul(3).div(2);
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                                address airline,
                                string flight,
                                uint256 timestamp,
                                uint withdraw_amount
                            )
                            external
                            payable
                            
    {
        uint transfer_amount;
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        if (withdraw_amount >= flights[flight_key].passengers[msg.sender].CreditAmount)
        {
            transfer_amount = flights[flight_key].passengers[msg.sender].CreditAmount;
            flights[flight_key].passengers[msg.sender].CreditAmount = 0;
            msg.sender.transfer(transfer_amount);
        }
        else if (withdraw_amount > 0)
        {
            transfer_amount = withdraw_amount;
            flights[flight_key].passengers[msg.sender].CreditAmount -= withdraw_amount;
            msg.sender.transfer(transfer_amount);
        }
        
    }


    function check_passenger_Premium
                            (
                                address airline,
                                string flight,
                                uint256 timestamp
                            )
                            external
                            returns (uint)
                            
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        return flights[flight_key].passengers[msg.sender].InsuredAmount;
    }

    function check_passenger_Credit
                            (
                                address airline,
                                string flight,
                                uint256 timestamp
                            )
                            external
                            returns (uint)
                            
    {
        bytes32 flight_key = getFlightKey(airline, flight, timestamp);
        return flights[flight_key].passengers[msg.sender].CreditAmount;
    }




    function registerAirline(address airline) external {
        flightSuretyData.registerAirline(airline, msg.sender, msg.value);
    }

    function fund() external payable {
        flightSuretyData.fund(msg.sender, msg.value);
    }

    function Airline_vote(address airline_address) external {
        flightSuretyData.Airline_vote(airline_address, msg.sender);
    }

// endregion

}   

contract FlightSuretyData {
    function registerAirline(address airline, address msg_sender, uint msg_value) external {}
    function fund(address msg_sender, uint msg_value) external {}
    function Airline_vote(address airline_address, address msg_sender) external {}
    //external;
}

