exports.id=0,exports.modules={"./src/server/server.js":function(e,t,o){"use strict";o.r(t);var n=o("./build/contracts/FlightSuretyApp.json"),r=o("./src/server/config.json"),s=o("web3"),c=o.n(s),a=o("express"),l=o.n(a);o("babel-polyfill");function u(e,t,o,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void o(e)}a.done?t(l):Promise.resolve(l).then(n,r)}function i(e){return function(){var t=this,o=arguments;return new Promise((function(n,r){var s=e.apply(t,o);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var f=[],g=r.localhost,h=new c.a(new c.a.providers.WebsocketProvider(g.url.replace("http","ws")));h.eth.defaultAccount=h.eth.accounts[0];var p=new h.eth.Contract(n.abi,g.appAddress),d=[0,10,20,30,40,50],v=function(){var e=i(regeneratorRuntime.mark((function e(){var t,o,n,r,s,c,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,p.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),n=1;case 10:if(!(n<20)){e.next=21;break}return e.next=13,p.methods.registerOracle().send({from:t[n],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,p.methods.getMyIndexes().call({from:t[n]});case 15:r=e.sent,f.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:n++,e.next=10;break;case 21:return console.log(f),s=function(){var e=i(regeneratorRuntime.mark((function e(o,n,r){var s,c,a,l,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=Math.floor(6*Math.random()),console.log(d[s]),e.next=4,p.methods.registerFlight(n,r,o).call({from:o});case 4:return e.next=6,p.methods.fetchFlightStatus(o,n,r);case 6:c=1;case 7:if(!(c<20)){e.next=26;break}a=f[c-1],con,l=0;case 11:if(!(l<3)){e.next=23;break}return e.prev=12,e.next=15,p.methods.submitOracleResponse(a[l],o,n,r,d[s]).call({from:t[c]});case 15:console.log(c,l),e.next=20;break;case 18:e.prev=18,e.t0=e.catch(12);case 20:l++,e.next=11;break;case 23:c++,e.next=7;break;case 26:return e.next=28,p.methods.FlightStatusCode.call(o,n,r);case 28:u=e.sent,console.log("Flight Status Code: ",u);case 30:case"end":return e.stop()}}),e,null,[[12,18]])})));return function(t,o,n){return e.apply(this,arguments)}}(),"ND1309",c=Math.floor(Date.now()/1e3),a=t[1],s(a,"ND1309",c),e.abrupt("return",t);case 28:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",v),console.log("1st check point"),p.events.OracleRequest({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t)})),p.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),p.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var m=l()();m.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=m}};