var net = require('net');

var clients = [];

net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 
  clients.push(socket);


  socket.on('data', function (data) {
    broadcast(data, socket);
  });

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
  });
  
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      if (client === sender) return;
      client.write(message);
    });
    process.stdout.write(message)
  }

}).listen(5000);

console.log("Chat server running at port 5000\n");