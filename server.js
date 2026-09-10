const WebSocket = require('ws');

// New websocket 
const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket server is running on ws://localhost:8080');

// Connection event handler 
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send('Welcome to the Websocket server!');
    
    // Message event handler 
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server received: ${message}`);
    });

    // Close event handler
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
