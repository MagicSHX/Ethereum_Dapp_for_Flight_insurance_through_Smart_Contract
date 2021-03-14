exports.id=0,exports.modules={"./src/server/server.js":function(e,t,o){"use strict";o.r(t);var n=o("./build/contracts/FlightSuretyApp.json"),r=(o("./build/contracts/FlightSuretyData.json"),o("./src/server/config.json")),s=o("web3"),c=o.n(s),a=o("express"),l=o.n(a);o("babel-polyfill");function u(e,t,o,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void o(e)}a.done?t(l):Promise.resolve(l).then(n,r)}function i(e){return function(){var t=this,o=arguments;return new Promise((function(n,r){var s=e.apply(t,o);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var g=[],f=r.localhost,h=new c.a(new c.a.providers.WebsocketProvider(f.url.replace("http","ws")));h.eth.defaultAccount=h.eth.accounts[0];var p=new h.eth.Contract(n.abi,f.appAddress),d=[0,10,20,30,40,50],v=function(){var e=i(regeneratorRuntime.mark((function e(){var t,o,n,r,s,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,p.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),n=2;case 10:if(!(n<21)){e.next=21;break}return e.next=13,p.methods.registerOracle().send({from:t[n],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,p.methods.getMyIndexes().call({from:t[n]});case 15:r=e.sent,g.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:n++,e.next=10;break;case 21:return console.log(g),s=function(){var e=i(regeneratorRuntime.mark((function e(o,n,r){var s,c,a,l,u,i,g;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=Math.floor(6*Math.random()),s=2,console.log(d[s]),e.prev=3,e.next=6,p.methods.registerFlight(n,r,o).call();case 6:return e.next=8,p.methods.fetchFlightStatus(o,n,r).call();case 8:c=e.sent,console.log(c),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.log(e.t0);case 15:a=2;case 16:if(!(a<21)){e.next=34;break}return e.next=19,p.methods.getMyIndexes().call({from:t[a]});case 19:l=e.sent,console.log(l),u=0;case 22:if(!(u<3)){e.next=31;break}return e.next=25,p.methods.submitOracleResponse(l[u],o,n,r,d[s]).call({from:t[a]});case 25:i=e.sent,console.log(i),console.log(a,u);case 28:u++,e.next=22;break;case 31:a++,e.next=16;break;case 34:return e.next=36,p.methods.FlightStatusCode(o,n,r).call();case 36:g=e.sent,console.log("Flight Status Code: ",g);case 38:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t,o,n){return e.apply(this,arguments)}}(),"ND1309",12345678,c=t[1],e.next=28,s(c,"ND1309",12345678);case 28:return e.abrupt("return",t);case 29:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",v),console.log("1st check point"),p.events.OracleRequest({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t)})),p.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),p.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var m=l()();m.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=m}};