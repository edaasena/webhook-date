"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/date", function(req, res) {

    var text =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.dateText
      ? req.body.result.parameters.dateText
      : "";

    var today = new Date();
    var speech = "";
    if(text.indexOf("yarın") > -1){
        //myDate.setTime( myDate.getTime() + 1 * 86400000 );
        var newDate = new Date(today.getTime() + (1*86400000));
        speech = newDate.toLocaleDateString();
    }
    else if(text.indexOf("dün") > -1){
        var newDate = new Date(today.getTime() - (1*86400000));
        speech = newDate.toLocaleDateString();
    }
    else if(text.indexOf("haftaya bugün") > -1 || text.indexOf("bir hafta sonra") > -1){
        var newDate = new Date(today.getTime() + (7*86400000));
        speech = newDate.toLocaleDateString();
    }
    else if(text.indexOf("bugün") > -1){
        speech=myDate.toLocaleDateString();
    }

    return res.json({
        speech: speech,
        displayText: speech,
        source: "webhook-date"
    });
});


restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});