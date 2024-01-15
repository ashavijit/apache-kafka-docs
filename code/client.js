const {Kafka} = require('kafkajs')
exports.Kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['172.16.108.155:9092']
})