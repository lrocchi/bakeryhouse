var querystring = require("querystring");
var http = require("http");

var CommonUtils = new Object();

CommonUtils.performRequest = function(endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};

  if (method == "GET") {
    endpoint += "?" + querystring.stringify(data);
  } else {
    headers = {
      "Content-Type": "application/json",
      "Content-Length": dataString.length
    };
  }
  var options = {
    host: process.env.IP || "localhost",
    path: endpoint,
    port: 3000,
    method: method,
    headers: headers
  };
  console.log(JSON.stringify(options));

  var req = http.request(options, function(res) {
    res.setEncoding("utf-8");
    console.log("UNO");
    var responseString = "";

    if (("" + req.statusCode).match(/^2\d\d$/)) {
      console.log("STATUSCODE = " + req.statusCode);
    } else if (("" + req.statusCode).match(/^5\d\d$/)) {
      // Server error, I have no idea what happend in the backend
      // but server at least returned correctly (in a HTTP protocol
      // sense) formatted response
      console.log("STATUSCODE = " + req.statusCode);
    }

    res.on("data", function(data) {
      responseString += data;
    });
    console.log("DUE");
    res.on("end", function() {
      console.log(responseString);
      if (data.length > 0) {
        try {
          var responseObject = JSON.parse(responseString);
          success(responseObject);
        } catch (e) {
          return;
        }
      }
    });
  });

  req.on("error", function(err) {
    console.log("GET request error:" + err);
  });

  req.write(dataString);

  req.end();
};

module.exports = CommonUtils;
