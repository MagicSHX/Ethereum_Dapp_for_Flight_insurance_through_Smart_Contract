pragma solidity ^0.4.25;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    uint8 volume_registered_airlines = 0;


    struct Airline {
        bool isRegistered;
        bool isAgreed;
        bool isPaid;
        bool isContracted;
        uint8 votes;
        //address airline;
        //uint256 updatedTimestamp;
        
    }
    mapping(address => Airline) private airlines;

    struct Registered_Airline {
        bool isRegistered;
        //uint8 votes;
        //address airline;
        //uint256 updatedTimestamp;
    }
    mapping(address => Registered_Airline) private registered_airlines;





    //airlines[airline].isRegistered = True;
    bytes32 firstAirline;


    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor
                                (
                                    //bytes32 _firstAirline
                                ) 
                                public 
    {
        contractOwner = msg.sender;
    }

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
        require(operational, "Contract is currently not operational");
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
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */      
    function isOperational() 
                            public 
                            view 
                            returns(bool) 
    {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */    
    function setOperatingStatus
                            (
                                bool mode
                            ) 
                            external
                            requireContractOwner 
    {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/



    function Airline_funding_check
                            (
                                
                            )
                            public 
                            view 
                            returns(bool) 
    {
        if (msg.value >= 10 ether)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    function Airline_iscontracted_check
                            (
                                address airline_address
                            )
                            public 
                            view 
                            returns(bool) 
    {
        if (airlines[airline_address].isRegistered == true && airlines[airline_address].isAgreed == true && airlines[airline_address].isPaid == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }





   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   
    function registerAirline
                            (   
                                address airline_address,
                                address owner
                            )
                            external
                            
                            
                            returns(bool success, uint256 votes)
    {

        if(volume_registered_airlines == 0)
            {
                //require(msg.sender == contractOwner, "Caller is not contract owner");
                airlines[airline_address] = Airline({
                    isRegistered: true,
                    isAgreed: true,
                    isPaid: Airline_funding_check(),
                    isContracted: Airline_iscontracted_check(airline_address),
                    votes: 0
                });
                volume_registered_airlines++;
            }

        else if(volume_registered_airlines <= 3)
            {
                require(airlines[msg.sender].isContracted, "Only existing airline may register a new airline until there are at least four airlines registered.");

                airlines[airline_address] = Airline({
                    isRegistered: true,
                    isAgreed: true,
                    isPaid: Airline_funding_check(),
                    isContracted: Airline_iscontracted_check(airline_address),
                    votes: 0
                });
                //registered_airlines[airline_address] = Registered_Airline({
                    //isRegistered: true,
                    //votes: 0,
                    //updatedTimestamp,
                    //airline: airline_address
                //});
                volume_registered_airlines++;
                
            }
        else
            {
                airlines[airline_address] = Airline({
                    isRegistered: false,
                    isAgreed: false,
                    isPaid: Airline_funding_check(),
                    isContracted: Airline_iscontracted_check(airline_address),
                    votes: 0
                });
                volume_registered_airlines++;
            }
        return (success, 0);



    }


   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (                             
                            )
                            external
                            requireIsOperational
                            payable
    {

    }

    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                )
                                external
                                
                                pure
    {
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                            )
                            external
                            
                            pure
    {
    }

   /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */   
    function fund
                            (   
                            )
                            public
                            requireIsOperational
                            payable
    {
        require(airlines[msg.sender].isRegistered, "Airline is not registered.");
        airlines[msg.sender].isPaid = Airline_funding_check();
        airlines[msg.sender].isPaid = true;
        airlines[msg.sender].isContracted = Airline_iscontracted_check(msg.sender);
    }

    function getFlightKey
                        (
                            address airline,
                            string memory flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    function isAirline(address airline)public view returns (bool)
    {
        return airlines[airline].isRegistered;
    }

    function func_with_requireIsOperational
                            (                             
                            )
                            external
                            requireIsOperational
                            payable
    {

    }



    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
                            external 
                            payable 
    {
        fund();
    }


}

