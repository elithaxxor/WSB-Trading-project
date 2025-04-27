"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocketServer = setupWebSocketServer;
const ws_1 = __importDefault(require("ws"));
const uuid_1 = require("uuid");
const mockStocks = [
    { symbol: 'AAPL', price: 150.0, change: 0 },
    { symbol: 'GOOGL', price: 2800.0, change: 0 },
    { symbol: 'MSFT', price: 300.0, change: 0 }
];
function updateMockStocks() {
    mockStocks.forEach(stock => {
        const changePercent = (Math.random() - 0.5) * 0.02;
        stock.price *= (1 + changePercent);
        stock.change = changePercent * 100;
    });
}
function setupWebSocketServer(server) {
    const wss = new ws_1.default.Server({ server, path: '/ws' });
    console.log('🔌 WebSocket server initialized');
    wss.on('connection', (socket, request) => {
        const clientId = (0, uuid_1.v4)();
        console.log(`🟢 Client connected: ${clientId}`);
        // Basic API key verification from query params
        const urlParams = new URLSearchParams(request.url?.split('?')[1]);
        const apiKey = urlParams.get('apiKey');
        if (apiKey !== process.env.API_KEY) {
            const errorMsg = {
                type: 'error',
                message: 'Unauthorized: Invalid API key',
                timestamp: new Date().toISOString()
            };
            socket.send(JSON.stringify(errorMsg));
            socket.close();
            console.log(`🔒 Client ${clientId} disconnected due to invalid API key`);
            return;
        }
        // Initial welcome message
        const welcomeMsg = {
            type: 'connection',
            message: 'Connected to WSB Trading WebSocket server',
            timestamp: new Date().toISOString()
        };
        socket.send(JSON.stringify(welcomeMsg));
        // Configurable update interval (default 10 seconds)
        const updateIntervalMs = process.env.STOCK_UPDATE_INTERVAL_MS ? parseInt(process.env.STOCK_UPDATE_INTERVAL_MS, 10) : 10000;
        // Set up periodic stock updates
        const updateInterval = setInterval(() => {
            if (socket.readyState === ws_1.default.OPEN) {
                try {
                    updateMockStocks();
                    const update = {
                        type: 'stockUpdate',
                        data: mockStocks,
                        timestamp: new Date().toISOString()
                    };
                    socket.send(JSON.stringify(update));
                }
                catch (err) {
                    const errorMsg = {
                        type: 'error',
                        message: 'Failed to send stock update',
                        details: err instanceof Error ? err.message : String(err),
                        timestamp: new Date().toISOString()
                    };
                    socket.send(JSON.stringify(errorMsg));
                    console.error(`Error sending stock update to client ${clientId}:`, err);
                }
            }
        }, updateIntervalMs);
        // Handle incoming messages
        socket.on('message', (data) => {
            try {
                const parsed = JSON.parse(data.toString());
                console.log(`📩 Received from client ${clientId}:`, parsed);
                const response = {
                    type: 'echo',
                    data: parsed,
                    timestamp: new Date().toISOString()
                };
                socket.send(JSON.stringify(response));
            }
            catch (err) {
                const errorMsg = {
                    type: 'error',
                    message: 'Invalid message format',
                    timestamp: new Date().toISOString()
                };
                socket.send(JSON.stringify(errorMsg));
                console.error(`Failed to parse message from client ${clientId}:`, data.toString());
            }
        });
        // Handle client disconnect
        socket.on('close', () => {
            console.log(`🔴 Client disconnected: ${clientId}`);
            clearInterval(updateInterval);
        });
        // Handle errors
        socket.on('error', (err) => {
            console.error(`WebSocket error from client ${clientId}:`, err);
            clearInterval(updateInterval);
        });
    });
    // Monitor connections
    const monitorInterval = setInterval(() => {
        console.log(`📊 Active connections: ${wss.clients.size}`);
    }, 30000);
    // Clean up on server close
    server.on('close', () => {
        clearInterval(monitorInterval);
        wss.close();
    });
}
