const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

const clients = new Set();
let intervalId;

app.ws('/points', (ws) => {
  clients.add(ws);

  ws.on('close', () => {
    clients.delete(ws);
    if (clients.size === 0) {
      stopServer();
      console.log('All clients disconnected. Stopping WebSocket server.');
    }
  });

  if (clients.size === 1) {
    startServer();
  }
});

app.post('/stop', (req, res) => {
  stopServer();
  res.sendStatus(200);
});

function sendRandomPoints() {
  // 2000 to create 20000 points / second stream 
  const randomPoints = Array.from({ length: 250 }, () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    z: Math.random() * 10 - 5,
  }));

  const message = JSON.stringify(randomPoints);

  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

function startServer() {
  intervalId = setInterval(sendRandomPoints, 150);
}

function stopServer() {
  clearInterval(intervalId);
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.close();
    }
  });
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server...');
  stopServer();
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});
