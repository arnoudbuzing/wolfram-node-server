# Wolfram Language nodejs server

The Wolfram Language nodejs server allows you to use the Wolfram Language in a webbrowser by making a web socket connection to a remote machine.

## Setup Instructions

Generate a key and a self-signed certificate (this is needed to make a secure web socket connection):

`openssl genrsa 1024 > key.pem`

`openssl req -x509 -new -key key.pem > cert.pem`

The `key.pem` and `cert.pem` files need to be in the same directory as the `websocket-server.js` file.

Start the server:

`node websocket-server.js`

Open a web browser and open this page:

`https://[yourmachinename]:7777/websocket-client.html`
