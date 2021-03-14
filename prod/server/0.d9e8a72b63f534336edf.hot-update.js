exports.id=0,exports.modules={"./src/server/server.js":function(e,t,o){"use strict";o.r(t);var n=o("./build/contracts/FlightSuretyApp.json"),r=o("./src/server/config.json"),s=o("web3"),c=o.n(s),a=o("express"),l=o.n(a);o("babel-polyfill");function u(e,t,o,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void o(e)}a.done?t(l):Promise.resolve(l).then(n,r)}function i(e){return function(){var t=this,o=arguments;return new Promise((function(n,r){var s=e.apply(t,o);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var f=[],g=r.localhost,h=new c.a(new c.a.providers.WebsocketProvider(g.url.replace("http","ws")));h.eth.defaultAccount=h.eth.accounts[0];var p=new h.eth.Contract(n.abi,g.appAddress),v=[0,10,20,30,40,50],d=function(){var e=i(regeneratorRuntime.mark((function e(){var t,o,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,p.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),n=1;case 10:if(!(n<20)){e.next=21;break}return e.next=13,p.methods.registerOracle().send({from:t[n],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,p.methods.getMyIndexes().call({from:t[n]});case 15:r=e.sent,f.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:n++,e.next=10;break;case 21:return console.log(f),e.abrupt("return",t);case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",d),console.log("1st check point");var m=function(){var e=i(regeneratorRuntime.mark((function e(t,o,n){var r,s,c,a,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Math.floor(6*Math.random()),console.log(v[r]),e.next=4,p.methods.registerFlight(o,n,t).call({from:t});case 4:return e.next=6,p.methods.fetchFlightStatus(t,o,n);case 6:s=1;case 7:if(!(s<20)){e.next=25;break}c=f[s-1],a=0;case 10:if(!(a<3)){e.next=22;break}return e.prev=11,e.next=14,p.methods.submitOracleResponse(c[a],t,o,n,v[r]).call({from:d[s]});case 14:console.log(s,a),e.next=19;break;case 17:e.prev=17,e.t0=e.catch(11);case 19:a++,e.next=10;break;case 22:s++,e.next=7;break;case 25:return e.next=27,p.methods.FlightStatusCode.call(t,o,n);case 27:l=e.sent,console.log("Flight Status Code: ",l);case 29:case"end":return e.stop()}}),e,null,[[11,17]])})));return function(t,o,n){return e.apply(this,arguments)}}(),x=Math.floor(Date.now()/1e3);m(d[1],"ND1309",x),p.events.OracleRequest({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t)})),p.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),p.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var b=l()();b.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=b}};