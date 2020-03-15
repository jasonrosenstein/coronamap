var express = require('express');
var app = express();

var geocoder = require('geocoder');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route

var COUNTRY = '';

app.get('/', function(req, res) {
	var unirest = require("unirest");

var req = unirest("GET", "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats");


req.headers({
	"x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
	"x-rapidapi-key": "696e8f2e12msh300eb6a75c147bcp198f90jsnfd55179b6c29"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.data.covid19Stats[1].confirmed);

	COUNTRY = res.body.data.covid19Stats;

});

    // ejs render automatically looks in the views folder
    res.render("index", { COUNTRY: COUNTRY }) ;
 
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
