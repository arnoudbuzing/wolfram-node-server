var fs = require('fs');
var config = { ssl: true, port: 7777, key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };
var https = require('https');
var ws = require('ws');
var wsServer = ws.Server;
var httpsServer = https.createServer({ key: config.key, cert: config.cert }, function(req, res) {
 var html = fs.readFileSync('websocket-client.html');
 res.writeHead(200);
 res.end(html);
});
httpsServer.listen(config.port, function() { console.log((new Date()) + ' Server is listening on port '+config.port); });

var wss = new wsServer({ server: httpsServer });

wss.on('connection', function(socket) {
 console.log((new Date()) + ' Connection accepted.');
 var wolfram = require('child_process').spawn('/usr/local/bin/wolfram');
 wolfram.stdout.on('data', function(data) { socket.send(String(data)); });
 socket.on('message', function(message) {
  socket.send(String(message));
  wolfram.stdin.write(message+'\n');
 });
});
