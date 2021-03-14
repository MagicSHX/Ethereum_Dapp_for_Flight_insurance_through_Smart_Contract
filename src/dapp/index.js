
import DOM from './dom';
import Contract from './contract';
import './flightsurety.css';


(async() => {

    let result = null;

    let contract = new Contract('localhost', () => {

        // Read transaction
        contract.isOperational((error, result) => {
            console.log(error,result);
            display('Operational Status', 'Check if contract is operational', [ { label: 'Operational Status', error: error, value: result} ]);
        });
    

        // User-submitted transaction
        DOM.elid('submit-oracle').addEventListener('click', () => {
            let flight = DOM.elid('flight-number').value;
            // Write transaction
            contract.fetchFlightStatus(flight, (error, result) => {
                display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });
        })
    




        // User-submitted transaction
        DOM.elid('submit-premium').addEventListener('click', () => {
            let flight = DOM.elid('passenger-flight-departure').value;
            let flight_timestamp = 12345678;
            let customer_address = DOM.elid('passenger-customer').value;
            let premium = DOM.elid('passenger-flight-premium').value;
            // Write transaction
            contract.buy(flight, flight_timestamp, customer_address, premium, (error, result) => {
                console.log(result);
                console.log(error);
                //display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });
        })




        // User-submitted transaction
        DOM.elid('submit-Claim-withdraw-request').addEventListener('click', () => {
            let flight = DOM.elid('passenger-flight-departure').value;
            let flight_timestamp = 12345678;
            let customer_address = DOM.elid('passenger-customer').value;
            let claim_payout = DOM.elid('passenger-flight-claim-payout').value;
            
            // Write transaction
            contract.pay(flight, flight_timestamp, customer_address, claim_payout, (error, result) => {
                console.log(result);
                console.log(error);
                //display('Oracles', 'Trigger oracles', [ { label: 'Fetch Flight Status', error: error, value: result.flight + ' ' + result.timestamp} ]);
            });
        })


    });
    

})();


function display(title, description, results) {
    let displayDiv = DOM.elid("display-wrapper");
    let section = DOM.section();
    section.appendChild(DOM.h2(title));
    section.appendChild(DOM.h5(description));
    results.map((result) => {
        let row = section.appendChild(DOM.div({className:'row'}));
        row.appendChild(DOM.div({className: 'col-sm-4 field'}, result.label));
        row.appendChild(DOM.div({className: 'col-sm-8 field-value'}, result.error ? String(result.error) : String(result.value)));
        section.appendChild(row);
    })
    displayDiv.append(section);

}







