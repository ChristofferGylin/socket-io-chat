import { messages } from "..";

const serverMessage = (socket, msg) => {

    const time = new Date.now();

    const newServerMessage = {
        serverMessage: true,
        message: `${socket.handshake.query['user-name']} ${msg} @ ${time}`,
        time
    }

    messages.push(newServerMessage);
    socket.broadcast.emit('chat message', newServerMessage);

}

export default serverMessage;