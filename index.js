import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import rinseMessages from './rinseMessages.js';

const messages = [];

const serverMessage = (socket, action) => {

    const time = Date.now();

    const newServerMessage = {
        serverMessage: true,
        user: socket.handshake.query['user-name'],
        action,
        time
    }

    messages.push(newServerMessage);
    socket.broadcast.emit('chat message', newServerMessage);

}

const app = express();
app.use(cors());

let color = 0;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
const PORT = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on('connection', (socket) => {

    console.log('A user connected');

    socket.emit('color', color++);
    serverMessage(socket, 'connected')
    rinseMessages(messages);
    socket.emit('messages init', messages)

    if (color > 16) color = 0;

    socket.on('disconnect', () => {
        console.log('User disconnected');
        serverMessage(socket, 'disconnected')
    });

    socket.on('chat message', (msg) => {
        messages.push(msg);
        socket.broadcast.emit('chat message', msg);
    });

});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});