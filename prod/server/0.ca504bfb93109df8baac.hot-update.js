exports.id=0,exports.modules={"./src/server/server.js":function(e,o,t){"use strict";t.r(o);var n=t("./build/contracts/FlightSuretyApp.json"),r=t("./src/server/config.json"),s=t("web3"),c=t.n(s),a=t("express"),l=t.n(a);t("babel-polyfill");function u(e,o,t,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void t(e)}a.done?o(l):Promise.resolve(l).then(n,r)}console.log("start!!!");var i=r.localhost,f=new c.a(new c.a.providers.WebsocketProvider(i.url.replace("http","ws")));f.eth.defaultAccount=f.eth.accounts[0];var g=new f.eth.Contract(n.abi,i.appAddress);(function(){var e,o=(e=regeneratorRuntime.mark((function e(){var o,t,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.eth.getAccounts();case 2:return o=e.sent,console.log("start!"),console.log("accounts: ",o),e.next=7,g.methods.REGISTRATION_FEE().call();case 7:t=e.sent,console.log(t),n=1;case 10:if(!(n<20)){e.next=20;break}return e.next=13,g.methods.registerOracle().send({from:o[n],value:t,gas:4712388,gasPrice:1e11});case 13:return e.next=15,g.methods.getMyIndexes().call({from:o[n]});case 15:r=e.sent,console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 17:n++,e.next=10;break;case 20:return e.abrupt("return",o);case 21:case"end":return e.stop()}}),e)})),function(){var o=this,t=arguments;return new Promise((function(n,r){var s=e.apply(o,t);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))});return function(){return o.apply(this,arguments)}})()();g.events.OracleRequest({fromBlock:0},(function(e,o){e&&console.log(e),console.log("OracleRequest"),console.log(o)})),g.events.FlightStatusInfo({fromBlock:0},(function(e,o){e&&console.log(e),console.log("FlightStatusInfo"),console.log(o)})),g.events.OracleReport({fromBlock:0},(function(e,o){e&&console.log(e),console.log("OracleReport"),console.log(o)}));var p=l()();p.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=p}};