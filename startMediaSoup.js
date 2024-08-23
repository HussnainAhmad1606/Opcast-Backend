// server/mediasoupServer.js
const mediasoup = require('mediasoup');
let worker, router, producerTransport, consumerTransport, producer;

const createWorker = async () => {
  worker = await mediasoup.createWorker();
  return worker;
};

const createRouter = async () => {
  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
    ],
  });
  return router;
};

const createWebRtcTransport = async () => {
  const transportOptions = {
    listenIps: [{ ip: '127.0.0.1', announcedIp: null }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  };

  const transport = await router.createWebRtcTransport(transportOptions);
  return transport;
};

const mediasoupServer = async () => {
  await createWorker();
  await createRouter();

  producerTransport = await createWebRtcTransport();
  consumerTransport = await createWebRtcTransport();

  return {
    router,
    producerTransport,
    consumerTransport,
  };
};

const createProducer = async (transport, rtpParameters) => {
  producer = await transport.produce({ kind: 'audio', rtpParameters });
  return producer;
};

const createConsumer = async (transport, producer, rtpCapabilities) => {
  if (!router.canConsume({ producerId: producer.id, rtpCapabilities })) {
    throw new Error('Cannot consume');
  }

  const consumer = await transport.consume({
    producerId: producer.id,
    rtpCapabilities,
    paused: true,
  });

  return consumer;
};

module.exports = {
  mediasoupServer,
  createProducer,
  createConsumer,
};
