var server = require("./persistent_server.js");
var http = require("http");
var url = require("url");
var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("newchat", "root", "");

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};


var Message = sequelize.define('Message', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
},{
  tablename:'messages'
});

Message.sync();

var writeToDb = function(data){
  data.message = data.text;
  delete data.text;
  console.log(data);
  Message
  .create({
    username: data.username,
    message: data.message,
    roomname: data.roomname
  })
  .complete(function(err, results){
    console.log("results",results);
    return results;
  });
};

var readFromDb = function(req, res){
  Message.findAll().success(function(messages) {
    getMessages(req, res, messages);
  });
};

var sendResponse = function(res, obj, statusCode) {
  var statusCode = statusCode || 200;
  res.writeHead(statusCode, defaultCorsHeaders);
  if (obj) {
    console.log("THIS. IS. OBJECT.");
    console.log(obj.results);
  }
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
  var results = [];
  for(var j = 0; j < data.length; j++){
    results.push(data[j].dataValues);
  }
  for (var i = 0; i < results.length; i++) {
    results[i].text = results[i].message;
  }
  var wrapper = {results: results};
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
