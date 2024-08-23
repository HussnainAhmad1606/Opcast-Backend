require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDb = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const seriesRoutes = require('./routes/series');
const podcastRoutes = require('./routes/podcast');
const { mediasoupServer, createProducer, createConsumer } = require('./mediasoupServer');

const http = require('http');
const { ExpressPeerServer } = require("peer");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const corsOptions = {
  origin: '*', // Replace with your frontend URL
};



// Middleware
app.use(cors(corsOptions));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(authRoutes);
app.use(seriesRoutes);
app.use(podcastRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});

peerServer.on('connection', (client) => {
  console.log('Client connected:', client.id);
});

peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.id);
});

peerServer.on('error', (error) => {
  console.error('PeerJS server error:', error);
});

// Test route
app.get('/test', (req, res) => {
  res.send('Hello World');
});
app.use("/myapp", peerServer);


const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    server.listen(3002, () => {
      console.log('Server is running on port 3002');
    });
  } catch (err) {
    console.error(err);
  }
};

start();
