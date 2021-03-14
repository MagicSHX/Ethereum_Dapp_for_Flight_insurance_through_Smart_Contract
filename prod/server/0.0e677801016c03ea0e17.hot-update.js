exports.id=0,exports.modules={"./src/server/server.js":function(e,o,t){"use strict";t.r(o);var n=t("./build/contracts/FlightSuretyApp.json"),r=(t("./build/contracts/FlightSuretyData.json"),t("./src/server/config.json")),s=t("web3"),c=t.n(s),l=t("express"),a=t.n(l);t("babel-polyfill");function u(e,o,t,n,r,s,c){try{var l=e[s](c),a=l.value}catch(e){return void t(e)}l.done?o(a):Promise.resolve(a).then(n,r)}function i(e){return function(){var o=this,t=arguments;return new Promise((function(n,r){var s=e.apply(o,t);function c(e){u(s,n,r,c,l,"next",e)}function l(e){u(s,n,r,c,l,"throw",e)}c(void 0)}))}}console.log("start!!!");var g=[],f=r.localhost,p=new c.a(new c.a.providers.WebsocketProvider(f.url.replace("http","ws")));p.eth.defaultAccount=p.eth.accounts[0];var v=new p.eth.Contract(n.abi,f.appAddress),h=function(){var e=i(regeneratorRuntime.mark((function e(){var o,t,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.eth.getAccounts();case 2:return o=e.sent,console.log("start!"),console.log("accounts: ",o),e.next=7,v.methods.REGISTRATION_FEE().call();case 7:t=e.sent,console.log(t),n=2;case 10:if(!(n<21)){e.next=21;break}return e.next=13,v.methods.registerOracle().send({from:o[n],value:t,gas:4712388,gasPrice:1e11});case 13:return e.next=15,v.methods.getMyIndexes().call({from:o[n]});case 15:r=e.sent,g.push(r),console.log("Oracle Registered: ".concat(r[0],", ").concat(r[1],", ").concat(r[2]));case 18:n++,e.next=10;break;case 21:return console.log(g),e.abrupt("return",o);case 23:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();console.log("accounts: ",h),console.log("1st check point");h[1];v.events.OracleRequest({fromBlock:0},(function(e,o){e&&console.log(e),console.log("OracleRequest"),console.log(o)})),v.events.FlightStatusInfo({fromBlock:0},(function(e,o){e&&console.log(e),console.log("FlightStatusInfo"),console.log(o)})),v.events.OracleReport({fromBlock:0},(function(e,o){e&&console.log(e),console.log("OracleReport"),console.log(o)}));var d=a()();d.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=d}};