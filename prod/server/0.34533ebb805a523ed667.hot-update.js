exports.id=0,exports.modules={"./src/server/server.js":function(e,t,n){"use strict";n.r(t);var o=n("./build/contracts/FlightSuretyApp.json"),r=(n("./build/contracts/FlightSuretyData.json"),n("./src/server/config.json")),s=n("web3"),c=n.n(s),a=n("express"),l=n.n(a);n("babel-polyfill");function u(e,t,n,o,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void n(e)}a.done?t(l):Promise.resolve(l).then(o,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var s=e.apply(t,n);function c(e){u(s,o,r,c,a,"next",e)}function a(e){u(s,o,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var g=[],f=r.localhost,h=new c.a(new c.a.providers.WebsocketProvider(f.url.replace("http","ws")));h.eth.defaultAccount=h.eth.accounts[0];var p=new h.eth.Contract(o.abi,f.appAddress),d=[0,10,20,30,40,50],v=function(){var e=i(regeneratorRuntime.mark((function e(){var t,n,o,r,s,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,p.methods.REGISTRATION_FEE().call();case 7:n=e.sent,console.log(n),o=2;case 10:if(!(o<21)){e.next=21;break}return e.next=13,p.methods.registerOracle().send({from:t[o],value:n,gas:4712388,gasPrice:1e11});case 13:return e.next=15,p.methods.getMyIndexes().call({from:t[o]});case 15:r=e.sent,g.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:o++,e.next=10;break;case 21:return console.log(g),s=function(){var e=i(regeneratorRuntime.mark((function e(n,o,r){var s,c,a,l,u,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=Math.floor(6*Math.random()),s=2,console.log(d[s]),e.prev=3,e.next=6,p.methods.registerFlight(o,r,n).call();case 6:return e.next=8,p.methods.fetchFlightStatus(n,o,r).call();case 8:e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:c=2;case 14:if(!(c<21)){e.next=32;break}return e.next=17,p.methods.getMyIndexes().call({from:t[c]});case 17:a=e.sent,console.log(a),l=0;case 20:if(!(l<3)){e.next=29;break}return e.next=23,p.methods.submitOracleResponse(a[l],n,o,r,d[s]).call({from:t[c]});case 23:u=e.sent,console(u),console.log(c,l);case 26:l++,e.next=20;break;case 29:c++,e.next=14;break;case 32:return e.next=34,p.methods.FlightStatusCode(n,o,r).call();case 34:i=e.sent,console.log("Flight Status Code: ",i);case 36:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t,n,o){return e.apply(this,arguments)}}(),"ND1309",12345678,c=t[1],e.next=28,s(c,"ND1309",12345678);case 28:return e.abrupt("return",t);case 29:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",v),console.log("1st check point"),p.events.OracleRequest({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t)})),p.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),p.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var m=l()();m.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=m}};