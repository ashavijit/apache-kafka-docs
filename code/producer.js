const Kafka = require('kafkajs');

const Producer = Kafka.Producer;
const client = new Kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Kafka producer is ready.');
});

producer.on('error', (error) => {
    console.error('Error from Kafka producer:', error); 
});

module.exports = {
    sendChatMessage: (message) => {
        const payloads = [
            {
                topic: 'chat-topic',
                messages: message,
            },
        ];

        producer.send(payloads, (error, data) => {
            if (error) {
                console.error('Error sending message to Kafka:', error);
            } else {
                console.log('Message sent to Kafka:', data);
            }
        });
    },
};
