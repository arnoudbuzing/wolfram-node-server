var zmq = require('zeromq');
var fs = require('fs');
var https = require('https');
var ws = require('ws');

var config = { ssl: true, port: 7777, key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };
var wsServer = ws.Server;

var httpsServer = https.createServer({ key: config.key, cert: config.cert }, function(req, res) {
// var html = fs.readFileSync('websocket-client.html');
// res.writeHead(200);
// res.end(html);
});
httpsServer.listen(config.port, function() { console.log((new Date()) + ' Server is listening on port '+config.port); });

var wss = new wsServer({ server: httpsServer });
wss.on('connection', function(socket) {
  console.log((new Date()) + ' Connection accepted.');
  socket.on('message', function(message) {
    var req = zmq.socket('req');
    req.on('message', function(message) {
      socket.send(String(message));
    });
    req.connect('tcp://172.31.39.91:1234');
    req.send(String(message));
  });
});
