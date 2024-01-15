const Kafka = require('kafkajs');
const socketIO = require('socket.io');
const http = require('http');


const Consumer = Kafka.Consumer;
const client = new Kafka.KafkaClient({ kafkaHost: 'localhost:9092' }); 
const consumer = new Consumer(client, [{ topic: 'chat-topic', partition: 0 }], {
    autoCommit: true,
});

const server = http.createServer();
const io = socketIO(server);

consumer.on('message', (message) => {
    console.log('Received message from Kafka:', message.value);
    io.emit('chat-message', message.value);
});

consumer.on('error', (error) => {
    console.error('Error from Kafka consumer:', error);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
