openssl genrsa 1024 > key.pem

openssl req -x509 -new -key key.pem > cert.pem

node websocket-server.js

https://arnoudb3win.wri.wolfram.com:7777/websocket-client.html
