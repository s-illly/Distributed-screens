const WebSocket = require('ws');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080');
ws.on('open', () => {
    console.log('Connected to the WebSocket server');
    promptforMessage();
});

function promptforMessage() {
    rl.question('Enter a message (or "exit" to quit: ', (message) => {
        if (message.toLowerCase() === 'exit') {
            ws.close();
            rl.close();
            return;
        }
        ws.send(message);
        promptforMessage();
    });
}

ws.on('message', (message) => {
    console.log(`Server: ${message}`);
});

ws.on('error', (error) => {
    console.error('Websocket error:', error);
});

ws.on('close', () => {
    console.log('Disconnected from the server');
    process.exit(0);
});