const WebSocket = require('ws');

const setupWebSocketServer = (app) => {
  // Create an HTTP server from the Express app
  const server = app.listen(3000, () => {
    console.log('Express server running on port 3000');
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New client connected');
  
    ws.on('message', (message) => {
      if (message instanceof Buffer) {
        // console.log('Broadcasting audio data of size:', message.length);
        // Broadcast binary data
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      }
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });


  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  });
  
};

module.exports = setupWebSocketServer;
