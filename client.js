const net = require('net');
const port = 8124;
message = process.argv[2];

const client = new net.Socket();
var answersArray = [];
var questionArray = [];
var questionCounter = 0;

client.setEncoding('utf8');

client.connect(port, function() {
    client.write("QA");
    console.log('Connected');
    client.write('\r\nHello, Server!\r\nLove,\r\nClient.\r\n');
});

client.on('data', function(data) {
  console.log(data);
  if (data === "ACK") {
        var qaJson = require('./qa.json');
        answersArray = [qaJson.Q1, qaJson.Q2, qaJson.Q3];
        questionArray = ["Q1", "Q2", "Q3"];
        console.log("Question: " + questionArray[questionCounter]);
        client.write(questionArray[questionCounter]);
        questionCounter++;
    }
    if (data !== "ACK" && data !== "DEC" && data.startsWith("A") && questionCounter <= questionArray.length) {
        if (data === answersArray[questionCounter - 1]) {
            console.log("Correct :)");
        }
        else {
            console.log("Wrong :(")
        }
        if (questionCounter != questionArray.length)
        {
            console.log("\r\nQuestion: " + questionArray[questionCounter]);
            client.write(questionArray[questionCounter]);
            questionCounter++;
        }
    }
  //client.destroy();
});

client.on('close', function() {
  console.log('Connection closed');
});