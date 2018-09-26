const net = require('net');
const port = 8124;

let clients = [];
let seed = 0;
const server = net.createServer((connection) => {
    connection.on('data', (data) => {
        console.log('client message: ' + data);
        if (data=='QA')
            connection.write('ACK');
        else
            { connection.write('DEC');    }
      });
    clients[clients.length] = Date.now() + seed++;
    console.log('Client connected, id: ' + clients[clients.length-1]);

    connection.setEncoding('utf8');

//     connection.on('data', (data) => {
//     console.log(data);
//     connection.write('\r\nHello!\r\nRegards,\r\nServer\r\n');
//   });

  connection.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});