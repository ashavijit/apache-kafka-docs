Apache kafka ?

Apache kafka is a distributed streaming platform. It is used for building real-time data pipelines and streaming apps. It is horizontally scalable, fault-tolerant, wicked fast, and runs in production in thousands of companies.

Use cases

- Messaging
- Website activity tracking
- Metrics
- Log aggregation
- Stream processing

Features

- Distributed
- Partitioned
- Replicated
- Real-time
- Durable

Architecture

- Producers : Producers are the publisher of messages to one or more Kafka topics. Producers send data to Kafka brokers. Every time a producer publishes a message to a broker, the broker simply appends the message to the last segment file.

- Consumers : Consumers read data from brokers. Consumers subscribes to one or more topics and consume published messages by pulling data from the brokers.

- Topics : Topics are the categories or feed name to which messages are published. Topics in Kafka are always multi-subscriber; that is, a topic can have zero, one, or many consumers that subscribe to the data written to it.

- Partitions : Topics may have many partitions, so it can handle an arbitrary amount of data. Each partition is ordered, immutable sequence of messages that is continually appended to a structured commit log. The messages in the partitions are each assigned a sequential id number called the offset that uniquely identifies each message within the partition.

- Brokers : Brokers are simple system responsible for maintaining the published data. Each broker may have zero or more partitions per topic.

- Zookeeper : Zookeeper is used for managing and coordinating Kafka broker. Zookeeper service is mainly used to notify producer and consumer about the presence of any new broker in the Kafka system or failure of the broker in the Kafka system. Zookeeper sends the notification to Kafka in case of any changes such as addition or removal of a broker, failed broker, etc.

- Offset : Offset is a unique id assigned to each message that is published. It is used to identify each message in the partition.


# Kafka vs RabbitMQ

| Kafka | RabbitMQ |
| --- | --- |
| Kafka is a distributed streaming platform. | RabbitMQ is a message broker. |
| Kafka is a pull-based broker. | RabbitMQ is a push-based broker. |

Kafka : Real time use cases

1. Zomato : Zomato uses Kafka to publish user and order events in real time. This data is then consumed by various microservices to provide real time analytics and insights. Kafka is also used to provide real time analytics for the Zomato app.

2. Uber : Uber uses Kafka to publish user and cab events in real time. This data is then consumed by various microservices to provide real time analytics and insights. Kafka is also used to provide real time analytics for the Uber app.

![Image](https://static.javatpoint.com/tutorial/kafka/images/apache-kafka-architecture3.png)


# Use with code

## Producer

```python
from kafka import KafkaProducer
import json
import time

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))


for e in range(1000):
    data = {'number' : e}
    producer.send('numtest', value=data)
    time.sleep(5)
```

## Consumer

```python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'numtest',
     bootstrap_servers=['localhost:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='my-group',
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))
for message in consumer:
    message = message.value
    print(message)
```

# Kafka with Docker

## Docker compose

```yml
version: '2'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    ports:
      - "2181:2181"
  kafka:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

## To run Kafka and Zookeeper using docker-pull

```bash

docker run -d --name kafka \
  -p 9092:9092 \
  --link zookeeper:zookeeper \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  wurstmeister/kafka

```
# commands

```bash
docker run -p 2181:2181 zookeeper
 

docker run -p 9092:9092 \
-e KAFKA_ZOOKEEPER_CONNECT=172.16.108.155:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://172.16.108.155:9092 \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
confluentinc/cp-kafka

```