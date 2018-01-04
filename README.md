Generate a key and certificate:

`openssl genrsa 1024 > key.pem`

`openssl req -x509 -new -key key.pem > cert.pem`

Start the server:

`node websocket-server.js`

Open a web browser and open this page:

`https://[yourmachinename]:7777/websocket-client.html`
