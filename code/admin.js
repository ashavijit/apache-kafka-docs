const Kafka = require('./client');

async function init_conn() {
    const avijit = Kafka.admin();
    await avijit.connect();
    console.log('Connected! Now creating topics...');

    await avijit.createTopics({
        topics: [{
            topic: 'Users',
            numPartitions: 2
        }]
    });
    console.log('Created successfully!');

    await avijit.disconnect();
}

init_conn().catch((err) => {
    console.error(`Something bad happened ${err}`);
});