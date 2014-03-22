var server = require("./persistent_server.js");
var http = require("http");
var url = require("url");
var mysql = require("mysql");


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

var writeToDb = function(data){
  //dbConnection.connect();
    data.message = data.text;
    delete data.text;
  console.log(data);
  dbConnection.query("INSERT into messages SET ?", data, function(err, results){
    console.log("results",results);
    //dbConnection.end();
    return results;
  });
};

var readFromDb = function(req, res){

  dbConnection.query("SELECT * from messages", function(err, rows, fields){
    console.log("======== ROWS ========");
    console.log(rows);
    getMessages(req, res, rows);
  });
};



var sendResponse = function(res, obj, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, defaultCorsHeaders);
  //console.log("THIS. IS. OBJECT.");
  //console.log(obj);
  res.end(JSON.stringify(obj));
};


var collectData = function(req, callback) {
  var body = "";
  req.on("data", function(chunk) {
    body += chunk;
    console.log(body);
  });
  req.on("end", function() {
    callback(body);
  });
};


var getMessages = function(req, res, data) {
  for (var i = 0; i < data.length; i++) {
    data[i].text = data[i].message;
  }
  var wrapper = {results: data};
  sendResponse(res, wrapper, 200);
};

var sendMessages = function(req, res) {
  collectData(req, function(data) {
    var message = JSON.parse(data);
    console.log("------ Incoming!!M!ess!age! -------");
    console.log(message);
    writeToDb(message);
  });
  sendResponse(res, null, 201);
};

var options = function(req, res) {
  sendResponse(res);
};

var actions = {
  "GET": readFromDb,
  "POST": sendMessages,
  "OPTIONS": options
};

exports.handler = function(req, res) {
  if(actions[req.method]){
    var action = actions[req.method];
    action(req, res);
  }else{
    sendResponse(res, null, 404);
  }
};

exports.sendResponse = sendResponse;
