const net = require('net');
const port = 8124;

let clients = [];
let seed = 0;
const server = net.createServer((client) => {

    clients[clients.length] = Date.now() + seed++;
  console.log('Client connected, id: ' + clients[clients.length-1]);

  client.setEncoding('utf8');

  client.on('data', (data) => {
    console.log(data);
    client.write('\r\nHello!\r\nRegards,\r\nServer\r\n');
  });

  client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});