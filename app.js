var express = require("express");
var cons = require("consolidate");

var MongoClient = require('mongodb').MongoClient;

//Open the connection to server
MongoClient.connect('mongodb://localhost:27017/test',function(err,db){
	
	if(err)
		throw err;
	
	//Find one document in our collection
	db.collection('coll').findOne({},function(err,doc){
		
		if(err)
			throw err;
		//Print the result
		console.dir(doc);
		
		//Close the DB
		db.close();	
	});	
	console.dir("Called findOne!");
});
