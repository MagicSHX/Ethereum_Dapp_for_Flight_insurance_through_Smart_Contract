exports.id=0,exports.modules={"./src/server/server.js":function(e,t,o){"use strict";o.r(t);var n=o("./build/contracts/FlightSuretyApp.json"),s=(o("./build/contracts/FlightSuretyData.json"),o("./src/server/config.json")),r=o("web3"),c=o.n(r),a=o("express"),l=o.n(a);o("babel-polyfill");function u(e,t,o,n,s,r,c){try{var a=e[r](c),l=a.value}catch(e){return void o(e)}a.done?t(l):Promise.resolve(l).then(n,s)}console.log("start!!!");var i=[],g=s.localhost,h=new c.a(new c.a.providers.WebsocketProvider(g.url.replace("http","ws")));h.eth.defaultAccount=h.eth.accounts[0];var f=new h.eth.Contract(n.abi,g.appAddress),p=[0,10,20,30,40,50],d=function(){var e,t=(e=regeneratorRuntime.mark((function e(){var t,o,n,s,r,c,a,l,u,g,d,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return t=e.sent,console.log("start!"),console.log("accounts: ",t),e.next=7,f.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),n=2;case 10:if(!(n<21)){e.next=21;break}return e.next=13,f.methods.registerOracle().send({from:t[n],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,f.methods.getMyIndexes().call({from:t[n]});case 15:s=e.sent,i.push(s),console.log("Oracle Registered: ".concat(s[0],", ").concat(s[1],", ").concat(s[2]));case 18:n++,e.next=10;break;case 21:return console.log(i),r="ND1309",c=Math.floor(Date.now()/1e3),a=t[1],l=Math.floor(6*Math.random()),l=2,console.log(p[l]),e.prev=28,e.next=31,f.methods.registerFlight(r,c,a).call();case 31:e.next=36;break;case 33:e.prev=33,e.t0=e.catch(28),console.log(e.t0);case 36:return e.next=38,f.methods.fetchFlightStatus(a,r,c).call();case 38:u=2;case 39:if(!(u<21)){e.next=58;break}g=i[u-1],console.log(g),d=0;case 43:if(!(d<3)){e.next=55;break}return e.prev=44,e.next=47,f.methods.submitOracleResponse(g[d],a,r,c,p[l]).call({from:t[u]});case 47:console.log(u,d),e.next=52;break;case 50:e.prev=50,e.t1=e.catch(44);case 52:d++,e.next=43;break;case 55:u++,e.next=39;break;case 58:return e.next=60,f.methods.FlightStatusCode(a,r,c).call();case 60:v=e.sent,console.log("Flight Status Code: ",v);case 62:case"end":return e.stop()}}),e,null,[[28,33],[44,50]])})),function(){var t=this,o=arguments;return new Promise((function(n,s){var r=e.apply(t,o);function c(e){u(r,n,s,c,a,"next",e)}function a(e){u(r,n,s,c,a,"throw",e)}c(void 0)}))});return function(){return t.apply(this,arguments)}}()();console.log("accounts: ",d),console.log("1st check point"),f.events.OracleRequest({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleRequest"),console.log(t)})),f.events.FlightStatusInfo({fromBlock:0},(function(e,t){e&&console.log(e),console.log("FlightStatusInfo"),console.log(t)})),f.events.OracleReport({fromBlock:0},(function(e,t){e&&console.log(e),console.log("OracleReport"),console.log(t)}));var v=l()();v.get("/api",(function(e,t){t.send({message:"An API for use with your Dapp!"})})),t.default=v}};