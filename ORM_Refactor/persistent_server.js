var mysql = require("mysql");
var http = require("http");
var handler = require("./request-handler.js");
var url = require("url");
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

var port = 3000;

var ip = "127.0.0.1";

exports.data = {results: []};

var routes = {
  "/log": handler.handler,
  "/send": handler.handler
};

var router = function(req, res) {
  var parsedURI = url.parse(req.url);
  if(routes[parsedURI.pathname]){
    var route = routes[parsedURI.pathname];
    route(req, res);
  }else{
    handler.sendResponse(res, null, 404);
  }
};

var server = http.createServer(router);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

dbConnection.end();
