exports.id=0,exports.modules={"./src/server/server.js":function(e,o,t){"use strict";t.r(o);var n=t("./build/contracts/FlightSuretyApp.json"),r=(t("./build/contracts/FlightSuretyData.json"),t("./src/server/config.json")),s=t("web3"),c=t.n(s),a=t("express"),l=t.n(a);t("babel-polyfill");function u(e,o,t,n,r,s,c){try{var a=e[s](c),l=a.value}catch(e){return void t(e)}a.done?o(l):Promise.resolve(l).then(n,r)}function i(e){return function(){var o=this,t=arguments;return new Promise((function(n,r){var s=e.apply(o,t);function c(e){u(s,n,r,c,a,"next",e)}function a(e){u(s,n,r,c,a,"throw",e)}c(void 0)}))}}console.log("start!!!");var g=[],f=[],p=r.localhost,h=new c.a(new c.a.providers.HttpProvider(p.url));h.eth.defaultAccount=h.eth.accounts[0];var d=new h.eth.Contract(n.abi,p.appAddress),v=[0,10,20,30,40,50];(function(){var e=i(regeneratorRuntime.mark((function e(){var o,t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.eth.getAccounts();case 2:return f=e.sent,console.log("start!"),console.log("accounts: ",f),e.next=7,d.methods.REGISTRATION_FEE().call();case 7:o=e.sent,console.log(o),t=2;case 10:if(!(t<21)){e.next=21;break}return e.next=13,d.methods.registerOracle().send({from:f[t],value:o,gas:4712388,gasPrice:1e11});case 13:return e.next=15,d.methods.getMyIndexes().call({from:f[t]});case 15:n=e.sent,g.push(n),console.log("Oracle Registered: ".concat(n[0],", ").concat(n[1],", ").concat(n[2]));case 18:t++,e.next=10;break;case 21:console.log(g);case 22:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),console.log("accounts: ",f),console.log("1st check point");var m=function(){var e=i(regeneratorRuntime.mark((function e(o,t,n){var r,s,c,a,l,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Math.floor(6*Math.random()),r=2,console.log("random status code: ",v[r]),console.log("account: ",f[0]),s=2;case 5:if(!(s<21)){e.next=22;break}c=g[s-2],console.log(c),a=0;case 9:if(!(a<3)){e.next=19;break}return console.log(f[s]),e.next=13,d.methods.submitOracleResponse(c[a],o,t,n,v[r]).call({from:f[s],gas:4712388,gasPrice:1e11});case 13:l=e.sent,console.log(l),console.log(s,a);case 16:a++,e.next=9;break;case 19:s++,e.next=5;break;case 22:return e.next=24,d.methods.FlightStatusCode(o,t,n).call();case 24:u=e.sent,console.log("Flight Status Code: ",u);case 26:case"end":return e.stop()}}),e)})));return function(o,t,n){return e.apply(this,arguments)}}();d.events.OracleRequest({fromBlock:"latest"},(function(e,o){e&&console.log(e),console.log("OracleRequest"),console.log(o);var t=o.returnValues.flight,n=o.returnValues.timestamp,r=o.returnValues.airline;m(r,t,n)})),d.events.FlightStatusInfo({fromBlock:0},(function(e,o){e&&console.log(e),console.log("FlightStatusInfo"),console.log(o)})),d.events.OracleReport({fromBlock:0},(function(e,o){e&&console.log(e),console.log("OracleReport"),console.log(o)}));var x=l()();x.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=x}};