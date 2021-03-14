exports.id=0,exports.modules={"./src/server/server.js":function(o,e,s){"use strict";s.r(e);var t=s("./build/contracts/FlightSuretyApp.json"),n=s("./src/server/config.json"),l=s("web3"),r=s.n(l),c=s("express"),a=s.n(c);var u=n.localhost,i=new r.a(new r.a.providers.WebsocketProvider(u.url.replace("http","ws")));i.eth.defaultAccount=i.eth.accounts[0],console.log();var g=new i.eth.Contract(t.abi,u.appAddress);g.events.OracleRequest({fromBlock:0},(function(o,e){o&&console.log(o),console.log("OracleRequest"),console.log(e)})),g.events.FlightStatusInfo({fromBlock:0},(function(o,e){o&&console.log(o),console.log("FlightStatusInfo"),console.log(e)})),g.events.OracleReport({fromBlock:0},(function(o,e){o&&console.log(o),console.log("OracleReport"),console.log(e)}));var p=a()();p.get("/api",(function(o,e){e.send({message:"An API for use with your Dapp!"})})),e.default=p}};