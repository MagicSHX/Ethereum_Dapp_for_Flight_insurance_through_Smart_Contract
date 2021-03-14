exports.id=0,exports.modules={"./src/server/server.js":function(e,t,o){"use strict";o.r(t);var n=o("./build/contracts/FlightSuretyApp.json"),r=(o("./build/contracts/FlightSuretyData.json"),o("./src/server/config.json")),s=o("web3"),c=o.n(s),a=o("express"),l=o.n(a);o("babel-polyfill");function u(e,t,o,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void o(e)}a.done?t(l):Promise.resolve(l).then(n,r)}function i(e){return function(){var t=this,o=arguments;return new Promise((function(n,r){var s=e.apply(t,o);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var g=[],f=r.localhost,p=new c.a(new c.a.providers.WebsocketProvider(f.url.replace("http","ws")));p.eth.defaultAccount=p.eth.accounts[0];var h=new p.eth.Contract(n.abi,f.appAddress),v=[0,10,20,30,40,50],d=function(){var e=i(regeneratorRuntime.mark((function e(){var t,o,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,h.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),n=2;case 10:if(!(n<21)){e.next=21;break}return e.next=13,h.methods.registerOracle().send({from:t[n],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,h.methods.getMyIndexes().call({from:t[n]});case 15:r=e.sent,g.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:n++,e.next=10;break;case 21:return console.log(g),e.abrupt("return",t);case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",d),console.log("1st check point");var m=function(){var e=i(regeneratorRuntime.mark((function e(t,o,n){var r,s,c,a,l,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Math.floor(6*Math.random()),r=2,console.log(v[r]),s=2;case 4:if(!(s<21)){e.next=21;break}c=g[s-2],console.log(c),a=0;case 8:if(!(a<3)){e.next=18;break}return console.log(d[s]),e.next=12,h.methods.submitOracleResponse(c[a],t,o,n,v[r]).call({from:d[s],gas:4712388,gasPrice:1e11});case 12:l=e.sent,console.log(l),console.log(s,a);case 15:a++,e.next=8;break;case 18:s++,e.next=4;break;case 21:return e.next=23,h.methods.FlightStatusCode(t,o,n).call();case 23:u=e.sent,console.log("Flight Status Code: ",u);case 25:case"end":return e.stop()}}),e)})));return function(t,o,n){return e.apply(this,arguments)}}();h.events.OracleRequest({fromBlock:"latest"},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t);var o=t.returnValues.flight,n=t.returnValues.timestamp,r=t.returnValues.airline;m(r,o,n)})),h.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),h.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var x=l()();x.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=x}};