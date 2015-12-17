var express = require('express');
var app = express();  //Web framework for routing
var cons = require('consolidate');  //Templating library adapter for Express 
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var Db = require('mongodb').Db;

app.engine('html',cons.swig);
app.set('view engine','html');
app.set('views',__dirname+"/views");
//app.use(app.router);

var db = new Db('course',new Server('localhost',27017,{'native_parser':true})); 


function errorHandler(err,req,res,next)
{
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template',{error:err});
}

app.use(errorHandler);

app.get('/:name',function(req,res,next){
	
	var name=req.params.name;
	var getvar1=req.query.getvar1;
	var getvar2=req.query.getvar2;
	res.render('hello',{name:name,getvar1:getvar1,getvar2:getvar2});

	db.collection('hello_mongo_express').findOne({},function(err,doc){
		
		res.render('hello',doc);
	
	});
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
