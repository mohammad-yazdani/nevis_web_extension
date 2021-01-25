/*const WebSocket = require('websocket');

const ws = new WebSocket('http://localhost');
//console.log(ws);

ws.onopen = function() {
  console.log('WebSocket Client Connected');
  ws.send('Hi this is web client.');
};

ws.onmessage = function(e) {
  console.log("Received: '" + e.data + "'");
};

ws.on('my response', function(msg) {
  console.log('<p>Received: ' + msg.data + '</p>');
});
ws.emit('my event', 'client_data');

console.log(ws);*/

var io = require("socket.io-client");

var socket = io('http://127.0.0.1:8080');
socket.on('connect',function(){
  console.log("connected");
  // socket.emit('client_connected', { data:"testsend" } );
  socket.binaryType = 'arraybuffer';
  socket.send(new ArrayBuffer(10000));
});
socket.on('update',function(data){
  console.log(data);
});
