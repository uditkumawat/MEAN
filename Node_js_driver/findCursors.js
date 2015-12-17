var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27071/course',function(err,db){

	if(err)
		throw err;

	var query = {"grade":90};

	var cursor=db.collection('grades').find(query);

	cursor.each(function(err,doc){
	
	if(err)
		throw err;
	if(doc==null)
		return db.close();

	console.dir(doc.student+" got a good grade");	
	});
});
