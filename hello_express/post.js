var express = require('express');
var app = express();  //Web framework for routing
var cons = require('consolidate');  //Templating library adapter for Express 
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;
var bodyParser = require('body-parser');

app.engine('html',cons.swig);
app.set('view engine','html');
app.set('views',__dirname+"/views");
app.use(bodyParser.urlencoded({extended:true}));      //Used for parsing POST variables
//app.use(app.router);

var db = new Db('course',new Server('localhost',27017,{'native_parser':true})); 

// Handler for internal server errors
function errorHandler(err,req,res,next)
{
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template',{error:err});
}

app.use(errorHandler);

app.get('/',function(req,res,next){
	res.render('post',{'fruits':['apple','orange','banana','peach']});
});

app.post('/favorite_fruit',function(req,res,next){
	var favorite = req.body.fruit;

	if(typeof favorite=='undefined')
		next(Error('Please choose a fruit!'));
	else
		res.send("Your favorite fruit is "+favorite);

});

// '*' is used if none of the URL specified upper does not match to the requested URL 
app.get("*",function(req,res){
	
	res.send("Page Not Found",404);
});


db.open(function(err,mongoclient){

	if(err)
		throw err;

	app.listen(8080);

	console.log("Express server started on port 8080");
});
