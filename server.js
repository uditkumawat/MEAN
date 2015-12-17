var http = require('http')

var server=http.createServer(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.end("Hello Udit\n");
});

server.listen(8000);

console.log("Server is running at localhost and port 8000");
